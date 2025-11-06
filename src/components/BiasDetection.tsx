import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

import { AlertCircle, CheckCircle, Zap, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

type BiasDetectionProps = {
  onAnalysisComplete: (result: BiasResult) => void;
};

export const BiasDetection = ({ onAnalysisComplete }: BiasDetectionProps) => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<BiasResult | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isCorrecting, setIsCorrecting] = useState(false);
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

    setIsDetecting(true);

    // Simulate AI processing
    setTimeout(() => {
      const biasedWords: BiasWord[] = [];
      const words = inputText.split(/\b/);

      // Mock bias detection logic
      const biasPatterns = [
        { pattern: /\b(he|him|his|man|men|mankind)\b/gi, type: "Gender", correction: "they/them" },
        { pattern: /\b(she|her|hers|woman|women)\b/gi, type: "Gender", correction: "they/them" },
        { pattern: /\b(chairman|policeman|fireman)\b/gi, type: "Gender", correction: "chairperson/police officer" },
        { pattern: /\b(old|elderly|aged)\b/gi, type: "Race", correction: "older adult" },
        { pattern: /\b(guys|dude|bro)\b/gi, type: "Gender", correction: "everyone/folks" },
      ];

      words.forEach((word) => {
        biasPatterns.forEach((bp) => {
          if (bp.pattern.test(word)) {
            biasedWords.push({
              word: word.trim(),
              type: bp.type,
              confidence: Math.random() * 0.3 + 0.7,
              correction: bp.correction,
            });
          }
        });
      });

      const newResult: BiasResult = {
        originalText: inputText,
        correctedText: inputText,
        biasedWords,
        summary: biasedWords.length > 0
          ? `Detected ${biasedWords.length} potentially biased phrase(s) related to ${[...new Set(biasedWords.map(b => b.type))].join(", ")}.`
          : "No significant bias detected in the text.",
      };

      setResult(newResult);
      setIsDetecting(false);
      onAnalysisComplete(newResult);
    }, 1500);
  };

  const correctBias = () => {
    if (!result) return;

    setIsCorrecting(true);

    setTimeout(() => {
      let corrected = result.originalText;

      result.biasedWords.forEach((bias) => {
        const regex = new RegExp(`\\b${bias.word}\\b`, "gi");
        corrected = corrected.replace(regex, bias.correction);
      });

      const updatedResult = { ...result, correctedText: corrected };
      setResult(updatedResult);
      setIsCorrecting(false);
    }, 1000);
  };

  const highlightBiasedWords = (text: string) => {
    if (!result || result.biasedWords.length === 0) return text;

    const words = text.split(/\b/);
    return words.map((word, idx) => {
      const biased = result.biasedWords.find(
        (b) => b.word.toLowerCase() === word.trim().toLowerCase()
      );

      if (biased) {
        return (
          <span
            key={idx}
            className="bg-destructive/30 text-destructive font-semibold px-1 rounded border-b-2 border-destructive"
            title={`${biased.type} bias (${(biased.confidence * 100).toFixed(0)}% confidence)`}
          >
            {word}
          </span>
        );
      }
      return word;
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm glow-blue">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Bias Detection Engine
          </CardTitle>
          <CardDescription>
            Enter text to detect and correct potential biases in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter text to analyze for bias (e.g., 'The chairman made his decision and the old man agreed...')"
            className="min-h-[120px] border-primary/20 focus:border-primary bg-space-dark"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="flex gap-3">
            <Button
              onClick={detectBias}
              disabled={isDetecting}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 glow-blue"
            >
              {isDetecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Detecting...
                </>
              ) : (
                <>
                  <AlertCircle className="mr-2 w-5 h-5" />
                  Detect Bias
                </>
              )}
            </Button>

            <Button
              onClick={correctBias}
              disabled={isCorrecting || !result || result.biasedWords.length === 0}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 glow-purple"
            >
              {isCorrecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Correcting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Correct Bias
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          {result.summary && (
            <Card className="border-primary/30 bg-space-dark/50 backdrop-blur-sm animate-slide-up">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed">{result.summary}</p>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            <Card className="border-destructive/30 bg-space-dark/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  Original Text
                </CardTitle>
                <CardDescription>Biased phrases highlighted in red</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-background/30 rounded-lg border border-border min-h-[200px] leading-relaxed">
                  {highlightBiasedWords(result.originalText)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-space-dark/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Corrected Text
                </CardTitle>
                <CardDescription>Neutral and inclusive language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-background/30 rounded-lg border border-primary/20 min-h-[200px] leading-relaxed">
                  {result.correctedText}
                </div>
              </CardContent>
            </Card>
          </div>

          {result.biasedWords.length > 0 && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm animate-slide-up">
              <CardHeader>
                <CardTitle className="text-lg">Detected Biases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.biasedWords.map((bias, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-space-dark rounded-lg border border-primary/20"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-destructive font-semibold">{bias.word}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-primary font-semibold">{bias.correction}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{bias.type}</span>
                        <span className="text-sm font-semibold text-primary">
                          {(bias.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
