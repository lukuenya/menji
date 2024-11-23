import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === 'services') {
      onNavigate('home'); // First navigate to home
      // Wait for the home page to render, then scroll to services
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      onNavigate(page);
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2" onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>
            <img src="/images/logo/logo-removebg-preview.png" alt="MENJI Logo" className="h-12 w-auto" />
            <span className="text-xl font-semibold tracking-tight text-gray-900">MENJI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks onNavigate={handleNavigate} />
            <CtaButton onClick={() => handleNavigate('war-map')} />
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <NavLinks mobile onNavigate={handleNavigate} />
              <CtaButton onClick={() => { handleNavigate('war-map'); setIsMenuOpen(false); }} mobile />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ mobile, onNavigate }: { mobile?: boolean; onNavigate: (page: string) => void }) => {
  const linkClass = `text-gray-900 hover:text-gray-900 transition-colors ${
    mobile ? 'block py-2' : ''
  }`;

  return (
    <>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className={linkClass}>BLOG</a>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className={linkClass}>DOMAINES D'INTERVENTION</a>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('team'); }} className={linkClass}>NOTRE EQUIPE</a>
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className={linkClass}>CONTACTEZ NOUS</a>
    </>
  );
};

const CtaButton = ({ mobile, onClick }: { mobile?: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium 
    hover:bg-red-600 transition-colors ${mobile ? 'w-full' : ''}`}
  >
    CARTES DES CONFLITS
  </button>
);

export default Navbar;