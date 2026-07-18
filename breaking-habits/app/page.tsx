'use client';

import { useState, useEffect } from 'react';
import { UserProfile, FrictionLog, ActionTask, ChatMessage, Testimonial } from './types';
import Testimonials from './components/Testimonials';
import FrictionTracker from './components/FrictionTracker';
import ActionPlanner from './components/ActionPlanner';

const ALL_TESTIMONIALS: Testimonial[] = [
  { id: 1, keywords: ['screen', 'phone', 'social', 'scroll'], author: 'Sarah M.', text: 'Swapping my late-night scroll for a 10-minute reading routine completely restored my sleep cycles.' },
  { id: 2, keywords: ['screen', 'phone', 'social', 'scroll', 'procrastination'], author: 'David K.', text: 'Leaving my phone in another room during working hours helped me regain deep focus without feeling constantly anxious.' },
  { id: 3, keywords: ['sugar', 'food', 'snack', 'eating'], author: 'Elena R.', text: 'Tracking my mid-afternoon energy crashes helped me realize I was eating sugar out of fatigue, not hunger.' },
  { id: 4, keywords: ['sugar', 'food', 'snack', 'eating'], author: 'Marcus T.', text: 'Replacing soda with carbonated water cut my sugar cravings down to zero within just two weeks.' },
  { id: 5, keywords: ['procrastination', 'work', 'focus', 'delay'], author: 'James L.', text: 'Breaking my tasks into tiny 5-minute milestones stopped the overwhelm that used to make me freeze up.' },
  { id: 6, keywords: ['generic', 'habit', 'routine'], author: 'Alex P.', text: 'Focusing on my environmental triggers rather than relying on pure willpower made change feel effortless.' }
];

const CLINICAL_NAMES = ["Dr. Aris Thorne", "Dr. Clara Vance", "Dr. Julian Reyes", "Dr. Evelyn Boyd"];

