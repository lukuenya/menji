// import React, { useState } from 'react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          backgroundImage: 'url("/images/backgrounds/logo-removebg-preview.png")',
          backgroundSize: '50%',
          backgroundPosition: '50% 25%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              MENJI: <span className="font-normal">Répondre aux défis de la RDC</span>
            </h1>
            
            <div className="space-y-6 mt-16 md:mt-24">
              <p className="text-lg text-gray-900 max-w-2xl mx-auto">
                Face aux défis sécuritaires actuels en RDC, nous mettons à votre disposition une carte interactive des zones de conflit, régulièrement mise à jour pour une meilleure compréhension de la situation.
              </p>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => onNavigate('warmap')}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Carte des Conflits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;