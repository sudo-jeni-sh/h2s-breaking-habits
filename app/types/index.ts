export interface UserProfile {
  name: string;
  habit: string;
  doctor: string;
}

export interface FrictionLog {
  id: number;
  timestamp: string;
  timeContext: string;
  trigger: string;
  intensity: string;
}

export interface ActionTask {
  id: number;
  text: string;
  timeSlot: string;
  completed: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface Testimonial {
  id: number;
  keywords: string[];
  author: string;
  text: string;
}