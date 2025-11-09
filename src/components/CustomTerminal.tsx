import { useEffect } from 'react';
import {
    Terminal,
    TypingAnimation,
    AnimatedSpan,
  } from '@/components/ui/shadcn-io/terminal';

type CustomTerminalProps = {
  onComplete?: (done: boolean) => void;
};

const CustomTerminal = ({ onComplete }: CustomTerminalProps) => {
  // dernier élément: AnimatedSpan delay=14500
  // on ajoute un petit buffer pour être sûr que tout est rendu
  const totalDurationMs = 14500 + 500;

  useEffect(() => {
    if (!onComplete) return;

    const timer = setTimeout(() => {
      onComplete(true);
    }, totalDurationMs);

    return () => clearTimeout(timer);
  }, [onComplete, totalDurationMs]);

  return (
    <div className="container terminal">

    <Terminal className="w-full max-w-full">
      <AnimatedSpan delay={100}>$ npm install 365</AnimatedSpan>
      <TypingAnimation delay={1000} duration={100}>
        Installing dependencies...
      </TypingAnimation>
      <AnimatedSpan delay={4000}>✓ Package installed successfully</AnimatedSpan>
      <AnimatedSpan delay={6500}>$ npm run dev</AnimatedSpan>
      <TypingAnimation delay={8500} duration={80}>
        Starting...
      </TypingAnimation>
      <AnimatedSpan delay={10500}>🚀 Server ready https://www.365art.org/</AnimatedSpan>
      <TypingAnimation delay={12500} duration={80}>
        ✓ Ready to buy at...
      </TypingAnimation>
      <AnimatedSpan delay={14500}>4ztyXrk7YLUwJ56o1sAXMm7UM1xc4idF45HUcqM3pump</AnimatedSpan>
    </Terminal>
    </div>
  );
};

export default CustomTerminal;