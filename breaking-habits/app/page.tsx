// // // 'use client';

// // // import { useState, useEffect } from 'react';

// // // export default function Home() {
// // //   const [habit, setHabit] = useState('');
// // //   const [inputHabit, setInputHabit] = useState('');
// // //   const [logs, setLogs] = useState<any[]>([]);
// // //   const [trigger, setTrigger] = useState('');
// // //   const [intensity, setIntensity] = useState('5');
  
// // //   const [messages, setMessages] = useState<any[]>([]);
// // //   const [chatInput, setChatInput] = useState('');
// // //   const [loading, setLoading] = useState(false);

// // //   // Sync state data safely from local storage context upon initial mount
// // //   useEffect(() => {
// // //     const savedHabit = localStorage.getItem('habit') || '';
// // //     const savedLogs = JSON.parse(localStorage.getItem('logs') || '[]');
// // //     const savedChat = JSON.parse(localStorage.getItem('chat') || '[]');
// // //     setHabit(savedHabit);
// // //     setLogs(savedLogs);
// // //     setMessages(savedChat);
// // //   }, []);

// // //   const handleSaveHabit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!inputHabit.trim()) return;
// // //     localStorage.setItem('habit', inputHabit);
// // //     setHabit(inputHabit);
// // //   };

// // //   const handleAddLog = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!trigger.trim()) return;
// // //     const newLog = {
// // //       id: Date.now(),
// // //       timestamp: new Date().toLocaleTimeString(),
// // //       trigger,
// // //       intensity,
// // //     };
// // //     const updatedLogs = [newLog, ...logs];
// // //     setLogs(updatedLogs);
// // //     localStorage.setItem('logs', JSON.stringify(updatedLogs));
// // //     setTrigger('');
// // //   };

// // //   const handleSendMessage = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!chatInput.trim() || loading) return;

// // //     const userMsg = { sender: 'user', text: chatInput };
// // //     const updatedChat = [...messages, userMsg];
// // //     setMessages(updatedChat);
// // //     localStorage.setItem('chat', JSON.stringify(updatedChat));
// // //     setChatInput('');
// // //     setLoading(true);

// // //     try {
// // //       const res = await fetch('/api/coach', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({
// // //           habit,
// // //           logs,
// // //           message: chatInput,
// // //           chatHistory: messages,
// // //         }),
// // //       });
// // //       const data = await res.json();
// // //       if (data.reply) {
// // //         const aiMsg = { sender: 'ai', text: data.reply };
// // //         const finalChat = [...updatedChat, aiMsg];
// // //         setMessages(finalChat);
// // //         localStorage.setItem('chat', JSON.stringify(finalChat));
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     localStorage.clear();
// // //     setHabit('');
// // //     setLogs([]);
// // //     setMessages([]);
// // //   };

// // //   // View 1: Onboarding Engine UI Block
// // //   if (!habit) {
// // //     return (
// // //       <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
// // //         <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-2xl">
// // //           <h1 className="text-2xl font-bold text-emerald-400 mb-2 text-center">Breaking Bad Habits</h1>
// // //           <p className="text-zinc-400 text-sm mb-6 text-center">AI-Powered Dynamic Engine</p>
// // //           <form onSubmit={handleSaveHabit} className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-zinc-300 mb-2">What habit or addiction are you breaking?</label>
// // //               <input
// // //                 type="text"
// // //                 value={inputHabit}
// // //                 onChange={(e) => setInputHabit(e.target.value)}
// // //                 placeholder="e.g., Excessive Screen Time, Sugar, Gambling..."
// // //                 className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
// // //                 required
// // //               />
// // //             </div>
// // //             <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 transition-colors py-3 rounded-lg font-semibold text-sm">
// // //               Initialize Custom AI Coach
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </main>
// // //     );
// // //   }

// // //   // View 2: Main Functioning Live Dashboard Interface
// // //   return (
// // //     <main className="min-h-screen bg-zinc-950 text-white p-6 max-w-6xl mx-auto flex flex-col justify-between">
// // //       <header className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
// // //         <div>
// // //           <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">HabitBreaker AI</h1>
// // //           <p className="text-zinc-400 text-xs">Targeting: <span className="text-emerald-400 font-semibold">{habit}</span></p>
// // //         </div>
// // //         <button onClick={handleReset} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-zinc-400 transition-colors">
// // //           Reset All Data
// // //         </button>
// // //       </header>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
// // //         {/* Real Dynamic Trigger Form Panel */}
// // //         <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between h-[500px]">
// // //           <div>
// // //             <h2 className="text-base font-bold mb-4 text-zinc-200">Dynamic Friction Tracker</h2>
// // //             <form onSubmit={handleAddLog} className="space-y-4 mb-6">
// // //               <div>
// // //                 <label className="block text-xs font-medium text-zinc-400 mb-1">What triggered the current urge?</label>
// // //                 <input
// // //                   type="text"
// // //                   value={trigger}
// // //                   onChange={(e) => setTrigger(e.target.value)}
// // //                   placeholder="e.g., Boredom, Stress, Social Notification"
// // //                   className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <label className="block text-xs font-medium text-zinc-400 mb-1">Urge Intensity level (1-10): {intensity}</label>
// // //                 <input
// // //                   type="range"
// // //                   min="1"
// // //                   max="10"
// // //                   value={intensity}
// // //                   onChange={(e) => setIntensity(e.target.value)}
// // //                   className="w-full accent-emerald-500 bg-zinc-800 h-2 rounded-lg appearance-none cursor-pointer"
// // //                 />
// // //               </div>
// // //               <button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 transition-colors py-2 rounded-lg text-xs font-semibold border border-zinc-700 text-zinc-200">
// // //                 Log Real Incident Data
// // //               </button>
// // //             </form>
// // //           </div>

