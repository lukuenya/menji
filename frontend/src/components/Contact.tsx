import React from 'react';
import { HiPhone, HiMail} from 'react-icons/hi';
import { FaMapPin } from 'react-icons/fa6';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-light text-gray-900 mb-8">
              Make an Appointment
            </h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors text-gray-600">
                  <option value="">Select Service</option>
                  <option value="research">Research Consultation</option>
                  <option value="analysis">Data Analysis</option>
                  <option value="development">Solution Development</option>
                  <option value="training">Training Workshop</option>
                </select>
              </div>
              
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <ContactInfo
                icon={<HiPhone className="w-6 h-6" />}
                title="24/7 Contact us"
                detail="(000) 123456789"
              />
              <ContactInfo
                icon={<HiMail className="w-6 h-6" />}
                title="Mail us"
                detail="contact@commonsense.org"
              />
              <ContactInfo
                icon={<FaMapPin className="w-6 h-6" />}
                title="Address"
                detail="5th Street, Kinshasa, RDC"
              />
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63470.683685841275!2d15.266019931445317!3d-4.325032072357543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3130fe066a8b%3A0x168b7e4e1f52378d!2sKinshasa%2C%20Democratic%20Republic%20of%20the%20Congo!5e0!3m2!1sen!2sus!4v1709824156843!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfo = ({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) => (
  <div className="flex items-start gap-6">
    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{detail}</p>
    </div>
  </div>
);

export default Contact;