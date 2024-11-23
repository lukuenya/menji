import { LuBrainCog } from 'react-icons/lu';
import { HiSearch, HiLightBulb } from 'react-icons/hi';

const Features = () => {
  const features = [
    {
      icon: <HiSearch className="w-16 h-16" />,
      title: "Recherche",
      description: "Chez MENJI, nous utilisons des méthodologies de recherche avancées et des outils innovants pour analyser les défis spécifiques de la RDC."
    },
    {
      icon: <HiLightBulb className="w-16 h-16" />,
      title: "Développement de Solutions",
      description: "Que ce soit des projets publics ou d'entreprises privées, nos équipes possèdent de l'expérience dans la conception et la mise en œuvre de solutions innovantes et durables adaptées aux besoins locaux."
    },
    {
      icon: <LuBrainCog className="w-16 h-16" />,
      title: "Analyse et Intelligence",
      description: "Grâce à l'intelligence artificielle et à l'analyse de données, nous fournissons des informations approfondis qui aident à prédire les tendances et à prendre des décisions éclairées pour un impact durable."
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center space-y-6 group"
            >
              <div className="p-4 rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;