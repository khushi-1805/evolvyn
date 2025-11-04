"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, AlertTriangle, CheckCircle2 } from "lucide-react"

export function Simulation() {
  const [txInput, setTxInput] = useState("")
  const [simResult, setSimResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSimulate = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSimResult({
        riskScore: Math.floor(Math.random() * 100),
        frontRunRisk: Math.random() > 0.5,
        sandwichRisk: Math.random() > 0.6,
        estimatedLoss: (Math.random() * 5).toFixed(2),
        recommendation: Math.random() > 0.5 ? "safe" : "risky",
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">MEV Simulation</h1>
        <p className="text-muted-foreground">Test custom transactions for potential MEV attack risks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Analyze Transaction</CardTitle>
              <CardDescription>Enter transaction data or paste hex code</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transaction Input</label>
                <textarea
                  value={txInput}
                  onChange={(e) => setTxInput(e.target.value)}
                  placeholder="Paste transaction hex or JSON data..."
                  className="w-full h-32 p-3 rounded-lg bg-muted border border-border/50 text-foreground font-mono text-sm resize-none focus:outline-none focus:border-primary/50"
                />
              </div>

              <Button
                onClick={handleSimulate}
                disabled={!txInput.trim() || loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50"
              >
                <Zap size={16} className="mr-2" />
                {loading ? "Simulating..." : "Run Simulation"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div>
          {simResult ? (
            <Card className="border-border/50 bg-card animate-pulse-glow">
              <CardHeader>
                <CardTitle className="text-lg">Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Risk Score */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Risk Score</p>
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${
                      simResult.riskScore >= 70
                        ? "from-destructive to-warning"
                        : simResult.riskScore >= 40
                          ? "from-warning to-secondary"
                          : "from-accent to-secondary"
                    }`}
                  >
                    <p className="text-2xl font-bold text-foreground">{simResult.riskScore}%</p>
                  </div>
                </div>

                {/* Risks */}
                <div className="space-y-2">
                  {simResult.frontRunRisk && (
                    <div className="flex items-center gap-2 p-2 rounded bg-destructive/10 border border-destructive/30">
                      <AlertTriangle size={16} className="text-destructive flex-shrink-0" />
                      <span className="text-sm text-destructive">Front-running Risk</span>
                    </div>
                  )}
                  {simResult.sandwichRisk && (
                    <div className="flex items-center gap-2 p-2 rounded bg-warning/10 border border-warning/30">
                      <AlertTriangle size={16} className="text-warning flex-shrink-0" />
                      <span className="text-sm text-warning">Sandwich Risk</span>
                    </div>
                  )}
                  {!simResult.frontRunRisk && !simResult.sandwichRisk && (
                    <div className="flex items-center gap-2 p-2 rounded bg-accent/10 border border-accent/30">
                      <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-accent">Safe Transaction</span>
                    </div>
                  )}
                </div>

                {/* Loss Estimate */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Est. Potential Loss</p>
                  <p className="text-lg font-bold text-foreground">${simResult.estimatedLoss} ETH</p>
                </div>

                {/* Recommendation */}
                <Badge
                  className={
                    simResult.recommendation === "safe"
                      ? "bg-accent/20 text-accent w-full justify-center py-2"
                      : "bg-destructive/20 text-destructive w-full justify-center py-2"
                  }
                >
                  {simResult.recommendation === "safe"
                    ? "Recommended to Execute"
                    : "High Risk - Consider Reconsidering"}
                </Badge>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50 h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Enter transaction data to begin simulation</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
