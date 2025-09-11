import Button from '../../../components/ui/Button';
import { Search, Sparkles, Map } from "lucide-react";
import heroFood from "../../../assets/hero-food.jpg";
import { MdExplore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroFood})` }}
      >
        {/*<div className="absolute inset-0 bg-gradient-to-r from-deep-red/80 via-saffron/60 to-transparent"></div>*/}
        <div className="absolute inset-0 bg-gradient-to-r from-deep-red/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover India's
            <span className="block bg-gradient-to-r from-golden to-warm-cream bg-clip-text text-transparent">
              Indigenous Flavors
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Explore authentic regional recipes, connect with local farmers, 
            and nourish your body with traditional wisdom
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search for recipes, ingredients, or regions..."
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/95 backdrop-blur-sm text-foreground placeholder:text-muted-foreground border-0 text-lg shadow-warm focus:ring-2 focus:ring-golden focus:outline-none"
              />
              <Button 
                variant="hero" 
                size="lg" 
                className="bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-[#fdfbff] absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="min-w-48 bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-[#fdfbff]">
              <Sparkles className="mr-2 h-5 w-5" />
              Suggest a Dish for Me
            </Button>
            {/*<Button variant="golden" size="lg" className="min-w-48 bg-[#F9BC06]">
              <Map className="mr-2 h-5 w-5" />
              Explore by Region
            </Button>*/}
            <Button variant="golden" size="lg" className="min-w-48 bg-[#F9BC06]"
             onClick={() => navigate("/recipe-discovery-dashboard")}>
              <MdExplore className="mr-3 h-6 w-6" />
              Explore More
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-golden">500+</div>
              <div className="text-white/80">Indigenous Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-golden">28</div>
              <div className="text-white/80">Indian States</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-golden">1000+</div>
              <div className="text-white/80">Local Farmers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;