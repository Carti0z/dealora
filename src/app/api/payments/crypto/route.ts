import { NextRequest, NextResponse } from 'next/server'
import { cryptoPaymentService, formatCryptoAmount, getCurrencyIcon } from '@/lib/crypto-payment'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { currency, amount } = body

    if (!currency || !amount) {
      return NextResponse.json({ error: 'Currency and amount are required' }, { status: 400 })
    }

    if (!['BTC', 'ETH', 'USDT'].includes(currency)) {
      return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })
    }

    const paymentDetails = cryptoPaymentService.generatePaymentDetails(
      currency as 'BTC' | 'ETH' | 'USDT',
      amount
    )

    return NextResponse.json({
      success: true,
      paymentDetails: {
        ...paymentDetails,
        formattedAmount: formatCryptoAmount(paymentDetails.amount, paymentDetails.currency),
        icon: getCurrencyIcon(paymentDetails.currency)
      }
    })
  } catch (error) {
    console.error('Crypto payment generation error:', error)
    return NextResponse.json({ error: 'Failed to generate payment details' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supportedCurrencies = cryptoPaymentService.getSupportedCurrencies()
    
    return NextResponse.json({
      success: true,
      currencies: supportedCurrencies
    })
  } catch (error) {
    console.error('Get supported currencies error:', error)
    return NextResponse.json({ error: 'Failed to get supported currencies' }, { status: 500 })
  }
}