import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const Layout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/home', label: t('nav.home') },
    // Add more links here as needed
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b-2 border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-2.5 rounded-2xl group-hover:shadow-lg transition-all duration-300 shadow-md">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {t('app.title')}
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base font-semibold transition-all duration-200 hover:text-green-600 ${isActive(link.path) ? 'text-green-600' : 'text-gray-700'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <LanguageToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl hover:bg-green-50 text-gray-700 transition-colors border-2 border-gray-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-green-100 bg-white shadow-lg">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-5 py-4 rounded-xl text-base font-semibold transition-all ${isActive(link.path)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-green-500 p-2.5 rounded-2xl shadow-lg">
                  <Sprout className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-extrabold text-white">
                  {t('app.title')}
                </span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed max-w-xs">
                {t('hero.description')}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">🌾 Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-green-400 transition-colors">Home</Link></li>
                <li><Link to="/home" className="text-gray-300 hover:text-green-400 transition-colors">Analyze Soil</Link></li>
                <li><Link to="/chatbot" className="text-gray-300 hover:text-green-400 transition-colors">AI Assistant</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">💚 Mission</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} {t('app.title')}. All rights reserved. Made with 💚 for farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
