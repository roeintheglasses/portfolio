import prisma from 'lib/prisma';
import Container from 'components/Container';
import Guestbook from 'components/Guestbook';

export default function GuestbookPage({ fallbackData }) {
  return (
    <Container
      title="Guestbook - Hrishikesh Jangir"
      description="Drop a message - feedback, tech recommendations, or just say hi. Always curious to connect with fellow developers."
    >
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
        Guestbook
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Hey! I'm Hrishikesh, a 25-year-old fullstack engineer building ad-tech solutions 
        and experimenting with AI. When I'm not debugging production issues or wrangling 
        data pipelines, I'm working on products that make a positive impact - think accessible 
        tech that empowers people and future-proof solutions that actually last. When the code 
        editor closes, I'm probably tinkering with RAG systems or getting destroyed in Valorant. 
        Drop a message below - could be feedback, a tech recommendation, appreciation, or even 
        something completely random. Always curious to connect and see what surprises me.
      </p>
      <Guestbook fallbackData={fallbackData} />
    </Container>
  );
}

export async function getStaticProps() {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc'
    }
  });

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString()
  }));

  return {
    props: {
      fallbackData
    },
    revalidate: 60
  };
}
