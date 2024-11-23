import React from 'react';
import { HiPaperAirplane, HiChatBubbleOvalLeft} from 'react-icons/hi2';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      {/* Newsletter & WhatsApp Banner */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Newsletter */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl text-white font-light mb-4">Restez Connecté</h3>
                <p className="text-white/80 mb-6">
                  Abonnez-vous à notre newsletter pour obtenir les dernières recherches.
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <button className="px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-white/90 transition-colors">
                    <HiPaperAirplane size={20} />
                  </button>
                </form>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl text-white font-light mb-4">Rejoignez-nous sur WhatsApp</h3>
                <p className="text-white/80 mb-6">
                  Abonnez-vous au fil WhatsApp du Groupe d'Étude sur le Congo et d'Ebuteli
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Rejoindre le fil"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <button className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                    <HiChatBubbleOvalLeft size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Logo & Description */}
          <div className="mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/logo/logo-removebg-preview.png" alt="MENJI Logo" className="h-8 w-auto" />
              <span className="text-2xl text-white font-semibold tracking-tight">MENJI</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Menji est un centre de recherche congolais dédié à des solutions concrètes et innovantes 
              pour le développement de la RDC. À travers des recherches rigoureuses et des analyses approfondies, 
              nous nous engageons à offrir des solutions pragmatiques aux défis complexes auxquels la RDC est confrontée. 
              Notre approche combine l'excellence académique avec une compréhension approfondie du contexte local.
            </p>
          </div>

          {/* Quick Links & Social */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            <div>
              <h4 className="text-white font-medium mb-4">À Propos</h4>
              <ul className="space-y-3">
                <FooterLink href="#">Notre Mission</FooterLink>
                <FooterLink href="#">Notre Équipe</FooterLink>
                <FooterLink href="#">Carrières</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Services</h4>
              <ul className="space-y-3">
                <FooterLink href="#">Recherche</FooterLink>
                <FooterLink href="#">Consultation</FooterLink>
                <FooterLink href="#">Formation</FooterLink>
                <FooterLink href="#">Publications</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Ressources</h4>
              <ul className="space-y-3">
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Rapports</FooterLink>
                <FooterLink href="#">Études de cas</FooterLink>
                <FooterLink href="#">Médias</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Suivez-nous</h4>
              <div className="flex gap-4">
                <SocialLink icon={<FaTwitter size={20} />} href="#" />
                <SocialLink icon={<FaFacebook size={20} />} href="#" />
                <SocialLink icon={<FaLinkedin size={20} />} href="#" />
                <SocialLink icon={<FaInstagram size={20} />} href="#" />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MENJI. Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href}
      className="text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </a>
  </li>
);

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href}
    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
  >
    {icon}
  </a>
);

export default Footer;