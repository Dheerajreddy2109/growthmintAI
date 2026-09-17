import './globals.css';

export const metadata = {
  title: 'Digital Agency | Web Dev, SEO & Meta Ads',
  description: 'We deliver high-converting web development, SEO strategies, and Meta Ads campaigns to scale your business.',
};

import SmoothScrolling from '../components/SmoothScrolling';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