// // //           <div className="flex-grow overflow-y-auto max-h-[220px] border-t border-zinc-800/60 pt-4">
// // //             <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Live Log History</h3>
// // //             {logs.length === 0 ? (
// // //               <p className="text-zinc-600 text-xs italic">No dynamic incidents logged yet.</p>
// // //             ) : (
// // //               <div className="space-y-2">
// // //                 {logs.map((log) => (
// // //                   <div key={log.id} className="bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-xs flex justify-between items-center">
// // //                     <div>
// // //                       <p className="text-zinc-300 font-medium">Trigger: {log.trigger}</p>
// // //                       <span className="text-zinc-500 font-mono">{log.timestamp}</span>
// // //                     </div>
// // //                     <span className="bg-emerald-950/40 text-emerald-400 text-xs px-2 py-1 rounded font-mono border border-emerald-900/50">
// // //                       Intensity: {log.intensity}
// // //                     </span>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Dynamic End-to-End Generative AI Chat Coach Terminal */}
// // //         <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col h-[500px]">
// // //           <h2 className="text-base font-bold mb-1 text-zinc-200">Adaptive AI Coach Terminal</h2>
// // //           <p className="text-zinc-500 text-xs mb-3">Powered by real contextual tracking inputs.</p>
// // //           <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-zinc-950 rounded-xl border border-zinc-800 mb-4 text-xs">
// // //             {messages.length === 0 && (
// // //               <p className="text-zinc-600 text-center mt-4 italic">Provide tracking signals or chat messages to generate adaptive behavioral adjustments.</p>
// // //             )}
// // //             {messages.map((msg, index) => (
// // //               <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
// // //                 <div className={`max-w-[85%] rounded-xl p-3 ${msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
// // //                   {msg.text}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             {loading && <div className="text-emerald-400 italic text-xs animate-pulse">Analyzing tracking loops...</div>}
// // //           </div>

// // //           <form onSubmit={handleSendMessage} className="flex gap-2">
// // //             <input
// // //               type="text"
// // //               value={chatInput}
// // //               onChange={(e) => setChatInput(e.target.value)}
// // //               placeholder="Talk about your immediate symptoms or targets..."
// // //               className="flex-grow bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
// // //               required
// // //             />
// // //             <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-4 rounded-lg text-xs font-semibold transition-colors">
// // //               Send
// // //             </button>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </main>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect } from 'react';

// // export default function Home() {
// //   const [habit, setHabit] = useState('');
// //   const [inputHabit, setInputHabit] = useState('');
// //   const [logs, setLogs] = useState<any[]>([]);
// //   const [trigger, setTrigger] = useState('');
// //   const [intensity, setIntensity] = useState('5');
  
// //   const [messages, setMessages] = useState<any[]>([]);
// //   const [chatInput, setChatInput] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     const savedHabit = localStorage.getItem('habit') || '';
// //     const savedLogs = JSON.parse(localStorage.getItem('logs') || '[]');
// //     const savedChat = JSON.parse(localStorage.getItem('chat') || '[]');
// //     setHabit(savedHabit);
// //     setLogs(savedLogs);
// //     setMessages(savedChat);
// //   }, []);

// //   const handleSaveHabit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!inputHabit.trim()) return;

// //     // 1. Commit the focus goal safely to the local browser ecosystem
// //     localStorage.setItem('habit', inputHabit);
// //     setHabit(inputHabit);
// //     setLoading(true);

// //     // 2. Simulate a professional clinical intake greeting tailored to their habit string
// //     try {
// //       const res = await fetch('/api/coach', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           habit: inputHabit,
// //           logs: [],
// //           message: "Hello Doctor, I am checking in to build better routines around this lifestyle area.",
// //           chatHistory: [], // Empty initial array array context
// //         }),
// //       });
      
// //       const data = await res.json();
// //       if (data.reply) {
// //         // Set the conversation framework directly with the doctor's opening analysis
// //         const systemGreeting = { sender: 'ai', text: data.reply };
// //         setMessages([systemGreeting]);
// //         localStorage.setItem('chat', JSON.stringify([systemGreeting]));
// //       }
// //     } catch (err) {
// //       console.error("Failed to initiate consultant intake:", err);
// //       // Clean fallback if API times out during structural handshake
// //       const fallbackGreeting = { 
// //         sender: 'ai', 
// //         text: `Welcome to your mindful consultation space. Let's look at balancing your routines around "${inputHabit}". Could you walk me through what a typical day looks like when this habit tends to appear?` 
// //       };
// //       setMessages([fallbackGreeting]);
// //       localStorage.setItem('chat', JSON.stringify([fallbackGreeting]));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddLog = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!trigger.trim()) return;
// //     const newLog = {
// //       id: Date.now(),
// //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
// //       trigger,
// //       intensity,
// //     };
// //     const updatedLogs = [newLog, ...logs];
// //     setLogs(updatedLogs);
// //     localStorage.setItem('logs', JSON.stringify(updatedLogs));
// //     setTrigger('');
// //   };

// //   const handleSendMessage = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!chatInput.trim() || loading) return;

