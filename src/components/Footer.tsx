'use client';

import { Separator } from './ui/separator';
import { Share2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/shop' },
        { name: 'Flash Sales', href: '/flash-sales' },
        { name: 'Clearance', href: '/clearance' },
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Categories', href: '/categories' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Track Order', href: '/track-order' },
      ],
    },
    {
      title: 'Account',
      links: [
        { name: 'My Account', href: '/account' },
        { name: 'Orders', href: '/orders' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Gift Cards', href: '/gift-cards' },
        { name: 'Addresses', href: '/addresses' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'American Express', icon: '💳' },
    { name: 'PayPal', icon: '💳' },
    { name: 'Bitcoin', icon: '₿' },
    { name: 'Ethereum', icon: 'Ξ' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Share2, href: '#', color: 'hover:bg-blue-600' },
    { name: 'Twitter', icon: Share2, href: '#', color: 'hover:bg-sky-500' },
    { name: 'Instagram', icon: Share2, href: '#', color: 'hover:bg-pink-600' },
    { name: 'YouTube', icon: Share2, href: '#', color: 'hover:bg-red-600' },
    { name: 'LinkedIn', icon: Share2, href: '#', color: 'hover:bg-blue-700' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              DEALORA
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Shop More. Save More. Win More. Your destination for amazing deals, exclusive giveaways, and quality products.
            </p>
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@dealora.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>1-800-DEALORA</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>123 Commerce St, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-lg">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-gray-800 mb-8" />

        {/* Payment Methods & Social Links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-300">Payment Methods</h4>
            <div className="flex flex-wrap gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="bg-gray-800 rounded-lg px-3 py-2 text-center hover:bg-gray-700 transition-colors cursor-pointer"
                  title={method.name}
                >
                  <span className="text-xl">{method.icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-300">Follow Us</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 bg-gray-800 rounded-lg hover:text-white transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} DEALORA. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-orange-500 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}