import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const navLinks = [
    { name: 'About', path: '#about' },
    { name: 'Projects', path: '#projects' },
    { name: 'Skills', path: '#skills' },
    { name: 'Contact', path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      let currentSection = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          currentSection = section;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMainPage = location.pathname === '/';

  const NavItem = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => {
    if (isMainPage && href.startsWith('#')) {
      const sectionName = href.replace('#', '');
      const isActive = activeSection === sectionName;
      return (
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(sectionName)?.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
          }}
          className={`${className} ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          {children}
        </a>
      );
    }
    
    const targetPath = href.startsWith('#') ? `/${href}` : href;
    
    return (
      <Link
        to={targetPath}
        onClick={() => setIsOpen(false)}
        className={`${className} text-gray-400 hover:text-white`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="w-full bg-transparent sticky top-0 z-50 pt-4">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-slate-900/40 backdrop-blur-md rounded-full border border-slate-800">
        <NavItem href="#home" className="flex items-center gap-2 group ml-4">
          <span className="text-cyan-500 font-bold text-xl tracking-tight">vinaycode</span>
        </NavItem>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavItem
              key={link.name}
              href={link.path}
              className="font-sans text-sm font-medium transition-all duration-300"
            >
              {link.name}
            </NavItem>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 hover:text-white transition-colors mr-2">
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-6 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-md p-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavItem
                key={link.name}
                href={link.path}
                className="font-sans text-sm font-medium"
              >
                {link.name}
              </NavItem>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