// //     const userMsg = { sender: 'user', text: chatInput };
// //     const updatedChat = [...messages, userMsg];
// //     setMessages(updatedChat);
// //     localStorage.setItem('chat', JSON.stringify(updatedChat));
// //     setChatInput('');
// //     setLoading(true);

// //     try {
// //       const res = await fetch('/api/coach', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           habit,
// //           logs,
// //           message: chatInput,
// //           chatHistory: messages,
// //         }),
// //       });
// //       const data = await res.json();
// //       if (data.reply) {
// //         const aiMsg = { sender: 'ai', text: data.reply };
// //         const finalChat = [...updatedChat, aiMsg];
// //         setMessages(finalChat);
// //         localStorage.setItem('chat', JSON.stringify(finalChat));
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleReset = () => {
// //     localStorage.clear();
// //     setHabit('');
// //     setLogs([]);
// //     setMessages([]);
// //   };

// //   // Helper function to turn abstract intensity numbers into human context labels
// //   const getIntensityLabel = (val: string) => {
// //     const num = parseInt(val);
// //     if (num <= 3) return 'Mild Impulses';
// //     if (num <= 7) return 'Strong Craving';
// //     return 'Critical Friction';
// //   };

// //   // View 1: Onboarding Engine (Empathetic, Supportive Design)
// //   if (!habit) {
// //     return (
// //       <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
// //         <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
// //           <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto border border-emerald-500/20">
// //             <span className="text-xl">🌱</span>
// //           </div>
// //           <h1 className="text-2xl font-bold text-zinc-100 mb-2 text-center">Mindful Spaces</h1>
// //           <p className="text-zinc-400 text-sm mb-6 text-center">Your intentional habit restoration companion.</p>
// //           <form onSubmit={handleSaveHabit} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-zinc-300 mb-2 text-center">
// //                 What lifestyle boundary or routine are we focusing on balancing today?
// //               </label>
// //               <input
// //                 type="text"
// //                 value={inputHabit}
// //                 onChange={(e) => setInputHabit(e.target.value)}
// //                 placeholder="e.g., Mindful Screen Time, Sugar Intake, Procrastination..."
// //                 className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 text-sm transition-colors text-center"
// //                 required
// //               />
// //             </div>
// //             <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-colors py-3 rounded-xl font-semibold text-sm shadow-lg shadow-emerald-950/20">
// //               Begin Journey
// //             </button>
// //           </form>
// //         </div>
// //       </main>
// //     );
// //   }

// //   // View 2: Main Dynamic Live Dashboard Frame
// //   return (
// //     <main className="min-h-screen bg-zinc-950 text-white p-6 max-w-6xl mx-auto flex flex-col justify-between">
// //       <header className="flex justify-between items-center border-b border-zinc-800/60 pb-4 mb-6">
// //         <div>
// //           <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Mindful Dashboard</h1>
// //           <p className="text-zinc-400 text-xs mt-0.5">Focus Goal: <span className="text-emerald-400 font-medium">{habit}</span></p>
// //         </div>
// //         <button onClick={handleReset} className="text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-400 transition-colors">
// //           Reset Space
// //         </button>
// //       </header>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
// //         {/* Supportive Tracking Log */}
// //         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between h-[520px]">
// //           <div>
// //             <h2 className="text-base font-bold mb-1 text-zinc-200">Friction Tracker</h2>
// //             <p className="text-zinc-500 text-xs mb-4">Note down dynamic environmental shifts as they occur.</p>
// //             <form onSubmit={handleAddLog} className="space-y-4 mb-6">
// //               <div>
// //                 <label className="block text-xs font-medium text-zinc-400 mb-1.5">What event or trigger initiated this current urge?</label>
// //                 <input
// //                   type="text"
// //                   value={trigger}
// //                   onChange={(e) => setTrigger(e.target.value)}
// //                   placeholder="e.g., Finished work boredom, social media notification, stress window"
// //                   className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500 placeholder-zinc-500"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <div className="flex justify-between text-xs font-medium mb-1.5">
// //                   <span className="text-zinc-400">Current Impulse Level:</span>
// //                   <span className="text-emerald-400 font-semibold">{getIntensityLabel(intensity)} ({intensity}/10)</span>
// //                 </div>
// //                 <input
// //                   type="range"
// //                   min="1"
// //                   max="10"
// //                   value={intensity}
// //                   onChange={(e) => setIntensity(e.target.value)}
// //                   className="w-full accent-emerald-500 bg-zinc-800 h-2 rounded-lg appearance-none cursor-pointer"
// //                 />
// //               </div>
// //               <button type="submit" className="w-full bg-zinc-800 hover:bg-zinc-700 transition-colors py-2.5 rounded-xl text-xs font-semibold border border-zinc-700 text-zinc-200">
// //                 Log Operational Event
// //               </button>
// //             </form>
// //           </div>

// //           <div className="flex-grow overflow-y-auto max-h-[200px] border-t border-zinc-800/60 pt-4">
// //             <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Live Log History</h3>
// //             {logs.length === 0 ? (
// //               <p className="text-zinc-600 text-xs italic">No behavioral log points registered yet.</p>
// //             ) : (
// //               <div className="space-y-2">
// //                 {logs.map((log) => (
// //                   <div key={log.id} className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-xs flex justify-between items-center">
// //                     <div>
// //                       <p className="text-zinc-300 font-medium">Trigger Context: {log.trigger}</p>
// //                       <span className="text-zinc-500 font-mono">{log.timestamp}</span>
// //                     </div>
// //                     <span className="bg-emerald-950/40 text-emerald-400 text-xs px-2 py-1 rounded-lg font-mono border border-emerald-900/50">
// //                       {getIntensityLabel(log.intensity)}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Real-time End-to-End Chat Coach Terminal */}
// //         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col h-[520px]">
// //           <h2 className="text-base font-bold mb-1 text-zinc-200">Adaptive Dialogue Support</h2>
// //           <p className="text-zinc-500 text-xs mb-4">Your coaching engine adjusts automatically to active history logs.</p>
// //           <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-zinc-950 rounded-xl border border-zinc-800 mb-4 text-xs">
// //             {messages.length === 0 && (
// //               <p className="text-zinc-600 text-center mt-4 italic">Share an immediate symptom or mental block to get contextual reflection strategies.</p>
// //             )}
// //             {messages.map((msg, index) => (
// //               <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
// //                 <div className={`max-w-[85%] rounded-xl p-3 shadow-sm ${msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
// //                   {msg.text}
// //                 </div>
// //               </div>
// //             ))}
// //             {loading && <div className="text-emerald-400 italic text-xs animate-pulse">Processing tracking data signatures...</div>}
// //           </div>

// //           <form onSubmit={handleSendMessage} className="flex gap-2">
// //             <input
// //               type="text"
// //               value={chatInput}
// //               onChange={(e) => setChatInput(e.target.value)}
// //               placeholder="What immediate challenge are you handling?"
// //               className="flex-grow bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-zinc-500"
// //               required
// //             />
// //             <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white px-5 rounded-xl text-xs font-semibold transition-colors shadow-md shadow-emerald-950/20">
// //               Send
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';

// // Contextual Testimonial Database Array
// const ALL_TESTIMONIALS = [
//   { id: 1, keywords: ['screen', 'phone', 'social', 'scroll'], author: 'Sarah M.', text: 'Swapping my late-night scroll for a 10-minute reading routine completely restored my sleep cycles.' },
//   { id: 2, keywords: ['screen', 'phone', 'social', 'scroll', 'procrastination'], author: 'David K.', text: 'Leaving my phone in another room during working hours helped me regain deep focus without feeling constantly anxious.' },
//   { id: 3, keywords: ['sugar', 'food', 'snack', 'eating'], author: 'Elena R.', text: 'Tracking my mid-afternoon energy crashes helped me realize I was eating sugar out of fatigue, not hunger.' },
//   { id: 4, keywords: ['sugar', 'food', 'snack', 'eating'], author: 'Marcus T.', text: 'Replacing soda with carbonated water cut my sugar cravings down to zero within just two weeks.' },
//   { id: 5, keywords: ['procrastination', 'work', 'focus', 'delay'], author: 'James L.', text: 'Breaking my tasks into tiny 5-minute milestones stopped the overwhelm that used to make me freeze up.' },
//   { id: 6, keywords: ['generic', 'habit', 'routine'], author: 'Alex P.', text: 'Focusing on my environmental triggers rather than relying on pure willpower made change feel effortless.' }
// ];

// export default function Home() {
//   // Authentication & Onboarding States
//   const [user, setUser] = useState<{ name: string; habit: string } | null>(null);
//   const [inputName, setInputName] = useState('');
//   const [inputHabit, setInputHabit] = useState('');

//   // Behavioral Tracker & Chat States
//   const [logs, setLogs] = useState<any[]>([]);
//   const [trigger, setTrigger] = useState('');
//   const [intensity, setIntensity] = useState('5');
//   const [messages, setMessages] = useState<any[]>([]);
//   const [chatInput, setChatInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [matchedTestimonials, setMatchedTestimonials] = useState<any[]>([]);

//   // Sync state parameters safely from browser localStorage upon initial mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem('habit_user');
//     const savedLogs = JSON.parse(localStorage.getItem('habit_logs') || '[]');
//     const savedChat = JSON.parse(localStorage.getItem('habit_chat') || '[]');
    
//     if (savedUser) {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);
//       filterTestimonials(parsedUser.habit);
//     }
//     setLogs(savedLogs);
//     setMessages(savedChat);
//   }, []);

//   // Filter 2-3 testimonials contextually based on the user's specific goal input
//   const filterTestimonials = (habitStr: string) => {
//     const searchStr = habitStr.toLowerCase();
//     let matches = ALL_TESTIMONIALS.filter(t => 
//       t.keywords.some(keyword => searchStr.includes(keyword))
//     );
    
//     // Fallback to generic entries if no exact keyword matches are found
//     if (matches.length < 2) {
//       matches = ALL_TESTIMONIALS.filter(t => t.keywords.includes('generic'));
//     }
//     setMatchedTestimonials(matches.slice(0, 3));
//   };

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!inputName.trim() || !inputHabit.trim()) return;

