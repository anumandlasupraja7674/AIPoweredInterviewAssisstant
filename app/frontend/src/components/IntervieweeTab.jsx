import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Upload, Clock, User, Mail, Phone, FileText, Send, Pause, Play } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { getRandomQuestion, simulateAIScore } from '../mock';

const IntervieweeTab = () => {
  const { toast } = useToast();
  const [step, setStep] = useState('upload'); // upload, info, interview, completed
  const [candidateInfo, setCandidateInfo] = useState({ name: '', email: '', phone: '' });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [score, setScore] = useState(0);
  
  const difficulties = ['easy', 'easy', 'medium', 'medium', 'hard', 'hard'];
  const timeLimits = { easy: 20, medium: 60, hard: 120 };
  
  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining => {
          if (timeRemaining <= 1) {
            handleTimeUp();
            return 0;
          }
          return timeRemaining - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeRemaining]);
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      // Simulate resume parsing
      setTimeout(() => {
        setCandidateInfo({
          name: 'John Doe', // Mock extracted data
          email: 'john.doe@email.com',
          phone: '' // Missing phone to demonstrate collection flow
        });
        setResumeUploaded(true);
        setStep('info');
        toast({ title: 'Resume uploaded successfully!', description: 'Please verify your information below.' });
      }, 1500);
    } else {
      toast({ title: 'Invalid file type', description: 'Please upload a PDF or DOCX file.', variant: 'destructive' });
    }
  };
  
  const handleInfoSubmit = () => {
    if (!candidateInfo.name || !candidateInfo.email || !candidateInfo.phone) {
      toast({ title: 'Missing information', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    startInterview();
  };
  
  const startInterview = () => {
    const newQuestions = difficulties.map((difficulty, index) => ({
      id: `q${index + 1}`,
      difficulty,
      question: getRandomQuestion(difficulty),
      timeLimit: timeLimits[difficulty],
      answer: '',
      score: null,
      timeUsed: 0
    }));
    setQuestions(newQuestions);
    setStep('interview');
    setCurrentQuestionIndex(0);
    setTimeRemaining(newQuestions[0].timeLimit);
    setIsActive(true);
    toast({ title: 'Interview started!', description: 'Answer each question within the time limit.' });
  };
  
  const handleAnswerSubmit = () => {
    if (!currentAnswer.trim()) {
      toast({ title: 'Answer required', description: 'Please provide an answer before submitting.', variant: 'destructive' });
      return;
    }
    
    const currentQ = questions[currentQuestionIndex];
    const timeUsed = currentQ.timeLimit - timeRemaining;
    const aiScore = simulateAIScore(currentAnswer, currentQ.difficulty);
    
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQ,
      answer: currentAnswer,
      timeUsed,
      score: aiScore
    };
    setQuestions(updatedQuestions);
    
    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
      setTimeRemaining(updatedQuestions[currentQuestionIndex + 1].timeLimit);
    } else {
      completeInterview(updatedQuestions);
    }
  };
  
  const handleTimeUp = () => {
    toast({ title: 'Time up!', description: 'Moving to next question.' });
    handleAnswerSubmit();
  };
  
  const completeInterview = (finalQuestions) => {
    const totalScore = finalQuestions.reduce((sum, q) => sum + q.score, 0);
    const avgScore = Math.round((totalScore / finalQuestions.length) * 10);
    setScore(avgScore);
    setStep('completed');
    setIsActive(false);
    toast({ title: 'Interview completed!', description: `Your final score: ${avgScore}/100` });
  };
  
  const togglePause = () => {
    setIsPaused(!isPaused);
    toast({ title: isPaused ? 'Interview resumed' : 'Interview paused' });
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgressPercentage = () => {
    return ((currentQuestionIndex) / questions.length) * 100;
  };
  
  if (step === 'upload') {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-6 w-6" />
              Upload Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please upload your resume in PDF or DOCX format to begin the interview process.
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Click to upload resume</p>
                <p className="text-sm text-muted-foreground">Supports PDF and DOCX files</p>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (step === 'info') {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6" />
              Verify Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Please verify and complete your information before starting the interview.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Full Name *
                </label>
                <Input
                  value={candidateInfo.name}
                  onChange={(e) => setCandidateInfo({...candidateInfo, name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={candidateInfo.email}
                  onChange={(e) => setCandidateInfo({...candidateInfo, email: e.target.value})}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </label>
                <Input
                  value={candidateInfo.phone}
                  onChange={(e) => setCandidateInfo({...candidateInfo, phone: e.target.value})}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <Button onClick={handleInfoSubmit} className="w-full">
              Start Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (step === 'interview') {
    const currentQ = questions[currentQuestionIndex];
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Progress Header */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Badge variant={currentQ?.difficulty === 'easy' ? 'default' : currentQ?.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                  {currentQ?.difficulty?.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className={`font-mono text-lg ${
                    timeRemaining <= 10 ? 'text-red-500' : timeRemaining <= 30 ? 'text-orange-500' : 'text-green-500'
                  }`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={togglePause}>
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
              </div>
            </div>
            <Progress value={getProgressPercentage()} className="w-full" />
          </CardContent>
        </Card>
        
        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">{currentQ?.question}</p>
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={8}
              disabled={isPaused}
            />
            <Button onClick={handleAnswerSubmit} disabled={!currentAnswer.trim() || isPaused} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Submit Answer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (step === 'completed') {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Interview Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">{score}/100</p>
              <p className="text-muted-foreground">Final Score</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Questions Answered</p>
                <p className="text-2xl font-bold">{questions.length}</p>
              </div>
              <div>
                <p className="font-medium">Average Score</p>
                <p className="text-2xl font-bold">{Math.round(questions.reduce((sum, q) => sum + q.score, 0) / questions.length)}/10</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Thank you for completing the interview! Your responses have been recorded and will be reviewed by our team.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Start New Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return null;
};

export default IntervieweeTab;
