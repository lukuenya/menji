import React, { useRef, useEffect, useState } from 'react';
import { HiPlus, HiMinus, HiCalendar } from 'react-icons/hi';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
// import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
// import Graphic from '@arcgis/core/Graphic';
// import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Zone {
  type: 'Feature';
  geometry: {
    type: 'MultiPolygon';
    coordinates: number[][][][];
  };
  properties: {
    name: string;
    status: 'occupied' | 'liberated' | 'contested' | 'government';
    population?: number;
    strategic_value: number;
  };
}

const WarMap: React.FC = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const warBlogs = [
    {
      id: 1,
      title: "Les dynamiques du conflit dans le Nord-Kivu",
      date: "15 mars 2024",
      image: "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Analyse approfondie des récents développements dans le conflit au Nord-Kivu..."
    },
    {
      id: 2,
      title: "Impact humanitaire de la guerre à l'Est",
      date: "10 mars 2024",
      image: "https://images.unsplash.com/photo-1553558888-6ea8b5eaa8d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Évaluation de la situation humanitaire dans les zones touchées par le conflit..."
    },
    {
      id: 3,
      title: "Les efforts de paix dans la région des Grands Lacs",
      date: "5 mars 2024",
      image: "https://images.unsplash.com/photo-1542207032-41e3020ed2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "Analyse des initiatives diplomatiques régionales pour la paix..."
    }
  ];

  const fetchZones = async (date: Date) => {
    try {
      setLoading(true);
      setError(null);
      const formattedDate = date.toISOString().split('T')[0];
      console.log('Fetching zones for date:', formattedDate);
      
      const url = `/api/warmap/areas/current_status/?date=${formattedDate}`;
      console.log('Requesting URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error (${response.status}):`, errorText);
        throw new Error(`Failed to fetch zone data: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response Structure:', {
        type: typeof data,
        hasFeatures: 'features' in data,
        keys: Object.keys(data),
        firstItem: data.features?.[0]
      });

      // Validate basic GeoJSON structure
      if (!data || typeof data !== 'object') {
        console.error('Invalid response: not an object', data);
        return null;
      }

      if (!Array.isArray(data.features)) {
        console.error('Invalid response: features is not an array', data);
        return null;
      }

      // Log the first feature for debugging
      if (data.features.length > 0) {
        console.log('First feature example:', {
          hasGeometry: 'geometry' in data.features[0],
          geometryType: data.features[0]?.geometry?.type,
          properties: data.features[0]?.properties
        });
      } else {
        console.log('No features returned from API');
      }

      return data;
    } catch (err) {
      console.error('Error fetching zones:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateZoneLayer = async (view: MapView, date: Date) => {
    if (!view || !view.ready) {
      console.log('Map view not ready yet');
      return;
    }

    const zones = await fetchZones(date);
    console.log('Raw zones data:', zones);
    if (!zones || !zones.features) {
      console.error('No valid zones data received');
      return;
    }

    try {
      // Remove existing zone layer if any
      if (view.map && view.map.layers) {
        const existingLayer = view.map.layers.find(layer => layer.id === 'zones');
        if (existingLayer) {
          view.map.remove(existingLayer);
        }
      }

      // Validate and transform zones data
      const features = zones.features.map((feature: any) => {
        // Validate geometry
        if (!feature.geometry || !feature.geometry.type || !feature.geometry.coordinates) {
          console.warn('Invalid geometry in feature:', feature);
          return null;
        }

        // Validate geometry type (should be Polygon or MultiPolygon for zones)
        if (!['Polygon', 'MultiPolygon'].includes(feature.geometry.type)) {
          console.warn(`Unsupported geometry type: ${feature.geometry.type}`);
          return null;
        }

        // Ensure properties exist
        const properties = feature.properties || {};
        
        return {
          type: 'Feature',
          geometry: {
            type: feature.geometry.type,
            coordinates: feature.geometry.coordinates
          },
          properties: {
            name: properties.name || 'Unnamed Zone',
            status: properties.status || 'unknown',
            population: properties.population || 0,
            strategic_value: properties.strategic_value || 0
          }
        };
      }).filter(Boolean); // Remove any null features

      if (features.length === 0) {
        console.error('No valid features found in zones data');
        return;
      }

      const geojsonData = {
        type: 'FeatureCollection',
        features: features
      };

      console.log('Validated GeoJSON data:', JSON.stringify(geojsonData, null, 2));

      const blob = new Blob([JSON.stringify(geojsonData)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const layer = new GeoJSONLayer({
        id: 'zones',
        title: 'Zone Status',
        url: url,
        geometryType: 'polygon',
        spatialReference: view.spatialReference,
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [200, 200, 200, 0.5],
            outline: {
              color: [100, 100, 100],
              width: 1
            }
          },
          visualVariables: [
            {
              type: "color",
              field: "status",
              stops: [
                { value: "occupied", color: [255, 0, 0, 0.5] },
                { value: "contested", color: [255, 165, 0, 0.5] },
                { value: "liberated", color: [0, 0, 255, 0.5] },
                { value: "government", color: [0, 128, 0, 0.5] }
              ]
            }
          ]
        } as any,
        popupTemplate: {
          title: "{name}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                { fieldName: "status", label: "Status" },
                { fieldName: "population", label: "Population" },
                { fieldName: "strategic_value", label: "Strategic Value" }
              ]
            }
          ]
        }
      });

      console.log('Created GeoJSON layer:', layer);
      view.map.add(layer);
      console.log('Added layer to map');
    } catch (err) {
      console.error('Error creating layer:', err);
      setError('Failed to display zones on map');
    }
  };

  useEffect(() => {
    if (mapDivRef.current) {
      const webMap = new WebMap({
        basemap: 'satellite' // Satellite imagery basemap
      });

      const view = new MapView({
        container: mapDivRef.current,
        map: webMap,
        zoom: 6,
        center: [29.2494, -1.5207],
        constraints: {
          rotationEnabled: false
        },
        ui: {
          components: ['attribution']
        }
      });

      viewRef.current = view;

      // Wait for both the view and map to be ready before loading zones
      view.when(() => {
        console.log('Map view is ready');
        if (view.ready && view.map) {
          updateZoneLayer(view, selectedDate);
        }
      });

      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, []);

  // Update zones when date changes
  useEffect(() => {
    const view = viewRef.current;
    if (view && view.ready && view.map) {
      updateZoneLayer(view, selectedDate);
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-6">
          Évolution du Conflit en RDC
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Suivez l'évolution de la situation sécuritaire en République Démocratique du Congo à travers notre carte interactive.
        </p>
      </div>

      {/* Map Controls */}
      <div className="container mx-auto px-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Date:</span>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => date && setSelectedDate(date)}
              className="px-3 py-2 border rounded-lg"
              dateFormat="yyyy-MM-dd"
            />
          </div>
          {loading && <span className="text-sm text-gray-500">Loading...</span>}
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Map Container */}
          <div className="relative aspect-[16/9]">
            <div ref={mapDivRef} className="w-full h-full"></div>
            {/* Custom Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  if (viewRef.current) {
                    viewRef.current.zoom = viewRef.current.zoom + 1;
                  }
                }}
                className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Zoom in"
              >
                <HiPlus className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => {
                  if (viewRef.current) {
                    viewRef.current.zoom = viewRef.current.zoom - 1;
                  }
                }}
                className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                aria-label="Zoom out"
              >
                <HiMinus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Map Attribution and Legend Container */}
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-t gap-4">
            {/* Map Legend */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-none">
                <h3 className="font-semibold">Légende</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                <LegendItem color="bg-red-500/20 border-red-500" label="Zones occupées" />
                <LegendItem color="bg-yellow-500/20 border-yellow-500" label="Zones contestées" />
                <LegendItem color="bg-blue-500/20 border-blue-500" label="Zones libérées" />
                <LegendItem color="bg-green-500/20 border-green-500" label="Zones sous contrôle gouvernemental" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* War Blog Posts */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light mb-8">Analyses du Conflit</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {warBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {blog.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <HiCalendar size={16} />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-4 h-4 rounded border ${color}`}></div>
    <span className="text-sm">{label}</span>
  </div>
);

export default WarMap;
