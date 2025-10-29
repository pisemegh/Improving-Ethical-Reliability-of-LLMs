import { Card, CardContent } from "./ui/card";
import { Mail, Github, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead AI Researcher",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Alex Kumar",
    role: "Blockchain Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Maya Rodriguez",
    role: "ML Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
  },
  {
    name: "James Park",
    role: "Ethics Consultant",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
];

export const Team = () => {
  return (
    <section id="team" className="py-20 px-4 bg-gradient-to-b from-space-dark to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experts in AI, blockchain, and ethics working together for a better future
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="border-primary/20 bg-card/50 backdrop-blur-sm hover:glow-blue transition-all duration-300 animate-fade-in"
            >
              <CardContent className="pt-6 text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full border-2 border-primary/30"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
