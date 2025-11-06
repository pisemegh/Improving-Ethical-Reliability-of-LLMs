import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

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

type StatsData = {
  totalAnalyzed: number;
  totalBiasesDetected: number;
  byCategory: { name: string; value: number }[];
  history: { time: string; count: number }[];
  avgConfidence: number;
};

export const StatsPanel = ({ latestResult }: { latestResult: BiasResult | null }) => {
  const [stats, setStats] = useState<StatsData>({
    totalAnalyzed: 0,
    totalBiasesDetected: 0,
    byCategory: [
      { name: "Gender", value: 0 },
      { name: "Race", value: 0 },
      { name: "Political", value: 0 },
      { name: "Other", value: 0 },
    ],
    history: [],
    avgConfidence: 0,
  });

  useEffect(() => {
    if (latestResult) {
      setStats((prev) => {
        const newStats = { ...prev };
        newStats.totalAnalyzed += 1;
        newStats.totalBiasesDetected += latestResult.biasedWords.length;

        // Update category counts
        latestResult.biasedWords.forEach((bias) => {
          const category = newStats.byCategory.find((c) => c.name === bias.type);
          if (category) {
            category.value += 1;
          }
        });

        // Update history - keep last 10 data points
        const newDataPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          count: latestResult.biasedWords.length
        };
        newStats.history = [...prev.history, newDataPoint].slice(-10);

        // Calculate average confidence
        if (latestResult.biasedWords.length > 0) {
          const totalConfidence = latestResult.biasedWords.reduce((sum, b) => sum + b.confidence, 0);
          newStats.avgConfidence = totalConfidence / latestResult.biasedWords.length;
        }

        return newStats;
      });
    }
  }, [latestResult]);

  const COLORS = ["hsl(195, 100%, 50%)", "hsl(271, 81%, 56%)", "hsl(187, 100%, 42%)", "hsl(0, 84%, 60%)"];

  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-gradient">Analytics Dashboard</span>
        </h2>
        <p className="text-muted-foreground">Real-time bias detection statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm glow-blue">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="w-4 h-4" />
              Total Texts Analyzed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalAnalyzed}</div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              Biases Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.totalBiasesDetected}</div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm glow-purple">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <CheckCircle className="w-4 h-4" />
              Avg Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {(stats.avgConfidence * 100).toFixed(0)}%
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats.totalAnalyzed > 0 ? ((stats.totalBiasesDetected / stats.totalAnalyzed) * 100).toFixed(0) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Bias by Category</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.byCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => (value > 0 ? `${name}: ${value}` : "")}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(230, 30%, 10%)",
                    border: "1px solid hsl(195, 100%, 50%, 0.3)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Detection Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.history.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
                  <XAxis
                    dataKey="time"
                    stroke="hsl(215, 20%, 65%)"
                    tick={{ fill: "hsl(215, 20%, 65%)" }}
                  />
                  <YAxis 
                    stroke="hsl(215, 20%, 65%)" 
                    tick={{ fill: "hsl(215, 20%, 65%)" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(230, 30%, 10%)",
                      border: "1px solid hsl(195, 100%, 50%, 0.3)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(195, 100%, 50%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(195, 100%, 50%)", r: 5 }}
                    name="Biases Detected"
                    animationDuration={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No analysis data yet. Start detecting bias to see trends.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
