import Container from 'components/Container';
import WorkTimeline from 'components/WorkTimeline';
import { workData } from 'data/work';

export default function WorkPage() {
  return (
    <Container
      title="Work - Hrishikesh Jangir"
      description="My professional journey and work experience."
    >
      <section className="mx-auto w-full max-w-5xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {workData.pageTitle}
        </h1>
        <p className="mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400">{workData.intro}</p>

        <WorkTimeline companies={workData.companies} />
      </section>
    </Container>
  );
}
