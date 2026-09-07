import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Dealora, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dealora reserves the right to refuse service, terminate accounts, or remove or edit content at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Products and Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We do not warrant that the descriptions are accurate, complete, reliable, current, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Pricing and Payment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All prices are in USD and are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Shipping and Delivery</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Shipping times provided at checkout are estimates only. Dealora is not responsible for any delays caused by shipping carriers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Risk of loss and title for items purchased pass to you upon delivery to the shipping carrier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Returns and Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your use of Dealora is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Service and informs users of our data collection practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All content included on the Service, such as text, graphics, logos, images, and software, is the property of Dealora or its content suppliers and protected by intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                In no event shall Dealora be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at support@dealora.com
              </p>
            </section>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500 mb-4">Last updated: September 5, 2026</p>
              <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
