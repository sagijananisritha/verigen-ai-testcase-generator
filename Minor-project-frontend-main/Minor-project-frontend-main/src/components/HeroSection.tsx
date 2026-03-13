import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: Props) => (
  <section className="py-20 text-center space-y-6">
    <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
      VeriGen AI
    </h1>
    <p className="text-lg text-muted-foreground font-medium">
      Intelligent Software Test Case Generator
    </p>
    <p className="text-base text-muted-foreground max-w-2xl mx-auto">
      Automatically convert software requirements into structured and categorized test cases.
    </p>
    <Button size="lg" className="mt-4 text-base px-8" onClick={onGetStarted}>
      Generate Test Cases
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  </section>
);

export default HeroSection;
