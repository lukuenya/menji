import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Domaines from './components/Domaines';
import Founder from './components/Founder';
import Footer from './components/Footer';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import RecentBlogs from './components/RecentBlogs';
import WarMap from './components/WarMap';
import Team from './components/Team';

function App() {
  // Simple client-side routing
  const [currentPage, setCurrentPage] = React.useState('home');
  const [selectedPost, setSelectedPost] = React.useState<string | null>(null);

  // Navigation handler
  const navigate = (page: string, postId?: string) => {
    if (page === 'services' && currentPage === 'home') {
      // Smooth scroll to services section when already on home page
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentPage(page);
      setSelectedPost(postId || null);
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar onNavigate={navigate} />
      
      {currentPage === 'home' && (
        <>
          <Hero onNavigate={navigate} />
          <Features />
          <div id="services">
            <Domaines />
          </div>
          <RecentBlogs onNavigate={navigate} />
          <Founder />
        </>
      )}
      
      {currentPage === 'blog' && !selectedPost && <Blog onPostClick={(postId) => navigate('blog', postId)} />}
      {currentPage === 'blog' && selectedPost && <BlogPost />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'war-map' && <WarMap />}
      {currentPage === 'team' && <Team />}
      
      <Footer />
    </main>
  );
}

export default App;