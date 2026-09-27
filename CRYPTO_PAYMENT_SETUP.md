# Cryptocurrency Payment Setup Guide

This guide explains how to configure and use the cryptocurrency payment system for Bitcoin (BTC), Ethereum (ETH), and Tether (USDT).

## Supported Cryptocurrencies

- **Bitcoin (BTC)** - The original cryptocurrency
- **Ethereum (ETH)** - Smart contract platform
- **Tether (USDT)** - Stablecoin pegged to USD

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
# Bitcoin Configuration
BTC_WALLET_ADDRESS="your_bitcoin_wallet_address"
BTC_NETWORK="testnet"  # Change to 'bitcoin' for production

# Ethereum Configuration  
ETH_WALLET_ADDRESS="your_ethereum_wallet_address"
ETH_NETWORK="sepolia"  # Change to 'ethereum' for production

# USDT Configuration
USDT_WALLET_ADDRESS="your_usdt_wallet_address"
USDT_NETWORK="ethereum"  # Options: ethereum, tron, bsc
```

### Getting Wallet Addresses

#### Bitcoin Wallet
1. Create a wallet at [blockchain.com](https://blockchain.com) or use existing
2. Get your receiving address
3. For production, consider using a payment processor like [BitPay](https://bitpay.com)

#### Ethereum Wallet
1. Create a wallet at [metamask.io](https://metamask.io)
2. Get your ETH address
3. For production, consider using [Coinbase Commerce](https://commerce.coinbase.com)

#### USDT Wallet
USDT exists on multiple networks:
- **Ethereum**: Same address as ETH wallet
- **Tron**: Need TRON wallet
- **BSC**: Need BSC wallet

## Payment Flow

1. **Customer selects crypto payment** in checkout
2. **System generates payment details**:
   - Calculates crypto amount based on current conversion rates
   - Provides wallet address
   - Generates QR code
3. **Customer sends crypto** to provided address
4. **System monitors blockchain** for transaction
5. **Payment confirmed** → Order status updated

## Conversion Rates

The system uses static conversion rates for development. For production:

### Real-time Rate Integration

Update the `updateConversionRates()` method in `src/lib/crypto-payment.ts` to fetch real rates:

```typescript
async updateConversionRates(): Promise<void> {
  try {
    // Fetch Bitcoin price
    const btcResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const btcData = await btcResponse.json();
    
    // Fetch Ethereum price
    const ethResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const ethData = await ethResponse.json();
    
    // Update rates
    this.config.BTC.conversionRate = 1 / btcData.bitcoin.usd;
    this.config.ETH.conversionRate = 1 / ethData.ethereum.usd;
    // USDT stays at 1:1 with USD
  } catch (error) {
    console.error('Failed to update conversion rates:', error);
  }
}
```

### Rate Update Schedule

Call `updateConversionRates()` periodically:
- Every 5 minutes for high-volume sites
- Every 15 minutes for moderate volume
- Every hour for low volume

## Blockchain Integration

### Bitcoin Blockchain Monitoring

Use blockchain explorer APIs:
- **Blockchain.info**: `https://blockchain.info/rawtx/{tx_hash}`
- **Blockcypher**: `https://api.blockcypher.com/v1/btc/main/txs/{tx_hash}`

### Ethereum Blockchain Monitoring

Use Etherscan API:
- **Etherscan**: `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash={tx_hash}`

### Transaction Verification

Implement in `validatePayment()` method:

