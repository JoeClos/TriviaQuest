import { useRef } from 'react';

const useSound = (src: string, isMuted: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(src);
  }

  const play = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.play();
    }
  };

  return play;
};

export default useSound;
