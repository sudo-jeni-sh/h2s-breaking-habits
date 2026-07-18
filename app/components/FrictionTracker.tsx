import { useState } from 'react';
import { FrictionLog } from '../types';

interface FrictionTrackerProps {
  logs: FrictionLog[];
  onAddLog: (trigger: string, intensity: string) => void;
  getIntensityLabel: (val: string) => string;
}

export default function FrictionTracker({ logs, onAddLog, getIntensityLabel }: FrictionTrackerProps) {
  const [trigger, setTrigger] = useState('');
  const [intensity, setIntensity] = useState('5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trigger.trim()) return;
    onAddLog(trigger, intensity);
    setTrigger('');
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between h-[560px] shadow-sm">
      <div>
        <h2 className="text-base font-bold text-stone-900 tracking-tight mb-1">Daily Routine Check-In</h2>
        <p className="text-stone-500 text-xs mb-4">Log instances to update contextual data loops.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div className="space-y-4 mb-4">
            <div>
              <label htmlFor="trigger-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                What triggered the urge just now?
              </label>
              <input
                id="trigger-input"
                type="text"
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                placeholder="e.g., Sitting down after dinner, notification ping..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-sm text-stone-900 focus:outline-none focus:border-emerald-600 placeholder-stone-500 font-medium"
                required
                aria-required="true"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                <label htmlFor="intensity-slider">Impulse Strength:</label>
                <span className="text-emerald-800 font-extrabold">{getIntensityLabel(intensity)}</span>
              </div>
              <input
                id="intensity-slider"
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full accent-emerald-700 bg-stone-200 h-2 rounded-lg cursor-pointer"
                aria-valuemin={1}
                aria-valuemax={10}
                aria-valuenow={parseInt(intensity)}
              />
            </div>
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
  );
}