export const getHomeData = (LinkPreview) => ({
  hero: {
    name: "Hrishikesh Jangir",
    title: "Senior Fullstack Engineer at",
    company: {
      name: "Pubx AI",
      url: "https://pubx.ai/"
    },
    description: "Senior Fullstack Engineer at Pubx AI, building AI-driven price floor optimization platforms and scalable ad-tech solutions. When I'm not debugging automated testing pipelines or crafting publisher dashboards, I'm probably tinkering with AI models or getting outplayed in Valorant. Building stuff that scales, one merge request at a time.",
    resume: {
      text: "My Resume",
      url: "//drive.google.com/file/d/1PuoWY1FFYisu46B7zFlpX0pdqGft53T1/view?usp=sharing"
    },
    avatar: {
      src: "/avatar.png",
      alt: "Hrishikesh Jangir"
    }
  },
  workExperience: {
    title: "Work Experience",
    description: "My professional journey through different companies and roles",
    timeline: [
      {
        title: "2024 - Present",
        content: (
          <div>
            <div className="flex items-center gap-4 mb-2">
              <LinkPreview
                url="https://pubx.ai/"
                className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                width={250}
                height={150}
              >
                Pubx AI
              </LinkPreview>
              <img
                src="/static/images/companies/Pubx.jpg"
                alt="Pubx AI logo"
                width={32}
                height={32}
                className="rounded-md object-cover h-8 w-8 shadow-sm"
              />
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-6">
              Senior Fullstack Engineer
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-6">
              Building AI-driven price floor optimization platforms that help publishers increase ad revenues through dynamic floor pricing. Leading development of automated modeling pipelines, testing frameworks, and publisher dashboards while working on large-scale data aggregation systems.
            </p>
            <div className="max-w-sm">
              <img
                src="/static/images/companies/Pubx_work.jpg"
                alt="Hrishikesh at Pubx AI"
                 width={300}
                height={225}
                className="rounded-lg object-cover h-32 md:h-40 w-full shadow-lg"
              />
            </div>
          </div>
        ),
      },
      {
        title: "2021 - 2024",
        content: (
          <div>
            <div className="flex items-center gap-4 mb-2">
              <LinkPreview
                url="https://adpushup.com/"
                className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                width={250}
                height={150}
              >
                Adpushup
              </LinkPreview>
              <img
                src="/static/images/companies/Adpushup.jpg"
                alt="Adpushup logo"
                width={32}
                height={32}
                className="rounded-md object-cover h-8 w-8 shadow-sm"
              />
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-6">
              SDE & Team Lead
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-6">
              Led a team of 4 engineers working on the FrameRate video player that serves instream video ads at scale. Built and architected video advertising solutions for publishers, helping them optimize ad revenue through innovative video player technology and dynamic floor pricing systems.
            </p>
            <div className="max-w-sm">
              <img
                src="/static/images/companies/Adpushup_work.jpg"
                alt="Hrishikesh at Adpushup"
                width={300}
                height={225}
                className="rounded-lg object-cover h-32 md:h-40 w-full shadow-lg"
              />
            </div>
          </div>
        ),
      },
      {
        title: "2020 - 2021",
        content: (
          <div>
            <div className="flex items-center gap-4 mb-2">
              <LinkPreview
                url="https://www.linkedin.com/company/quikieapps/"
                className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                width={250}
                height={150}
              >
                Quikie Apps
              </LinkPreview>
              <img
                src="/static/images/companies/QuikieApps.jpg"
                alt="QuikieApps logo"
                width={300}
                height={225}
                className="rounded-md object-cover h-8 w-8 shadow-sm"
              />
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-6">
              Software Development Engineer
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-6">
              Worked as a fullstack developer on multiple MERN Stack and React Native projects for various clients. Specialized in creating cross-platform mobile applications and web solutions, collaborating directly with clients to deliver custom software solutions.
            </p>
            <div className="max-w-sm">
              <img
                src="/static/images/companies/Quikieapps_work.jpg"
                alt="Hrishikesh at QuikieApps"
                width={300}
                height={225}
                className="rounded-lg object-cover h-32 md:h-40 w-full shadow-lg"
              />
            </div>
          </div>
        ),
      },
      {
        title: "2019",
        content: (
          <div>
            <div className="flex items-center gap-4 mb-2">
              <LinkPreview
                url="https://safe.security/"
                className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
                width={250}
                height={150}
              >
                Safe Security
              </LinkPreview>
              <img
                src="/static/images/companies/safe.jpg"
                alt="Safe Security logo"
                width={32}
                height={32}
                className="rounded-md object-cover h-8 w-8 shadow-sm"
              />
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-6">
              Testing Intern
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-6">
              Started my career in cybersecurity, working on a platform that helps organizations measure and mitigate enterprise-wide cyber risk in real-time. Focused on automating core test cases and contributing to digital business risk assessment systems.
            </p>
            <div className="max-w-sm">
              <img
                src="/static/images/companies/safe_work.jpg"
                alt="Hrishikesh at Safe Security"
                width={300}
                height={225}
                className="rounded-lg object-cover h-32 md:h-40 w-full shadow-lg"
              />
            </div>
          </div>
        ),
      },
    ],
    companies: [
      {
        key: "pubxai",
        gradient: "from-[#F05223] via-[#FF6B47] to-[#FFB199]"
      },
      {
        key: "adpushup", 
        gradient: "from-[#B6EAFA] via-[#97FFF4] to-[#FF55BB]"
      },
      {
        key: "quikieApps",
        gradient: "from-[#793FDF] via-[#97FFF4] to-[#B6EAFA]"
      },
      {
        key: "safe",
        gradient: "from-[#FF55BB] via-[#FFD3A3] to-[#B6EAFA]"
      }
    ]
  },
  techStack: {
    title: "Tech Stack & Skills",
    description: "As someone who loves building things with JavaScript, I enjoy working in the exciting space where creativity meets practicality. My journey with tech is a blender full of creativity & precision running on high settings, and I use a bunch of really cool tools. Let me show you a bit of the tech stack I work with:"
  }
});

// Export static data for components that don't need LinkPreview
export const homeData = getHomeData(() => null);