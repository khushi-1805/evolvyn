"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { Mempool } from "@/components/mempool"
import { Detection } from "@/components/detection"
import { Simulation } from "@/components/simulation"
import { Help } from "@/components/help"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnectWallet = async () => {
    // Simulate MetaMask connection
    setWalletAddress("0x742d35Cc6634C0532925a3b844Bc4e7595f42e")
    setWalletConnected(true)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Dashboard walletConnected={walletConnected} walletAddress={walletAddress} />
      case "mempool":
        return <Mempool />
      case "detection":
        return <Detection />
      case "simulation":
        return <Simulation />
      case "help":
        return <Help />
      default:
        return <Dashboard walletConnected={walletConnected} walletAddress={walletAddress} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
      />
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  )
}
