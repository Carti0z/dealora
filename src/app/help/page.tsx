'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HelpCircle, Search, Phone, Mail, MessageSquare, Package, CreditCard, Truck, RefreshCw, User, Tag } from 'lucide-react';
import Link from 'next/link';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'returns', name: 'Returns', icon: RefreshCw },
    { id: 'account', name: 'Account', icon: User },
  ];

  const faqs = [
    {
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'You can track your order by visiting the Track Order page and entering your order number. You can also view your order status in your account under the Orders tab.',
    },
    {
      category: 'orders',
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 1 hour of placing them. After that, please contact our customer support team for assistance.',
    },
    {
      category: 'shipping',
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight shipping (1 business day). Shipping costs vary based on your location and chosen method.',
    },
    {
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping times and costs vary by destination.',
    },
    {
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency (Bitcoin, Ethereum, USDT, USDC).',
    },
    {
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your payment information. We are PCI compliant and SSL secured.',
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some items like final sale or personalized products cannot be returned.',
    },
    {
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'You can initiate a return from your account under the Orders tab, or contact our customer support team for assistance.',
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page and enter your email address. You will receive a password reset link via email.',
    },
    {
      category: 'account',
      question: 'How do I update my account information?',
      answer: 'Log in to your account and navigate to the Profile tab. You can update your name, email, phone number, and other personal information there.',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            ← Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
          <p className="text-gray-600 mt-2">Find answers to common questions or contact our support team</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className={activeCategory === category.id 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border-0' 
                : ''
              }
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No results found. Try a different search term or category.</p>
              </CardContent>
            </Card>
          ) : (
            filteredFaqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                Phone Support
              </CardTitle>
              <CardDescription>Call us for immediate assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">1-800-DEALORA</p>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri: 9AM - 6PM EST</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                Email Support
              </CardTitle>
              <CardDescription>We'll respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-gray-900">support@dealora.com</p>
              <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                Live Chat
              </CardTitle>
              <CardDescription>Chat with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Start Chat
              </Button>
              <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}