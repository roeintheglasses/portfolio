import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../api/auth/[...nextauth]';
import Image from 'next/image';
import {
  IconBrandGoogle,
  IconBrandDiscord,
  IconBrandGithub
} from '@tabler/icons-react';

import Container from 'components/Container';

const iconMapping = {
  github: IconBrandGithub,
  google: IconBrandGoogle,
  discord: IconBrandDiscord
};
export default function SignIn({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container
      title="About - Hrishikesh Jangir"
      description="All the info you can need about me."
    >
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto shadow sm:max-w-xl">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <div
            className={
              'transform hover:-translate-y-2 hover:scale-105 transition-all rounded-full w-max animate-gradient-xy bg-gradient-to-r from-[#FDE68A] via-[#FCA5A5] to-[#FECACA] p-1'
            }
          >
            <Image
              alt="Hrishikesh Jangir"
              height={250}
              width={250}
              src="/avatar.png"
              sizes="30vw"
              priority
              className="rounded-full bg-gray-50 dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90"
            />
          </div>
        </a>
        <div className="w-full">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight  text-center tracking-tight text-gray-900 dark:text-white">
              Login to guestbook
            </h1>
            <div className="space-y-4 md:space-y-6">
              {Object.values(providers).map((provider) => {
                console.log(provider);
                let Icon = iconMapping[provider.id];

                return (
                  <div key={provider.name}>
                    <button
                      onClick={() => signIn(provider.id)}
                      className="w-full flex flex-row gap-2 tracking-tight leading-tight font-semibold justify-center items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {' '}
                      <Icon key={provider.id} />
                      Sign in with {provider.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] }
  };
}
