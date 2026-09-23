import nodemailer from 'nodemailer';

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

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails) {
  // Check if email is configured
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('Email not configured. Skipping order confirmation email.');
    return { success: false, message: 'Email not configured' };
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

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

    // Send email
    const info = await transporter.sendMail({
      from: `"Dealora" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: orderDetails.customerEmail,
      subject: `Order Confirmation - ${orderDetails.orderNumber}`,
      html: emailContent,
      text: `
        Order Confirmation - ${orderDetails.orderNumber}
        
        Dear ${orderDetails.customerName},
        
        We're pleased to confirm that your order has been successfully placed and is being processed.
        
        Order Number: ${orderDetails.orderNumber}
        Estimated Delivery: ${deliveryDate}
        
        Items Ordered:
        ${orderDetails.items.map(item => `- ${item.name} x ${item.quantity}: $${item.total.toFixed(2)}`).join('\n')}
        
        Subtotal: $${orderDetails.subtotal.toFixed(2)}
        Shipping: $${orderDetails.shipping.toFixed(2)}
        Tax: $${orderDetails.tax.toFixed(2)}
        Total: $${orderDetails.total.toFixed(2)}
        
        Shipping Address:
        ${orderDetails.shippingAddress.fullName}
        ${orderDetails.shippingAddress.address}
        ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.postalCode}
        ${orderDetails.shippingAddress.country}
        
        Track your order at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/track-order?order=${orderDetails.orderNumber}
        
        If you have any questions about your order, please don't hesitate to contact our customer service team.
        
        Best regards,
        The Dealora Team
      `,
    });

    console.log('Order confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}