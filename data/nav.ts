export interface NavItem {
  name: string;
  href: string;
}

export interface Navigation {
  pages: NavItem[];
}

export const navigation: Navigation = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Work', href: '/work' },
    { name: 'Projects', href: '/projects' },
    { name: 'Stories', href: '/stories' },
    { name: 'Guestbook', href: '/guestbook' },
  ],
};
