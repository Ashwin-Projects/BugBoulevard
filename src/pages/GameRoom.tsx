import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Send, Users, Trophy, Bug, CheckCircle, Play, AlertCircle, PartyPopper, X, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { postJson } from "@/lib/api";

const GameRoom = () => {
  const navigate = useNavigate();
  const { mode } = useParams<{ mode: string }>();

  const modeMap: { [key: string]: string } = {
    'javascript-bug-hunt': 'JavaScript Bug Hunt',
    'python-debug-challenge': 'Python Debug Challenge',
    'react-component-fix': 'React Component Fix',
    'algorithm-race': 'Algorithm Race',
  };

  const gameMode = modeMap[mode || ''] || 'JavaScript Bug Hunt';

  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [currentProblem, setCurrentProblem] = useState(0);
  const [completedProblems, setCompletedProblems] = useState<number[]>([]);
  const [showFinalCompletion, setShowFinalCompletion] = useState(false);
  const [timerStopped, setTimerStopped] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  
  // Problem sets for each game mode
  const problemSets = {
    "JavaScript Bug Hunt": [
      {
        title: "Array Sum Calculator",
        description: "Fix the off-by-one error in the array sum function",
        code: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Test case failing:
// calculateSum([1, 2, 3, 4]) should return 10
// Currently returns NaN`,
        solution: "i < arr.length",
        testCases: [
          { input: [1, 2, 3, 4], expected: 10 },
          { input: [5, 10, 15], expected: 30 },
          { input: [], expected: 0 },
          { input: [100], expected: 100 }
        ],
        bugs: [
          { id: 1, line: 3, type: "Logic Error", description: "Off-by-one error in loop condition" },
          { id: 2, line: 4, type: "Runtime Error", description: "Accessing undefined array index" }
        ],
        points: 100
      },
      {
        title: "String Palindrome Checker",
        description: "Fix the string comparison logic",
        code: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0; i < cleaned.length / 2; i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 + i]) {
      return false;
    }
  }
  return true;
}

