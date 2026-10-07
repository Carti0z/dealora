# Email Configuration for Dealora

This application sends emails for:
- Order confirmations
- Welcome emails for new users

We use **Resend** for email delivery, which provides a modern API and excellent deliverability.

## Setup Instructions

### 1. Get Resend API Key

1. Create an account at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy the API key (starts with `re_`)

### 2. Configure Environment Variables

Add the following to your `.env` file:

```env
# Resend Email Configuration
RESEND_API_KEY="re_your_api_key_here"
RESEND_FROM_EMAIL="Dealora <noreply@yourdomain.com>"
```

**Important:** Make sure to verify your sender domain in Resend:
- Go to Domains in Resend dashboard
- Add your domain
- Add the DNS records provided by Resend
- Wait for verification

### 3. Email Templates

#### Welcome Email
- Sent automatically when a new user signs up
- Includes welcome message and features overview
- Encourages users to start shopping

#### Order Confirmation Email
- Sent after successful checkout
- Includes order details, items, and shipping address
- Provides order tracking link

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