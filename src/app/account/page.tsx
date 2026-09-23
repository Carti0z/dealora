'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, ShoppingBag, MapPin, CreditCard, Bell, LogOut, ArrowLeft, Loader2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccountPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status, router]);

  useEffect(() => {
    // Check for tab in URL query parameter
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const { prisma } = await import('@/lib/prisma');
      
      // Fetch user data
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
        include: {
          orders: {
            include: {
              items: {
                include: {
                  product: {
                    include: {
                      images: true
                    }
                  }
                }
              }
            },
            orderBy: { createdAt: 'desc' },
            take: 10
          },
          addresses: {
            orderBy: { isDefault: 'desc' }
          },
          paymentMethods: {
            orderBy: { isDefault: 'desc' }
          },
          notifications: {
            orderBy: { createdAt: 'desc' },
            take: 10
          }
        }
      });

      if (user) {
        setUserData(user);
        setOrders(user.orders || []);
        setAddresses(user.addresses || []);
        setPaymentMethods(user.paymentMethods || []);
        setNotifications(user.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement profile update logic
    alert('Profile update functionality coming soon!');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement password change logic
    alert('Password change functionality coming soon!');
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-500" />
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {userData?.name || session.user?.name || 'User'}!
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {userData?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || session.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={userData?.name?.split(' ')[0] || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={userData?.name?.split(' ')[1] || ''} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={session.user?.email || ''} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="" />
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No orders yet</p>
                    <Link href="/">
                      <Button className="mt-4">Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">Order #{order.orderNumber}</p>
                            <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'PROCESSING' ? 'bg-purple-100 text-purple-700' :
                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {order.items[0]?.product?.images[0] && (
                              <img 
                                src={order.items[0].product.images[0].url} 
                                alt="Product"
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            )}
                            <div>
                              <p className="text-sm font-medium">{order.items.length} items</p>
                              <p className="text-sm text-gray-500">${Number(order.total).toFixed(2)}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cart Tab */}
          <TabsContent value="cart">
            <Card>
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
                <CardDescription>View items in your cart</CardDescription>
              </CardHeader>
              <CardContent>
                {userData?.wishlist?.items && userData.wishlist.items.length > 0 ? (
                  <div className="space-y-4">
                    {userData.wishlist.items.map((item: any) => (
                      <div key={item.id} className="border rounded-lg p-4 flex items-center space-x-4">
                        {item.product?.images[0] && (
                          <img 
                            src={item.product.images[0].url} 
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.product?.name}</p>
                          <p className="text-sm text-gray-500">${Number(item.product?.price).toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-500">${(Number(item.product?.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>${userData.wishlist.items.reduce((sum: number, item: any) => sum + (Number(item.product?.price) * item.quantity), 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Your cart is empty</p>
                    <Link href="/">
                      <Button className="mt-4">Start Shopping</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your shipping addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {addresses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No saved addresses</p>
                    <Button className="mt-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add New Address
                    </Button>
                  </div>
                ) : (
                  <>
                    {addresses.map((address) => (
                      <div key={address.id} className={`border rounded-lg p-4 ${address.isDefault ? 'bg-orange-50 border-orange-200' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{address.fullName}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {address.addressLine1}<br />
                              {address.addressLine2 && <>{address.addressLine2}<br /></>}
                              {address.city}, {address.state} {address.postalCode}<br />
                              {address.country}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                          </div>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">Default</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Add New Address
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No saved payment methods</p>
                    <Button className="mt-4">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                ) : (
                  <>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className={`border rounded-lg p-4 ${method.isDefault ? 'bg-orange-50 border-orange-200' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-8 h-8 text-gray-600" />
                            <div>
                              <p className="font-semibold text-gray-900">{method.type} ending in {method.lastFour}</p>
                              {method.expiryDate && (
                                <p className="text-sm text-gray-500">Expires {new Date(method.expiryDate).toLocaleDateString()}</p>
                              )}
                            </div>
                          </div>
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">Default</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Order updates', desc: 'Get notified about your order status' },
                  { label: 'Promotional emails', desc: 'Receive deals and special offers' },
                  { label: 'New arrivals', desc: 'Be the first to know about new products' },
                  { label: 'Price drops', desc: 'Get alerts when items in your wishlist go on sale' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked={index < 2} className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="mt-2" />
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Update Password
                  </Button>
                </form>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-4">Danger Zone</h3>
                  <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
