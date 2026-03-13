import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TestCase } from "@/pages/Index";
import { Badge } from "@/components/ui/badge";

interface Props {
  testCases: TestCase[];
  onExport: () => void;
}

const priorityColor: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-green-100 text-green-700",
};

const severityColor: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  Major: "bg-amber-100 text-amber-700",
  Minor: "bg-green-100 text-green-700",
};

const TestCaseTable = ({ testCases, onExport }: Props) => (
  <section className="space-y-4">
    <h2 className="text-base font-semibold text-foreground">Generated Test Cases</h2>

    <div className="rounded-lg border border-border bg-card shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted text-muted-foreground text-left">
            <th className="px-4 py-3 font-medium whitespace-nowrap">Test Case ID</th>
            <th className="px-4 py-3 font-medium">Scenario</th>
            <th className="px-4 py-3 font-medium">Steps</th>
            <th className="px-4 py-3 font-medium">Test Data</th>
            <th className="px-4 py-3 font-medium">Expected Result</th>
            <th className="px-4 py-3 font-medium whitespace-nowrap">Priority</th>
            <th className="px-4 py-3 font-medium whitespace-nowrap">Severity</th>
          </tr>
        </thead>
        <tbody>
          {testCases.map((tc, i) => (
            <tr
              key={tc.id}
              className={`border-t border-border ${i % 2 === 1 ? "bg-muted/40" : ""} hover:bg-muted/60 transition-colors`}
            >
              <td className="px-4 py-3 font-mono text-xs whitespace-nowrap text-primary font-semibold">
                {tc.id}
              </td>
              <td className="px-4 py-3 min-w-[180px]">{tc.scenario}</td>
              <td className="px-4 py-3 whitespace-pre-line min-w-[200px] text-muted-foreground">
                {tc.steps}
              </td>
              <td className="px-4 py-3 whitespace-pre-line min-w-[140px] font-mono text-xs">
                {tc.testData}
              </td>
              <td className="px-4 py-3 min-w-[180px]">{tc.expectedResult}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <Badge variant="outline" className={`${priorityColor[tc.priority]} border-0 text-xs`}>
                  {tc.priority}
                </Badge>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <Badge variant="outline" className={`${severityColor[tc.severity]} border-0 text-xs`}>
                  {tc.severity}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex justify-end">
      <Button variant="outline" onClick={onExport}>
        <Download className="mr-2 h-4 w-4" />
        Export to CSV
      </Button>
    </div>
  </section>
);

export default TestCaseTable;
