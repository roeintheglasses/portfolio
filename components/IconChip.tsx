import { motion } from 'motion/react';
import useSound from 'use-sound';

const IconChip = ({ Icon, link = '#' }) => {
  // When mounted on client, now we can show the UI

  const [ThemeSound] = useSound('/static/sounds/switch-on.mp3');

  return (
    <div className="relative z-20 ml-1 cursor-pointer rounded-xl bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-400 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800">
      <motion.a
        className="flex h-10 w-10 items-center justify-center p-2"
        whileTap={{
          scale: 0.7,
          rotate: 360
        }}
        transition={{ duration: 0.2, ease: 'easeIn' }}
        aria-label="Github"
        type="button"
        onClick={() => {
          ThemeSound();
        }}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="h-5 w-5 hover:animate-pulse" />
      </motion.a>
    </div>
  );
};

export default IconChip;
