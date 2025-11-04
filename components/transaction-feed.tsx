"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TransactionDetail } from "./transaction-detail"
import { AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react"

interface Transaction {
  id: string
  hash: string
  type: "sent" | "received"
  status: "safe" | "suspicious" | "blocked"
  from: string
  to: string
  value: string
  slippage: string
  timestamp: string
  riskScore: number
}

export function TransactionFeed() {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)

  const transactions: Transaction[] = [
    {
      id: "1",
      hash: "0x3f7a8b2c1e9d4a5f6b7c8d9e0f1a2b3c",
      type: "sent",
      status: "blocked",
      from: "0x742d35Cc...",
      to: "0x1234ab56...",
      value: "2.5 ETH",
      slippage: "15.2%",
      timestamp: "2 min ago",
      riskScore: 92,
    },
    {
      id: "2",
      hash: "0x5c2d1b8a9f4e7d3c6a5f8b1e4d2c9a7f",
      type: "received",
      status: "suspicious",
      from: "0x9876cd45...",
      to: "0x742d35Cc...",
      value: "5.0 ETH",
      slippage: "8.5%",
      timestamp: "5 min ago",
      riskScore: 65,
    },
    {
      id: "3",
      hash: "0x2e9d4a5f6b7c8d9e0f1a2b3c4d5e6f7a",
      type: "sent",
      status: "safe",
      from: "0x742d35Cc...",
      to: "0xabcdef12...",
      value: "1.0 ETH",
      slippage: "0.3%",
      timestamp: "12 min ago",
      riskScore: 8,
    },
    {
      id: "4",
      hash: "0x8a9f4e7d3c6a5f8b1e4d2c9a7f1b3e5d",
      type: "received",
      status: "safe",
      from: "0x4567ef89...",
      to: "0x742d35Cc...",
      value: "3.2 ETH",
      slippage: "0.1%",
      timestamp: "18 min ago",
      riskScore: 5,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "blocked":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case "suspicious":
        return <AlertCircle className="w-5 h-5 text-warning" />
      default:
        return <CheckCircle2 className="w-5 h-5 text-accent" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "blocked":
        return "bg-destructive/10 text-destructive border-destructive/30"
      case "suspicious":
        return "bg-warning/10 text-warning border-warning/30"
      default:
        return "bg-accent/10 text-accent border-accent/30"
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk >= 80) return "from-destructive to-warning"
    if (risk >= 50) return "from-warning to-secondary"
    return "from-accent to-secondary"
  }

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Real-Time Transaction Feed</CardTitle>
          <CardDescription>Monitored blockchain transactions with MEV attack detection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <button
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="w-full p-4 rounded-lg border border-border/50 hover:border-primary/50 bg-card hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  {/* Left Section */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-lg bg-muted">
                        {tx.type === "sent" ? (
                          <ArrowUpRight className="w-5 h-5 text-destructive" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-accent" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-semibold text-foreground">
                          {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                        </span>
                        {getStatusIcon(tx.status)}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {tx.value}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {tx.timestamp}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex items-center gap-4">
                    {/* Risk Score */}
                    <div className="flex flex-col items-end gap-1">
                      <div
                        className={`px-3 py-1 rounded-full bg-gradient-to-r ${getRiskColor(tx.riskScore)} text-xs font-semibold text-foreground`}
                      >
                        {tx.riskScore}%
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(tx.status)}`}>
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Modal */}
      {selectedTx && <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />}
    </>
  )
}
