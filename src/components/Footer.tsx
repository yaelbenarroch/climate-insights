
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Droplets, CloudRain, Wind, Thermometer } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 flex items-center justify-center">
                <Droplets className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-white">OceanClimate</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              Monitoring oceanic and atmospheric data to provide advanced climate insights and predictions.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Predictions', 'Insights'].map((item) => (
                <li key={item} className="flex items-center">
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors flex items-center"
                  >
                    {item === 'Dashboard' && <BarChartIcon className="mr-2 h-3 w-3" />}
                    {item === 'Predictions' && <LineChartIcon className="mr-2 h-3 w-3" />}
                    {item === 'Insights' && <ThermometerIcon className="mr-2 h-3 w-3" />}
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              {[
                {name: 'Ocean Data', icon: <CloudRain className="mr-2 h-3 w-3" />},
                {name: 'Climate APIs', icon: <Wind className="mr-2 h-3 w-3" />},
                {name: 'Research Papers', icon: <Thermometer className="mr-2 h-3 w-3" />}
              ].map((item) => (
                <li key={item.name} className="flex items-center">
                  <a 
                    href="#" 
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors flex items-center"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="font-medium text-sm mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <div className="wave h-6 w-full"></div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500">
            © {currentYear} OceanClimate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-slate-500 hover:text-purple-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-slate-500 hover:text-purple-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Custom icons for consistent styling
const BarChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="4" height="8" />
    <rect x="9" y="8" width="4" height="12" />
    <rect x="15" y="4" width="4" height="16" />
  </svg>
);

const LineChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
  </svg>
);

const ThermometerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);

export default Footer;
