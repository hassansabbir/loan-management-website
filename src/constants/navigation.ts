import { NavItem, SocialLink, FooterSection } from '@/types';

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Support', href: '/support' },
];

export const socialLinks: SocialLink[] = [
  { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'GitHub', href: 'https://github.com', icon: 'github' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
];

export const footerSections: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Mobile Apps', href: '/services/mobile-apps' },
      { label: 'UI/UX Design', href: '/services/design' },
      { label: 'Consulting', href: '/services/consulting' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Help Center', href: '/help' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];