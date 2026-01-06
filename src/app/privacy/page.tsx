import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Cuse Student Deals - how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Privacy Policy</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: January 2025</p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none">
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cuse Student Deals (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the
              orangediscounts.com website. This page informs you of our policies
              regarding the collection, use, and disclosure of personal information
              when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect several types of information for various purposes to
              provide and improve our Service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Usage Data:</strong> Information on how the Service is
                accessed and used, including your browser type, pages visited, time
                spent on pages, and other diagnostic data.
              </li>
              <li>
                <strong>Submission Data:</strong> When you submit a deal, we collect
                the information you provide, which may include your email address
                and deal details.
              </li>
              <li>
                <strong>Newsletter Data:</strong> If you sign up for our newsletter,
                we collect your email address.
              </li>
              <li>
                <strong>Cookies:</strong> We use cookies and similar tracking
                technologies to track activity and hold certain information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information so that we can improve
                our Service
              </li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To send you our newsletter (if subscribed)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use Google Analytics to monitor and analyze the use of our Service.
              Google Analytics is a web analytics service that tracks and reports
              website traffic. Google uses the data collected to track and monitor
              the use of our Service. This data is shared with other Google
              services. You can opt-out of having made your activity on the Service
              available to Google Analytics by installing the Google Analytics
              opt-out browser add-on.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We will retain your personal data only for as long as is necessary for
              the purposes set out in this Privacy Policy. We will retain and use
              your data to the extent necessary to comply with our legal
              obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our Service may contain links to other sites that are not operated by
              us. If you click on a third-party link, you will be directed to that
              third party&apos;s site. We strongly advise you to review the Privacy
              Policy of every site you visit. We have no control over and assume no
              responsibility for the content, privacy policies, or practices of any
              third-party sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your
              personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>The right to access your personal data</li>
              <li>The right to request correction of inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to opt-out of marketing communications</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the
              information below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you
              of any changes by posting the new Privacy Policy on this page and
              updating the &quot;Last updated&quot; date. You are advised to review this
              Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us
              through our{' '}
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
