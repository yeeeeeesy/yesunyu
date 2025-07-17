import { apiRequest } from './queryClient';
import { generateStaticChatResponse } from './static-data';

export interface ChatMessage {
  message: string;
  response: string;
  timestamp: Date;
}

export async function sendChatMessage(message: string, sessionId: string): Promise<string> {
  try {
    // For GitHub Pages deployment, use static responses
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      return generateStaticChatResponse(message);
    }
    
    const response = await apiRequest('POST', '/api/chat', {
      message,
      sessionId
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Chat service error, using fallback:', error);
    // Fallback to static response if API fails
    return generateStaticChatResponse(message);
  }
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
