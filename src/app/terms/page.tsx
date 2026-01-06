import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for Cuse Student Deals - rules and guidelines for using our student discount directory.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Terms of Service</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600">Last updated: January 2025</p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none">
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using Cuse Student Deals (orangediscounts.com), you
              agree to be bound by these Terms of Service. If you disagree with any
              part of the terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Use of Service
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our Service provides information about student discounts available in
              and around Syracuse, New York, and online. By using this Service, you
              agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use the Service only for lawful purposes</li>
              <li>Not misrepresent your student status to businesses</li>
              <li>Not scrape, copy, or redistribute our content without permission</li>
              <li>
                Not attempt to gain unauthorized access to any portion of the
                Service
              </li>
              <li>
                Provide accurate information when submitting deals or contacting us
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The information on this website is provided &quot;as is&quot; without any
              representations or warranties, express or implied. We make no
              representations or warranties in relation to the information on this
              website.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Specifically, we do not warrant that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                The deals and discounts listed are currently available or accurate
              </li>
              <li>
                The terms and conditions of offers have not changed since
                verification
              </li>
              <li>All businesses will honor listed discounts at all times</li>
              <li>The Service will be available at all times without interruption</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              While we make reasonable efforts to verify deals, businesses may
              change or discontinue offers at any time. Always confirm the discount
              terms with the business before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              In no event shall Cuse Student Deals, its operators, or affiliates be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including without limitation, loss of profits, data,
              use, goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our Service may contain links to third-party websites or services that
              are not owned or controlled by Cuse Student Deals. We have no control
              over and assume no responsibility for the content, privacy policies,
              or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              User Submissions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you submit a deal or other content to our Service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                You grant us a non-exclusive, royalty-free license to use, modify,
                and display the content
              </li>
              <li>
                You represent that you have the right to submit the content and that
                it does not violate any third-party rights
              </li>
              <li>
                You understand that we may edit, refuse, or remove any submission at
                our discretion
              </li>
              <li>
                You agree not to submit false, misleading, or spam content
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Service and its original content (excluding content provided by
              users), features, and functionality are and will remain the exclusive
              property of Cuse Student Deals. Our Service is protected by copyright,
              trademark, and other laws. Our trademarks may not be used in connection
              with any product or service without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. If a
              revision is material, we will try to provide at least 30 days notice
              prior to any new terms taking effect. What constitutes a material
              change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the
              laws of the State of New York, without regard to its conflict of law
              provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about these Terms, please contact us through
              our{' '}
              <Link href="/about" className="text-orange-600 hover:underline">
                About page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
