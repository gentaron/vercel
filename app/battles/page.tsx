"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Trophy, Clock, Target, Zap, MapPin, Calendar, Plus, Edit, Trash2, Save, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Battle {
  id: number
  date: string
  opponent: string
  result: "Victory" | "Loss"
  method: string
  duration: string
  location: string
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme" | "Legendary"
}

export default function BattleResults() {
  const [battles, setBattles] = useState<Battle[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newBattle, setNewBattle] = useState<Omit<Battle, "id">>({
    date: "",
    opponent: "",
    result: "Victory",
    method: "",
    duration: "",
    location: "",
    difficulty: "Medium",
  })

  const battleMethods = [
    "Thunder Punch",
    "Jet Kick",
    "Nanofiber Shockwave",
    "Electrified Strike",
    "Plasma Burst",
    "Electric Shock Strike",
    "Punch-Kick Combo",
    "Device Destruction Kick",
    "Nanofiber Punch",
    "Psychic Humiliation",
    "Lightning Strike",
    "System Hack",
    "Dimensional Punch",
    "Speed Blitz",
    "Counter Shock",
    "EMP Burst",
    "Mental Barrier",
    "Neural Override",
    "Power Surge",
    "Team Coordination",
  ]

  // Load battles from localStorage on mount
  useEffect(() => {
    const savedBattles = localStorage.getItem("battles")
    if (savedBattles) {
      setBattles(JSON.parse(savedBattles))
    } else {
      // Default battles
      const defaultBattles: Battle[] = [
        {
          id: 1,
          date: "2025-06-10",
          opponent: "Slime Vanguard",
          result: "Victory",
          method: "Thunder Punch",
          duration: "6:15",
          location: "Undercity Plaza",
          difficulty: "Hard",
        },
        {
          id: 2,
          date: "2025-06-02",
          opponent: "Neon Stalker",
          result: "Victory",
          method: "Jet Kick",
          duration: "3:50",
          location: "Slum Alley",
          difficulty: "Medium",
        },
        {
          id: 3,
          date: "2025-05-28",
          opponent: "Cyber Wraith",
          result: "Victory",
          method: "Nanofiber Shockwave",
          duration: "5:10",
          location: "Industrial District",
          difficulty: "Hard",
        },
        {
          id: 4,
          date: "2025-04-03",
          opponent: "Slime Entity",
          result: "Loss",
          method: "Psychic Humiliation",
          duration: "9:15",
          location: "Underground Arena",
          difficulty: "Legendary",
        },
      ]
      setBattles(defaultBattles)
      localStorage.setItem("battles", JSON.stringify(defaultBattles))
    }
  }, [])

  // Calculate and update stats whenever battles change
  useEffect(() => {
    const victories = battles.filter((b) => b.result === "Victory").length
    const defeats = battles.filter((b) => b.result === "Loss").length
    const totalFights = battles.length
    const winRate = totalFights > 0 ? Math.round((victories / totalFights) * 100) : 0

    // Calculate average duration
    const totalSeconds = battles.reduce((acc, battle) => {
      const [minutes, seconds] = battle.duration.split(":").map(Number)
      return acc + minutes * 60 + seconds
    }, 0)
    const avgSeconds = totalFights > 0 ? Math.round(totalSeconds / totalFights) : 0
    const avgMinutes = Math.floor(avgSeconds / 60)
    const remainingSeconds = avgSeconds % 60
    const avgDuration = `${avgMinutes}:${remainingSeconds.toString().padStart(2, "0")}`

    const stats = {
      victories,
      winRate,
      defeats,
      avgDuration,
    }

    // Save to localStorage
    localStorage.setItem("battleStats", JSON.stringify(stats))

    // Dispatch event to update main page
    window.dispatchEvent(new CustomEvent("battleStatsUpdate", { detail: stats }))
  }, [battles])

  const saveBattles = (newBattles: Battle[]) => {
    setBattles(newBattles)
    localStorage.setItem("battles", JSON.stringify(newBattles))
  }

  const addBattle = () => {
    if (!newBattle.opponent || !newBattle.date || !newBattle.method || !newBattle.duration || !newBattle.location) {
      return
    }

    const battle: Battle = {
      ...newBattle,
      id: Date.now(),
    }

    saveBattles([battle, ...battles])
    setNewBattle({
      date: "",
      opponent: "",
      result: "Victory",
      method: "",
      duration: "",
      location: "",
      difficulty: "Medium",
    })
    setShowAddForm(false)
  }

  const updateBattle = (id: number, updatedBattle: Partial<Battle>) => {
    const newBattles = battles.map((battle) => (battle.id === id ? { ...battle, ...updatedBattle } : battle))
    saveBattles(newBattles)
    setEditingId(null)
  }

  const deleteBattle = (id: number) => {
    const newBattles = battles.filter((battle) => battle.id !== id)
    saveBattles(newBattles)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-500/20 border-green-400/30"
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-400/30"
      case "Hard":
        return "text-orange-400 bg-orange-500/20 border-orange-400/30"
      case "Extreme":
        return "text-red-400 bg-red-500/20 border-red-400/30"
      case "Legendary":
        return "text-purple-400 bg-purple-500/20 border-purple-400/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-400/30"
    }
  }

  const getResultColor = (result: string) => {
    return result === "Victory" ? "text-green-400 bg-green-500/20" : "text-red-400 bg-red-500/20"
  }

  const victories = battles.filter((b) => b.result === "Victory").length
  const defeats = battles.filter((b) => b.result === "Loss").length
  const totalFights = battles.length
  const winRate = totalFights > 0 ? Math.round((victories / totalFights) * 100) : 0

  const totalSeconds = battles.reduce((acc, battle) => {
    const [minutes, seconds] = battle.duration.split(":").map(Number)
    return acc + minutes * 60 + seconds
  }, 0)
  const avgSeconds = totalFights > 0 ? Math.round(totalSeconds / totalFights) : 0
  const avgMinutes = Math.floor(avgSeconds / 60)
  const remainingSeconds = avgSeconds % 60
  const avgDuration = `${avgMinutes}:${remainingSeconds.toString().padStart(2, "0")}`

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_50%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse-slower" />
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Profile
          </Link>

          <Card className="bg-white/10 backdrop-blur-xl border border-pink-500/30 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-between items-center mb-4">
                <CardTitle className="text-4xl font-bold text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
                  Battle Results
                </CardTitle>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Battle
                </Button>
              </div>
              <p className="text-gray-300 mt-2">Complete combat history of Pink Voltage</p>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-green-500/20 rounded-lg p-4 border border-green-400/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 text-2xl font-bold">{victories}</span>
                  </div>
                  <div className="text-green-200 text-sm">Total Victories</div>
                </div>
                <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-300 text-2xl font-bold">{winRate}%</span>
                  </div>
                  <div className="text-blue-200 text-sm">Win Rate</div>
                </div>
                <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-400/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300 text-2xl font-bold">{defeats}</span>
                  </div>
                  <div className="text-purple-200 text-sm">Defeats</div>
                </div>
                <div className="bg-orange-500/20 rounded-lg p-4 border border-orange-400/20">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    <span className="text-orange-300 text-2xl font-bold">{avgDuration}</span>
                  </div>
                  <div className="text-orange-200 text-sm">Avg Duration</div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Add Battle Form */}
        {showAddForm && (
          <Card className="mb-8 bg-white/10 backdrop-blur-xl border border-pink-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Add New Battle
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date" className="text-white">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newBattle.date}
                  onChange={(e) => setNewBattle({ ...newBattle, date: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="opponent" className="text-white">
                  Opponent
                </Label>
                <Input
                  id="opponent"
                  value={newBattle.opponent}
                  onChange={(e) => setNewBattle({ ...newBattle, opponent: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Enemy name"
                />
              </div>
              <div>
                <Label htmlFor="result" className="text-white">
                  Result
                </Label>
                <Select
                  value={newBattle.result}
                  onValueChange={(value: "Victory" | "Loss") => setNewBattle({ ...newBattle, result: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Victory">Victory</SelectItem>
                    <SelectItem value="Loss">Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="method" className="text-white">
                  Method
                </Label>
                <Select
                  value={newBattle.method}
                  onValueChange={(value) => setNewBattle({ ...newBattle, method: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {battleMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration" className="text-white">
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={newBattle.duration}
                  onChange={(e) => setNewBattle({ ...newBattle, duration: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="MM:SS"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-white">
                  Location
                </Label>
                <Input
                  id="location"
                  value={newBattle.location}
                  onChange={(e) => setNewBattle({ ...newBattle, location: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Battle location"
                />
              </div>
              <div>
                <Label htmlFor="difficulty" className="text-white">
                  Difficulty
                </Label>
                <Select
                  value={newBattle.difficulty}
                  onValueChange={(value: any) => setNewBattle({ ...newBattle, difficulty: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                    <SelectItem value="Extreme">Extreme</SelectItem>
                    <SelectItem value="Legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <Button
                  onClick={addBattle}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Battle
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Battle History */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {battles.map((battle) => (
            <BattleCard
              key={battle.id}
              battle={battle}
              isEditing={editingId === battle.id}
              onEdit={() => setEditingId(battle.id)}
              onSave={(updatedBattle) => updateBattle(battle.id, updatedBattle)}
              onCancel={() => setEditingId(null)}
              onDelete={() => deleteBattle(battle.id)}
              getDifficultyColor={getDifficultyColor}
              getResultColor={getResultColor}
              battleMethods={battleMethods}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">Total battles: {totalFights}</p>
        </div>
      </div>
    </div>
  )
}

interface BattleCardProps {
  battle: Battle
  isEditing: boolean
  onEdit: () => void
  onSave: (battle: Partial<Battle>) => void
  onCancel: () => void
  onDelete: () => void
  getDifficultyColor: (difficulty: string) => string
  getResultColor: (result: string) => string
  battleMethods: string[]
}

function BattleCard({
  battle,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  getDifficultyColor,
  getResultColor,
  battleMethods,
}: BattleCardProps) {
  const [editData, setEditData] = useState(battle)

  const handleSave = () => {
    onSave(editData)
  }

  if (isEditing) {
    return (
      <Card className="bg-white/10 backdrop-blur-xl border border-pink-500/30">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Edit Battle</h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onCancel} className="text-gray-400 hover:text-white">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              value={editData.opponent}
              onChange={(e) => setEditData({ ...editData, opponent: e.target.value })}
              className="bg-white/10 border-white/20 text-white text-sm"
              placeholder="Opponent"
            />
            <Input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
              className="bg-white/10 border-white/20 text-white text-sm"
            />
            <Select
              value={editData.result}
              onValueChange={(value: "Victory" | "Loss") => setEditData({ ...editData, result: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Victory">Victory</SelectItem>
                <SelectItem value="Loss">Loss</SelectItem>
              </SelectContent>
            </Select>
            <Select value={editData.method} onValueChange={(value) => setEditData({ ...editData, method: value })}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {battleMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={editData.duration}
              onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
              className="bg-white/10 border-white/20 text-white text-sm"
              placeholder="Duration (MM:SS)"
            />
            <Input
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              className="bg-white/10 border-white/20 text-white text-sm"
              placeholder="Location"
            />
            <Select
              value={editData.difficulty}
              onValueChange={(value: any) => setEditData({ ...editData, difficulty: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Extreme">Extreme</SelectItem>
                <SelectItem value="Legendary">Legendary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{battle.opponent}</h3>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getResultColor(battle.result)}`}>
              {battle.result}
            </div>
            <Button size="sm" variant="ghost" onClick={onEdit} className="text-gray-400 hover:text-white p-1">
              <Edit className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onDelete} className="text-red-400 hover:text-red-300 p-1">
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">{battle.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gray-400" />
            <span className="text-white font-medium">{battle.method}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-white">{battle.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-white">{battle.location}</span>
          </div>
        </div>

        <div className="mt-4">
          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(battle.difficulty)}`}
          >
            {battle.difficulty}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
