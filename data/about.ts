interface HighlightLink {
  text: string;
  href: string;
}

interface CompanyLink {
  text: string;
  href: string;
}

interface Highlight {
  title: string;
  content: string;
  link?: HighlightLink;
  externalLink?: HighlightLink;
  companyLinks?: Record<string, CompanyLink>;
}

interface AboutLink {
  label: string;
  text: string;
  href: string;
}

interface AboutData {
  pageTitle: string;
  intro: string;
  highlights: Highlight[];
  linksAndStats: {
    title: string;
    links: AboutLink[];
  };
  valorantSection: {
    title: string;
    description: string;
  };
  topTracksSection: {
    title: string;
    description: string;
  };
}

export const aboutData: AboutData = {
  pageTitle: 'About',
  intro:
    "Hey there! I'm Hrishikesh Jangir, a 25-year-old Software Engineer based in Delhi, India. I build video players, wrangle ad-tech systems, and occasionally make AI do cool things. Here are a few highlights about me:",
  highlights: [
    {
      title: 'Education',
      content:
        'I did my initial education from Rajasthan and then later moved to Delhi for higher education. I Hold a Bachelor of Technology (B.Tech) in Computer Science and Engineering from Manav Rachna International Institute of Research and Studies.',
    },
    {
      title: 'Professional Experience',
      content:
        'Currently I work as a Senior Fullstack Engineer at {PUBX_AI}, an AI-driven price floor optimization platform. I focus on building scalable ad-tech solutions, including automated testing pipelines, publisher dashboards, and data aggregation systems. Previously, I worked as SDE & Team Lead at {ADPUSHUP} where I led a team building the FrameRate player and FloorSense dynamic floor price manager.',
      link: {
        text: 'You can read more about my work here.',
        href: '/work',
      },
      companyLinks: {
        PUBX_AI: {
          text: 'Pubx AI',
          href: 'https://pubx.ai/',
        },
        ADPUSHUP: {
          text: 'Adpushup',
          href: 'https://adpushup.com/',
        },
      },
    },
    {
      title: 'Some Quirky Facts',
      content:
        "When I'm not debugging production issues, you'll find me experimenting with the latest AI tools - currently obsessed with building RAG systems and fine-tuning LLMs for specific use cases. I'm also diving deep into computer vision projects and exploring how to integrate AI into visual pipelines. When the code editor finally closes, I'm either catching up on the latest comic book chapters, discovering new music on Spotify, or getting absolutely destroyed in Valorant (Chamber main, but my aim says otherwise).",
    },
  ],
  linksAndStats: {
    title: 'Links & Stats :',
    links: [
      {
        label: 'LinkedIn',
        text: 'Hrishikesh Jangir',
        href: 'https://www.linkedin.com/in/hrishikesh-jangir/',
      },
      {
        label: 'GitHub',
        text: '@roeintheglasses',
        href: 'https://github.com/roeintheglasses',
      },
      {
        label: 'Website',
        text: 'roeintheglasses.dev',
        href: 'https://roeintheglasses.dev',
      },
    ],
  },
  valorantSection: {
    title: 'Valorant Stats',
    description:
      "I play Valorant to unwind after debugging sessions. Chamber main, decent at setups, terrible at aiming. Here are my stats - they're not impressive, but at least I'm having fun and occasionally hitting those satisfying one-taps.",
  },
  topTracksSection: {
    title: 'Top Tracks',
    description:
      "Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.",
  },
};
