import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-town-green/20 rounded-full px-4 py-1 mb-6 border border-town-green/30">
              <p className="text-town-green text-sm font-medium">🌳 Virtual Learning Town</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gray-800">Welcome to</span>
              <br />
              <span className="text-gradient bg-gradient-to-r from-town-green via-town-accent to-town-wood bg-clip-text text-transparent">
                Based Town
              </span>
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              Join fellow learners in a cozy 2D town environment. 
              Take AI-generated courses, chat with others, and level up your skills 
              in a friendly, community-based experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="pixel-btn text-white bg-town-green">
                Explore Town
              </Button>
              <Button>
                Watch Tour
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-town-green/80 flex items-center justify-center border-2 border-town-light">
                    <span className="text-xs text-white font-bold">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-gray-800">500+</span> townspeople learning together
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-[400px] rounded-xl overflow-hidden border-4 border-town-green relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-town-light/90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://placehold.co/600x400/F2FCE2/4CAF50?text=Town+Preview" 
                  alt="Town Preview" 
                  className="w-full h-full object-cover pixel-image"
                />
                <div className="absolute bottom-6 left-0 right-0 px-6">
                  <div className="flex items-center gap-3 bg-town-light/80 backdrop-blur-sm p-3 rounded-lg border border-town-green/20">
                    <div className="w-10 h-10 rounded-lg bg-town-green flex items-center justify-center">
                      <span className="text-xs font-bold text-white">LV.5</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-semibold">Botany Quest</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                        <div className="h-full bg-town-accent rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <Button size="sm" className="ml-auto bg-town-wood hover:bg-town-wood/90">
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-town-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-town-green/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-town-light to-transparent"></div>
    </section>
  );
};

export default HeroSection;