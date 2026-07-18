import { useState } from 'react';
import { ActionTask } from '../types';

interface ActionPlannerProps {
  tasks: ActionTask[];
  onAddTask: (text: string, timeSlot: string) => void;
  onToggleTask: (id: number) => void;
}

export default function ActionPlanner({ tasks, onAddTask, onToggleTask }: ActionPlannerProps) {
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('Midday Interval');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText, newTaskTime);
    setNewTaskText('');
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between h-[560px] shadow-sm">
      <div>
        <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Interval Action Planner</h2>
        <p className="text-stone-500 text-xs mb-4">Commit targeted micro-actions to your daily time breakdown.</p>
        
        <form onSubmit={handleSubmit} className="space-y-3 mb-4">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="e.g., Leave phone in hallway, Drink glass of water..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-500 placeholder-stone-400"
            required
          />
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
                role="button"
                aria-label={`Mark task "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
                tabIndex={0}
                onClick={() => onToggleTask(task.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggleTask(task.id); }}
                className={`p-3 rounded-xl text-xs border cursor-pointer transition-all flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-emerald-500 ${task.completed ? 'bg-stone-100 border-stone-300 opacity-60 line-through text-stone-500' : 'bg-white border-stone-300 hover:border-emerald-400 text-stone-900'}`}
              >
                <div className="pr-2">
                  <p className="font-semibold">{task.text}</p>
                  <span className="text-[10px] text-stone-500 font-bold uppercase tracking-tight">{task.timeSlot}</span>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 font-bold ${task.completed ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-stone-400'}`}>
                  {task.completed && '✓'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}