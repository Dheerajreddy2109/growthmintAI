import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import SmoothScrolling from '../components/SmoothScrolling';
import { ContactProvider } from '../components/contact/ContactModal';
import { site, faqs } from '@/data/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const title = 'Website & Web App Development Company in India | Growthmint AI';
const description =
  'Custom website design and web application development for businesses and startups. SEO-ready business websites from ₹7,999, e-commerce stores, booking systems, SaaS MVPs, CRMs and dashboards built with Next.js & React. Fixed written quote. You own the code.';

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: '%s | Growthmint AI' },
  description,
  keywords: [
    'website development company',
    'web application development',
    'custom website design',
    'website design India',
    'business website development',
    'affordable website for small business',
    'ecommerce website development',
    'SaaS development company',
    'MVP development for startups',
    'Next.js development agency',
    'React web app development',
    'custom CRM development',
    'admin dashboard development',
    'booking website development',
    'progressive web app development',
    'AI chatbot integration',
    'SEO friendly website',
    'mobile responsive website',
    'website redesign services',
    'Razorpay payment integration',
    'landing page design',
    'full stack web development',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title,
    description,
    locale: 'en_IN',
    images: [{ url: '/images/logos/IMG_3903.jpeg', width: 1170, height: 442, alt: 'Growthmint AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/logos/IMG_3903.jpeg'],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0a2e20',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      name: site.name,
      url: site.url,
      email: site.email,
      ...(site.phoneDisplay && { telephone: site.phoneDisplay }),
      logo: `${site.url}/images/logos/IMG_3904.jpeg`,
      description,
      areaServed: 'IN',
      priceRange: '₹7,999+',
      knowsAbout: ['Website development', 'Web application development', 'E-commerce development', 'SaaS development', 'SEO'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <SmoothScrolling>
          <ContactProvider>{children}</ContactProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
