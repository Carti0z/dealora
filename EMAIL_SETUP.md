# Email Configuration for Order Confirmations

This application now sends order confirmation emails to customers upon successful checkout.

## Setup Instructions

### 1. Choose an Email Service

You can use any SMTP-compatible email service. Popular options include:

- **Gmail** (Free, requires App Password)
- **SendGrid** (Free tier available)
- **Mailgun** (Free tier available)
- **Amazon SES** (Pay-as-you-go)
- **Outlook/Office 365**

### 2. Configure Environment Variables

Add the following to your `.env` file:

```env
# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@yourdomain.com"
```

### 3. Service-Specific Setup

#### Gmail Setup
1. Go to [Google Account Settings](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Create a new app password for "Dealora"
   - Use this 16-character password in `SMTP_PASSWORD`

#### SendGrid Setup
1. Create account at [sendgrid.com](https://sendgrid.com)
2. Verify your sender domain
3. Get your API credentials from Settings → API Keys
4. Use these credentials:
   ```env
   SMTP_HOST="smtp.sendgrid.net"
   SMTP_PORT="587"
   SMTP_USER="apikey"
   SMTP_PASSWORD="your-sendgrid-api-key"
   ```

#### Mailgun Setup
1. Create account at [mailgun.com](https://mailgun.com)
2. Verify your domain
3. Get SMTP credentials from Domains → SMTP
4. Use credentials provided by Mailgun

### 4. Test Email Configuration

After setting up the environment variables, test by placing an order:

1. Add items to cart
2. Complete checkout process
3. Check your email for order confirmation

### 5. Email Content

The order confirmation email includes:
- Order number and customer details
- List of items ordered with quantities and prices
- Subtotal, shipping, tax, and total amounts
- Shipping address
- Estimated delivery date
- Link to track the order
- Contact information

### 6. Troubleshooting

#### Email Not Sending
- Check that all SMTP environment variables are set correctly
- Verify SMTP credentials are valid
- Check server logs for error messages
- Ensure SMTP port is not blocked by firewall

#### Gmail Authentication Errors
- Make sure you're using an App Password, not your regular password
- Verify 2-Factor Authentication is enabled
- Check that "Less Secure Apps" is not needed (use App Password instead)

#### Rate Limiting
- Free email services may have sending limits
- Consider upgrading to a paid service for higher volume
- Implement queue system for bulk emails

### 7. Security Notes

- Never commit real SMTP credentials to version control
- Use environment variables for all sensitive data
- Rotate SMTP passwords regularly
- Monitor email sending for unusual activity

### 8. Production Considerations

For production deployment:

1. **Use a dedicated email service** like SendGrid or Mailgun
2. **Set up email templates** for better branding
3. **Implement email queue** for handling high volume
4. **Add retry logic** for failed email sends
5. **Monitor email deliverability** and bounce rates
6. **Set up DKIM/SPF records** for better deliverability

### 9. Customization

To customize the email template, edit `src/lib/email.ts`:

- Modify the HTML template in the `emailContent` variable
- Update the text version for plain text email clients
- Add company branding and logos
- Customize the styling and layout

### 10. Disable Email in Development

To disable email sending during development:

```env
# Leave SMTP variables empty to disable emails
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM=""
```

The system will log a message when emails are disabled and continue processing orders.