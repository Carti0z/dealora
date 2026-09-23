'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Filter, Tag, Percent, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function AdminPromotions() {
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/promotions')
      .then(res => res.json())
      .then(data => {
        setPromotions(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    scheduled: 'bg-blue-100 text-blue-700'
  }

  if (loading) {
    return <div className="p-6">Loading promotions...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-600 mt-2">Manage discounts and promotional campaigns</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add Promotion
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search promotions..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No promotions found. Create your first promotion to get started.
          </div>
        ) : (
          promotions.map((promotion: any) => (
            <Card key={promotion.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Tag className="w-6 h-6 text-orange-600" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[promotion.status]}`}>
                  {promotion.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{promotion.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  <span>
                    {promotion.type === 'percentage' ? `${promotion.value}% off` : 
                     promotion.type === 'free_shipping' ? 'Free Shipping' : 
                     `$${promotion.value} off`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{promotion.startDate} - {promotion.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Used {promotion.usageCount} times</span>
                </div>
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
