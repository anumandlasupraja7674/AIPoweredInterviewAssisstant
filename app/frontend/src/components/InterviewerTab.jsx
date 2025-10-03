import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Search, Eye, Clock, User, Mail, Phone, Trophy, Star } from 'lucide-react';
import { mockCandidates } from '../mock';

const InterviewerTab = () => {
  const [candidates] = useState(mockCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  const filteredAndSortedCandidates = candidates
    .filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'score') return (b.finalScore || 0) - (a.finalScore || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });
  
  const getStatusBadge = (status) => {
    const variants = {
      'completed': 'default',
      'in-progress': 'secondary',
      'paused': 'outline'
    };
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };
  
  const getDifficultyBadge = (difficulty) => {
    const variants = {
      'easy': 'default',
      'medium': 'secondary', 
      'hard': 'destructive'
    };
    return (
      <Badge variant={variants[difficulty]} className="text-xs">
        {difficulty.toUpperCase()}
      </Badge>
    );
  };
  
  const formatDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 'N/A';
    const diff = Math.floor((endTime - startTime) / 60000); // minutes
    return `${diff} min`;
  };
  
  const CandidateDetailDialog = ({ candidate }) => {
    if (!candidate) return null;
    
    return (
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {candidate.name} - Interview Details
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {candidate.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {candidate.phone}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Interview Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    {getStatusBadge(candidate.status)}
                  </div>
                  <div className="flex justify-between">
                    <span>Final Score:</span>
                    <span className={`font-bold ${getScoreColor(candidate.finalScore || 0)}`}>
                      {candidate.finalScore || 'In Progress'}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{formatDuration(candidate.interviewData?.startTime, candidate.interviewData?.endTime)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {candidate.status === 'completed' && candidate.interviewData?.questions && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Question Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {candidate.interviewData.questions.map((q, index) => (
                      <div key={q.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Q{index + 1}</span>
                          {getDifficultyBadge(q.difficulty)}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">
                            {q.timeUsed}s / {q.timeLimit}s
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{q.score}/10</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-4">
            {candidate.interviewData?.questions?.map((q, index) => (
              <Card key={q.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Question {index + 1}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getDifficultyBadge(q.difficulty)}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{q.score}/10</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Question:</p>
                    <p className="text-sm">{q.question}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Answer:</p>
                    <p className="text-sm bg-muted/50 p-3 rounded">{q.answer}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Time used: {q.timeUsed}s / {q.timeLimit}s</span>
                    <Progress value={(q.timeUsed / q.timeLimit) * 100} className="w-20 h-2" />
                  </div>
                </CardContent>
              </Card>
            )) || <p className="text-center text-muted-foreground">No questions answered yet.</p>}
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  AI Assessment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {candidate.summary ? (
                  <p className="leading-relaxed">{candidate.summary}</p>
                ) : (
                  <p className="text-muted-foreground italic">Assessment pending - interview in progress.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    );
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Interview Dashboard</h2>
          <p className="text-muted-foreground">Manage and review candidate interviews</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Candidates</span>
            </div>
            <p className="text-2xl font-bold">{candidates.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <p className="text-2xl font-bold">{candidates.filter(c => c.status === 'completed').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
            <p className="text-2xl font-bold">{candidates.filter(c => c.status === 'in-progress').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Avg Score</span>
            </div>
            <p className="text-2xl font-bold">
              {Math.round(candidates.filter(c => c.finalScore).reduce((sum, c) => sum + c.finalScore, 0) / 
              candidates.filter(c => c.finalScore).length) || 0}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                  <TableCell>
                    <span className={getScoreColor(candidate.finalScore || 0)}>
                      {candidate.finalScore || 'In Progress'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {candidate.interviewData?.startTime?.toLocaleDateString() || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <CandidateDetailDialog candidate={selectedCandidate} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewerTab;
