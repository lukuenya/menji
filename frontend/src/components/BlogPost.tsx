import React from 'react';
import { HiMapPin, HiLink, HiChevronRight } from 'react-icons/hi2';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const BlogPost = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900">Home</a>
          <HiChevronRight size={16} />
          <a href="#" className="hover:text-gray-900">Technology</a>
          <HiChevronRight size={16} />
          <span className="text-gray-900">The Impact of Automation on Business Management Efficiency</span>
        </div>
      </div>

      {/* Article Header */}
      <div className="container mx-auto px-4 text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-blue-600 mb-4">
            <a href="#" className="hover:underline">Ethan Caldwell</a>
            <span className="text-gray-400">on September 20, 2024</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            The Impact of Automation on Business Management Efficiency
          </h1>
          
          <p className="text-xl text-gray-600">
            Learn how automation is boosting business management efficiency and driving growth in various sectors.
          </p>

          <div className="mt-8">
            <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium text-gray-600">
              TECHNOLOGY
            </span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Automation and Business"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <span>6 min read</span>
                <div className="flex gap-4">
                  <SocialShareButton icon={<FaTwitter size={18} />} />
                  <SocialShareButton icon={<FaFacebook size={18} />} />
                  <SocialShareButton icon={<FaLinkedin size={18} />} />
                  <SocialShareButton icon={<HiLink size={18} />} />
                </div>
              </div>

              <p>
                In today's ever-evolving world, storytelling has become a powerful tool for connection. 
                Revision provides a unique platform for individuals to share their stories.
              </p>

              <p>
                Revision is more than a typical content hub. It's a dynamic space for meaningful 
                conversations and personal stories that resonate with people on an emotional level. 
                Whether you are looking for inspiration, comfort, or just a different perspective 
                on life, Revision offers a wide range of narratives to explore.
              </p>

              <h2>Stories that Matter</h2>

              <p>
                At the core of Revision is a commitment to delivering stories that matter. 
                With categories covering everything from love and relationships to personal 
                development and lifestyle, it encourages readers to explore topics that 
                touch on their emotions and experiences.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Author Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-gray-500 uppercase tracking-wider mb-6">About</h3>
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Ethan Caldwell"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">Ethan Caldwell</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      Reflective Blogger
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Ethan Caldwell shares thoughtful insights and reflections on life, culture, and 
                  personal growth. His work explores the intersections of creativity and experience, 
                  offering readers unique perspectives.
                </p>
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <HiMapPin size={18} />
                  <span>Paris, France</span>
                </div>
                <div className="flex gap-4">
                  <SocialLink href="#" icon={<FaTwitter size={18} />} />
                  <SocialLink href="#" icon={<FaFacebook size={18} />} />
                  <SocialLink href="#" icon={<FaInstagram size={18} />} />
                  <SocialLink href="#" icon={<FaLinkedin size={18} />} />
                </div>
              </div>

              {/* Featured Posts */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-gray-500 uppercase tracking-wider mb-6">Featured Posts</h3>
                <div className="space-y-6">
                  <FeaturedPost
                    title="AI in Business Management: Improving Efficiency and Growth"
                    date="July 7, 2024"
                    category="MANAGEMENT"
                    image="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  />
                  <FeaturedPost
                    title="The Future of Remote Work Technologies"
                    date="July 2, 2024"
                    category="TECHNOLOGY"
                    image="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const SocialShareButton = ({ icon }: { icon: React.ReactNode }) => (
  <button className="text-gray-400 hover:text-gray-600 transition-colors">
    {icon}
  </button>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
  >
    {icon}
  </a>
);

const FeaturedPost = ({
  title,
  date,
  category,
  image,
}: {
  title: string;
  date: string;
  category: string;
  image: string;
}) => (
  <div className="flex gap-4">
    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div>
      <span className="text-sm text-gray-500">{category}</span>
      <h4 className="font-medium text-gray-900 leading-snug hover:text-blue-600 transition-colors">
        <a href="#">{title}</a>
      </h4>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
  </div>
);

export default BlogPost;