const Founder = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/founder/logo.png"
                alt="Matthieu Ndumbi Lukuenya - Fondateur de MENJI"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          <div className="space-y-8">
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed tracking-wide">
              CHEZ MENJI, NOUS VISIONNONS UN AVENIR OÙ LA RECHERCHE INNOVANTE RÉPOND EFFICACEMENT AUX DÉFIS UNIQUES DE LA RDC. NOTRE ENGAGEMENT ET NOTRE EXPERTISE GARANTISSENT DES SOLUTIONS DURABLES ET ADAPTÉES AUX BESOINS LOCAUX.
            </blockquote>
            
            <div className="space-y-2">
              <p className="text-2xl font-serif text-blue-600">
                Matthieu Ndumbi Lukuenya
              </p>
              <p className="text-gray-600">
                Fondateur & Directeur Général
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;