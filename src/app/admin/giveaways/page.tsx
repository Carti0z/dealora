'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Gift, Users, Calendar, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function AdminGiveaways() {
  const [giveaways, setGiveaways] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/giveaways')
      .then(res => res.json())
      .then(data => {
        setGiveaways(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    scheduled: 'bg-blue-100 text-blue-700'
  }

  if (loading) {
    return <div className="p-6">Loading giveaways...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Giveaways</h1>
          <p className="text-gray-600 mt-2">Manage promotional giveaways and contests</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Create Giveaway
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search giveaways..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Giveaways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giveaways.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No giveaways found. Create your first giveaway to get started.
          </div>
        ) : (
          giveaways.map((giveaway: any) => (
            <Card key={giveaway.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[giveaway.status]}`}>
                  {giveaway.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{giveaway.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Prize: {giveaway.prize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{giveaway.startDate} - {giveaway.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{giveaway.entries} entries</span>
                </div>
                {giveaway.winner && (
                  <div className="flex items-center gap-2 text-green-600">
                    <span>Winner: {giveaway.winner}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
