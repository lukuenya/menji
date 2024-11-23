// import React from 'react';
import { HiCalendar, HiChevronRight } from 'react-icons/hi2';

const Blog = ({ onPostClick }: { onPostClick: (postId: string) => void }) => {
  const topics = [
    { icon: "💻", label: "Technology" },
    { icon: "✈️", label: "Travel" },
    { icon: "🎾", label: "Sport" },
    { icon: "💼", label: "Business" },
    { icon: "📊", label: "Management" },
    { icon: "🔥", label: "Trends" },
    { icon: "🚀", label: "Startups" },
    { icon: "📰", label: "News" }
  ];

  const blogs = [
    {
      id: "1",
      category: "SPORT",
      image: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Key Sports Trends for 2024: From AI to Virtual Reality",
      description: "Plongez dans les principales tendances sportives comme l'IA et la réalité virtuelle qui redéfiniront l'industrie du sport en 2024.",
      date: "September 24, 2024"
    },
    {
      id: "2",
      category: "TECHNOLOGY",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "The Impact of Automation on Business Management Efficiency",
      description: "Découvrez comment l'automatisation améliore l'efficacité de la gestion d'entreprise et stimule la croissance dans divers secteurs.",
      date: "September 20, 2024"
    },
    {
      id: "3",
      category: "INNOVATION",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Future of Digital Innovation in Congo",
      description: "Explorer les opportunités et les défis de l'innovation numérique en République Démocratique du Congo.",
      date: "September 15, 2024"
    },
    {
      id: "4",
      category: "RESEARCH",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Research Methodologies in African Context",
      description: "Une analyse approfondie des méthodologies de recherche adaptées au contexte africain.",
      date: "September 10, 2024"
    },
    {
      id: "5",
      category: "DEVELOPMENT",
      image: "https://images.unsplash.com/photo-1497366216548-bc09fcaaf77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Sustainable Development Initiatives",
      description: "Les initiatives de développement durable qui transforment la RDC.",
      date: "September 5, 2024"
    },
    {
      id: "6",
      category: "SOCIETY",
      image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Social Impact of Technology",
      description: "Comment la technologie façonne la société congolaise moderne.",
      date: "September 1, 2024"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-light mb-6">
          Heartfelt <span className="text-blue-500">Reflections</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Common_Sense vous accueille dans votre source ultime de perspectives fraîches ! 
          Explorez un contenu soigneusement sélectionné pour éclairer et engager.
        </p>
      </div>

      {/* Topics Section */}
      <div className="container mx-auto px-4 mb-16">
        <p className="text-center text-gray-500 uppercase tracking-wider mb-8">
          Explorer les sujets tendance
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {topics.map((topic, index) => (
            <button 
              key={index}
              className="px-6 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <span>{topic.icon}</span>
              <span>{topic.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <div 
              key={blog.id}
              className="group cursor-pointer"
              onClick={() => onPostClick(blog.id)}
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h2>
              
              <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                {blog.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <HiCalendar size={16} />
                <span>{blog.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-blue-600 hover:gap-3 transition-all">
            Charger plus d'articles <HiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;