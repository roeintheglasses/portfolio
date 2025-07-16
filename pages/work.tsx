import type { Metadata } from 'next';
import Container from 'components/Container';
import { workData } from 'data/work';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A summary of my work and contributions across companies.'
};

export default function WorkPage() {
  return (
    <Container title="Work - Hrishikesh Jangir">
      <section>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
          {workData.pageTitle}
        </h1>
        <div className="text-gray-700 text-l dark:text-gray-300 mb-16 prose prose-lg prose-neutral prose-a:text-gray-800 hover:prose-a:text-blue-400 dark:prose-a:text-gray-200 dark:prose-invert dark:hover:prose-a:text-blue-400 max-w-5xl">
          <p>{workData.intro}</p>

          {workData.companies.map((company, index) => (
            <div key={company.id}>
              {index > 0 && (
                <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
              )}
              <h2 className="font-medium text-xl mb-1 tracking-tighter">
                {company.name}
              </h2>
              <h4 className="text-neutral-600 dark:text-neutral-400 text-sm">
                {company.role}
                {company.period && `, ${company.period}`}
              </h4>
              <p>
                {company.website ? (
                  <>
                    {company.description.split(company.name)[0]}
                    <a href={company.website}>{company.name}</a>
                    {company.description.split(company.name)[1]}
                  </>
                ) : (
                  company.description
                )}
              </p>
              
              {company.highlights.length > 0 && (
                <ul>
                  {company.highlights.map((highlight, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: highlight }} />
                  ))}
                </ul>
              )}
              
              {company.summary && (
                <p dangerouslySetInnerHTML={{ __html: company.summary }} />
              )}
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
