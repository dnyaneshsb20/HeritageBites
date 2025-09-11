import { ChefHat, Mail, Phone, MapPin } from "lucide-react";
import Button from '../../../components/ui/Button';

const Footer = () => {
  return (
    <footer className="bg-earth-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-golden" />
              <span className="text-2xl font-bold">DishCover</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Preserving India's culinary heritage while connecting communities 
              through authentic flavors and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <Button variant="golden" size="sm">
                Download App
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-golden mb-4">Discover</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Regional Recipes</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Festival Foods</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Healthy Options</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Quick Meals</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Cultural Stories</a></li>
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-lg font-semibold text-golden mb-4">Marketplace</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Indigenous Grains</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Organic Spices</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Cold-Pressed Oils</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Ready-to-Cook</a></li>
              <li><a href="#" className="text-white/80 hover:text-golden transition-colors">Farmer Partners</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-golden mb-4">Connect</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-golden" />
                <span className="text-white/80">hello@dishcover.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-golden" />
                <span className="text-white/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-golden" />
                <span className="text-white/80">Mumbai, India</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium text-golden mb-2">Stay Updated</h5>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-golden"
                />
                <Button variant="golden" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 DishCover. Preserving India's culinary heritage.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-golden transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-golden transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-golden transition-colors text-sm">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;