//     const userData = { name: inputName, habit: inputHabit };
//     localStorage.setItem('habit_user', JSON.stringify(userData));
//     setUser(userData);
//     filterTestimonials(inputHabit);
//     setLoading(true);

//     // Dynamic intake greeting utilizing plain language frameworks
//     try {
//       const res = await fetch('/api/coach', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           habit: inputHabit,
//           logs: [],
//           message: `Hello! My name is ${inputName}. I want to talk about my routine and build better boundaries around: ${inputHabit}. Please reply in simple, plain English.`,
//           chatHistory: [],
//         }),
//       });
      
//       const data = await res.json();
//       if (data.reply) {
//         const initialGreeting = { sender: 'ai', text: data.reply };
//         setMessages([initialGreeting]);
//         localStorage.setItem('habit_chat', JSON.stringify([initialGreeting]));
//       }
//     } catch (err) {
//       console.error(err);
//       const fallback = { 
//         sender: 'ai', 
//         text: `Hi ${inputName}! I am so glad you are here. Let's work together to look at your routines around ${inputHabit}. Can you tell me what normally happens right before this habit pops up?` 
//       };
//       setMessages([fallback]);
//       localStorage.setItem('habit_chat', JSON.stringify([fallback]));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddLog = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!trigger.trim()) return;

