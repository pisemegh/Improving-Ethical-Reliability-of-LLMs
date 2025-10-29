import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BiasResult = {
  type: string;
  score: number;
  correctedText: string;
};

export const BiasDemo = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<BiasResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const detectBias = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      // Mock bias detection logic
      const biasTypes = ["Gender", "Religion", "Race"];
      const detectedBias = biasTypes[Math.floor(Math.random() * biasTypes.length)];
      const biasScore = parseFloat((Math.random() * 0.5 + 0.3).toFixed(2));

      // Simple mock correction - in real implementation, this would use actual AI
      const corrected = inputText
        .replace(/he|him|his/gi, "they/them")
        .replace(/she|her/gi, "they/them")
        .replace(/mankind/gi, "humankind");

      setResult({
        type: detectedBias,
        score: biasScore,
        correctedText: corrected !== inputText ? corrected : "No corrections needed - text appears neutral.",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section id="demo" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Bias Detection</span> Demo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test our AI-powered bias detection and correction system in real-time
          </p>
        </div>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm glow-blue">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Input Text for Analysis
            </CardTitle>
            <CardDescription>
              Enter any text to detect potential biases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Enter text to analyze for bias (e.g., 'The chairman made his decision...')"
              className="min-h-[150px] border-primary/20 focus:border-primary bg-space-dark"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <Button
              onClick={detectBias}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg glow-blue"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 w-5 h-5" />
                  Detect Bias
                </>
              )}
            </Button>

            {result && (
              <div className="space-y-4 pt-6 border-t border-primary/20 animate-slide-up">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Analysis Results
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-primary/30 bg-space-dark">
                    <CardHeader>
                      <CardTitle className="text-lg">Detected Bias Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">{result.type}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 bg-space-dark">
                    <CardHeader>
                      <CardTitle className="text-lg">Bias Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-secondary">{result.score}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${result.score * 100}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-primary/30 bg-space-dark">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      Corrected Text
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{result.correctedText}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
