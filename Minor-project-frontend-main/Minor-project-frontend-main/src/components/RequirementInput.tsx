import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const RequirementInput = ({ value, onChange, onGenerate, isGenerating }: Props) => (
  <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
    <Label htmlFor="requirement" className="text-sm font-medium text-foreground mb-2 block">
      Enter Software Requirement
    </Label>
    <Textarea
      id="requirement"
      placeholder="e.g. The system shall allow users to log in using email and password with a maximum of 5 failed attempts before account lockout..."
      className="min-h-[140px] resize-y text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <div className="mt-4 flex justify-end">
      <Button
        onClick={onGenerate}
        disabled={!value.trim() || isGenerating}
        className="min-w-[180px]"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          "Generate Test Cases"
        )}
      </Button>
    </div>
  </section>
);

export default RequirementInput;