//     const newLog = {
//       id: Date.now(),
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       trigger,
//       intensity,
//     };
//     const updatedLogs = [newLog, ...logs];
//     setLogs(updatedLogs);
//     localStorage.setItem('habit_logs', JSON.stringify(updatedLogs));
//     setTrigger('');
//   };

//   // Interconnected Mechanism: Injecting tracking history automatically into the dialog request
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!chatInput.trim() || loading) return;

//     const userMsg = { sender: 'user', text: chatInput };
//     const updatedChat = [...messages, userMsg];
//     setMessages(updatedChat);
//     localStorage.setItem('habit_chat', JSON.stringify(updatedChat));
//     setChatInput('');
//     setLoading(true);

//     try {
//       const res = await fetch('/api/coach', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           habit: user?.habit,
//           logs: logs, // Pass tracker array into chat route logic
//           message: `${chatInput} (Note: Please continue to give your advice in very clear, simple English without complex medical or clinical terms.)`,
//           chatHistory: messages,
//         }),
//       });
//       const data = await res.json();
//       if (data.reply) {
//         const aiMsg = { sender: 'ai', text: data.reply };
//         const finalChat = [...updatedChat, aiMsg];
//         setMessages(finalChat);
//         localStorage.setItem('habit_chat', JSON.stringify(finalChat));
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     localStorage.clear();
//     setUser(null);
//     setLogs([]);
//     setMessages([]);
//     setInputName('');
//     setInputHabit('');
//     setMatchedTestimonials([]);
//   };

//   const getIntensityLabel = (val: string) => {
//     const num = parseInt(val);
//     if (num <= 3) return 'Mild Noticeable Urge';
//     if (num <= 7) return 'Strong Temptation';
//     return 'Demanding Immediate Focus';
//   };

//   // View 1: Calming Register / Login Screen Layout
//   if (!user) {
//     return (
//       <main className="min-h-screen bg-stone-50 text-stone-800 flex items-center justify-center p-4 selection:bg-emerald-100">
//         <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-2xl shadow-sm">
//           <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 mx-auto border border-emerald-100">
//             <span className="text-xl text-emerald-700">🌱</span>
//           </div>
//           <h1 className="text-2xl font-bold text-stone-900 mb-2 text-center tracking-tight">Mindful Spaces</h1>
//           <p className="text-stone-500 text-sm mb-6 text-center">Your personalized habit support environment.</p>
          
//           <form onSubmit={handleRegister} className="space-y-4">
//             <div>
//               <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Your Name</label>
//               <input
//                 type="text"
//                 value={inputName}
//                 onChange={(e) => setInputName(e.target.value)}
//                 placeholder="How should your coach address you?"
//                 className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Your Habit Goal</label>
//               <input
//                 type="text"
//                 value={inputHabit}
//                 onChange={(e) => setInputHabit(e.target.value)}
//                 placeholder="e.g., Mindful Phone Time, Managing Sugar Cravings..."
//                 className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
//                 required
//               />
//             </div>
//             <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white transition-colors py-3 rounded-xl font-medium text-sm shadow-sm mt-2">
//               Create My Personal Space
//             </button>
//           </form>
//         </div>
//       </main>
//     );
//   }

//   // View 2: High-Fidelity Calming Dashboard UI Frame
//   return (
//     <main className="min-h-screen bg-stone-50 text-stone-800 p-6 max-w-6xl mx-auto flex flex-col justify-between selection:bg-emerald-100">
//       <header className="flex justify-between items-center border-b border-stone-200 pb-4 mb-6">
//         <div>
//           <h1 className="text-xl font-bold text-stone-900 tracking-tight">Mindful Dashboard</h1>
//           <p className="text-stone-500 text-xs mt-0.5">Welcome back, <span className="font-medium text-stone-700">{user.name}</span> • Goal: <span className="text-emerald-700 font-medium">{user.habit}</span></p>
//         </div>
//         <button onClick={handleReset} className="text-xs bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-lg text-stone-500 transition-colors shadow-sm">
//           Reset Space
//         </button>
//       </header>

//       {/* Dynamic Testimonials Section */}
//       <section className="mb-6">
//         <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Community Success Insights</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {matchedTestimonials.map(t => (
//             <div key={t.id} className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm transition-all hover:border-emerald-200">
//               <p className="text-stone-600 text-xs italic leading-relaxed">"{t.text}"</p>
//               <span className="block text-stone-400 text-[10px] font-medium mt-2 text-right">— {t.author}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
//         {/* The Friction Tracker Component */}
//         <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between h-[520px] shadow-sm">
//           <div>
//             <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Daily Routine Check-In</h2>
//             <p className="text-stone-500 text-xs mb-4">Log instances to sync context dynamically with your coach.</p>
            