export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [inputName, setInputName] = useState('');
  const [inputHabit, setInputHabit] = useState('');
  const [logs, setLogs] = useState<FrictionLog[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedTestimonials, setMatchedTestimonials] = useState<Testimonial[]>([]);
  const [tasks, setTasks] = useState<ActionTask[]>([]);
  const [timeOfDay, setTimeOfDay] = useState('Morning Focus');

  const checkTimeContext = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Morning Focus';
    if (hour >= 12 && hour < 17) return 'Midday Routine';
    if (hour >= 17 && hour < 21) return 'Evening Transition';
    return 'Night Vulnerability Window';
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('habit_user');
    const savedLogs = JSON.parse(localStorage.getItem('habit_logs') || '[]');
    const savedChat = JSON.parse(localStorage.getItem('habit_chat') || '[]');
    const savedTasks = JSON.parse(localStorage.getItem('habit_tasks') || '[]');
    
    setTimeOfDay(checkTimeContext());
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      filterTestimonials(parsedUser.habit);
    }
    setLogs(savedLogs);
    setMessages(savedChat);
    setTasks(savedTasks);
  }, []);

  const filterTestimonials = (habitStr: string) => {
    const searchStr = habitStr.toLowerCase();
    let matches = ALL_TESTIMONIALS.filter(t => t.keywords.some(k => searchStr.includes(k)));
    if (matches.length < 2) matches = ALL_TESTIMONIALS.filter(t => t.keywords.includes('generic'));
    setMatchedTestimonials(matches.slice(0, 3));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputHabit.trim()) return;

    const randomDoctor = CLINICAL_NAMES[Math.floor(Math.random() * CLINICAL_NAMES.length)];
    const userData = { name: inputName, habit: inputHabit, doctor: randomDoctor };
    
    localStorage.setItem('habit_user', JSON.stringify(userData));
    setUser(userData);
    filterTestimonials(inputHabit);
    setLoading(true);

    const activeContext = checkTimeContext();

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habit: inputHabit,
          logs: [],
          message: `Hello! My name is ${inputName}. I want to talk about my routine and build better boundaries around: ${inputHabit}. I am checking in during the ${activeContext}. Please introduce yourself as ${randomDoctor} and reply in simple, plain English.`,
          chatHistory: [],
        }),
      });
      const data = await res.json();
      if (data.reply) {
        const initialGreeting = { sender: 'ai' as const, text: data.reply };
        setMessages([initialGreeting]);
        localStorage.setItem('habit_chat', JSON.stringify([initialGreeting]));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addLog = (triggerText: string, intensityValue: string) => {
    const currentContext = checkTimeContext();
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeContext: currentContext,
      trigger: triggerText,
      intensity: intensityValue,
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('habit_logs', JSON.stringify(updatedLogs));
  };

  const addTask = (text: string, timeSlot: string) => {
    const newTask = { id: Date.now(), text, timeSlot, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('habit_tasks', JSON.stringify(updatedTasks));
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    localStorage.setItem('habit_tasks', JSON.stringify(updatedTasks));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loading || !user) return;

    const userMsg = { sender: 'user' as const, text: chatInput };
    const updatedChat = [...messages, userMsg];
    setMessages(updatedChat);
    localStorage.setItem('habit_chat', JSON.stringify(updatedChat));
    setChatInput('');
    setLoading(true);

    const currentContext = checkTimeContext();

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habit: user.habit,
          logs: logs,
          message: `${chatInput} (Note: Current context is ${currentContext}. Use plain English. Output tasks using the [Action: Task Text | Time Slot] bracket format.)`,
          chatHistory: messages,
        }),
      });
      
      const data = await res.json();
      if (data.reply) {
        let cleanReply = data.reply;
        const actionRegex = /\[Action:\s*([^|]+)\s*\|\s*([^\]]+)\]/g;
        let match;
        let newDetectedTasks = [...tasks];

        while ((match = actionRegex.exec(data.reply)) !== null) {
          newDetectedTasks.push({
            id: Date.now() + Math.random(),
            text: `📋 ${user.doctor} suggested: ${match[1].trim()}`,
            timeSlot: match[2].trim(),
            completed: false
          });
        }

        cleanReply = cleanReply.replace(actionRegex, '').trim();
        const aiMsg = { sender: 'ai' as const, text: cleanReply };
        const finalChat = [...updatedChat, aiMsg];
        
        setMessages(finalChat);
        localStorage.setItem('habit_chat', JSON.stringify(finalChat));
        
        if (newDetectedTasks.length > tasks.length) {
          setTasks(newDetectedTasks);
          localStorage.setItem('habit_tasks', JSON.stringify(newDetectedTasks));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.clear();
    setUser(null);
    setLogs([]);
    setMessages([]);
    setTasks([]);
  };

  const getIntensityLabel = (val: string) => {
    const num = parseInt(val);
    if (num <= 3) return 'Mild Noticeable Urge';
    if (num <= 7) return 'Strong Temptation';
    return 'Demanding Immediate Focus';
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold text-stone-900 mb-2 text-center tracking-tight">Mindful Spaces</h1>
          <form onSubmit={handleRegister} className="space-y-4 mt-4">
            <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Your Name" className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500" required />
            <input type="text" value={inputHabit} onChange={(e) => setInputHabit(e.target.value)} placeholder="Habit Goal (e.g., Less Phone Time)" className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500" required />
            <button type="submit" className="w-full bg-emerald-700 text-white transition-colors py-3 rounded-xl font-medium text-sm">Create Space</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 p-6 max-w-7xl mx-auto flex flex-col justify-between">
      <header className="flex justify-between items-center border-b border-stone-200 pb-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Mindful Space Framework</h1>
          <p className="text-stone-500 text-xs mt-0.5">Member: {user.name} • Consultant: {user.doctor} • Context: {timeOfDay}</p>
        </div>
        <button onClick={handleReset} className="text-xs bg-white border border-stone-200 px-3 py-1.5 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors">Reset Space</button>
      </header>

      <Testimonials items={matchedTestimonials} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start">
        <FrictionTracker logs={logs} onAddLog={addLog} getIntensityLabel={getIntensityLabel} />
        
        {/* Chat Component Terminal Block */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col h-[560px] shadow-sm">
          <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Consultant Dialogue</h2>
          <p className="text-stone-500 text-xs mb-4">{user.doctor} evaluates your metrics.</p>
          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-stone-50 rounded-xl border border-stone-200 mb-4 text-xs">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${msg.sender === 'user' ? 'bg-emerald-700 text-white' : 'bg-white text-stone-700 border border-stone-200'}`}>{msg.text}</div>
              </div>
            ))}
            {loading && <div className="text-emerald-700 font-medium text-xs animate-pulse">Processing timeline adjustments...</div>}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={`Message ${user.doctor}...`} className="flex-grow bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-emerald-500" required />
            <button type="submit" disabled={loading} className="bg-emerald-700 text-white px-5 rounded-xl text-xs font-medium hover:bg-emerald-600 transition-colors">Send</button>
          </form>
        </div>

        <ActionPlanner tasks={tasks} onAddTask={addTask} onToggleTask={toggleTask} />
      </div>
    </main>
  );
}