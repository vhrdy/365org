import {
    Terminal,
    TypingAnimation,
    AnimatedSpan,
  } from '@/components/ui/shadcn-io/terminal';
  const Example = () => (
    <Terminal className="w-full max-w-full">
      <AnimatedSpan delay={100}>$ npm install upcoin</AnimatedSpan>
      <TypingAnimation delay={1000} duration={100}>
        Installing dependencies...
      </TypingAnimation>
      <AnimatedSpan delay={4000}>✓ Package installed successfully</AnimatedSpan>
      <AnimatedSpan delay={6500}>$ npm run dev</AnimatedSpan>
      <TypingAnimation delay={8500} duration={80}>
        Starting going up only...
      </TypingAnimation>
      <AnimatedSpan delay={10500}>🚀 Server ready at https://upcoin.lol</AnimatedSpan>
      <TypingAnimation delay={12500} duration={80}>
      ✓ Ready to buy at...
      </TypingAnimation>
      <AnimatedSpan delay={14500}>CgwW9y8aLVJKGSLbjRr23mY1iGSDpwgbQetLAph15fRk</AnimatedSpan>

    </Terminal>
  );
  export default Example;