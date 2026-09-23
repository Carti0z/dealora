'use client'

import { useState } from 'react'
import { Save, Store, CreditCard, Truck, Bell, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminSettings() {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('store')
  const [storeSettings, setStoreSettings] = useState({
    name: 'Dealora',
    email: 'contact@dealora.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    postalCode: '10001'
  })

  const [paymentSettings, setPaymentSettings] = useState({
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalSecret: ''
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '50',
    standardShippingRate: '9.99',
    expressShippingRate: '19.99'
  })

  const handleSave = async (section: string) => {
    setLoading(true)
    // TODO: Implement save logic
    setTimeout(() => {
      setLoading(false)
      alert(`${section} settings saved successfully`)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your store settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            Store
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Store Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={storeSettings.phone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={storeSettings.city}
                    onChange={(e) => setStoreSettings({ ...storeSettings, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input
                    value={storeSettings.state}
                    onChange={(e) => setStoreSettings({ ...storeSettings, state: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    value={storeSettings.country}
                    onChange={(e) => setStoreSettings({ ...storeSettings, country: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input
                    value={storeSettings.postalCode}
                    onChange={(e) => setStoreSettings({ ...storeSettings, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSave('Store')} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Settings</h2>
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-4">Stripe</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Public Key</Label>
                    <Input
                      type="password"
                      value={paymentSettings.stripePublicKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
                      placeholder="pk_live_..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secret Key</Label>
                    <Input
                      type="password"
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                      placeholder="sk_live_..."
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-4">PayPal</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Client ID</Label>
                    <Input
                      value={paymentSettings.paypalClientId}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secret</Label>
                    <Input
                      type="password"
                      value={paymentSettings.paypalSecret}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalSecret: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSave('Payment')} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Free Shipping Threshold ($)</Label>
                <Input
                  type="number"
                  value={shippingSettings.freeShippingThreshold}
                  onChange={(e) => setShippingSettings({ ...shippingSettings, freeShippingThreshold: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Standard Shipping Rate ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={shippingSettings.standardShippingRate}
                  onChange={(e) => setShippingSettings({ ...shippingSettings, standardShippingRate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Express Shipping Rate ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={shippingSettings.expressShippingRate}
                  onChange={(e) => setShippingSettings({ ...shippingSettings, expressShippingRate: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSave('Shipping')} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500" />
                <span>Order confirmation emails</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500" />
                <span>Shipping notification emails</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500" />
                <span>Low stock alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-orange-500" />
                <span>New order SMS notifications</span>
              </label>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleSave('Notifications')} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
