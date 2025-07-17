import { useLanguage } from '@/hooks/use-language';
import { Mail, MapPin, Linkedin, Instagram, Github } from 'lucide-react';
import profileImage from '@assets/1_1752651304739.jpg';

export function Sidebar() {
  const { t } = useLanguage();

  const obfuscateEmail = (email: string) => {
    // Simple email obfuscation for spam protection
    return email.split('').map((char, index) => 
      char === '@' ? '@' : String.fromCharCode(char.charCodeAt(0) + (index % 2 === 0 ? 1 : -1))
    ).join('');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:yesunnyu@gmail.com';
  };

  return (
    <div className="w-full md:w-80 bg-white dark:bg-gray-900 shadow-lg fixed left-0 top-20 bottom-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <img 
            src={profileImage} 
            alt="Sunyu Ye Profile Photo" 
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        </div>
        
        {/* Personal Info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('personal.name')}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{t('personal.university')}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-2" />
            {t('personal.location')}
          </p>
        </div>

        {/* Contact Links */}
        <div className="space-y-3 mb-8">
          <button 
            onClick={handleEmailClick}
            className="flex items-center w-full text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5 mr-3" />
            <span>yesunnyu@gmail.com</span>
          </button>

          <a 
            href="https://www.linkedin.com/in/sunyu-ye-a3a806373" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Linkedin className="w-5 h-5 mr-3" />
            LinkedIn Profile
          </a>

          <a 
            href="https://www.instagram.com/ysy200501?igsh=MTNibnJxNXN6eTV3eg%3D%3D&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5 mr-3" />
            Instagram
          </a>

          <a 
            href="https://github.com/yeeeeeesy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5 mr-3" />
            GitHub
          </a>
        </div>

        {/* Slogan */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-center text-gray-500 dark:text-gray-400 italic font-medium">"{t('personal.slogan')}"</p>
        </div>
      </div>
    </div>
  );
}
