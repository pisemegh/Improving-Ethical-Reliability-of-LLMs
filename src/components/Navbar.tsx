import { Shield } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary glow-blue" />
            <span className="text-xl font-bold text-gradient">Ethical AI</span>
          </div>
          
          <Button
            onClick={() => scrollToSection("demo")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-blue"
          >
            Try Demo
          </Button>
        </div>
      </div>
    </nav>
  );
};
