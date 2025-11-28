declare module 'use-sound' {
  interface HookOptions {
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: Record<string, [number, number]>;
    onload?: () => void;
    onend?: () => void;
    onpause?: () => void;
    onstop?: () => void;
    onplay?: () => void;
  }

  interface ExposedData {
    sound: Howl | null;
    stop: (id?: string) => void;
    pause: (id?: string) => void;
    duration: number | null;
  }

  type PlayFunction = (options?: { id?: string; forceSoundEnabled?: boolean }) => void;

  export default function useSound(
    src: string | string[],
    options?: HookOptions
  ): [PlayFunction, ExposedData];
}
