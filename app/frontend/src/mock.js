// Mock data for the AI Interview Assistant

export const mockCandidates = [
  {
    id: 'candidate-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1-234-567-8901',
    resumeUploaded: true,
    status: 'completed',
    finalScore: 85,
    summary: 'Strong candidate with excellent React and Node.js knowledge. Demonstrated good problem-solving skills and clean coding practices.',
    interviewData: {
      startTime: new Date('2024-01-15T10:00:00Z'),
      endTime: new Date('2024-01-15T10:12:30Z'),
      questions: [
        {
          id: 'q1',
          difficulty: 'easy',
          timeLimit: 20,
          question: 'What is the difference between let, const, and var in JavaScript?',
          answer: 'let and const are block-scoped while var is function-scoped. const cannot be reassigned after declaration.',
          timeUsed: 18,
          score: 9
        },
        {
          id: 'q2', 
          difficulty: 'easy',
          timeLimit: 20,
          question: 'Explain the concept of React components.',
          answer: 'React components are reusable pieces of UI that can be functional or class-based. They take props as input and return JSX.',
          timeUsed: 19,
          score: 8
        },
        {
          id: 'q3',
          difficulty: 'medium',
          timeLimit: 60,
          question: 'How does React hooks work? Explain useState and useEffect.',
          answer: 'useState manages component state, useEffect handles side effects. They allow functional components to have state and lifecycle methods.',
          timeUsed: 45,
          score: 8
        },
        {
          id: 'q4',
          difficulty: 'medium',
          timeLimit: 60,
          question: 'What is middleware in Express.js and how do you implement it?',
          answer: 'Middleware functions execute during request-response cycle. They can modify req/res objects or end the cycle.',
          timeUsed: 52,
          score: 7
        },
        {
          id: 'q5',
          difficulty: 'hard',
          timeLimit: 120,
          question: 'Design a system for real-time chat application. What technologies would you use?',
          answer: 'I would use WebSocket for real-time communication, Redis for message caching, and MongoDB for persistence. Load balancing with Socket.IO.',
          timeUsed: 110,
          score: 9
        },
        {
          id: 'q6',
          difficulty: 'hard',
          timeLimit: 120,
          question: 'Explain database indexing and when you would use different types of indexes.',
          answer: 'Indexes speed up queries but slow down writes. B-tree for range queries, hash for equality, compound indexes for multiple fields.',
          timeUsed: 95,
          score: 8
        }
      ]
    }
  },
  {
    id: 'candidate-2',
    name: 'Alex Rodriguez',
    email: 'alex.r@email.com', 
    phone: '+1-555-123-4567',
    resumeUploaded: true,
    status: 'completed',
    finalScore: 72,
    summary: 'Good understanding of fundamentals but needs improvement in advanced concepts. Shows potential for growth.',
    interviewData: {
      startTime: new Date('2024-01-15T14:00:00Z'),
      endTime: new Date('2024-01-15T14:11:45Z'),
      questions: [
        {
          id: 'q1',
          difficulty: 'easy',
          timeLimit: 20,
          question: 'What is the difference between let, const, and var in JavaScript?',
          answer: 'var is older, let and const are newer. const is for constants.',
          timeUsed: 15,
          score: 6
        },
        {
          id: 'q2',
          difficulty: 'easy', 
          timeLimit: 20,
          question: 'Explain the concept of React components.',
          answer: 'Components are like building blocks in React. You can reuse them.',
          timeUsed: 12,
          score: 7
        },
        {
          id: 'q3',
          difficulty: 'medium',
          timeLimit: 60,
          question: 'How does React hooks work? Explain useState and useEffect.',
          answer: 'useState is for state management, useEffect is for side effects like API calls.',
          timeUsed: 35,
          score: 7
        },
        {
          id: 'q4',
          difficulty: 'medium',
          timeLimit: 60,
          question: 'What is middleware in Express.js and how do you implement it?',
          answer: 'Middleware runs between requests. You use app.use() to implement it.',
          timeUsed: 40,
          score: 6
        },
        {
          id: 'q5',
          difficulty: 'hard',
          timeLimit: 120,
          question: 'Design a system for real-time chat application. What technologies would you use?',
          answer: 'I would use Socket.IO for real-time features and maybe MongoDB for storing messages.',
          timeUsed: 85,
          score: 6
        },
        {
          id: 'q6',
          difficulty: 'hard',
          timeLimit: 120,
          question: 'Explain database indexing and when you would use different types of indexes.',
          answer: 'Indexes make queries faster. You use them on columns you search frequently.',
          timeUsed: 60,
          score: 5
        }
      ]
    }
  },
  {
    id: 'candidate-3',
    name: 'Maya Patel',
    email: 'maya.patel@email.com',
    phone: '+1-987-654-3210',
    resumeUploaded: true,
    status: 'in-progress',
    currentQuestion: 4,
    timeRemaining: 45,
    summary: null,
    finalScore: null,
    interviewData: {
      startTime: new Date(),
      questions: [
        {
          id: 'q1',
          difficulty: 'easy',
          timeLimit: 20,
          question: 'What is the difference between let, const, and var in JavaScript?',
          answer: 'let and const are block-scoped, var is function-scoped. const creates immutable bindings.',
          timeUsed: 16,
          score: 9
        },
        {
          id: 'q2',
          difficulty: 'easy',
          timeLimit: 20, 
          question: 'Explain the concept of React components.',
          answer: 'Components are independent, reusable pieces of UI. They can be functional or class-based.',
          timeUsed: 18,
          score: 9
        },
        {
          id: 'q3',
          difficulty: 'medium',
          timeLimit: 60,
          question: 'How does React hooks work? Explain useState and useEffect.',
          answer: 'Hooks let you use state and lifecycle features in functional components. useState manages local state.',
          timeUsed: 50,
          score: 8
        }
      ]
    }
  }
];

