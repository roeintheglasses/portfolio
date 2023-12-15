import Link from 'next/link';
import Image from 'next/future/image';

import Container from 'components/Container';
import avatar from 'public/avatar.jpg';
import avatarBW from 'public/avatar-bw.jpg';

export default function About() {
  return (
    <Container title="About - Hrishikesh Jangir">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
            <li>
              Twitter:{' '}
              <a href="https://twitter.com/roeintheglasses">@roeintheglasses</a>
            </li>
            <li>
              GitHub:{' '}
              <a href="https://github.com/roeintheglasses">@roeintheglasses</a>
            </li>
            <li>
              Website:{' '}
              <Link href="https://roeintheglasses.tech">
                <a>https://roeintheglasses.tech</a>
              </Link>
            </li>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/roeintheglasses/">
                https://www.linkedin.com/in/roeintheglasses
              </a>
            </li>
          </ul>
          <h2>Bio</h2>
          <h3>Job Title</h3>
          <p>Hrishikesh Jangir, SDE at Zelto</p>
          <h3>Long, 1st Person</h3>
          <p>
            Hey, I'm Hrishi. I'm SDE at <a href="https://vercel.com/">Zelto</a>,
            where my team helps developers build a faster web.
          </p>
          <h3>Education</h3>
          <p>
            Hrishikesh Jangir graduated from MRIIRS with a B.Tech degree in
            Computer Engineering.
          </p>
          <h2>Headshots</h2>
          <div className="flex space-x-8">
            <a href="/avatar.jpg">
              <Image
                alt="Hrishikesh Jangir headshot"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
            <a href="/avatar-bw.jpg">
              <Image
                alt="Hrishikesh Jangir headshot"
                width={400}
                quality={100}
                src={avatarBW}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
