import { HiMail } from 'react-icons/hi';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';

const Team = () => {
  const teamMembers = [
    {
      name: "Matthieu Ndumbi Lukuenya",
      role: "Fondateur & Directeur Général",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Expert en développement durable avec plus de 15 ans d'expérience dans la recherche et l'innovation en RDC.",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "mailto:matthieu@commonsense.org"
      }
    },
    {
      name: "Sarah Mukendi",
      role: "Directrice de Recherche",
      image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Spécialiste en analyse de données et méthodologies de recherche innovantes.",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "mailto:sarah@commonsense.org"
      }
    },
    {
      name: "Jean-Paul Kabongo",
      role: "Chef des Opérations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Expert en gestion de projets et développement organisationnel.",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "mailto:jeanpaul@commonsense.org"
      }
    }
  ];

  const partners = [
    {
      name: "Université de Kinshasa",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Partenaire académique principal"
    },
    {
      name: "Institut National de Recherche",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Collaboration en recherche"
    },
    {
      name: "Tech Innovation Hub",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Partenaire technologique"
    },
    {
      name: "Centre de Développement Durable",
      logo: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Partenaire en développement"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            Notre <span className="text-blue-600">Équipe</span>
          </h1>
          <p className="text-xl text-gray-600">
            Une équipe passionnée de chercheurs et d'experts dédiés à l'innovation
            et au développement durable en République Démocratique du Congo.
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[3/4] mb-6 rounded-xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex gap-4 text-white">
                      <a href={member.social.email} className="hover:text-blue-400 transition-colors">
                        <HiMail size={20} />
                      </a>
                      <a href={member.social.twitter} className="hover:text-blue-400 transition-colors">
                        <FaTwitter size={20} />
                      </a>
                      <a href={member.social.linkedin} className="hover:text-blue-400 transition-colors">
                        <FaLinkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-blue-600 mb-3">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center">
              Nos Partenaires
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{partner.name}</h3>
                  <p className="text-sm text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;