const Domaines = () => {
  const industries = [
    {
      title: "Transport",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Defense",
      image: "https://images.unsplash.com/photo-1519074031893-210d39bd3885?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Logistique",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Conservation de la nature et Agriculture",
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Infrastructure",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Energie",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <h2 className="text-4xl lg:text-5xl font-light">
              Domaines d'Intervention
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Qu'il s'agisse d'améliorer la compréhension des enjeux locaux, d'optimiser la prise de décision, ou de gagner en efficacité opérationnelle, nos solutions fournissent les analyses géospatiales et de données nécessaires pour aider à succès en RDC.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white text-xl font-semibold p-6">
                    {industry.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Domaines;
