import { ArrowRight, Database, Shield, Sparkles, FileText } from "lucide-react";
import { Card } from "./ui/card";

const steps = [
  {
    icon: FileText,
    title: "User Input",
    description: "Text submitted for analysis",
  },
  {
    icon: Sparkles,
    title: "AI Bias Detector",
    description: "Machine learning model analyzes content",
  },
  {
    icon: Shield,
    title: "Bias Corrector",
    description: "Neutralizes detected biases",
  },
  {
    icon: Database,
    title: "Blockchain Logger",
    description: "Records transaction immutably",
  },
  {
    icon: FileText,
    title: "Output Display",
    description: "Corrected, ethical result",
  },
];

export const Architecture = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-space-dark">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            System <span className="text-gradient">Architecture</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A transparent pipeline ensuring every decision is fair and verifiable
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <Card className="border-primary/30 bg-card/50 backdrop-blur-sm p-6 hover:glow-blue transition-all duration-300 animate-fade-in w-48">
                <div className="text-center space-y-3">
                  <div className="flex justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
              {index < steps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-primary hidden md:block flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
