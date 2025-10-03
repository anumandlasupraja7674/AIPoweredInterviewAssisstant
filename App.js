import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent } from './components/ui/card';
import { Toaster } from './components/ui/toaster';
import IntervieweeTab from './components/IntervieweeTab';
import InterviewerTab from './components/InterviewerTab';
import { Users, MessageCircle, Trophy, Brain } from 'lucide-react';
import './App.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('interviewee');
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Interview Assistant</h1>
                <p className="text-sm text-muted-foreground">Powered by Crisp AI Technology</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="h-4 w-4" />
              <span>Smart Assessment Platform</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-2 w-96">
              <TabsTrigger value="interviewee" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Interviewee
              </TabsTrigger>
              <TabsTrigger value="interviewer" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Interviewer
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="interviewee" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <IntervieweeTab />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="interviewer" className="mt-0">
            <Card>
              <CardContent className="p-0">
                <InterviewerTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
