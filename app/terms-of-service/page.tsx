import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Apex Design Build & Remodel.',
  alternates: {
    canonical: '/terms-of-service/',
  },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="These Terms of Service govern your use of the Apex Design Build & Remodel website and online inquiry forms."
      sections={[
        {
          title: 'Effective Date / Last Updated',
          children: (
            <p>
              May 4, 2026
            </p>
          ),
        },
        {
          title: '1. About Us',
          children: (
            <>
              <p>
                Apex Design Build & Remodel is an Orange County remodeling contractor. Our contractor license number is #1128138.
              </p>
              <p>
                Phone: <a href="tel:9498783250" className="font-semibold text-accent hover:underline">(949) 878-3250</a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:Info@apexdbr.com" className="font-semibold text-accent hover:underline">
                  Info@apexdbr.com
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
          title: '2. Use of the Site',
          children: (
            <p>
              You may use this website only for lawful purposes. You may not scrape the site, use bots or automated collection tools, submit fraudulent information, interfere with site operation, introduce malicious code, or use the site in a way that violates applicable law.
            </p>
          ),
        },
        {
          title: '3. Estimates, Quotes, and Service Inquiries',
          children: (
            <>
              <p>
                Submitting a form or contacting us through this website does not create a contract, contractor-client relationship, or obligation for either party.
              </p>
              <p>
                “Package Starting At $X” prices and similar pricing statements are starting estimates only and are not binding quotes. Final pricing depends on project scope, site conditions, materials, labor, permits, and written specifications.
              </p>
              <p>
                A binding agreement for remodeling services requires a written, signed contract.
              </p>
            </>
          ),
        },
        {
          title: '4. Communications Consent',
          children: (
            <p>
              By submitting contact information, you authorize Apex Design Build & Remodel to contact you by phone, email, and text message about your project, including through automated means. Standard message and data rates may apply. Reply STOP to opt out of text messages.
            </p>
          ),
        },
        {
          title: '5. Intellectual Property',
          children: (
            <p>
              All website content, including text, images, graphics, design, logos, trademarks, and other materials, is owned by Apex Design Build & Remodel or its licensors. You may not copy, reproduce, distribute, or use site content without our prior written permission.
            </p>
          ),
        },
        {
          title: '6. User Submissions',
          children: (
            <p>
              If you submit photos, reviews, testimonials, project descriptions, or other materials, you grant Apex Design Build & Remodel a non-exclusive, royalty-free license to use, reproduce, display, and distribute those materials for marketing, portfolio, and business purposes.
            </p>
          ),
        },
        {
          title: '7. Third-Party Links',
          children: (
            <p>
              The site may include links to third-party websites or services. We are not responsible for third-party content, policies, security, or practices.
            </p>
          ),
        },
        {
          title: '8. Disclaimers',
          children: (
            <p>
              The site is provided “AS IS” and without warranties of any kind. We do not guarantee that pricing, timelines, galleries, descriptions, availability, or other site content will be complete, accurate, current, or applicable to your specific project.
            </p>
          ),
        },
        {
          title: '9. Limitation of Liability',
          children: (
            <p>
              To the fullest extent permitted by law, Apex Design Build & Remodel will not be liable for indirect, incidental, special, consequential, or punitive damages arising from use of the site. Our total liability for site-related claims is capped at $100. Liability related to an actual remodeling project is governed by the applicable signed contract.
            </p>
          ),
        },
        {
          title: '10. Indemnification',
          children: (
            <p>
              You agree to indemnify and hold harmless Apex Design Build & Remodel from claims, damages, liabilities, costs, and expenses arising from your misuse of the site, violation of these Terms, or violation of applicable law.
            </p>
          ),
        },
        {
          title: '11. Governing Law',
          children: (
            <p>
              These Terms are governed by the laws of the State of California. Venue for disputes will be the state or federal courts located in Orange County, California.
            </p>
          ),
        },
        {
          title: '12. Changes to These Terms',
          children: (
            <p>
              We may update these Terms from time to time. Updated Terms will be posted on this page with a revised effective date or last updated date.
            </p>
          ),
        },
        {
          title: '13. Severability',
          children: (
            <p>
              If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force and effect.
            </p>
          ),
        },
        {
          title: '14. Contact Us',
          children: (
            <>
              <p>Apex Design Build & Remodel, License #1128138</p>
              <p>
                Phone: <a href="tel:9498783250" className="font-semibold text-accent hover:underline">(949) 878-3250</a>
              </p>
              <p>
                Email:{' '}
                <a href="mailto:Info@apexdbr.com" className="font-semibold text-accent hover:underline">
                  Info@apexdbr.com
                </a>
              </p>
              <p>
                Mailing Address:{' '}
                2372 Morse Ave, Irvine, CA 92614
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