export const mockQuestions = {
  easy: [
    'What is the difference between let, const, and var in JavaScript?',
    'Explain the concept of React components.',
    'What is the Virtual DOM in React?',
    'What are JavaScript closures?'
  ],
  medium: [
    'How does React hooks work? Explain useState and useEffect.',
    'What is middleware in Express.js and how do you implement it?',
    'Explain the concept of async/await in JavaScript.',
    'What is the difference between SQL and NoSQL databases?'
  ],
  hard: [
    'Design a system for real-time chat application. What technologies would you use?',
    'Explain database indexing and when you would use different types of indexes.',
    'How would you optimize a React application for better performance?',
    'Design a scalable microservices architecture for an e-commerce platform.'
  ]
};

export const getRandomQuestion = (difficulty) => {
  const questions = mockQuestions[difficulty];
  return questions[Math.floor(Math.random() * questions.length)];
};

export const simulateAIScore = (answer, difficulty) => {
  // Simple mock scoring based on answer length and difficulty
  const baseScore = difficulty === 'easy' ? 7 : difficulty === 'medium' ? 6 : 5;
  const lengthBonus = Math.min(3, Math.floor(answer.length / 50));
  return Math.min(10, baseScore + lengthBonus + Math.floor(Math.random() * 2));
};

export const simulateAISummary = (questions) => {
  const avgScore = questions.reduce((sum, q) => sum + q.score, 0) / questions.length;
  const summaries = {
    high: 'Exceptional candidate with strong technical skills and excellent problem-solving abilities. Ready for senior-level responsibilities.',
    medium: 'Solid candidate with good fundamentals and room for growth. Would benefit from mentorship in advanced concepts.',
    low: 'Entry-level candidate with basic understanding. Requires significant training and development.'
  };
  
  if (avgScore >= 8) return summaries.high;
  if (avgScore >= 6) return summaries.medium;
  return summaries.low;
};
