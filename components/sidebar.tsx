"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Zap, Radio, Microscope, HelpCircle, Wallet, Menu, X } from "lucide-react"

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  walletConnected: boolean
  walletAddress: string
  onConnectWallet: () => void
}

export function Sidebar({ currentPage, onNavigate, walletConnected, walletAddress, onConnectWallet }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "mempool", label: "Mempool", icon: Radio },
    { id: "detection", label: "Detection", icon: Zap },
    { id: "simulation", label: "Simulation", icon: Microscope },
    { id: "help", label: "Help", icon: HelpCircle },
  ]

  const handleNavigate = (page: string) => {
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-sidebar hover:bg-muted transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed md:static z-40 w-64 h-screen bg-sidebar border-r border-sidebar-border
        transition-transform duration-300 md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col overflow-y-auto
      `}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">MEV Sentinel</h1>
              <p className="text-xs text-muted-foreground">Attack Detection</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                    : "text-sidebar-foreground hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Wallet Connection Section */}
        <div className="p-4 space-y-3 border-t border-sidebar-border">
          {walletConnected ? (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={16} className="text-accent" />
                <span className="text-xs font-semibold text-accent">Connected</span>
              </div>
              <p className="text-xs text-sidebar-foreground font-mono break-all">
                {walletAddress.slice(0, 10)}...{walletAddress.slice(-8)}
              </p>
            </div>
          ) : (
            <Button
              onClick={onConnectWallet}
              className="w-full gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Wallet size={16} />
              Connect Wallet
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">v1.0.0 • Real-time MEV Detection</p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
