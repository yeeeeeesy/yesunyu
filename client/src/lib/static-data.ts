// Static data for GitHub Pages deployment (replaces server API calls)

export interface PortfolioContent {
  id: number;
  section: string;
  content: string;
  language: string;
  isActive: boolean;
}

export const staticPortfolioData: PortfolioContent[] = [
  {
    id: 1,
    section: "about",
    content: "As an Economics student at Zhejiang University, I focus on platform economy research and data analysis. I'm passionate about using quantitative methods to understand labor market dynamics and economic behavior in digital platforms.",
    language: "en",
    isActive: true
  },
  {
    id: 2,
    section: "about", 
    content: "作为浙江大学经济学学生，我专注于平台经济研究和数据分析。我热衷于使用定量方法来理解数字平台中的劳动力市场动态和经济行为。",
    language: "zh",
    isActive: true
  }
];

export interface ChatMessage {
  message: string;
  response: string;
  timestamp: Date;
}

// Static responses for the AI chatbot (when no API key is available)
export const generateStaticChatResponse = (message: string, language: string = 'en'): string => {
  const lowerMessage = message.toLowerCase();
  
  // Education and University
  if (lowerMessage.includes('education') || lowerMessage.includes('学历') || lowerMessage.includes('university') || lowerMessage.includes('zhejiang') || lowerMessage.includes('浙江大学') || lowerMessage.includes('college') || lowerMessage.includes('degree')) {
    return language === 'zh' 
      ? "我目前在浙江大学攻读经济学学士学位（2023-2027）。我的课程包括博弈论、产业组织理论、宏观经济学、计量经济学、时间序列分析、数理经济学和数理统计。我还参加了加州大学伯克利分校的暑期项目（数字化转型与数据决策）和新加坡南洋理工大学的可持续金融项目。"
      : "I'm currently pursuing a Bachelor of Arts in Economics at Zhejiang University (2023-2027). My coursework includes Game Theory, Industrial Organization Theory, Macroeconomics, Econometrics, Time Series Analysis, Mathematical Economics, and Mathematical Statistics. I've also participated in summer programs at UC Berkeley (Digital Transformation & Data Decision) and NTU Singapore (Sustainable Finance).";
  }
  
  // Research and Projects
  if (lowerMessage.includes('research') || lowerMessage.includes('platform') || lowerMessage.includes('研究') || lowerMessage.includes('project') || lowerMessage.includes('gig') || lowerMessage.includes('economy')) {
    return language === 'zh'
      ? "我的研究重点是平台经济和零工劳动分析。作为袁哲教授的研究助理，我分析了12,447+条平台交易数据和10,028+份调查问卷。我撰写了29,898字的零工经济产业白皮书。我目前的项目研究本地与外地外卖骑手在空间流动性和劳动生产率方面的差异。"
      : "My research focuses on platform economy and gig worker analysis. As a Research Assistant under Professor Zhe Yuan, I've analyzed 12,447+ platform transaction datasets and 10,028+ survey responses. I authored a 29,898-word industry white paper on gig economy dynamics. My current project examines spatial mobility and labor productivity differences between local and non-local delivery workers.";
  }
  
  // Skills and Technical Abilities
  if (lowerMessage.includes('skill') || lowerMessage.includes('技能') || lowerMessage.includes('python') || lowerMessage.includes('data') || lowerMessage.includes('programming') || lowerMessage.includes('software') || lowerMessage.includes('matlab') || lowerMessage.includes('stata')) {
    return language === 'zh'
      ? "我有很强的技术技能：Python（90%）、LaTeX（85%）、MATLAB（82%）、STATA（80%）和SPSS（75%）。我精通数据分析、统计建模和经济分析。我的专业领域涵盖大数据分析、计量经济学、时间序列分析和数据可视化。我的语言能力：中文（母语）和英语（专业工作水平）。"
      : "I have strong technical skills: Python (90%), LaTeX (85%), MATLAB (82%), STATA (80%), and SPSS (75%). I'm proficient in data analysis, statistical modeling, and economic analysis. My expertise covers big data analysis, econometrics, time series analysis, and data visualization. I'm also fluent in Chinese (native) and English (professional working proficiency).";
  }
  
  // Experience and Work
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('经历') || lowerMessage.includes('job') || lowerMessage.includes('volunteer') || lowerMessage.includes('assistant')) {
    return language === 'zh'
      ? "我目前担任浙江大学研究助理（2025年2月至今），专注于平台经济研究。此前，我担任浙江大学青年志愿者指导中心综合管理部部长（2024年6月-2025年5月），负责网站开发并管理4万多名志愿者的评审工作。我在数据分析、研究方法和项目管理方面有丰富的实践经验。"
      : "I'm currently a Research Assistant at Zhejiang University (Feb 2025-Present), working on platform economy research. Previously, I served as Director of General Affairs at ZJU Youth Volunteer Guidance Center (Jun 2024-May 2025), where I led website development and supervised evaluations for 40,000+ volunteers. I have hands-on experience in data analysis, research methodology, and project management.";
  }
  
  // Awards and Achievements
  if (lowerMessage.includes('award') || lowerMessage.includes('achievement') || lowerMessage.includes('honor') || lowerMessage.includes('获奖') || lowerMessage.includes('competition') || lowerMessage.includes('contest')) {
    return language === 'zh'
      ? "我是数学建模竞赛的入围者，这展现了我的分析和解决问题的能力。我的学术成就包括在高级经济学和数学课程中保持优异成绩，并成功完成了顶尖大学的竞争性暑期项目。"
      : "I was a Finalist in the Mathematical Contest in Modeling, which demonstrates my analytical and problem-solving abilities. My academic achievements include maintaining strong performance in advanced economics and mathematics courses, and successfully completing competitive summer programs at top universities.";
  }
  
  // Contact Information
  if (lowerMessage.includes('contact') || lowerMessage.includes('联系') || lowerMessage.includes('email') || lowerMessage.includes('linkedin') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
    return language === 'zh'
      ? "您可以通过yesunnyu@gmail.com联系我。我目前在美国加利福尼亚州伯克利。欢迎在LinkedIn上与我联系：https://www.linkedin.com/in/sunyu-ye-a3a806373。我随时愿意讨论研究机会、合作项目或经济学和数据分析领域的职业机会。"
      : "You can reach me at yesunnyu@gmail.com. I'm currently located in Berkeley, California, USA. Feel free to connect with me on LinkedIn at https://www.linkedin.com/in/sunyu-ye-a3a806373. I'm always open to discussing research opportunities, collaboration projects, or career opportunities in economics and data analysis.";
  }
  
  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('你好') || lowerMessage.includes('greeting')) {
    return language === 'zh'
      ? "你好！我是叶孙渝，浙江大学经济学本科生。我专攻平台经济研究、数据分析和定量方法。我热衷于理解数字劳动力市场和经济行为。我能帮您了解更多关于我的背景和经历吗？"
      : "Hello! I'm Sunyu Ye, an Economics undergraduate at Zhejiang University. I specialize in platform economy research, data analysis, and quantitative methods. I'm passionate about understanding digital labor markets and economic behavior. How can I help you learn more about my background and experience?";
  }
  
  // Default response
  return language === 'zh'
    ? "感谢您的关注！我是叶孙渝，浙江大学经济学学生，专攻平台经济研究和数据分析。我目前担任研究助理，分析零工劳动者动态。欢迎询问我的教育背景、研究经历、技术技能、项目或任何合作机会。"
    : "Thank you for your interest! I'm Sunyu Ye, an Economics student at Zhejiang University with expertise in platform economy research and data analysis. I'm currently working as a Research Assistant analyzing gig worker dynamics. Feel free to ask me about my education, research experience, technical skills, projects, or any opportunities for collaboration.";
};

export const generateSessionId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};