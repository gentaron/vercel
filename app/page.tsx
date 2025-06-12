"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Heart, Users, Trophy, Sword, ImageIcon, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PinkVoltageBio() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isQuoteChanging, setIsQuoteChanging] = useState(false)
  const [battleStats, setBattleStats] = useState({
    victories: 312,
    winRate: 92,
    defeats: 27,
    avgDuration: "5:42",
  })

  // Listen for battle stats updates
  useEffect(() => {
    const handleStatsUpdate = (event: CustomEvent) => {
      setBattleStats(event.detail)
    }

    window.addEventListener("battleStatsUpdate", handleStatsUpdate as EventListener)

    // Load initial stats from localStorage
    const savedStats = localStorage.getItem("battleStats")
    if (savedStats) {
      setBattleStats(JSON.parse(savedStats))
    }

    return () => {
      window.removeEventListener("battleStatsUpdate", handleStatsUpdate as EventListener)
    }
  }, [])

  const quotes = [
    "People of Gigapolis! Every one of you has the power to overcome any challenge. I'm proof of that!",
    "I was once just human, too. But I never gave up. I'm here now because I took that first step. You can, too.",
    "Gigapolis! Pink Voltage isn't stopping yet! Who's next!?",
    "If my fights ignite hearts, that's enough. NFTs, shirts, PINV—they spread my justice.",
    "For Gigapolis, for Ken and Rina, I'll crush it.",
    "I never gave up. I'm here now because I took that first step.",
    "Hey, big guy, bold move challenging me on a night like this.",
    "You think this'll break me!? I'm Pink Voltage!",
    "Every one of you has the strength to rise again.",
    "This city runs on souls like yours. I believe in you.",
  ]

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setIsQuoteChanging(true)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsQuoteChanging(false)
      }, 300)
    }, 4000)

    return () => clearInterval(quoteInterval)
  }, [quotes.length])

  const links = [
    {
      title: "Support on Patreon",
      description: "Exclusive content & behind the scenes",
      url: "https://www.patreon.com/apolon_org?utm_campaign=creatorshare_creator",
      icon: Heart,
      color: "bg-gradient-to-r from-orange-400 via-pink-500 to-red-500",
      glow: "shadow-orange-500/25",
    },
    {
      title: "Follow on Fanvue",
      description: "Latest updates & community",
      url: "https://www.fanvue.com/laylavirellnova",
      icon: Users,
      color: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
      glow: "shadow-purple-500/25",
    },
  ]

  const internalLinks = [
    {
      title: "Battle Results",
      description: "Complete battle history & statistics",
      href: "/battles",
      icon: Sword,
      color: "bg-gradient-to-r from-red-500 via-pink-500 to-purple-500",
      glow: "shadow-red-500/25",
    },
    {
      title: "Gallery",
      description: "Character artwork & moments",
      href: "/gallery",
      icon: ImageIcon,
      color: "bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500",
      glow: "shadow-blue-500/25",
    },
  ]

  const totalFights = battleStats.victories + battleStats.defeats

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse-slower" />
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/2 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl animate-float-fast" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        {/* Enhanced Profile Section */}
        <Card className="mb-8 bg-white/10 backdrop-blur-xl border border-pink-500/30 shadow-2xl shadow-pink-500/10 hover:shadow-pink-500/20 transition-all duration-500">
          <CardContent className="p-8 text-center">
            {/* Character Avatar */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 animate-pulse-glow" />
              <div className="absolute inset-1 rounded-full overflow-hidden border-4 border-white/20">
                <Image
                  src="/images/pink-voltage-avatar.png"
                  alt="Pink Voltage - Layla Virell Nova"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">3</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
              Pink Voltage
            </h1>
            <p className="text-pink-200 mb-2 font-semibold text-lg">Layla Virell Nova</p>
            <p className="text-gray-300 text-sm mb-6 flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              #3 Ranked Hero • Gigapolis Defender
            </p>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-pink-500/30 to-pink-600/20 rounded-xl p-4 border border-pink-400/20">
                <div className="text-pink-300 text-2xl font-bold">{battleStats.victories}</div>
                <div className="text-pink-200 text-xs font-medium">Victories</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-xl p-4 border border-blue-400/20">
                <div className="text-blue-300 text-2xl font-bold">{battleStats.winRate}%</div>
                <div className="text-blue-200 text-xs font-medium">Win Rate</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-xl p-4 border border-green-400/20">
                <div className="text-green-300 text-2xl font-bold">{totalFights}</div>
                <div className="text-green-200 text-xs font-medium">Total Fights</div>
              </div>
            </div>

            {/* Rotating Quote with Smooth Transition */}
            <div className="bg-black/20 rounded-lg p-4 mb-4 border border-white/10 min-h-[80px] flex items-center justify-center">
              <p
                className={`text-gray-300 text-sm italic transition-all duration-300 ${
                  isQuoteChanging ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
                }`}
              >
                "{quotes[currentQuote]}"
              </p>
            </div>

            {/* ESFP Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-400/30">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-200 text-sm font-medium">ESFP • Cybernetically Enhanced</span>
            </div>
          </CardContent>
        </Card>

        {/* Internal Navigation Links */}
        <div className="space-y-4 mb-8">
          {internalLinks.map((link, index) => (
            <Card
              key={index}
              className={`bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${link.glow} group`}
            >
              <CardContent className="p-0">
                <Link href={link.href} className="block p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-4 rounded-xl ${link.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <link.icon className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl group-hover:text-pink-300 transition-colors drop-shadow-sm">
                        {link.title}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">{link.description}</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-pink-300 transition-colors" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* External Links Section */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <Card
              key={index}
              className={`bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${link.glow} group`}
            >
              <CardContent className="p-0">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="block p-6">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-4 rounded-xl ${link.color} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <link.icon className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl group-hover:text-pink-300 transition-colors drop-shadow-sm">
                        {link.title}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">{link.description}</p>
                    </div>
                    <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-pink-300 transition-colors" />
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className="mt-8 text-center">
          <div className="bg-black/20 rounded-lg p-4 border border-white/10 mb-4">
            <p className="text-gray-400 text-sm mb-2">Cybernetically Enhanced • ESFP • Gigapolis Guardian</p>
            <p className="text-gray-500 text-xs">Rank #3 • 4 Quadrillion Citizens Protected</p>
          </div>
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping shadow-lg shadow-pink-500/50" />
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping animation-delay-300 shadow-lg shadow-blue-500/50" />
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping animation-delay-600 shadow-lg shadow-red-500/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
