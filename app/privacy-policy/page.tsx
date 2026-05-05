import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Apex Designer & Builder Inc.',
  alternates: {
    canonical: '/privacy-policy/',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Apex Designer & Builder Inc respects your privacy and is committed to protecting your personal information."
      sections={[
        {
          title: 'Effective Date',
          children: (
            <p>
              May 4, 2026
            </p>
          ),
        },
        {
          title: '1. Who We Are',
          children: (
            <>
              <p>
                Apex Designer & Builder Inc is a licensed home remodeling contractor based in Orange County, California.
              </p>
              <p>
                Phone: <a href="tel:9498783250" className="font-semibold text-accent hover:underline">(949) 878-3250</a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:info@apexdbr.com" className="font-semibold text-accent hover:underline">
                  info@apexdbr.com
                </a>
              </p>
              <p>
                Mailing Address:{' '}
                2372 Morse Ave, Irvine, CA 92614
              </p>
            </>
          ),
        },
        {
          title: '2. Information We Collect',
          children: (
            <>
              <p>
                This Privacy Policy explains how we collect, use, and share information when you visit our website or submit your information through our forms, including Google Ads lead forms.
              </p>
              <p>
                <strong>Information You Provide:</strong> We collect personal information that you voluntarily provide when you fill out forms on our website or through advertisements. This may include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>ZIP code</li>
                <li>Project details</li>
                <li>Budget range</li>
              </ul>
              <p>
                <strong>Information Collected Automatically:</strong> We may collect certain information automatically, including:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>IP address</li>
                <li>Browser type and device information</li>
                <li>Pages visited and time spent on the site</li>
                <li>Referring website</li>
                <li>Cookies and tracking technologies</li>
              </ul>
              <p>
                <strong>Information from Third Parties:</strong> We may receive information from advertising platforms such as Google Ads, analytics providers, and marketing partners.
              </p>
            </>
          ),
        },
        {
          title: '3. How We Use Your Information',
          children: (
            <>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Contact you regarding your project or inquiry</li>
                <li>Provide estimates and services</li>
                <li>Respond to your questions</li>
                <li>Improve our website and services</li>
                <li>Run and optimize advertising campaigns</li>
              </ul>
              <p>
                By submitting your information through our forms, you consent to be contacted by Apex Designer & Builder Inc via phone, email, or text message regarding your request.
              </p>
            </>
          ),
        },
        {
          title: '4. Cookies and Tracking Technologies',
          children: (
            <>
              <p>
                We use cookies and similar technologies to improve your browsing experience and measure advertising performance. These may include:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Google Analytics (GA4)</li>
                <li>Google Ads tracking</li>
                <li>Google Tag Manager</li>
              </ul>
              <p>
                You can control cookies through your browser settings.
              </p>
            </>
          ),
        },
        {
          title: '5. How We Share Information',
          children: (
            <>
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Service providers and subcontractors involved in your project</li>
                <li>Advertising and analytics partners, such as Google</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p>
                We do not sell your personal information for money.
              </p>
            </>
          ),
        },
        {
          title: '6. Data Retention',
          children: (
            <p>
              We may retain your information for as long as necessary to fulfill business, legal, and operational purposes, including project records and communication history.
            </p>
          ),
        },
        {
          title: '7. Your Privacy Rights (California Residents)',
          children: (
            <>
              <p>
                If you are a California resident, you have the right to:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Request access to your personal information</li>
                <li>Request deletion of your information</li>
                <li>Request correction of inaccurate data</li>
                <li>Opt out of the sharing of your personal information</li>
              </ul>
              <p>
                To exercise your rights, please contact us using the information below.
              </p>
            </>
          ),
        },
        {
          title: "8. Children's Privacy",
          children: (
            <p>
              Our services are not directed to individuals under the age of 16, and we do not knowingly collect personal information from children.
            </p>
          ),
        },
        {
          title: '9. Data Security',
          children: (
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>
          ),
        },
        {
          title: '10. Third-Party Links',
          children: (
            <p>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices.
            </p>
          ),
        },
        {
          title: '11. Changes to This Policy',
          children: (
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          ),
        },
        {
          title: '12. Contact Us',
          children: (
            <>
              <p>Apex Designer & Builder Inc</p>
              <p>
                Phone: <a href="tel:9498783250" className="font-semibold text-accent hover:underline">(949) 878-3250</a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:info@apexdbr.com" className="font-semibold text-accent hover:underline">
                  info@apexdbr.com
                </a>
              </p>
              <p>
                Address:{' '}
                2372 Morse Ave, Irvine, CA 92614
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
