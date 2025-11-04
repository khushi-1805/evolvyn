"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ExternalLink, Copy, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface TransactionDetailProps {
  transaction: any
  onClose: () => void
}

export function TransactionDetail({ transaction, onClose }: TransactionDetailProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const riskFactors = [
    { factor: "High Slippage", risk: "high", reason: "15.2% exceeds normal range" },
    { factor: "Front-running Pattern", risk: "high", reason: "Similar to recent sandwich attacks" },
    { factor: "Mempool Position", risk: "medium", reason: "High gas price bidders detected" },
    { factor: "Destination Address", risk: "low", reason: "Known router contract" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border-border/50 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors z-10"
        >
          <X size={20} />
        </button>

        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Complete analysis and risk assessment</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Transaction Hash */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Transaction Hash</h3>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <code className="flex-1 font-mono text-sm text-foreground break-all">{transaction.hash}</code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(transaction.hash)}
                className="flex-shrink-0"
              >
                {copied ? "Copied!" : <Copy size={16} />}
              </Button>
            </div>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">From</p>
              <p className="font-mono text-sm text-foreground">{transaction.from}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">To</p>
              <p className="font-mono text-sm text-foreground">{transaction.to}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Value</p>
              <p className="font-semibold text-foreground">{transaction.value}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge
                className={
                  transaction.status === "safe" ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                }
              >
                {transaction.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Risk Assessment */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Risk Assessment</h3>
            <div className="space-y-2">
              {riskFactors.map((factor, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-muted border border-border/50 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {factor.risk === "high" && <AlertTriangle className="w-5 h-5 text-destructive" />}
                    {factor.risk === "medium" && <AlertTriangle className="w-5 h-5 text-warning" />}
                    {factor.risk === "low" && <CheckCircle2 className="w-5 h-5 text-accent" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">{factor.factor}</p>
                    <p className="text-xs text-muted-foreground">{factor.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              <ExternalLink size={16} className="mr-2" />
              View on Etherscan
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
