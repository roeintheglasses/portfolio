import { Dialog, Combobox, Transition } from '@headlessui/react';
import { useState, useEffect, Fragment } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { FiCommand } from 'react-icons/fi';
import { motion } from 'motion/react';
import useSound from 'use-sound';

export default function CommandPalette({ navigation }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [ThemeSound] = useSound('/static/sounds/open.mp3');

  const toggleIcon = () => {
    ThemeSound();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleIcon();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const filterednavigation = query
    ? navigation.pages.filter((page: { name: string }) =>
        page.name.toLowerCase().includes(query.toLocaleLowerCase())
      )
    : navigation.pages;
  return (
    <>
      <motion.button
        className="z-20 relative ml-2 mr-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 ease-in-out bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-800"
        type="button"
        aria-label="Command palette"
        whileTap={{
          scale: 0.7
        }}
        transition={{ duration: 0.1, ease: 'easeIn' }}
        onClick={toggleIcon}
      >
        <FiCommand />
      </motion.button>
      <Transition.Root
        show={isOpen}
        as={Fragment}
        afterLeave={() => setQuery('')}
      >
        <Dialog
          onClose={setIsOpen}
          className="fixed inset-0 z-20 overflow-y-auto p-12 pt-[20vh]"
        >
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900/75 " />
          </Transition.Child>
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox
              value=""
              onChange={(page: any) => {
                setIsOpen(false);
                router.push(`${page.href}`);
              }}
              as="div"
              className="relative mx-auto max-h-[50vh] max-w-xl divide-y divide-gray-300 overflow-hidden overflow-y-scroll rounded-lg bg-zinc-200 shadow-2xl dark:divide-zinc-700 dark:bg-zinc-800"
            >
              <div className="flex gap-4 items-center px-4">
                <HiSearch className="h-6 w-6 text-white" />
                <Combobox.Input
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  className="h-12 w-full border-0 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none dark:text-neutral-400"
                  placeholder="Search..."
                  autoComplete="off"
                />
              </div>
              {filterednavigation.length > 0 && (
                <Combobox.Options
                  static
                  className="max-h-30 overflow-y-auto py-4 text-sm"
                >
                  {filterednavigation.map((page) => (
                    <Combobox.Option key={page.name} value={page}>
                      {({ active }) => (
                        <div
                          className={`cursor-pointer space-x-1 px-14  py-2  ${
                            active
                              ? 'bg-zinc-300 dark:bg-zinc-600'
                              : 'bg-zinc-200 dark:bg-zinc-800'
                          }`}
                        >
                          <span
                            className={`font-medium  ${
                              active
                                ? 'text-neutral-900 dark:text-neutral-200'
                                : 'text-neutral-900 dark:text-neutral-200'
                            }`}
                          >
                            {page.name}
                          </span>
                          <span
                            className={`  ${
                              active
                                ? 'text-neutral-700 dark:text-neutral-600'
                                : 'text-neutral-500 dark:text-neutral-800'
                            }`}
                          >
                            {page.repo}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
              {query && filterednavigation.length === 0 && (
                <p className="py-4 px-12 text-sm text-gray-500 ">
                  no results found
                </p>
              )}
            </Combobox>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
