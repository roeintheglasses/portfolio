import {
  IconBrandTypescript,
  IconBrandReact,
  IconBrandReactNative,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandCouchdb,
  IconCpu,
  IconBrandCypress,
  IconTestPipe,
  IconBrandNodejs,
  IconBrandMongodb,
  IconBrandJavascript,
  IconServerBolt,
  IconBrandCss3,
  IconBrandPython,
  IconBrandDjango,
  IconDatabase,
  IconBrandAws,
  IconCode
} from '@tabler/icons-react';

export const skillCategories = {
  "Frontend": [
    {
      chipName: 'JavaScript',
      gradient: 'bg-gradient-to-r from-[#FFBC65] via-[#AC4C5E] to-[#f86c86]',
      icon: IconBrandJavascript
    },
    {
      chipName: 'TypeScript',
      gradient: 'bg-gradient-to-r from-[#382F60] via-[#A45FBE] to-[#485188]',
      icon: IconBrandTypescript
    },
    {
      chipName: 'ReactJs',
      gradient: 'bg-gradient-to-r from-[#f86c86] via-[#FC2947] to-[#AED2FF]',
      icon: IconBrandReact
    },
    {
      chipName: 'React Native',
      gradient: 'bg-gradient-to-r from-[#793FDF] via-[#7091F5] to-[#97FFF4]',
      icon: IconBrandReactNative
    },
    {
      chipName: 'Next JS',
      gradient: 'bg-gradient-to-r from-[#392467] via-[#A367B1] to-[#FFD1E3]',
      icon: IconBrandNextjs
    },
    {
      chipName: 'TailwindCSS',
      gradient: 'bg-gradient-to-r from-[#7149C6] via-[#FC2947] to-[#FE6244]',
      icon: IconBrandTailwind
    },
    {
      chipName: 'CSS',
      gradient: 'bg-gradient-to-r from-[#793FDF] via-[#7091F5] to-[#97FFF4]',
      icon: IconBrandCss3
    }
  ],
  "Backend": [
    {
      chipName: 'NodeJS',
      gradient: 'bg-gradient-to-r from-[#FFF7D4] via-[#FFD95A] to-[#C07F00]',
      icon: IconBrandNodejs
    },
    {
      chipName: 'Express',
      gradient: 'bg-gradient-to-r from-[#5FBDFF] via-[#96EFFF] to-[#C5FFF8]',
      icon: IconServerBolt
    },
    {
      chipName: 'Python',
      gradient: 'bg-gradient-to-r from-[#3776ab] via-[#ffd343] to-[#3776ab]',
      icon: IconBrandPython
    },
    {
      chipName: 'Django',
      gradient: 'bg-gradient-to-r from-[#092e20] via-[#44b78b] to-[#092e20]',
      icon: IconBrandDjango
    },
    {
      chipName: 'Pydantic',
      gradient: 'bg-gradient-to-r from-[#e92063] via-[#ff6b9d] to-[#e92063]',
      icon: IconDatabase
    },
    {
      chipName: 'Pandas',
      gradient: 'bg-gradient-to-r from-[#130654] via-[#e70488] to-[#130654]',
      icon: IconDatabase
    }
  ],
  "Database": [
    {
      chipName: 'PostgreSQL',
      gradient: 'bg-gradient-to-r from-[#336791] via-[#8cc8ff] to-[#336791]',
      icon: IconDatabase
    },
    {
      chipName: 'MongoDB',
      gradient: 'bg-gradient-to-r from-[#FFBC65] via-[#AC4C5E] to-[#f86c86]',
      icon: IconBrandMongodb
    },
    {
      chipName: 'DynamoDB',
      gradient: 'bg-gradient-to-r from-[#ff9900] via-[#ffcc66] to-[#ff9900]',
      icon: IconBrandAws
    },
    {
      chipName: 'Couchbase',
      gradient: 'bg-gradient-to-r from-[#FFF7D4] via-[#FFD95A] to-[#C07F00]',
      icon: IconBrandCouchdb
    }
  ],
  "Messaging & Streaming": [
    {
      chipName: 'Kafka',
      gradient: 'bg-gradient-to-r from-[#231f20] via-[#7c7c7c] to-[#231f20]',
      icon: IconCpu
    },
    {
      chipName: 'Kinesis',
      gradient: 'bg-gradient-to-r from-[#ff9900] via-[#ffb366] to-[#ff9900]',
      icon: IconBrandAws
    },
    {
      chipName: 'RabbitMQ',
      gradient: 'bg-gradient-to-r from-[#f86c86] via-[#FC2947] to-[#AED2FF]',
      icon: IconCpu
    }
  ],
  "Testing": [
    {
      chipName: 'Jest',
      gradient: 'bg-gradient-to-r from-[#F8DE22] via-[#F94C10] to-[#FF55BB]',
      icon: IconTestPipe
    },
    {
      chipName: 'Cypress',
      gradient: 'bg-gradient-to-r from-[#B6EAFA] via-[#97FFF4] to-[#FF55BB]',
      icon: IconBrandCypress
    },
    {
      chipName: 'Playwright',
      gradient: 'bg-gradient-to-r from-[#2eaa4f] via-[#45d62c] to-[#2eaa4f]',
      icon: IconCode
    }
  ]
};

// Keep backward compatibility
export const skills = Object.values(skillCategories).flat();