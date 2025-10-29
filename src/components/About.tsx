import { Card, CardContent } from "./ui/card";
import { Brain, Shield, Lock } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Our Project</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining cutting-edge AI with blockchain technology to build a more ethical future
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:glow-blue transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="flex justify-center">
                <Brain className="w-12 h-12 text-primary animate-float" />
              </div>
              <h3 className="text-xl font-semibold">Advanced LLMs</h3>
              <p className="text-muted-foreground">
                Leveraging state-of-the-art language models to detect and mitigate biases in AI-generated content
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:glow-purple transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="flex justify-center">
                <Shield className="w-12 h-12 text-secondary animate-float" />
              </div>
              <h3 className="text-xl font-semibold">Ethical AI</h3>
              <p className="text-muted-foreground">
                Ensuring fairness across gender, race, religion, and other sensitive categories through intelligent detection
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover:glow-blue transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="flex justify-center">
                <Lock className="w-12 h-12 text-primary animate-float" />
              </div>
              <h3 className="text-xl font-semibold">Blockchain Transparency</h3>
              <p className="text-muted-foreground">
                Immutable logging of all corrections ensures accountability and builds trust in AI systems
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/30 bg-gradient-to-br from-card/50 to-space-dark backdrop-blur-sm">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-2xl font-bold text-center mb-6">
              <span className="text-gradient">Our Mission</span>
            </h3>
            <p className="text-lg text-foreground leading-relaxed text-center max-w-4xl mx-auto">
              Large Language Models have revolutionized AI, but they can perpetuate harmful biases
              present in training data. Our project addresses this critical challenge by combining
              advanced machine learning with blockchain technology. We detect bias across multiple
              dimensions, correct it intelligently, and log every action on an immutable ledger.
              This ensures transparency, accountability, and trust in AI systems - making AI truly
              fair for everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
