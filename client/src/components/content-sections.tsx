import { useLanguage } from '@/hooks/use-language';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight, Award, MapPin, Calendar, Mail, Linkedin, Instagram, Github } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';


export function ContentSections() {
  const { language, t } = useLanguage();

  const [showDetail, setShowDetail] = useState(false);

  const { data: portfolioContent, isLoading } = useQuery({
    queryKey: ['/api/portfolio', language],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/portfolio?lang=${language}`);
      return response.json();
    },
    enabled: true,
  });

  const handleResumeDownload = async () => {
    try {
      const response = await apiRequest('GET', '/api/resume');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Resume download failed:', error);
    }
  };

  const getContentBySection = (section: string) => {
    if (!portfolioContent) return '';
    const content = portfolioContent.find((item: any) => item.section === section);
    return content?.content || '';
  };

  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="animate-pulse bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Personal Introduction */}
      <section id="home" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {getContentBySection('about') || t('sections.about')}
          </p>
        </div>
      </section>
      {/* Research Focus */}
      <section id="research" className="bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('sections.researchFocus')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('research.platformEconomy.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t('research.platformEconomy.description')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('research.laborEconomics.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t('research.laborEconomics.description')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('research.dataAnalysis.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t('research.dataAnalysis.description')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('research.financialMarkets.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t('research.financialMarkets.description')}</p>
          </div>
        </div>
      </section>
      {/* Job Application Statement */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {t('jobApplication.statement.part1')}
            <Button 
              onClick={handleResumeDownload} 
              variant="link" 
              className="p-0 h-auto font-semibold text-primary hover:underline text-[17px]"
            >
              {t('jobApplication.statement.resumeLink')}
            </Button>
            {t('jobApplication.statement.part2')}
          </p>
        </div>
       </section>

      <section id="education" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('sections.education')}</h2>
        <div className="space-y-6">

          {/* ZJU */}
          <div className="border-l-4 border-blue-700 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('education.zju.name')}</h3>
            <p className="text-blue-800 dark:text-blue-400 font-medium">{t('education.zju.degree')}</p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {t('education.zju.period')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
              <span className="font-semibold">{t('education.label.key')}</span> {t('education.zju.keyCourses')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
              <span className="font-semibold">{t('education.label.minor')}</span> {t('education.zju.minorCourses')}
            </p>
          </div>

          {/* UC Berkeley */}
          <div className="border-l-4 border-blue-700 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('education.berkeley.name')}</h3>
            <p className="text-blue-800 dark:text-blue-400 font-medium">{t('education.berkeley.program')}</p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {t('education.berkeley.period')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
              <span className="font-semibold">{t('education.label.key')}</span> {t('education.berkeley.keyCourses')}
            </p>
          </div>

          {/* NTU */}
          <div className="border-l-4 border-blue-700 pl-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('education.ntu.name')}</h3>
            <p className="text-blue-800 dark:text-blue-400 font-medium">{t('education.ntu.program')}</p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {t('education.ntu.period')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
              <span className="font-semibold">{t('education.label.key')}</span> {t('education.ntu.keyCourses')}
            </p>
          </div>

        </div>
      </section>

      <section id="experience" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('sections.experience')}</h2>
        <div className="space-y-8">

          {/* Experience 1 - Research Assistant */}
          <div className="relative">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-blue-800 dark:bg-blue-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('experience.researchAssistant.title')}</h3>
                <p className="text-blue-800 dark:text-blue-400 font-medium">{t('experience.researchAssistant.org')}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('experience.researchAssistant.date')}</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {(Array.isArray(t('experience.researchAssistant.tasks', { returnObjects: true })) 
                    ? t('experience.researchAssistant.tasks', { returnObjects: true })
                    : []
                  ).map((task: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-800 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Experience 2 - Director */}
          <div className="relative">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-blue-800 dark:bg-blue-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('experience.director.title')}</h3>
                <p className="text-blue-800 dark:text-blue-400 font-medium">{t('experience.director.org')}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t('experience.director.date')}</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {(Array.isArray(t('experience.director.tasks', { returnObjects: true })) 
                    ? t('experience.director.tasks', { returnObjects: true })
                    : []
                  ).map((task: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-blue-800 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <section id="project" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('project.title')}</h2>

        <div className="relative">
          <div className="flex items-start space-x-4">
            <div className="w-3 h-3 bg-blue-800 dark:bg-blue-400 rounded-full mt-2"></div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t('project.name')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{t('project.time')}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{t('project.description')}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(Array.isArray(t('project.skills', { returnObjects: true })) 
                  ? t('project.skills', { returnObjects: true })
                  : []
                ).map((skill: string) => (
                  <span
                    key={skill}
                    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section id="programs" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('sections.programs')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
      {(Array.isArray(t('programs.honors', { returnObjects: true })) 
        ? t('programs.honors', { returnObjects: true })
        : []
      ).map((item: any, index: number) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                {item.title}
              </h3>
              <span className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {item.badge}
              </span>
              {item.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>



    
      

      <section id="skills" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('sections.skills')}</h2>
        <div className="grid md:grid-cols-3 gap-8">

          {/* 技术技能 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('skills.technical')}</h3>
            <div className="space-y-3">
              {[
                { name: 'Python', level: 90 },
                { name: 'LaTeX', level: 85 },
                { name: 'MATLAB', level: 82 },
                { name: 'STATA', level: 80 },
                { name: 'SPSS', level: 75 }
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 研究领域 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('skills.research')}</h3>
            <div className="space-y-2">
              {[
                t('researchTags.dataAnalysis'),
                t('researchTags.economicAnalysis'),
                t('researchTags.platformEconomy'),
                t('researchTags.laborEconomics'),
                t('researchTags.financialMarkets'),
                t('researchTags.sustainableFinance')
              ].map(skill => (
                <span
                  key={skill}
                  className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* 语言能力 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('skills.languages')}</h3>
            <div className="space-y-3">

              {/* 中文 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{t('languageNames.chinese')}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t('skills.native')}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full w-full"></div>
                </div>
              </div>

              {/* 英文 */}
              <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{t('languageNames.english')}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{t('skills.professional')}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full w-5/6"></div>
                </div>
              </div>

            </div>
          </div>

      </section>


      

      <section id="contact" className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.title')}</h2>
        <div className="grid md:grid-cols-2 gap-8">

          {/* 左侧联系方式 */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {t('contact.description')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                <span>yesunnyu@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                <span>{t('personal.location')}</span>
              </div>
            </div>
          </div>

          {/* 右侧社交图标 */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t('contact.social')}</p>
              <div className="flex space-x-4 justify-center">

                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/sunyu-ye-a3a806373" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors transform hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* Instagram - 保留粉色风格 */}
                <a 
                  href="https://www.instagram.com/ysy200501?igsh=MTNibnJxNXN6eTV3eg%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-pink-600 dark:bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 dark:hover:bg-pink-500 transition-colors transform hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com/yeeeeeesy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-gray-800 dark:bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-black dark:hover:bg-gray-500 transition-colors transform hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>

              </div>
            </div>
          </div>

        </div>
      </section>
      
      
    </div>
  );
}