//             <form onSubmit={handleAddLog} className="space-y-4 mb-6">
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">What triggered the habit just now?</label>
//                 <input
//                   type="text"
//                   value={trigger}
//                   onChange={(e) => setTrigger(e.target.value)}
//                   placeholder="e.g., Sitting on the couch after dinner, afternoon work stress..."
//                   className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-stone-900 focus:outline-none focus:border-emerald-500 placeholder-stone-400"
//                   required
//                 />
//               </div>
//               <div>
//                 <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
//                   <span className="text-stone-500">Impulse Strength:</span>
//                   <span className="text-emerald-700 font-bold">{getIntensityLabel(intensity)}</span>
//                 </div>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={intensity}
//                   onChange={(e) => setIntensity(e.target.value)}
//                   className="w-full accent-emerald-700 bg-stone-200 h-2 rounded-lg cursor-pointer"
//                 />
//               </div>
//               <button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white transition-colors py-2.5 rounded-xl text-xs font-medium shadow-sm">
//                 Log Routine Event
//               </button>
//             </form>
//           </div>

//           <div className="flex-grow overflow-y-auto max-h-[180px] border-t border-stone-100 pt-4">
//             <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-3">Your Logged Timeline</h4>
//             {logs.length === 0 ? (
//               <p className="text-stone-400 text-xs italic">No entries registered today yet.</p>
//             ) : (
//               <div className="space-y-2">
//                 {logs.map((log) => (
//                   <div key={log.id} className="bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs flex justify-between items-center">
//                     <div>
//                       <p className="text-stone-700 font-medium">Trigger: {log.trigger}</p>
//                       <span className="text-stone-400 font-mono text-[10px]">{log.timestamp}</span>
//                     </div>
//                     <span className="bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1 rounded-lg border border-emerald-100 font-medium">
//                       {getIntensityLabel(log.intensity)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* The Interconnected Chat Terminal Component */}
//         <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col h-[520px] shadow-sm">
//           <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Dialogue Support</h2>
//           <p className="text-stone-500 text-xs mb-4">Your consultant reads your check-in history automatically to build advice.</p>
          
//           <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-stone-50 rounded-xl border border-stone-200 mb-4 text-xs">
//             {messages.map((msg, index) => (
//               <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${msg.sender === 'user' ? 'bg-emerald-700 text-white font-medium' : 'bg-white text-stone-700 border border-stone-200'}`}>
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {loading && <div className="text-emerald-700 font-medium text-xs animate-pulse">Your coach is reviewing your lifestyle logs...</div>}
//           </div>

//           <form onSubmit={handleSendMessage} className="flex gap-2">
//             <input
//               type="text"
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               placeholder="Tell your coach how your routine is feeling..."
//               className="flex-grow bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 placeholder-stone-400"
//               required
//             />
//             <button type="submit" disabled={loading} className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 text-white px-5 rounded-xl text-xs font-medium transition-colors shadow-sm">
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }

'use client';

import { useState, useEffect } from 'react';

// Contextual Testimonial Database Array
const ALL_TESTIMONIALS = [
  { id: 1, keywords: ['screen', 'phone', 'social', 'scroll'], author: 'Sarah M.', text: 'Swapping my late-night scroll for a 10-minute reading routine completely restored my sleep cycles.' },
  { id: 2, keywords: ['screen', 'phone', 'social', 'scroll', 'procrastination'], author: 'David K.', text: 'Leaving my phone in another room during working hours helped me regain deep focus without feeling constantly anxious.' },
  { id: 3, keywords: ['sugar', 'food', 'snack', 'eating'], author: 'Elena R.', text: 'Tracking my mid-afternoon energy crashes helped me realize I was eating sugar out of fatigue, not hunger.' },
  { id: 4, keywords: ['sugar', 'food', 'snack', 'eating'], author: 'Marcus T.', text: 'Replacing soda with carbonated water cut my sugar cravings down to zero within just two weeks.' },
  { id: 5, keywords: ['procrastination', 'work', 'focus', 'delay'], author: 'James L.', text: 'Breaking my tasks into tiny 5-minute milestones stopped the overwhelm that used to make me freeze up.' },
  { id: 6, keywords: ['generic', 'habit', 'routine'], author: 'Alex P.', text: 'Focusing on my environmental triggers rather than relying on pure willpower made change feel effortless.' }
];

const CLINICAL_NAMES = ["Dr. Aris Thorne", "Dr. Clara Vance", "Dr. Julian Reyes", "Dr. Evelyn Boyd"];

