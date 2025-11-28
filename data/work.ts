interface TechLink {
  text: string;
  url: string;
}

interface Company {
  id: string;
  name: string;
  role: string;
  period: string;
  website: string | null;
  logo: string;
  color: string;
  description: string;
  highlights: string[];
  summary: string | null;
  links: TechLink[];
}

interface WorkData {
  pageTitle: string;
  intro: string;
  companies: Company[];
}

export const workData: WorkData = {
  pageTitle: 'My Work',
  intro:
    'Currently working on solving ad-tech problems at scale. I code for passion & design for fun. On a mission to build efficient and accessible products and help the next generation of devs along the way.',
  companies: [
    {
      id: 'pubxai',
      name: 'Pubx AI',
      role: 'Senior Fullstack Engineer',
      period: 'August 2024 - Present',
      website: 'https://pubx.ai/',
      logo: '/static/images/companies/Pubx.jpg',
      color: '#F05223',
      description:
        'Pubx AI is an AI-driven price floor optimization platform that helps publishers increase ad revenues through dynamic floor pricing, targeting a minimum 3X ROI.',
      highlights: [
        'Built a comprehensive automated E2E testing and validation pipeline using <strong>Playwright</strong> and <strong>LambdaTest</strong> that validates client tags across live publisher sites in multiple geolocations and browsers. The system processes test results through <strong>Kafka</strong> queues, stores data in Parquet format on S3, and powers both automated alerting and <strong>Grafana</strong> analytics dashboards. This pipeline reduced manual QA time by 50% while proactively catching production issues.',
        'Led the complete rebuild of the publisher-facing dashboard from ground up, collaborating closely with product and UX teams. Implemented the core architecture using <strong>React</strong>, <strong>TypeScript</strong>, and <strong>shadcn/ui</strong> components based on Figma designs, along with a <strong>Django</strong> backend API. The new dashboard improved publisher engagement by 40% and reduced support tickets by 60%.',
        'Optimized data aggregation pipelines for Classification and DBM models by migrating from AWS Kinesis to managed <strong>Kafka (WarpStream)</strong>, reducing monthly AWS costs by almost 45%. Built a Python-based data validation service using <strong>Pydantic</strong> that ensures data integrity before ML pipeline consumption.',
        "Currently developing <strong>Stream</strong>, Pubx's new Tag Management & Automation Service that captures additional datapoints from JavaScript tags and combines them with realtime auction data consumed by decision tree algorithms. This has resulted in an 80% reduction in manual configuration overhead.",
      ],
      summary: null,
      links: [
        { text: 'Playwright', url: 'https://playwright.dev/' },
        { text: 'LambdaTest', url: 'https://www.lambdatest.com/' },
        { text: 'Kafka', url: 'https://kafka.apache.org/' },
        { text: 'WarpStream', url: 'https://www.warpstream.com/' },
        { text: 'Pydantic', url: 'https://docs.pydantic.dev/' },
        { text: 'AWS Athena', url: 'https://aws.amazon.com/athena/' },
        { text: 'Grafana', url: 'https://grafana.com/' },
        { text: 'React', url: 'https://react.dev/' },
        { text: 'Shadcn', url: 'https://ui.shadcn.com/' },
        { text: 'TypeScript', url: 'https://www.typescriptlang.org/' },
        { text: 'Django', url: 'https://www.djangoproject.com/' },
      ],
    },
    {
      id: 'adpushup',
      name: 'Adpushup',
      role: 'SDE & Team Lead (Instream Video)',
      period: 'August 2021 - July 2024',
      website: 'https://adpushup.com/',
      logo: '/static/images/companies/Adpushup.jpg',
      color: '#ff4954',
      description:
        'AdPushup is a revenue optimization platform that helps publishers increase their ad revenue. I started as an Associate Software Developer and grew to lead the Instream Video team.',
      highlights: [
        'Built the <strong>AMP Yield</strong> project, an in-house Ad analytics & performance monitoring system for AMP-based sites which allowed the company to reach out to over 200+ new publishers with credible analytics data for onboarding.',
        'Worked on the <strong>Glimpse & Glimpse for Ads</strong> project where we made publisher links come to life with stunning link previews. Also led an internal product documentation team, creating standards for internal documentation on JIRA and Notion.',
        'Led development of the in-house video player solution - a <strong>VideoJS</strong> based player with support for Instream Video Ads utilizing <strong>Interactive Media Ads SDK</strong> and <strong>PrebidJS</strong>. My team of 4 engineers delivered features that contributed to ~30% uplift in Gross Revenue.',
        "Built <strong>FloorSense</strong>, Adpushup's floor price optimization engine designed specifically for video ads, which utilized <strong>PySpark</strong>, TypeScript and Node.js to dynamically generate price floors based on historical data trends.",
      ],
      summary:
        'During my 3 years at Adpushup, I built products from ground up while solving complex problems: end-to-end video transcoding pipeline, a video player for instream ads, dynamic floor price engine, large-scale website crawlers for link previews, and custom VideoJS plugins.',
      links: [
        { text: 'Glimpse', url: 'https://www.adpushup.com/glimpse/' },
        { text: 'Glimpse for Ads', url: 'https://www.adpushup.com/glimpse-for-ads/' },
        { text: 'VideoJS', url: 'https://videojs.com/' },
        {
          text: 'IMA SDK',
          url: 'https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side',
        },
        { text: 'PrebidJS', url: 'https://docs.prebid.org/prebid/prebidjs.html' },
        { text: 'FloorSense', url: 'https://www.adpushup.com/floor-sense/' },
      ],
    },
    {
      id: 'quikieapps',
      name: 'QuikieApps',
      role: 'Software Developer',
      period: 'August 2020 - July 2021',
      website: null,
      logo: '/static/images/companies/QuikieApps.jpg',
      color: '#6fc8e8',
      description:
        'QuikieApps is an IT service and consulting company specializing in fullstack development. I joined a team working across web and mobile platforms on various client projects.',
      highlights: [
        'Worked on 6+ different client projects with <strong>React</strong>, <strong>React Native</strong> and <strong>Node.js</strong> codebases. Migrated projects from custom webpack configurations to <strong>Next.js</strong> and modern React patterns.',
        'Tackled challenging problems: decoupling a decade-old monolith into microservices, integrating payment gateways (<strong>Razorpay</strong> & <strong>BillDesk</strong>), managing Docker containers, building design systems, and incrementally migrating components to new frameworks.',
      ],
      summary: null,
      links: [
        { text: 'React', url: 'https://react.dev/' },
        { text: 'React Native', url: 'https://reactnative.dev/' },
        { text: 'Node.js', url: 'https://nodejs.org/' },
        { text: 'Next.js', url: 'https://nextjs.org/' },
        { text: 'Razorpay', url: 'https://razorpay.com/docs/' },
        { text: 'BillDesk', url: 'https://docs.billdesk.io/' },
      ],
    },
    {
      id: 'safe',
      name: 'Safe Security',
      role: 'Testing Automation Intern',
      period: 'March 2019 - July 2019',
      website: 'https://safe.security/',
      logo: '/static/images/companies/safe.jpg',
      color: '#141c4a',
      description:
        'Safe Security is a Cybersecurity and Digital Risk Assessment platform that helps organizations measure and mitigate enterprise-wide cyber risk in real-time.',
      highlights: [
        'Automated core test cases using <strong>TestCafe</strong>, raising test coverage by 16% and reducing manual testing overhead for the QA team.',
      ],
      summary: null,
      links: [{ text: 'TestCafe', url: 'https://testcafe.io/' }],
    },
  ],
};
