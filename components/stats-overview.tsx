"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, AlertTriangle, TrendingUp, Zap } from "lucide-react"

interface StatsOverviewProps {
  activeAlerts: number
  blockedValue: string
}

export function StatsOverview({ activeAlerts, blockedValue }: StatsOverviewProps) {
  const stats = [
    {
      label: "Active Alerts",
      value: activeAlerts,
      icon: AlertTriangle,
      color: "from-destructive to-warning",
      accent: "text-destructive",
    },
    {
      label: "Value Protected",
      value: blockedValue,
      icon: Shield,
      color: "from-accent to-secondary",
      accent: "text-accent",
    },
    {
      label: "Attacks Detected",
      value: "1,847",
      icon: Zap,
      color: "from-primary to-secondary",
      accent: "text-primary",
    },
    {
      label: "Success Rate",
      value: "99.8%",
      icon: TrendingUp,
      color: "from-accent to-secondary",
      accent: "text-accent",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon size={20} className="text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