export default function Home() {
  // Authentication & Onboarding States
  const [user, setUser] = useState<{ name: string; habit: string; doctor: string } | null>(null);
  const [inputName, setInputName] = useState('');
  const [inputHabit, setInputHabit] = useState('');

  // Behavioral Tracker, Tasks & Chat States
  const [logs, setLogs] = useState<any[]>([]);
  const [trigger, setTrigger] = useState('');
  const [intensity, setIntensity] = useState('5');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [messages, setMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedTestimonials, setMatchedTestimonials] = useState<any[]>([]);
  const [tasks, setTasks] = useState<{ id: number; text: string; timeSlot: string; completed: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('Midday Interval');

  // Detect time of day shifts locally to build enhanced micro-tracking states
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
    let matches = ALL_TESTIMONIALS.filter(t => 
      t.keywords.some(keyword => searchStr.includes(keyword))
    );
    if (matches.length < 2) {
      matches = ALL_TESTIMONIALS.filter(t => t.keywords.includes('generic'));
    }
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
        const initialGreeting = { sender: 'ai', text: data.reply };
        setMessages([initialGreeting]);
        localStorage.setItem('habit_chat', JSON.stringify([initialGreeting]));
      }
    } catch (err) {
      console.error(err);
      const fallback = { 
        sender: 'ai', 
        text: `Hello ${inputName}, I am ${randomDoctor}. I am glad you connected during this ${activeContext}. Let's gently review your routines regarding ${inputHabit}. Can you outline what triggers this most during this specific time of day?` 
      };
      setMessages([fallback]);
      localStorage.setItem('habit_chat', JSON.stringify([fallback]));
    } finally {
      setLoading(false);
    }
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trigger.trim()) return;

    const currentContext = checkTimeContext();
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeContext: currentContext,
      trigger,
      intensity,
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('habit_logs', JSON.stringify(updatedLogs));
    setTrigger('');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText,
      timeSlot: newTaskTime,
      completed: false
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('habit_tasks', JSON.stringify(updatedTasks));
    setNewTaskText('');
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    localStorage.setItem('habit_tasks', JSON.stringify(updatedTasks));
  };

  // const handleSendMessage = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!chatInput.trim() || loading) return;

  //   const userMsg = { sender: 'user', text: chatInput };
  //   const updatedChat = [...messages, userMsg];
  //   setMessages(updatedChat);
  //   localStorage.setItem('habit_chat', JSON.stringify(updatedChat));
  //   setChatInput('');
  //   setLoading(true);

  //   const currentContext = checkTimeContext();

  //   try {
  //     const res = await fetch('/api/coach', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         habit: user?.habit,
  //         logs: logs,
  //         message: `${chatInput} (Note: The local time context is currently ${currentContext}. Please integrate this timeline context into your recommendations. Address me as your patient using plain English without technical medical jargon.)`,
  //         chatHistory: messages,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (data.reply) {
  //       const aiMsg = { sender: 'ai', text: data.reply };
  //       const finalChat = [...updatedChat, aiMsg];
  //       setMessages(finalChat);
  //       localStorage.setItem('habit_chat', JSON.stringify(finalChat));
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;

    const userMsg = { sender: 'user', text: chatInput };
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
          habit: user?.habit,
          logs: logs,
          message: `${chatInput} (Note: The local time context is currently ${currentContext}. Please integrate this timeline context into your recommendations. Address me as your patient using plain English. Remember to output any specific micro-tasks using the [Action: Task Text | Time Slot] bracket format.)`,
          chatHistory: messages,
        }),
      });
      
      const data = await res.json();
      if (data.reply) {
        let cleanReply = data.reply;
        
        // Automated Parsing Engine: Find any [Action: Task | TimeSlot] tags in the text
        const actionRegex = /\[Action:\s*([^|]+)\s*\|\s*([^\]]+)\]/g;
        let match;
        let newDetectedTasks = [...tasks];

        while ((match = actionRegex.exec(data.reply)) !== null) {
          const taskText = match[1].trim();
          const taskTimeSlot = match[2].trim();

          // Create a dynamic action task entry
          const derivedDocTask = {
            id: Date.now() + Math.random(), // Unique key generation
            text: `📋 ${user?.doctor || 'Doctor'} suggested: ${taskText}`,
            timeSlot: taskTimeSlot,
            completed: false
          };
          
          newDetectedTasks.push(derivedDocTask);
        }

        // Clean up the bracket tags from display text so the user UI looks premium
        cleanReply = cleanReply.replace(actionRegex, '').trim();

        const aiMsg = { sender: 'ai', text: cleanReply };
        const finalChat = [...updatedChat, aiMsg];
        
        // Commit both update states cleanly into local storage context
        setMessages(finalChat);
        localStorage.setItem('habit_chat', JSON.stringify(finalChat));
        
        if (newDetectedTasks.length > tasks.length) {
          setTasks(newDetectedTasks);
          localStorage.setItem('habit_tasks', JSON.stringify(newDetectedTasks));
        }
      }
    } catch (err) {
      console.error("Friction link failed:", err);
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
    setInputName('');
    setInputHabit('');
    setMatchedTestimonials([]);
  };

  const getIntensityLabel = (val: string) => {
    const num = parseInt(val);
    if (num <= 3) return 'Mild Noticeable Urge';
    if (num <= 7) return 'Strong Temptation';
    return 'Demanding Immediate Focus';
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-stone-50 text-stone-800 flex items-center justify-center p-4 selection:bg-emerald-100">
        <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-2xl shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 mx-auto border border-emerald-100">
            <span className="text-xl text-emerald-700">🌱</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2 text-center tracking-tight">Mindful Spaces</h1>
          <p className="text-stone-500 text-sm mb-6 text-center font-normal">Your personalized habit support environment.</p>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Your Name</label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="How should your coach address you?"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Your Habit Goal</label>
              <input
                type="text"
                value={inputHabit}
                onChange={(e) => setInputHabit(e.target.value)}
                placeholder="e.g., Mindful Phone Time, Managing Sugar Cravings..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                required
              />
            </div>
            <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white transition-colors py-3 rounded-xl font-medium text-sm shadow-sm mt-2">
              Create My Personal Space
            </button>
          </form>
        </div>
      </main>
    );
  }

  const isNightWindow = timeOfDay.includes('Night');

  return (
    <main className={`min-h-screen text-stone-800 p-6 max-w-7xl mx-auto flex flex-col justify-between selection:bg-emerald-100 transition-colors duration-500 ${isNightWindow ? 'bg-stone-100/80 text-stone-900' : 'bg-stone-50'}`}>
      <header className="flex justify-between items-center border-b border-stone-200 pb-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">Mindful Journey</h1>
          <p className="text-stone-500 text-xs mt-0.5">
            Achiever: <span className="text-emerald-700 font-medium">{user.name}</span> • Consultant: <span className="text-emerald-700 font-medium">{user.doctor}</span> • Context: <span className={`font-semibold ${isNightWindow ? 'text-amber-700 animate-pulse' : 'text-emerald-700'}`}>{timeOfDay}</span>
          </p>
        </div>
        <button onClick={handleReset} className="text-xs bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-lg text-stone-500 transition-colors shadow-sm">
          Reset Space
        </button>
      </header>

      {/* Dynamic Testimonials Cards Panel */}
      <section className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Community Success Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matchedTestimonials.map(t => (
            <div key={t.id} className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm transition-all hover:border-emerald-200">
              <p className="text-stone-600 text-xs italic leading-relaxed">"{t.text}"</p>
              <span className="block text-stone-400 text-[10px] font-medium mt-2 text-right">— {t.author}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow items-start">
        {/* Component 1: Friction Tracker */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between h-[560px] shadow-sm">
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Daily Routine Check-In</h2>
            <p className="text-stone-500 text-xs mb-4">Log instances to update contextual data loops.</p>
            
            <form onSubmit={handleAddLog} className="space-y-4 mb-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">What triggered the urge just now?</label>
                <input
                  type="text"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  placeholder="e.g., Sitting down after dinner, notification ping..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-stone-900 focus:outline-none focus:border-emerald-500 placeholder-stone-400"
                  required
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                  <span className="text-stone-500">Impulse Strength:</span>
                  <span className="text-emerald-700 font-bold">{getIntensityLabel(intensity)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                  className="w-full accent-emerald-700 bg-stone-200 h-2 rounded-lg cursor-pointer"
                />
              </div>
              <button type="submit" className="w-full bg-stone-900 hover:bg-stone-800 text-white transition-colors py-2.5 rounded-xl text-xs font-medium shadow-sm">
                Log Routine Event
              </button>
            </form>
          </div>

          <div className="flex-grow overflow-y-auto max-h-[200px] border-t border-stone-100 pt-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Your Logged Timeline</h4>
            {logs.length === 0 ? (
              <p className="text-stone-400 text-xs italic">No entries registered today yet.</p>
            ) : (
              <div className="space-y-1.5">
                {logs.map((log) => (
                  <div key={log.id} className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-xs flex justify-between items-center">
                    <div>
                      <p className="text-stone-700 font-medium">Trigger: {log.trigger}</p>
                      <span className="text-stone-400 font-mono text-[9px]">{log.timestamp} • {log.timeContext}</span>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded-md border border-emerald-100 font-medium whitespace-nowrap">
                      {log.intensity}/10
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Component 2: Interconnected Adaptive Dialogue Support Chat Terminal */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col h-[560px] shadow-sm">
          <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Consultant Dialogue</h2>
          <p className="text-stone-500 text-xs mb-4">{user.doctor} evaluates your active time metrics to tailor strategies.</p>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-stone-50 rounded-xl border border-stone-200 mb-4 text-xs">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${msg.sender === 'user' ? 'bg-emerald-700 text-white font-medium' : 'bg-white text-stone-700 border border-stone-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-emerald-700 font-medium text-xs animate-pulse">{user.doctor} is formatting recommendations...</div>}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Message ${user.doctor}...`}
              className="flex-grow bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 placeholder-stone-400"
              required
            />
            <button type="submit" disabled={loading} className="bg-emerald-700 hover:bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 text-white px-5 rounded-xl text-xs font-medium transition-colors shadow-sm">
              Send
            </button>
          </form>
        </div>

        {/* Component 3: Active Pre-generated Calendar Task List Panel */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between h-[560px] shadow-sm">
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Interval Action Planner</h2>
            <p className="text-stone-500 text-xs mb-4">Commit targeted micro-actions to your daily time breakdown.</p>
            
            <form onSubmit={handleAddTask} className="space-y-3 mb-4">
              <div>
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="e.g., Leave phone in hallway, Drink glass of water..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 placeholder-stone-400"
                  required
                />
              </div>
              <div className="flex gap-2 items-center">
                <select
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="flex-grow bg-stone-50 border border-stone-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
                >
                  <option value="Morning Focus">Morning Interval</option>
                  <option value="Midday Routine">Midday Interval</option>
                  <option value="Evening Transition">Evening Interval</option>
                  <option value="Night Vulnerability Window">Night Interval</option>
                </select>
                <button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white text-xs px-3 py-2 rounded-xl font-medium transition-colors whitespace-nowrap">
                  Add Action
                </button>
              </div>
            </form>
          </div>

          <div className="flex-grow overflow-y-auto max-h-[300px] border-t border-stone-100 pt-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">Today's Committed Actions</h4>
            {tasks.length === 0 ? (
              <p className="text-stone-400 text-xs italic">No behavioral actions scheduled yet.</p>
            ) : (
              <div className="space-y-1.5">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`p-3 rounded-xl text-xs border cursor-pointer transition-all flex items-center justify-between ${task.completed ? 'bg-stone-50 border-stone-200/60 opacity-60 line-through text-stone-400' : 'bg-white border-stone-200 hover:border-emerald-300'}`}
                  >
                    <div className="pr-2">
                      <p className="font-medium text-stone-800">{task.text}</p>
                      <span className="text-[10px] text-stone-400 font-medium">{task.timeSlot}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'}`}>
                      {task.completed && '✓'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}