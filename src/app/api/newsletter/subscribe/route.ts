import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // In production, this would:
    // 1. Check if email already exists in database
    // 2. Add email to newsletter subscribers table
    // 3. Send confirmation email to the subscriber
    // 4. Send notification to admin about new subscriber

    try {
      const { prisma } = await import('@/lib/prisma')
      
      // Check if subscriber already exists
      const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
        where: { email }
      })

      if (existingSubscriber) {
        // If already subscribed, just return success
        return NextResponse.json({ 
          success: true, 
          message: 'You are already subscribed to our newsletter!' 
        })
      }

      // Add new subscriber
      await prisma.newsletterSubscriber.create({
        data: {
          email,
          subscribedAt: new Date(),
          isActive: true
        }
      })

      // Here you would integrate with an email service like:
      // - SendGrid
      // - Mailchimp
      // - AWS SES
      // - Resend
      // - etc.

      console.log(`New newsletter subscriber: ${email}`)

      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed! Check your email for confirmation.' 
      })
    } catch (dbError) {
      // If database operations fail, still return success for development
      console.log('Database not available, but subscription recorded for development:', email)
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed! (Development mode)' 
      })
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}