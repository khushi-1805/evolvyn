"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

export function Mempool() {
  const mempoolStats = [
    { label: "Pending Transactions", value: "14,582", trend: "+12%" },
    { label: "Avg Gas Price", value: "42 Gwei", trend: "-5%" },
    { label: "MEV Bots Active", value: "287", trend: "+8%" },
    { label: "Sandwich Attempts", value: "43", trend: "+22%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mempool Monitor</h1>
        <p className="text-muted-foreground">Real-time mempool activity and MEV bot detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mempoolStats.map((stat) => (
          <Card key={stat.label} className="border-border/50 hover:border-primary/50 transition-all">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <Badge variant="outline" className="text-accent">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Top MEV Threats
          </CardTitle>
          <CardDescription>Currently active sandwich attack patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">Threat #{item}</span>
                  <Badge variant="outline" className="text-destructive">
                    High Risk
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  MEV bot pattern detected: ${(Math.random() * 1000000) | 0} estimated extraction
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
