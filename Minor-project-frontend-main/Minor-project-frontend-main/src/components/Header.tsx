import { FlaskConical } from "lucide-react";

const Header = () => (
  <header className="border-b border-border bg-card">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center gap-3 h-16">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
        <FlaskConical className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-lg font-semibold leading-tight text-foreground tracking-tight">
          VeriGen AI
        </h1>
        <p className="text-xs text-muted-foreground leading-tight">
          Intelligent Software Test Case Generator
        </p>
      </div>
    </div>
  </header>
);

export default Header;
