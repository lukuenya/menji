import { HiCalendar } from 'react-icons/hi2';

interface RecentBlogsProps {
  onNavigate?: (page: string) => void;
}

const RecentBlogs = ({ onNavigate }: RecentBlogsProps) => {
  const blogs = [
    {
      id: "1",
      category: "SÉCURITÉ",
      image: "https://images.unsplash.com/photo-1553558888-6ea8b5eaa8d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Analyse des Dynamiques Sécuritaires au Nord-Kivu",
      description: "Une analyse approfondie des récents développements et des enjeux sécuritaires dans la région du Nord-Kivu.",
      date: "15 Mars 2024"
    },
    {
      id: "2",
      category: "TECHNOLOGIE",
      image: "https://images.unsplash.com/photo-1580424917967-a8867a6e676e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "L'Innovation Technologique au Service de la Paix",
      description: "Comment les nouvelles technologies contribuent à la résolution des conflits et au maintien de la paix.",
      date: "10 Mars 2024"
    },
    {
      id: "3",
      category: "DÉVELOPPEMENT",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Projets de Développement Durable en RDC",
      description: "Les initiatives locales qui transforment les communautés et créent un impact positif durable.",
      date: "5 Mars 2024"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="text-4xl font-light">
            Articles Récents
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {}}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">
                    <a href="#">{blog.title}</a>
                  </h3>
                  <p className="text-gray-600 line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <HiCalendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Read More Link */}
          <div className="text-center pt-8">
            <button 
              onClick={() => onNavigate?.('blog')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-lg font-medium hover:gap-3 transition-all"
            >
              Voir tous les articles
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;