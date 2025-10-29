import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BiasDetection } from "@/components/BiasDetection";
import { StatsPanel } from "@/components/StatsPanel";

type BiasWord = {
  word: string;
  type: string;
  confidence: number;
  correction: string;
};

type BiasResult = {
  originalText: string;
  correctedText: string;
  biasedWords: BiasWord[];
  summary: string;
};

const Index = () => {
  const [latestResult, setLatestResult] = useState<BiasResult | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl space-y-12">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">AI Bias Detection</span> Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI-powered system to detect and correct bias in text with real-time analytics
            </p>
          </div>

          <BiasDetection onAnalysisComplete={setLatestResult} />
          <StatsPanel latestResult={latestResult} />
        </div>
      </main>
    </div>
  );
};

export default Index;
