export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-sm mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Raj Car Renter ("we" or "us" or "our") operates the website. This
              page informs you of our policies regarding the collection, use,
              and disclosure of personal data when you use our Service and the
              choices you have associated with that data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Information Collection and Use
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
            <div className="ml-4 space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Types of Data Collected:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    Personal Data (name, email address, phone number, address)
                  </li>
                  <li>
                    Usage Data (pages visited, time spent, browser type, IP
                    address)
                  </li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Use of Data
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Raj Car Renter uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information so that we can
                improve our Service
              </li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>
                To send you marketing and promotional communications (with your
                consent)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Security of Data
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The security of your data is important to us, but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "effective date" at the top of this Privacy
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-gray-700">
              <strong>Raj Car Renter</strong>
              <br />
              Email: privacy@rajcarrenter.com
              <br />
              Phone: +91 98765 43210
              <br />
              Address: 123 Car Street, Mumbai, Maharashtra 400001, India
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to track activity
              on our Service and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent. However, if you do not accept cookies, you may not be
              able to use some portions of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. CCPA Privacy Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a California resident, you are entitled to learn what
              data we collect about you, ask to delete your data, and opt-out of
              the sale of your personal information to third parties. However,
              we do not sell the personal information of our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. GDPR Data Protection Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We would like to make sure you are fully aware of all of your data
              protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>The right to access</li>
              <li>The right to rectification</li>
              <li>The right to erasure</li>
              <li>The right to restrict processing</li>
              <li>The right to object to processing</li>
              <li>The right to data portability</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
