"use client";

import { useState } from "react";
import { HiOutlinePlay, HiOutlineArrowPath } from "react-icons/hi2";
import { Button } from "@/components/ui/Button";

interface PracticeWorkspaceProps {
  type: string;
}

export function PracticeWorkspace({ type }: PracticeWorkspaceProps) {
  const [code, setCode] = useState(() => {
    if (type === "sql") return "SELECT *\nFROM users\nWHERE status = 'active';";
    if (type === "typing") return "The quick brown fox jumps over the lazy dog.";
    if (type === "power-bi") return "DAX:\n\nTotal Sales = SUM(Sales[Amount])\n\n// Create a measure for YoY Growth\nYoY Growth = \n  DIVIDE(\n    [Total Sales] - [Previous Year Sales],\n    [Previous Year Sales]\n  )";
    if (type === "quiz") return "// Question 1: What is closure in JavaScript?\n\n// Type your answer here:\n";
    return "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));";
  });
  
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const title = 
    type === "sql" ? "SQL Practice" : 
    type === "typing" ? "Typing Practice" : 
    type === "power-bi" ? "Power BI Practice" :
    type === "quiz" ? "Quiz" :
    "Code Workbench";

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      if (type === "sql") {
        setOutput("> Executing query...\n> 3 rows returned.\n\n| id | name  | status |\n|----|-------|--------|\n| 1  | Alice | active |\n| 2  | Bob   | active |\n| 3  | Carol | active |");
      } else if (type === "typing") {
        setOutput("> Typing speed test complete.\n> WPM: 85\n> Accuracy: 98%");
      } else if (type === "power-bi") {
        setOutput("> Validating DAX syntax...\n> Success! Measure 'YoY Growth' created.\n> Chart visualization updated.");
      } else if (type === "quiz") {
        setOutput("> Submitting answer...\n> Correct! A closure is the combination of a function bundled together with references to its surrounding state.");
      } else {
        setOutput("> Running script...\n\nHello, World!");
      }
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] lg:h-[calc(100vh-8rem)] w-full flex-col lg:flex-row gap-4">
      {/* Left Panel - Instructions */}
      <div className="flex w-full flex-col rounded-card bg-card border border-border lg:w-1/3 min-h-[300px] lg:min-h-0">
        <div className="border-b border-border p-4">
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">Beginner</span>
            <span className="text-xs text-text-secondary">50 Points</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 text-sm text-text-secondary">
          <h3 className="mb-2 font-semibold text-text-primary">Task Description</h3>
          {type === "sql" ? (
            <p>Write a query to retrieve all active users from the database.</p>
          ) : type === "typing" ? (
            <p>Type the text as quickly and accurately as possible.</p>
          ) : type === "power-bi" ? (
            <p>Write a DAX measure to calculate Year-over-Year (YoY) Sales Growth.</p>
          ) : type === "quiz" ? (
            <p>Answer the multiple choice or short answer question provided in the editor.</p>
          ) : (
            <p>Write a function that takes a name and returns a greeting message. Log the result to the console.</p>
          )}
          <div className="mt-6">
            <h3 className="mb-2 font-semibold text-text-primary">Expected Output</h3>
            <div className="rounded-md bg-hover p-3 font-mono text-xs text-text-secondary">
              {type === "sql" ? "3 active user records" : 
               type === "typing" ? "High WPM score" : 
               type === "power-bi" ? "Valid DAX Syntax" :
               type === "quiz" ? "Correct evaluation" :
               "Hello, World!"}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Editor & Console */}
      <div className="flex w-full flex-col gap-4 lg:w-2/3 min-h-[500px] lg:min-h-0">
        <div className="flex flex-1 flex-col overflow-hidden rounded-card bg-[#1e1e1e] border border-border shadow-inner">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Editor</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCode("")}
                className="rounded p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                title="Reset"
              >
                <HiOutlineArrowPath className="h-4 w-4" />
              </button>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 resize-none bg-transparent p-4 font-mono text-sm text-gray-300 focus:outline-none focus:ring-0"
            spellCheck="false"
          />
        </div>

        <div className="flex h-48 flex-col overflow-hidden rounded-card bg-[#0f0f11] border border-border shadow-inner">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Console Output</span>
            <Button 
              size="sm" 
              onClick={handleRun}
              disabled={isRunning}
              className="h-7 px-3 py-0 text-xs font-semibold"
            >
              {isRunning ? "Running..." : (
                <div className="flex items-center">
                  <HiOutlinePlay className="mr-1 h-3 w-3" /> Run Code
                </div>
              )}
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm text-gray-400">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <span className="text-gray-600 italic">Click 'Run Code' to see output here...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
