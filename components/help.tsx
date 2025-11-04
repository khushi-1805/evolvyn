"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, BookOpen } from "lucide-react"

export function Help() {
  const faqs = [
    {
      question: "What is MEV and why should I care?",
      answer:
        "Maximal Extractable Value (MEV) refers to profit that miners/validators can extract by reordering transactions in a block. Sandwich attacks and front-running can cause significant losses.",
    },
    {
      question: "How does MEV Sentinel protect me?",
      answer:
        "Our platform monitors the mempool in real-time, analyzes transaction patterns, detects suspicious behavior, and alerts you before attacks happen.",
    },
    {
      question: "What is a sandwich attack?",
      answer:
        "A sandwich attack occurs when a bot places a transaction before yours (front-running) and after yours (back-running) to profit from price movements caused by your trade.",
    },
    {
      question: "Can I use this with any wallet?",
      answer:
        "Yes! MEV Sentinel is compatible with MetaMask, WalletConnect, and other Web3 wallets. Simply connect your wallet to get started.",
    },
  ]

  const metrics = [
    { label: "Attacks Prevented", value: "12,847", color: "text-accent" },
    { label: "Value Protected", value: "$45.2M", color: "text-primary" },
    { label: "Detection Accuracy", value: "99.8%", color: "text-secondary" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Help & Documentation</h1>
        <p className="text-muted-foreground">Learn about MEV attacks and how to protect yourself</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-border/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card className="border-border/50 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-border/50 pb-4 last:border-0">
              <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Resources & Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all cursor-pointer">
            <h4 className="font-semibold text-foreground mb-1">Getting Started Guide</h4>
            <p className="text-sm text-muted-foreground">
              Learn the basics of MEV Sentinel and how to set up your first wallet.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all cursor-pointer">
            <h4 className="font-semibold text-foreground mb-1">Attack Types Deep Dive</h4>
            <p className="text-sm text-muted-foreground">
              Comprehensive guide to MEV attacks, sandwich attacks, and flash loans.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all cursor-pointer">
            <h4 className="font-semibold text-foreground mb-1">Best Practices</h4>
            <p className="text-sm text-muted-foreground">
              Tips and strategies to minimize your MEV exposure and protect your assets.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
