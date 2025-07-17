import { useLanguage } from '@/hooks/use-language';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Chatbot } from '@/components/chatbot';
import { Moon, Sun } from 'lucide-react';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="font-semibold text-xl text-primary">{t('personal.name')}</div>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => scrollToSection('research')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.research')}
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.education')}
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.experience')}
              </button>
              <button 
                onClick={() => scrollToSection('project')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.project')}
              </button>
              <button 
                onClick={() => scrollToSection('programs')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.programs')}
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.skills')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Chatbot variant="header" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="px-3 py-1"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-3 py-1 text-sm"
            >
              {language === 'en' ? 'EN' : '中文'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
