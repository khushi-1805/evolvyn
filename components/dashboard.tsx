"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TransactionFeed } from "./transaction-feed"
import { AttackChart } from "./attack-chart"
import { StatsOverview } from "./stats-overview"
import { AlertCircle, TrendingUp } from "lucide-react"

interface DashboardProps {
  walletConnected: boolean
  walletAddress: string
}

export function Dashboard({ walletConnected, walletAddress }: DashboardProps) {
  const [activeAlerts, setActiveAlerts] = useState(12)
  const [blockedValue, setBlockedValue] = useState("$2.3M")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">MEV Detection Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring and protection against blockchain attacks</p>
      </div>

      {/* Alert Banner */}
      {walletConnected && (
        <Card className="mb-8 border-primary/50 bg-primary/5 animate-pulse-glow">
          <CardContent className="pt-6 flex items-center gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Wallet Protected</h3>
              <p className="text-sm text-muted-foreground">
                Your wallet is actively monitored. {activeAlerts} potential threats detected and blocked today.
              </p>
            </div>
            <TrendingUp className="w-5 h-5 text-accent" />
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <StatsOverview activeAlerts={activeAlerts} blockedValue={blockedValue} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Transaction Feed - Wider */}
        <div className="lg:col-span-2">
          <TransactionFeed />
        </div>

        {/* Attack Chart */}
        <div>
          <AttackChart />
        </div>
      </div>
    </div>
  )
}
