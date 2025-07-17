// Portfolio service for GitHub Pages deployment
import { staticPortfolioData, PortfolioContent } from './static-data';

export async function getPortfolioContent(language: string = 'en'): Promise<PortfolioContent[]> {
  try {
    // For GitHub Pages deployment, use static data
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      return staticPortfolioData.filter(item => item.language === language);
    }
    
    // Original API call for development/server environments
    const response = await fetch(`/api/portfolio?language=${language}`);
    
    if (!response.ok) {
      // Fallback to static data if API fails
      return staticPortfolioData.filter(item => item.language === language);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching portfolio content, using static data:', error);
    // Fallback to static data
    return staticPortfolioData.filter(item => item.language === language);
  }
}

export async function getResumeFile(): Promise<string> {
  // For GitHub Pages, serve the resume from the public assets
  return '/resume_1752651300851.pdf';
}