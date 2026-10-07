import { Resend } from 'resend';

// Initialize Resend client
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  estimatedDelivery: Date;
}

interface WelcomeEmailDetails {
  name: string;
  email: string;
}

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
  // Check if Resend is configured
  if (!resend) {
    console.log('Resend not configured. Skipping order confirmation email.');
    return { success: false, message: 'Resend not configured' };
  }

  try {
    // Format date
    const deliveryDate = new Date(orderDetails.estimatedDelivery).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .item:last-child { border-bottom: none; }
          .total { font-size: 18px; font-weight: bold; color: #f97316; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }
          .button { display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed! 🎉</h1>
            <p>Thank you for your purchase</p>
          </div>
          <div class="content">
            <p>Dear ${orderDetails.customerName},</p>
            <p>We're pleased to confirm that your order has been successfully placed and is being processed.</p>
            
            <div class="order-details">
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${orderDetails.orderNumber}</p>
              <p><strong>Estimated Delivery:</strong> ${deliveryDate}</p>
              
              <h3>Items Ordered</h3>
              ${orderDetails.items.map(item => `
                <div class="item">
                  <span>${item.name} x ${item.quantity}</span>
                  <span>$${item.total.toFixed(2)}</span>
                </div>
              `).join('')}
              
              <div class="item">
                <span>Subtotal</span>
                <span>$${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div class="item">
                <span>Shipping</span>
                <span>$${orderDetails.shipping.toFixed(2)}</span>
              </div>
              <div class="item">
                <span>Tax</span>
                <span>$${orderDetails.tax.toFixed(2)}</span>
              </div>
              <div class="item total">
                <span>Total</span>
                <span>$${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
            
            <h3>Shipping Address</h3>
            <p>
              ${orderDetails.shippingAddress.fullName}<br>
              ${orderDetails.shippingAddress.address}<br>
              ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.postalCode}<br>
              ${orderDetails.shippingAddress.country}
            </p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/track-order?order=${orderDetails.orderNumber}" class="button">Track Your Order</a>
            </div>
            
            <p>If you have any questions about your order, please don't hesitate to contact our customer service team.</p>
            
            <p>Best regards,<br>The Dealora Team</p>
          </div>
          <div class="footer">
            <p>This email was sent to ${orderDetails.customerEmail}. If you didn't place this order, please contact us immediately.</p>
            <p>© ${new Date().getFullYear()} Dealora. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Dealora <noreply@yourdomain.com>',
      to: orderDetails.customerEmail,
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      html: emailContent,
    });

    if (error) {
      console.error('Error sending order confirmation email:', error);
      return { success: false, error: error.message };
    }

    console.log('Order confirmation email sent:', data);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function sendWelcomeEmail(details: WelcomeEmailDetails) {
  // Check if Resend is configured
  if (!resend) {
    console.log('Resend not configured. Skipping welcome email.');
    return { success: false, message: 'Resend not configured' };
  }

  try {
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Dealora</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .welcome-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .button { display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ef4444 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }
          .features { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
          .feature { background: white; padding: 15px; border-radius: 8px; text-align: center; }
          .feature-icon { font-size: 24px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Dealora! 🎉</h1>
            <p>Your shopping journey begins here</p>
          </div>
          <div class="content">
            <p>Dear ${details.name},</p>
            <p>We're thrilled to have you join the Dealora family! You've just unlocked access to thousands of amazing products at unbeatable prices.</p>
            
            <div class="welcome-box">
              <h2>What Makes Dealora Special?</h2>
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">🔥</div>
                  <h3>Flash Sales</h3>
                  <p>Limited-time deals with huge discounts</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🎁</div>
                  <h3>Giveaways</h3>
                  <p>Win amazing prizes regularly</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">🚚</div>
                  <h3>Fast Shipping</h3>
                  <p>Quick delivery to your doorstep</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">💳</div>
                  <h3>Flexible Payment</h3>
                  <p>Cards, crypto, and gift cards accepted</p>
                </div>
              </div>
            </div>
            
            <p>Start exploring our collection today and discover deals you won't find anywhere else!</p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/shop" class="button">Start Shopping</a>
            </div>
            
            <p>If you have any questions, our support team is here to help you 24/7.</p>
            
            <p>Happy shopping!<br>The Dealora Team</p>
          </div>
          <div class="footer">
            <p>This email was sent to ${details.email}. You received this email because you created an account on Dealora.</p>
            <p>© ${new Date().getFullYear()} Dealora. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Dealora <noreply@yourdomain.com>',
      to: details.email,
      subject: 'Welcome to Dealora! 🎉',
      html: emailContent,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }

    console.log('Welcome email sent:', data);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}