import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Apex Design Build & Remodel.',
  alternates: {
    canonical: '/privacy-policy/',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This Privacy Policy explains how Apex Design Build & Remodel collects, uses, shares, and protects information when you use our website or contact us about a remodeling project."
      sections={[
        {
          title: 'Effective Date / Last Updated',
          children: (
            <p>
              {/* TODO: Replace with the final effective date and last updated date before launch. */}
              TODO
            </p>
          ),
        },
        {
          title: '1. Who We Are',
          children: (
            <>
              <p>
                Apex Design Build & Remodel is an Orange County kitchen, bathroom, and home remodeling contractor. Our contractor license number is #1128138.
              </p>
              <p>
                Phone: <a href="tel:9498783250" className="font-semibold text-accent hover:underline">(949) 878-3250</a>
              </p>
              <p>
                Email:{' '}
                {/* TODO: Replace with the correct privacy/contact email address. */}
                TODO
              </p>
              <p>
                Mailing Address:{' '}
                {/* TODO: Replace with the correct mailing address. */}
                TODO
              </p>
            </>
          ),
        },
        {
          title: '2. Information We Collect',
          children: (
            <>
              <p>
                <strong>Information you provide directly through forms:</strong> name, email address, phone number, ZIP code, project type, budget, and project description.
              </p>
              <p>
                <strong>Information collected automatically:</strong> IP address, browser type, device information, referring URL, pages viewed, click and scroll data, and cookie IDs or similar identifiers.
              </p>
              <p>
                <strong>Information from third parties:</strong> we may receive information from Google Ads, analytics platforms, and lead-generation partners.
              </p>
            </>
          ),
        },
        {
          title: '3. Cookies and Tracking',
          children: (
            <>
              <p>
                We use cookies and similar technologies to operate the site, understand visitor activity, and measure advertising performance. These tools include Google Tag Manager, Google Analytics (GA4), and Google Ads.
              </p>
              <p>
                We honor Global Privacy Control (GPC) browser signals where required by law. If your browser sends a GPC signal, we treat it as a request to opt out of advertising sale or sharing signals.
              </p>
            </>
          ),
        },
        {
          title: '4. How We Use Information',
          children: (
            <>
              <p>
                We use information to respond to estimate requests, schedule consultations, communicate with you, improve our website, measure advertising, prevent fraud, and comply with legal obligations.
              </p>
              <p>
                We do not use automated decision-making that produces legal or similarly significant effects.
              </p>
            </>
          ),
        },
        {
          title: '5. How We Share Information',
          children: (
            <>
              <p>
                We may share information with service providers, advertising and analytics partners, subcontractors involved in project evaluation or fulfillment, legal authorities when required, and successor entities in connection with a merger, sale, or business transfer.
              </p>
              <p>
                <strong>We do not sell your personal information for money.</strong> However, some advertising or analytics sharing may qualify as a “sale” or “sharing” under California law.
              </p>
            </>
          ),
        },
        {
          title: '6. Retention',
          children: (
            <p>
              We may retain project records and related communications for up to 7 years where needed for tax, contractor licensing, warranty, legal, or business recordkeeping purposes.
            </p>
          ),
        },
        {
          title: '7. California Privacy Rights (CCPA/CPRA)',
          children: (
            <>
              <p>
                California residents may have the right to know what personal information we collect, access personal information, request deletion, request correction, opt out of sale or sharing, limit the use or disclosure of sensitive personal information, and be free from discrimination for exercising these rights.
              </p>
              <p>
                Categories of personal information collected may include identifiers, contact information, internet or electronic network activity, commercial information related to requested services, geolocation approximated from ZIP code or IP address, and inferences related to project interests.
              </p>
              <p>
                Categories disclosed for a business purpose may include identifiers, contact information, internet or electronic network activity, and project inquiry information. We may disclose these categories to service providers, analytics providers, advertising partners, and subcontractors.
              </p>
              <p>
                We do not sell personal information for money, but use of Google Ads, Google Analytics, Google Tag Manager, and similar advertising technologies may be considered “sale” or “sharing” under California law.
              </p>
              <p>
                To exercise your rights, contact us by email at{' '}
                {/* TODO: Replace with the correct privacy rights email address. */}
                TODO
                {' '}or by phone at <a href="tel:9498783250" className="font-semibold text-accent hover:underline">(949) 878-3250</a>. You may also use the Cookie Settings link in the footer or banner to update your advertising preferences.
              </p>
              <p>
                We do not knowingly sell or share personal information of minors under 16.
              </p>
            </>
          ),
        },
        {
          title: "8. Children's Privacy",
          children: (
            <p>
              Our website and services are not directed to children under 16, and we do not knowingly collect personal information from children under 16.
            </p>
          ),
        },
        {
          title: '9. Data Security',
          children: (
            <p>
              We use reasonable administrative, technical, and physical safeguards designed to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          title: '10. Third-Party Links',
          children: (
            <p>
              Our website may link to third-party websites or services. We are not responsible for the privacy practices, security, or content of those third parties.
            </p>
          ),
        },
        {
          title: '11. Changes to This Policy',
          children: (
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised effective date or last updated date.
            </p>
          ),
        },
        {
          title: '12. Contact Us',
          children: (
            <>
              <p>Apex Design Build & Remodel, License #1128138</p>
              <p>
                Phone: <a href="tel:9498783250" className="font-semibold text-accent hover:underline">(949) 878-3250</a>
              </p>
              <p>
                Email:{' '}
                {/* TODO: Replace with the correct contact email address. */}
                TODO
              </p>
              <p>
                Mailing Address:{' '}
                {/* TODO: Replace with the correct mailing address. */}
                TODO
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
