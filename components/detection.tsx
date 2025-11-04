"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function Detection() {
  const detectionData = [
    { hour: "12 AM", front_run: 8, sandwich: 4, flash_loan: 2 },
    { hour: "3 AM", front_run: 5, sandwich: 3, flash_loan: 1 },
    { hour: "6 AM", front_run: 12, sandwich: 8, flash_loan: 3 },
    { hour: "9 AM", front_run: 15, sandwich: 10, flash_loan: 4 },
    { hour: "12 PM", front_run: 28, sandwich: 18, flash_loan: 7 },
    { hour: "3 PM", front_run: 35, sandwich: 22, flash_loan: 9 },
    { hour: "6 PM", front_run: 30, sandwich: 20, flash_loan: 8 },
    { hour: "9 PM", front_run: 22, sandwich: 15, flash_loan: 6 },
  ]

  const attackTypes = [
    { name: "Front-Running", count: 342, color: "text-destructive" },
    { name: "Sandwich Attacks", count: 186, color: "text-warning" },
    { name: "Flash Loans", count: 54, color: "text-primary" },
    { name: "Slippage Exploit", count: 29, color: "text-secondary" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Attack Detection Analysis</h1>
        <p className="text-muted-foreground">Comprehensive MEV and sandwich attack detection metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {attackTypes.map((type) => (
          <Card key={type.name} className="border-border/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{type.name}</p>
              <div className="flex items-end justify-between">
                <span className={`text-2xl font-bold ${type.color}`}>{type.count}</span>
                <Badge variant="outline">Today</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Attack Type Distribution (24h)</CardTitle>
          <CardDescription>Hourly breakdown of detected MEV attacks</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={detectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFrontRun" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-destructive)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-destructive)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSandwich" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="front_run"
                  stackId="1"
                  stroke="var(--color-destructive)"
                  fill="url(#colorFrontRun)"
                />
                <Area
                  type="monotone"
                  dataKey="sandwich"
                  stackId="1"
                  stroke="var(--color-warning)"
                  fill="url(#colorSandwich)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
