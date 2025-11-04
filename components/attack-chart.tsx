"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

export function AttackChart() {
  const data = [
    { time: "12 AM", attacks: 12 },
    { time: "4 AM", attacks: 8 },
    { time: "8 AM", attacks: 24 },
    { time: "12 PM", attacks: 18 },
    { time: "4 PM", attacks: 35 },
    { time: "8 PM", attacks: 28 },
    { time: "12 AM", attacks: 15 },
  ]

  return (
    <Card className="border-border/50 h-full">
      <CardHeader>
        <CardTitle>Attack Frequency</CardTitle>
        <CardDescription>24-hour detection pattern</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: "12px" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="attacks" fill="var(--color-primary)" radius={[8, 8, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
