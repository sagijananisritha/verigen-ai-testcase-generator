import { useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RequirementInput from "@/components/RequirementInput";
import TestCaseTable from "@/components/TestCaseTable";
import Footer from "@/components/Footer";

export interface TestCase {
  id: string;
  scenario: string;
  steps: string;
  testData: string;
  expectedResult: string;
  priority: "High" | "Medium" | "Low";
  severity: "Critical" | "Major" | "Minor";
}

const sampleTestCases: TestCase[] = [
  {
    id: "TC-001",
    scenario: "Valid user login with correct credentials",
    steps: "1. Navigate to login page\n2. Enter valid email\n3. Enter valid password\n4. Click 'Login'",
    testData: "Email: user@test.com\nPassword: Test@123",
    expectedResult: "User is redirected to the dashboard with a welcome message",
    priority: "High",
    severity: "Critical",
  },
  {
    id: "TC-002",
    scenario: "Login with invalid password",
    steps: "1. Navigate to login page\n2. Enter valid email\n3. Enter incorrect password\n4. Click 'Login'",
    testData: "Email: user@test.com\nPassword: wrong123",
    expectedResult: "Error message 'Invalid credentials' is displayed",
    priority: "High",
    severity: "Major",
  },
  {
    id: "TC-003",
    scenario: "Login with empty fields",
    steps: "1. Navigate to login page\n2. Leave email and password empty\n3. Click 'Login'",
    testData: "Email: (empty)\nPassword: (empty)",
    expectedResult: "Validation errors shown for both fields",
    priority: "Medium",
    severity: "Minor",
  },
  {
    id: "TC-004",
    scenario: "Password reset request",
    steps: "1. Click 'Forgot Password'\n2. Enter registered email\n3. Click 'Send Reset Link'",
    testData: "Email: user@test.com",
    expectedResult: "Success message displayed and reset email sent",
    priority: "Medium",
    severity: "Major",
  },
  {
    id: "TC-005",
    scenario: "Session timeout after inactivity",
    steps: "1. Login successfully\n2. Wait 30 minutes without activity\n3. Attempt any action",
    testData: "Timeout: 30 min",
    expectedResult: "User is logged out and redirected to login page",
    priority: "Low",
    severity: "Minor",
  },
];

const Index = () => {
  const [requirement, setRequirement] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  
  const handleGenerate = async () => {
    if (!requirement.trim()) return;

    setIsGenerating(true);

    try {
        const response = await fetch('http://127.0.0.1:8000/generate-test-cases/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requirement_text: requirement })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        const formattedTestCases = result.data.test_cases.map((tc: any, index: number) => ({
             id: `TC-${index + 1}`,
             scenario: tc.scenario,
             steps: tc.test_steps,
             testData: tc.category, 
             expectedResult: tc.expected_result,
             priority: "Medium", 
             severity: "Minor"  
        }));
        
        setTestCases(formattedTestCases); 

    } catch (error) {
        console.error("Failed to generate test cases:", error);
        alert("Failed to connect to backend. Is Python running?");
    } finally {
        setIsGenerating(false);
    }
};
  

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExportCSV = () => {
    const headers = ["Test Case ID", "Scenario", "Steps", "Test Data", "Expected Result", "Priority", "Severity"];
    const rows = testCases.map((tc) => [
      tc.id,
      `"${tc.scenario}"`,
      `"${tc.steps.replace(/\n/g, "; ")}"`,
      `"${tc.testData.replace(/\n/g, "; ")}"`,
      `"${tc.expectedResult}"`,
      tc.priority,
      tc.severity,
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test_cases.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 flex-1">
        <HeroSection onGetStarted={scrollToInput} />
        <FeaturesSection />
        <div ref={inputRef}>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Requirement Analyzer</h2>
          <RequirementInput
            value={requirement}
            onChange={setRequirement}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
        {testCases.length > 0 && (
          <TestCaseTable testCases={testCases} onExport={handleExportCSV} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