```typescript
async validatePayment(currency: string, expectedAmount: number, transactionHash: string) {
  if (currency === 'BTC') {
    const response = await fetch(`https://blockchain.info/rawtx/${transactionHash}`);
    const txData = await response.json();
    
    // Verify amount and address
    const outputs = txData.out;
    const matchingOutput = outputs.find((out: any) => 
      out.addr === this.config.BTC.address
    );
    
    if (matchingOutput && matchingOutput.value >= expectedAmount * 100000000) { // Convert BTC to satoshis
      return { valid: true, confirmed: txData.confirmations >= 6 };
    }
  }
  
  // Similar logic for ETH and USDT
}
```

## Security Considerations

### Wallet Security
- **Never share private keys** in code or environment variables
- **Use separate wallets** for each environment (dev/staging/prod)
- **Consider hardware wallets** for production
- **Enable multi-signature** for large amounts

### Transaction Security
- **Verify transaction hashes** on blockchain
- **Check confirmation count** before confirming payments
- **Implement amount verification** to prevent underpayment
- **Set timeout periods** for payment completion

### Rate Limiting
- **Limit payment generation** per user/IP
- **Implement CAPTCHA** for payment generation
- **Monitor for suspicious activity**

## Webhook Integration

For production, implement webhooks to receive payment notifications:

### Setup Webhook Endpoint

Create `/api/payments/crypto/webhook`:

```typescript
export async function POST(request: NextRequest) {
  const { transactionHash, currency, amount, address } = await request.json();
  
  // Verify the transaction on blockchain
  const validation = await cryptoPaymentService.validatePayment(
    currency, 
    amount, 
    transactionHash
  );
  
  if (validation.valid && validation.confirmed) {
    // Update order status to PAID
    await updateOrderPaymentStatus(transactionHash, currency);
  }
  
  return NextResponse.json({ success: true });
}
```

## Testing

### Testnet Testing

Use testnet networks for development:
- **Bitcoin Testnet**: Use testnet BTC (faucets available)
- **Ethereum Sepolia**: Use testnet ETH (faucets available)
- **USDT Testnet**: Use testnet USDT on Sepolia

### Test Bitcoin Addresses
- **Bitcoin Testnet**: `tb1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh`
- **Ethereum Sepolia**: `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`

### Test Scenarios
1. **Valid payment**: Send exact amount
2. **Underpayment**: Send less than required
3. **Overpayment**: Send more than required
4. **Wrong currency**: Send BTC to ETH address
5. **Late payment**: Send after timeout

## Monitoring

### Payment Status Tracking
Track these metrics:
- Payment initiation rate
- Payment completion rate
- Average confirmation time
- Failed payment rate
- Conversion rate by currency

### Alerts
Set up alerts for:
- Failed payment verifications
- Unusual payment patterns
- Conversion rate anomalies
- Wallet balance changes

## Production Deployment

### Pre-deployment Checklist
- [ ] Switch from testnet to mainnet
- [ ] Update wallet addresses to production wallets
- [ ] Implement real-time conversion rates
- [ ] Set up blockchain monitoring
- [ ] Configure webhooks
- [ ] Test with small amounts
- [ ] Set up monitoring and alerts
- [ ] Implement backup wallet system

### Backup Strategy
- **Wallet backups**: Secure backup of wallet keys
- **Database backups**: Regular backups of payment records
- **Disaster recovery**: Plan for wallet compromise

## Troubleshooting

### Common Issues

**Payment not detected:**
- Check transaction hash format
- Verify network (testnet vs mainnet)
- Check blockchain explorer API status

**Wrong amount detected:**
- Verify conversion rates are current
- Check transaction fees deduction
- Confirm decimal precision

**Address invalid:**
- Verify wallet address format
- Check network compatibility
- Ensure address hasn't changed

## Legal Considerations

- **Compliance**: Follow local cryptocurrency regulations
- **KYC/AML**: Implement identity verification if required
- **Tax reporting**: Maintain records for tax purposes
- **Terms of service**: Clearly communicate crypto payment terms

## Support Resources

- **Bitcoin Developer Guide**: https://bitcoin.org/en/developer-guide
- **Ethereum Developer Portal**: https://ethereum.org/developers
- **USDT Documentation**: https://tether.to/en/how-it-works

## Future Enhancements

- [ ] Support for additional cryptocurrencies (SOL, ADA, DOT)
- [ ] Integration with payment processors (BitPay, Coinbase Commerce)
- [ ] Automatic conversion to fiat
- [ ] Multi-signature wallet support
- [ ] Lightning Network for Bitcoin
- [ ] Layer 2 solutions (Polygon, Arbitrum)