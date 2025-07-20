export const workData = {
  pageTitle: "My work",
  intro: "Currently working on solving ad-tech problems at scale. I code for passion & design for fun. On a mission to build efficient and accessible products and help the next generation of devs along the way. Here's a summary of my work so far :",
  companies: [
    {
      id: "pubxai",
      name: "Pubx AI",
      role: "Senior Fullstack Engineer",
      period: "August 2024 - Present",
      website: "https://pubx.ai/",
      description: "I joined Pubx AI in August 2024 as a Senior Fullstack Engineer. Pubx AI is an AI-driven price floor optimization platform that helps publishers increase ad revenues through dynamic floor pricing, targeting a minimum 3X ROI.",
      highlights: [
        "Built a comprehensive automated E2E testing and validation pipeline using Playwright and LambdaTest that validates client tags across live publisher sites in multiple geolocations and browsers. The system processes test results through Kafka queues, stores data in Parquet format on S3, and powers both automated alerting and Grafana analytics dashboards. This pipeline reduced manual QA time by 50% while proactively catching production issues.",
        "Worked on the complete rebuild of the publisher-facing dashboard from ground up, collaborating closely with product and UX teams to create the next generation publisher experience. As the primary stakeholder, I implemented the core architecture using React, TypeScript, and shadcn/ui components based on Figma designs, along with a Django backend API. Focused on simplifying complex reports and billing interfaces while developing sophisticated data aggregation solutions to handle Simpson's paradox in analytics reporting. The new dashboard improved publisher engagement by 40% and reduced support tickets by 60%.",
        "Optimized Pubx's data aggregation pipelines for Classification and DBM models by migrating from AWS Kinesis to managed Kafka (WarpStream), reducing monthly AWS costs by almost 45%. I also built a Python-based data validation service using Pydantic that ensures data integrity before ML pipeline consumption. These infrastructure improvements increased data processing throughput by 3x while maintaining 99.9% data integrity, with analytics powered by AWS Athena for real-time insights.",
        "Currently developing Stream, Pubx's new Tag Management & Automation Service that captures additional datapoints from our JavaScript tags and combines them with realtime auction data which is then consumed by a set of decision tree algorithms. The service allows us to automate feature deployments, optimize floor model parameters, and handle rollbacks via Athena-powered analytics. This has resulted in a 80% reduction in manual configuration and operational overhead.",
      ],
      summary: null,
      links: [
        { text: "Playwright", url: "https://playwright.dev/" },
        { text: "LambdaTest", url: "https://www.lambdatest.com/" },
        { text: "Kafka", url: "https://kafka.apache.org/" },
        { text: "WarpStream", url: "https://www.warpstream.com/" },
        { text: "Pydantic", url: "https://docs.pydantic.dev/" },
        { text: "AWS Athena", url: "https://aws.amazon.com/athena/" },
        { text: "Grafana", url: "https://grafana.com/" },
        { text: "Publisher Dashboard", url: "https://publisher.pubx.ai/" },
        { text: "React", url: "https://react.dev/" },
        { text: "Shadcn", url: "https://ui.shadcn.com/" },
        { text: "Figma", url: "https://www.figma.com/" },
        { text: "TypeScript", url: "https://www.typescriptlang.org/" },
        { text: "Django", url: "https://www.djangoproject.com/" }
      ]
    },
    {
      id: "adpushup",
      name: "Adpushup",
      role: "SDE & Team Lead (Instream Video)",
      period: "August 2021 - July 2024",
      website: "https://adpushup.com/",
      description: "I joined Adpushup in 2021 as an Associate Software Developer. Initially, I worked on building the AMP Yield project, an in-house Ad analytics & performance monitoring system for AMP based sites which allowed the company to reach out to over 200+ new publishers with credible analytics data for onboarding.",
      highlights: [
        "In 2022, I was promoted to SDE and worked on the Glimpse & Glimpse for Ads project where we made publisher links come to life with stunning link previews.",
        "In 2022, I also led an internal product documentation team, creating standards for our internal documentation on JIRA and Notion.",
        "Towards the end of 2022 and further in 2023, I started leading the development of our in-house video player solution and the Floor Engine. My team of 4 engineers worked on the development of a VideoJS based player with support for Instream Video Ads utilizing Interactive Media Ads SDK and PrebidJS.",
        "In 2023, I also worked on Adpushup's floor price optimization engine designed specifically for video ads called FloorSense which utilized PySpark, TypeScript and NodeJs to dynamically generate price floors for ad bids based on historical data trends."
      ],
      summary: "During my time at Adpushup from 2021 to 2024, I actively contributed to internal ad-tech solutions and the developer community. I worked on creating new products from ground up (which contributed to an uplift of around 30% in Gross Revenue) while solving complex problems such as building an end-to-end video transcoding pipeline, developing a video player catered for instream ads from scratch, creating a dynamic floor price engine, building large scale systems to crawl websites and generate link previews, and developing custom VideoJS plugins.",
      links: [
        { text: "Glimpse", url: "https://www.adpushup.com/glimpse/" },
        { text: "Glimpse for Ads", url: "https://www.adpushup.com/glimpse-for-ads/" },
        { text: "VideoJS", url: "https://videojs.com/" },
        { text: "Interactive Media Ads SDK", url: "https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side" },
        { text: "PrebidJS", url: "https://docs.prebid.org/prebid/prebidjs.html" },
        { text: "FloorSense", url: "https://www.adpushup.com/floor-sense/" }
      ]
    },
    {
      id: "quikieapps",
      name: "QuikieApps",
      role: "SDE",
      period: "August 2020 — July 2021",
      website: null,
      description: "QuikieApps is a IT service and consulting company specializing in fullstack development. Here I joined a team of developers working across web and mobile platforms on various client projects based on MERN Stack and React Native.",
      highlights: [
        "On the team, I worked over 6 different client projects with React, React Native and NodeJS based codebases. I even worked on moving projects from a custom webpack and React configuration to Next.js and the latest React patterns.",
        "At QuikieApps, I was able to work on some hard problems: decoupling a decade old monolith into microservices, working on payment gateway integration such as Razorpay & BillDesk, learning and occasionally managing docker containers, building and implementing a design system for client apps, incrementally migrating individual components and routes to new frameworks and infrastructure, and more."
      ],
      summary: null,
      links: [
        { text: "React", url: "https://react.dev/" },
        { text: "React Native", url: "https://reactnative.dev/" },
        { text: "NodeJS", url: "https://nodejs.org/en" },
        { text: "Next.js", url: "https://nextjs.org/" },
        { text: "Razorpay", url: "https://razorpay.com/docs/#home-payments" },
        { text: "BillDesk", url: "https://docs.billdesk.io/" }
      ]
    },
    {
      id: "safe",
      name: "Safe Security",
      role: "Testing Automation Intern",
      period: "March 2019 — July 2019",
      website: null,
      description: "Safe Security is a Cybersecurity and Digital Risk Assessment platform that helps organizations measure and mitigate enterprise-wide cyber risk in real-time. At Safe I worked as a testing automation intern over the summer of 2019 and automated their core test cases using TestCafe and raised test coverage by 16%.",
      highlights: [],
      summary: null,
      links: []
    }
  ]
};