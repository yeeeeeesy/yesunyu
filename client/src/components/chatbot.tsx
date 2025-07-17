import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChatInput } from './chat-input';
import { useLanguage } from '@/hooks/use-language';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  variant?: 'header' | 'floating';
  className?: string;
}

export function Chatbot({ variant = 'floating', className = '' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(Math.random().toString(36).substring(7));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message only once when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = language === 'zh' 
        ? '您好！我是叶孙渝的AI助手。我可以回答关于她的教育背景、研究经历、技能和项目的问题。请问有什么想了解的吗？'
        : 'Hello! I\'m Sunyu Ye\'s AI assistant. I can answer questions about her education, research experience, skills, and projects. What would you like to know?';
      
      setMessages([{
        id: '1',
        type: 'bot',
        content: welcomeMessage,
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  const handleSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId.current,
          language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Use static response as fallback
      const { generateStaticChatResponse } = await import('@/lib/static-data');
      const staticResponse = generateStaticChatResponse(messageText, language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: staticResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Optional: Show a subtle notice about using offline mode
      if (language === 'zh') {
        console.log('使用离线模式回复');
      } else {
        console.log('Using offline response mode');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language]);



  const ChatButton = React.forwardRef<HTMLButtonElement>((props, ref) => (
    <Button
      ref={ref}
      onClick={() => setIsOpen(true)}
      className={`${variant === 'header' ? 'h-9 px-3' : 'h-12 w-12 rounded-full'} ${className}`}
      variant={variant === 'header' ? 'ghost' : 'default'}
      {...props}
    >
      <MessageCircle className={variant === 'header' ? 'h-4 w-4 mr-2' : 'h-6 w-6'} />
      {variant === 'header' && (
        <span className="hidden sm:inline">
          {t('nav.chat')}
        </span>
      )}
    </Button>
  ));

  const ChatInterface = () => (
    <div className="flex flex-col h-[500px] w-full max-w-md">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-lg px-3 py-2 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder={language === 'zh' ? '输入您的问题...' : 'Type your question...'}
      />
    </div>
  );

  if (variant === 'floating') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="fixed bottom-6 right-6 z-50">
            <ChatButton />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              {language === 'zh' ? 'AI聊天助手' : 'AI Chat Assistant'}
            </DialogTitle>
          </DialogHeader>
          <ChatInterface />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ChatButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            {language === 'zh' ? 'AI聊天助手' : 'AI Chat Assistant'}
          </DialogTitle>
        </DialogHeader>
        <ChatInterface />
      </DialogContent>
    </Dialog>
  );
}