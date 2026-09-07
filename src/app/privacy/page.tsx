import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This includes your name, email address, shipping address, payment information, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to process transactions, send you technical notices and support messages, respond to your comments and questions, and provide customer service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We also use your information to send you marketing communications about our products and services, with your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement a variety of security measures to maintain the safety of your personal information. All sensitive information is transmitted via Secure Socket Layer (SSL) technology.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We use industry-standard encryption to protect your data in transit and at rest. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies to enhance your experience on our website. Cookies are small files stored on your device that remember your preferences and track your activity.
              </p>
              <p className="text-gray-600 leading-relaxed">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of our service may not function properly without cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our website may include links to third-party websites. We are not responsible for the privacy practices of such third-party websites.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We encourage you to be aware when you leave our site and to read the privacy statements of each third-party website that collects personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time.
              </p>
              <p className="text-gray-600 leading-relaxed">
                To exercise these rights, please contact us at privacy@dealora.com with your request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@dealora.com
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
