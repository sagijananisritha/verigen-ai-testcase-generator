import { Cpu, ShieldCheck, Table2, Zap, Download, FileText } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Automated Test Case Generation",
    description: "Converts software requirements into structured test cases automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Positive, Negative & Edge Case Coverage",
    description: "Ensures complete functional validation coverage.",
  },
  {
    icon: Table2,
    title: "Structured Output Format",
    description: "Generates test cases with ID, Steps, Test Data, Expected Result, Priority and Severity.",
  },
  {
    icon: Zap,
    title: "Faster SDLC Process",
    description: "Reduces manual effort and speeds up testing cycles.",
  },
  {
    icon: Download,
    title: "Export Capability",
    description: "Download generated test cases in CSV format.",
  },
  {
    icon: FileText,
    title: "Consistent & Standardized Documentation",
    description: "Maintains uniform testing structure across projects.",
  },
];

const FeaturesSection = () => (
  <section className="py-12">
    <h2 className="text-2xl font-semibold text-foreground text-center mb-10">Key Features</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((f) => (
        <div
          key={f.title}
          className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow space-y-3"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <f.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