// Test case failing:
// isPalindrome("A man, a plan, a canal: Panama") should return true
// Currently returns false`,
        solution: "cleaned.length - 1 - i",
        testCases: [
          { input: "A man, a plan, a canal: Panama", expected: true },
          { input: "racecar", expected: true },
          { input: "hello", expected: false },
          { input: "Was it a car or a cat I saw", expected: true }
        ],
        bugs: [
          { id: 1, line: 4, type: "Logic Error", description: "Incorrect index calculation for right pointer" }
        ],
        points: 150
      },
      {
        title: "Object Property Counter",
        description: "Fix the property counting logic",
        code: `function countProperties(obj) {
  let count = 0;
  for (let key in obj) {
    count++;
  }
  return count;
}

// Test case failing:
// countProperties({a: 1, b: 2, c: 3}) should return 3
// Currently counts inherited properties too`,
        solution: "obj.hasOwnProperty(key)",
        testCases: [
          { input: {a: 1, b: 2, c: 3}, expected: 3 },
          { input: {}, expected: 0 },
          { input: {x: "test", y: null, z: undefined}, expected: 3 }
        ],
        bugs: [
          { id: 1, line: 3, type: "Logic Error", description: "Not checking for own properties vs inherited" }
        ],
        points: 200
      }
    ],
    "Python Debug Challenge": [
      {
        title: "List Even Numbers Finder",
        description: "Fix the even numbers detection algorithm",
        code: `def find_duplicates(lst):
    duplicates = []
    for i in range(len(lst)):
        if lst[i] == lst[i]:
            duplicates.append(lst[i])
    return list(set(duplicates))

# Test case failing:
# find_duplicates([1, 2, 3, 4, 5]) should return [2, 4]
# Currently includes all elements`,
        solution: "if lst[i] % 2 == 0",
        testCases: [
          { input: [1, 2, 3, 4, 5], expected: [2, 4] },
          { input: [1, 1, 1], expected: [] },
          { input: [1, 2, 3], expected: [2] }
        ],
        bugs: [
          { id: 1, line: 4, type: "Logic Error", description: "Incorrect condition for even numbers" }
        ],
        points: 120
      },
      {
        title: "Dictionary Merge Function",
        description: "Fix the dictionary merging logic",
        code: `def merge_dicts(dict1, dict2):
    result = dict1
    for key, value in dict2.items():
        result[key] = value
    return result

# Test case failing:
# Original dict1 gets modified`,
        solution: "result = dict1.copy()",
        testCases: [
          { input: [{"a": 1}, {"b": 2}], expected: {"a": 1, "b": 2} }
        ],
        bugs: [
          { id: 1, line: 2, type: "Reference Error", description: "Modifying original dictionary" }
        ],
        points: 170
      },
      {
        title: "Fibonacci Generator",
        description: "Fix the recursive fibonacci function",
        code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-1)

# Test case failing:
# fibonacci(5) should return 5, currently returns wrong value`,
        solution: "fibonacci(n-1) + fibonacci(n-2)",
        testCases: [
          { input: 5, expected: 5 },
          { input: 0, expected: 0 },
          { input: 1, expected: 1 },
          { input: 8, expected: 21 }
        ],
        bugs: [
          { id: 1, line: 4, type: "Logic Error", description: "Incorrect recursive call" }
        ],
        points: 220
      }
    ],
    "React Component Fix": [
      {
        title: "Counter Component",
        description: "Fix the state update issue",
        code: `function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+2</button>
    </div>
  );
}`,
        solution: "setCount(prev => prev + 1)",
        testCases: [
          { description: "Button click should increment by 2", expected: "State updates correctly" }
        ],
        bugs: [
          { id: 1, line: 5, type: "State Error", description: "Stale closure in state updates" }
        ],
        points: 130
      },
      {
        title: "Todo List Component",
        description: "Fix the key prop warning",
        code: `function TodoList({todos}) {
  return (
    <ul>
      {todos.map(todo => (
        <li>{todo.text}</li>
      ))}
    </ul>
  );
}`,
        solution: "<li key={todo.id}>{todo.text}</li>",
        testCases: [
          { description: "No key prop warnings", expected: "Proper React keys" }
        ],
        bugs: [
          { id: 1, line: 5, type: "React Warning", description: "Missing key prop in list items" }
        ],
        points: 180
      },
      {
        title: "Effect Cleanup",
        description: "Fix the memory leak in useEffect",
        code: `function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }, []);
  
  return <div>Seconds: {seconds}</div>;
}`,
        solution: "return () => clearInterval(interval);",
        testCases: [
          { description: "No memory leaks on unmount", expected: "Interval cleared" }
        ],
        bugs: [
          { id: 1, line: 8, type: "Memory Leak", description: "Missing cleanup function in useEffect" }
        ],
        points: 230
      }
    ],
    "Algorithm Race": [
      {
        title: "Binary Search Implementation",
        description: "Fix the search bounds calculation",
        code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return -1;
}`,
        solution: "let right = arr.length - 1; left <= right",
        testCases: [
          { input: [[1,2,3,4,5], 3], expected: 2 },
          { input: [[1,2,3,4,5], 1], expected: 0 },
          { input: [[1,2,3,4,5], 6], expected: -1 }
        ],
        bugs: [
          { id: 1, line: 3, type: "Logic Error", description: "Incorrect right boundary initialization" },
          { id: 2, line: 5, type: "Logic Error", description: "Wrong loop condition" }
        ],
        points: 140
      },
      {
        title: "Quick Sort Partition",
        description: "Fix the partitioning logic",
        code: `function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i]];
  return i + 1;
}`,
        solution: "[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]",
        testCases: [
          { description: "Correct partitioning", expected: "Pivot in correct position" }
        ],
        bugs: [
          { id: 1, line: 11, type: "Logic Error", description: "Incorrect swap assignment" }
        ],
        points: 190
      },
      {
        title: "Graph DFS Traversal",
        description: "Fix the visited tracking",
        code: `function dfs(graph, start, visited = []) {
  visited.push(start);
  console.log(start);
  
  for (let neighbor of graph[start]) {
    if (!visited.includes(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
  return visited;
}`,
        solution: "visited = new Set()",
        testCases: [
          { description: "Efficient visited check", expected: "O(1) lookup time" }
        ],
        bugs: [
          { id: 1, line: 1, type: "Performance Error", description: "Using array instead of Set for visited tracking" }
        ],
        points: 240
      }
    ]
  };
  // Get current problem data
  const currentProblemData = problemSets[gameMode][currentProblem];
  const [code, setCode] = useState(currentProblemData.code);

  const fileExtension = gameMode.includes('Python') ? '.py' : gameMode.includes('React') ? '.jsx' : '.js';
  const filename = gameMode.includes('React') ? `${currentProblemData.title}${fileExtension}` : `buggy-code${fileExtension}`;
  const language = gameMode.includes('Python') ? 'Python' : gameMode.includes('React') ? 'JSX' : 'JavaScript';

  const [players, setPlayers] = useState([
    { id: 1, name: "You", score: 0, status: "coding", avatar: "🥷" },
    { id: 2, name: "CodeNinja", score: 150, status: "testing", avatar: "🤖" },
    { id: 3, name: "DebugMaster", score: 75, status: "thinking", avatar: "🎯" },
  ]);

  const [hints] = useState([
    "Check your loop condition - are you iterating correctly?",
    "Array indices start at 0, not 1",
    "Consider what happens when you access arr[arr.length]",
  ]);

  const [currentHint, setCurrentHint] = useState(0);
  const [availableHints, setAvailableHints] = useState([false, false, false]);
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [allBugsFixed, setAllBugsFixed] = useState(false);
  const [bugs, setBugs] = useState(currentProblemData.bugs);

  useEffect(() => {
    if (timerStopped) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStopped]);

  // Timed hints system
  useEffect(() => {
    const totalTime = 900; // 15 minutes
    const elapsed = totalTime - timeLeft;
    
    // First hint at 3 minutes (180 seconds)
    if (elapsed >= 180 && !availableHints[0]) {
      setAvailableHints(prev => [true, prev[1], prev[2]]);
    }
    
    // Second hint at 5 minutes (300 seconds)
    if (elapsed >= 300 && !availableHints[1]) {
      setAvailableHints(prev => [prev[0], true, prev[2]]);
    }
    
    // Third hint at 10 minutes (600 seconds)
    if (elapsed >= 600 && !availableHints[2]) {
      setAvailableHints(prev => [prev[0], prev[1], true]);
    }
  }, [timeLeft, availableHints]);

  // Simulate live scoreboard updates
  useEffect(() => {
    const scoreUpdateInterval = setInterval(() => {
      setPlayers(prev => prev.map(player => {
        if (player.id === 1) return player; // Don't update current user
        
        // Simulate random score changes
        const scoreChange = Math.random() > 0.7 ? Math.floor(Math.random() * 25) : 0;
        const newScore = Math.max(0, player.score + scoreChange);
        
        // Update status randomly
        const statuses = ["coding", "testing", "thinking"];
        const newStatus = Math.random() > 0.8 ? statuses[Math.floor(Math.random() * statuses.length)] : player.status;
        
        return {
          ...player,
          score: newScore,
          status: newStatus
        };
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(scoreUpdateInterval);
  }, []);

  const runCode = async () => {
    setIsRunningCode(true);
    setCodeOutput("🔄 Running code...\n");
    
    setTimeout(async () => {
      try {
        const problemData = currentProblemData;
        const testCases = problemData.testCases;
        
        let output = `🧪 Running test cases for: ${problemData.title}...\n\n`;
        let passedTests = 0;
        
        // Simple check if the solution pattern is in the code
        const isFixed = code.includes(problemData.solution);
        
        testCases.forEach((testCase, index) => {
          let result;
          let passed = false;
          
          if (isFixed) {
            // Simulate correct behavior for different problem types
            if (gameMode === "JavaScript Bug Hunt") {
              if (problemData.title === "Array Sum Calculator") {
                result = Array.isArray(testCase.input) ? testCase.input.reduce((sum, val) => sum + val, 0) : 0;
              } else if (problemData.title === "String Palindrome Checker") {
                const str = testCase.input.toLowerCase().replace(/[^a-z0-9]/g, '');
                result = str === str.split('').reverse().join('');
              } else if (problemData.title === "Object Property Counter") {
                result = Object.keys(testCase.input).length;
              }
            } else if (gameMode === "Python Debug Challenge") {
              if (problemData.title === "List Even Numbers Finder") {
                result = Array.isArray(testCase.input) ? testCase.input.filter(n => n % 2 === 0) : [];
              } else if (problemData.title === "Dictionary Merge Function") {
                const [dict1, dict2] = testCase.input;
                result = { ...dict1, ...dict2 };
              } else if (problemData.title === "Fibonacci Generator") {
                const n = testCase.input;
                const fib = (m) => m <= 1 ? m : fib(m - 1) + fib(m - 2);
                result = fib(n);
              }
            } else if (gameMode === "React Component Fix") {
              result = true; // Assume passes for React since no real execution
            }
            passed = result === testCase.expected || (gameMode === "React Component Fix" && result === true);
          } else {
            // Simulate buggy behavior
            if (gameMode === "JavaScript Bug Hunt" && problemData.title === "Array Sum Calculator") {
              result = NaN;
            } else if (gameMode === "Python Debug Challenge" && problemData.title === "List Even Numbers Finder") {
              result = Array.isArray(testCase.input) ? testCase.input.filter(() => true) : []; // All elements
            } else {
              result = "incorrect";
            }
            passed = false;
          }
          
          if (passed) passedTests++;
          
          if (typeof testCase.input === 'object' && !Array.isArray(testCase.input)) {
            output += `Test ${index + 1}: ${problemData.title.includes('Object') ? 'Object with keys' : JSON.stringify(testCase.input)}\n`;
          } else {
            output += `Test ${index + 1}: ${Array.isArray(testCase.input) ? `[${testCase.input.join(', ')}]` : testCase.input}\n`;
          }
          output += `  Expected: ${testCase.expected}\n`;
          output += `  Got: ${typeof result === 'boolean' ? result : (isNaN(result) ? 'NaN' : JSON.stringify(result))}\n`;
          output += `  ${passed ? '✅ PASS' : '❌ FAIL'}\n\n`;
        });
        
        output += `📊 Results: ${passedTests}/${testCases.length} tests passed\n`;
        
        if (passedTests === testCases.length) {
          // Problem solved!
          const newCompletedProblems = [...completedProblems, currentProblem];
          setCompletedProblems(newCompletedProblems);
          setTotalScore(prev => prev + problemData.points);
          setBugs([]); // Clear bugs for this problem
          
          if (newCompletedProblems.length === 3) {
            // All problems completed!
            setTimerStopped(true);
            setShowFinalCompletion(true);
            output += "\n🎆 AMAZING! You've completed all 3 challenges!";

            // Save to localStorage
            const completedModes = JSON.parse(localStorage.getItem('completedModes') || '[]');
            if (!completedModes.includes(gameMode)) {
              completedModes.push(gameMode);
              localStorage.setItem('completedModes', JSON.stringify(completedModes));
            }
            
            // Save final score to backend
            try {
              const user = JSON.parse(localStorage.getItem("user") || "{}");
              if (user.username) {
                await postJson("/api/scores", {
                  username: user.username,
                  score: totalScore + problemData.points,
                  gameMode,
                  completedAt: new Date().toISOString()
                });
              }
            } catch (error) {
              console.error("Failed to save score:", error);
            }
          } else {
            // Move to next problem
            setTimeout(() => {
              setShowCongrats(true);
            }, 1000);
            output += `\n🎉 Problem ${currentProblem + 1}/3 completed! +${problemData.points} points`;
          }
          
          // Update player score in UI
          setPlayers(prev => prev.map(player => 
            player.id === 1 
              ? { ...player, score: player.score + problemData.points, status: newCompletedProblems.length === 3 ? 'completed' : 'coding' }
              : player
          ));
        } else {
          output += `\n💡 Hint: ${problemData.title === 'Array Sum Calculator' ? 'Change i <= arr.length to i < arr.length' : 'Check the solution pattern needed for this problem'}`;
        }
        
        setCodeOutput(output);
      } catch (error) {
        setCodeOutput(`❌ Runtime Error: ${error}`);
      } finally {
        setIsRunningCode(false);
      }
    }, 2000);
  };
  
  const advanceToNextProblem = () => {
    const nextProblemIndex = currentProblem + 1;
    if (nextProblemIndex < problemSets[gameMode].length) {
      setCurrentProblem(nextProblemIndex);
      const nextProblemData = problemSets[gameMode][nextProblemIndex];
      setCode(nextProblemData.code);
      setBugs(nextProblemData.bugs);
      setCodeOutput("");
      setAllBugsFixed(false);
    }
    setShowCongrats(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "coding": return "text-blue-400";
      case "testing": return "text-yellow-400";
      case "thinking": return "text-purple-400";
      case "completed": return "text-green-400";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "coding": return "⌨️";
      case "testing": return "🧪";
      case "thinking": return "🤔";
      case "completed": return "✅";
      default: return "👤";
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-game-bg-primary">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/80 backdrop-blur-sm border-b border-accent/30 px-6 py-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-gaming font-bold text-glow">
              {currentProblemData.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              Problem {currentProblem + 1}/3 • {gameMode}
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Bug className="w-5 h-5" />
              <span className="font-bold">{bugs.length} Bugs Detected</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 text-2xl font-gaming font-bold ${
              timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-primary'
            }`}>
              <Clock className="w-6 h-6" />
              {formatTime(timeLeft)}
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Users className="w-5 h-5" />
              <span className="font-bold">{players.length} Players</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
            >
              <Card className="editor-container h-full p-0 overflow-hidden">
                <div className="bg-game-bg-secondary px-4 py-3 border-b border-accent/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">{filename}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs text-muted-foreground">
                      Line {code.split('\n').length} | {language}
                    </div>
                    <Button 
                      onClick={runCode}
                      disabled={isRunningCode}
                      className="btn-gaming px-3 py-1 text-xs h-auto"
                      size="sm"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      {isRunningCode ? "Running..." : "Run"}
                    </Button>
                  </div>
                </div>
                
                <div className="relative h-full flex">
                  {/* Line Numbers */}
                  <div className="bg-game-bg-secondary/50 border-r border-accent/20 px-3 py-4 text-xs text-muted-foreground font-mono select-none">
                    {code.split('\n').map((_, index) => (
                      <div key={index} className="leading-relaxed text-right">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  
                  {/* Code Editor */}
                  <div className="flex-1 relative">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-transparent text-foreground font-mono text-sm p-4 resize-none outline-none leading-relaxed"
                      style={{ minHeight: '400px' }}
                      spellCheck={false}
                      placeholder="// Start coding here..."
                    />
                    
                    {/* Bug indicators */}
                    <div className="absolute left-2 top-4 space-y-5">
                      {bugs.map((bug) => (
                        <motion.div
                          key={bug.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-red-400 rounded-full animate-pulse cursor-pointer"
                          title={`Line ${bug.line}: ${bug.description}`}
                          style={{ marginTop: `${(bug.line - 1) * 1.5}rem` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-accent/20 bg-game-bg-secondary/50 space-y-3">
                  <div className="flex gap-2">
                    <Button 
                      onClick={runCode}
                      disabled={isRunningCode}
                      className="btn-gaming flex-1 justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isRunningCode ? "Running..." : "Run Code"}
                    </Button>
                    <Button className="btn-gaming flex-1 justify-center">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Fix
                    </Button>
                  </div>
                  
                  {codeOutput && (
                    <div className="bg-black/50 border border-accent/30 rounded-lg p-3 max-h-48 overflow-y-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold text-yellow-400">Test Results</span>
                      </div>
                      <pre className="text-xs text-foreground font-mono whitespace-pre-wrap leading-relaxed">
                        {codeOutput}
                      </pre>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Hints Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-gaming p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-gaming font-bold">Debug Hints</h3>
                  <span className="text-xs text-muted-foreground">
                    {availableHints.filter(Boolean).length}/{hints.length} Available
                  </span>
                </div>
                
                <div className="space-y-3">
                  {hints.map((hint, index) => (
                    <div key={index} className="relative">
                      <div className={`p-4 rounded-lg border ${
                        availableHints[index] 
                          ? 'bg-primary/10 border-primary/30' 
                          : 'bg-muted/20 border-muted/30 opacity-50'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold px-2 py-1 rounded bg-accent/20 text-accent">
                            Hint {index + 1}
                          </span>
                          {!availableHints[index] && (
                            <span className="text-xs text-muted-foreground">
                              {index === 0 ? 'Available at 3:00' : 
                               index === 1 ? 'Available at 5:00' : 
                               'Available at 10:00'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {availableHints[index] ? hint : "Hint locked - keep coding to unlock!"}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-xs text-muted-foreground text-center pt-2">
                    Hints unlock automatically as time progresses
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Bug Report */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card-gaming p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Bug className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-gaming font-bold">Bug Report</h3>
                </div>
                
                <div className="space-y-3">
                  {bugs.map((bug) => (
                    <div key={bug.id} className="p-3 bg-red-400/10 border border-red-400/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-red-400 text-white px-2 py-1 rounded font-bold">
                          Line {bug.line}
                        </span>
                        <span className="text-xs text-red-400 font-semibold">
                          {bug.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {bug.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Congratulations Modal */}
      <AnimatePresence>
        {showCongrats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowCongrats(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-card/95 backdrop-blur border border-primary/30 rounded-2xl p-8 max-w-lg w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCongrats(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-gaming font-bold text-glow mb-4"
              >
                PROBLEM SOLVED!
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-primary mb-6"
              >
                {currentProblemData.title} completed successfully!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mb-6 text-sm"
              >
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <div className="text-2xl font-gaming font-bold text-primary">+{currentProblemData.points}</div>
                  <div className="text-muted-foreground">Points Earned</div>
                </div>
                <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4">
                  <div className="text-2xl font-gaming font-bold text-green-400">{currentProblem + 1}/3</div>
                  <div className="text-muted-foreground">Problems Done</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                {currentProblem + 1 < 3 ? (
                  <Button
                    onClick={advanceToNextProblem}
                    className="btn-gaming w-full"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Next Problem ({currentProblem + 2}/3)
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowCongrats(false)}
                    className="btn-gaming w-full"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Final Challenge!
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setShowCongrats(false)}
                  className="w-full"
                >
                  Continue This Problem
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute -top-2 -right-2"
              >
                <PartyPopper className="w-8 h-8 text-yellow-400 animate-bounce" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="absolute -top-2 -left-2"
              >
                <PartyPopper className="w-8 h-8 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Final Completion Modal */}
      <AnimatePresence>
        {showFinalCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="bg-card/95 backdrop-blur border-2 border-primary/50 rounded-3xl p-10 max-w-2xl w-full text-center relative overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", duration: 1.2 }}
                className="text-8xl mb-6 relative z-10"
              >
                🏆
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-gaming font-bold text-glow mb-4 relative z-10"
              >
                CHAMPION!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-primary mb-2 relative z-10"
              >
                You've conquered all 3 {gameMode} challenges!
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-muted-foreground mb-8 relative z-10"
              >
                Time: {formatTime(900 - timeLeft)} • Score: {totalScore} points
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-3 gap-4 mb-8 relative z-10"
              >
                {problemSets[gameMode].map((problem, index) => (
                  <div key={index} className="bg-green-400/20 border border-green-400/40 rounded-xl p-4">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-sm font-semibold text-green-400">{problem.title}</div>
                    <div className="text-xs text-muted-foreground">+{problem.points} pts</div>
                  </div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="space-y-4 relative z-10"
              >
                <Button
                  onClick={() => navigate("/lobby")}
                  className="btn-gaming w-full text-lg py-3"
                  size="lg"
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Return to Lobby
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/leaderboard")}
                    className="flex-1"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="flex-1"
                  >
                    Play Again
                  </Button>
                </div>
              </motion.div>
              
              {/* Celebration particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 100 : -100) * Math.random()],
                    y: [0, -100 * Math.random()],
                  }}
                  transition={{
                    delay: 1.2 + i * 0.1,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                >
                  {['✨', '🎉', '🎆', '🏆', '⭐', '💥'][i]}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameRoom;
