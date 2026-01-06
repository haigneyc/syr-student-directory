import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Common questions about Syracuse student discounts, how to use deals, and submitting new discounts.',
};

const faqs = [
  {
    question: 'How do I use these student discounts?',
    answer:
      'Each deal page shows the specific redemption method. Most local businesses require you to show your valid Syracuse University student ID at checkout. Online deals typically require verification through your .edu email or services like SheerID.',
  },
  {
    question: 'What student ID is accepted?',
    answer:
      "Most businesses accept a valid Syracuse University student ID (SUID card). Some may also accept other forms of proof like a class schedule or university email. Online services typically verify student status through your @syr.edu email address.",
  },
  {
    question: 'Are these discounts verified?',
    answer:
      'We verify each discount before publishing by calling the business or testing online codes. Deals marked with a green checkmark have been recently verified. However, offers can change - if you find an expired deal, please report it so we can update our listings.',
  },
  {
    question: 'Can graduate students use these discounts?',
    answer:
      'Yes! Most student discounts apply to all enrolled students, including graduate and professional students. Some national deals may have age restrictions, but local Syracuse businesses typically accept any valid SUID.',
  },
  {
    question: 'How do I submit a new discount?',
    answer:
      'Visit our Submit a Deal page and fill out the form with the business name, discount details, and any conditions. Our team will verify the deal before adding it to the site. You can also report updates to existing deals.',
  },
  {
    question: "Why isn't my favorite business listed?",
    answer:
      "We're constantly adding new deals! If you know of a student discount we haven't listed, please submit it through our form. We prioritize adding deals that have been verified and are popular with students.",
  },
  {
    question: 'Do deals expire?',
    answer:
      "Some deals have specific expiration dates, which we note on the deal page. Many student discounts are ongoing promotions without a set end date. We regularly review deals to ensure they're still active.",
  },
  {
    question: 'Can I use multiple discounts at once?',
    answer:
      "It depends on the business. Most places don't allow stacking student discounts with other coupons or promotions. Check the deal conditions or ask at the register if you're unsure.",
  },
  {
    question: 'Are online deals available to Syracuse students specifically?',
    answer:
      "Online deals listed on our site (like Spotify Student or Amazon Prime Student) are available to all US college students, not just Syracuse. We include them because they're popular and offer significant savings.",
  },
  {
    question: 'How can I contact you?',
    answer:
      'For questions, corrections, or business inquiries, use the contact form on our About page or reach out through our social media channels. We typically respond within 24-48 hours.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600">
          Everything you need to know about using student discounts in Syracuse
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {faq.question}
            </h2>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-orange-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Still have questions?
        </h2>
        <p className="text-gray-600 mb-6">
          Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/about"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/submit"
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Submit a Deal
          </Link>
        </div>
      </div>
    </div>
  );
}
