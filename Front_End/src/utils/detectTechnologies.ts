import axios from 'axios';
import * as cheerio from 'cheerio';

export interface Technology {
  name: string;
  category: 'framework' | 'cms' | 'library' | 'analytics' | 'hosting';
  confidence: 'high' | 'medium' | 'low';
}

export async function detectTechnologies(url: string): Promise<Technology[]> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const technologies: Technology[] = [];

    // Check for WordPress
    if (html.includes('wp-content') || html.includes('wordpress')) {
      technologies.push({
        name: 'WordPress',
        category: 'cms',
        confidence: 'high'
      });
    }

    // Check for Joomla
    if (html.includes('joomla')) {
      technologies.push({
        name: 'Joomla',
        category: 'cms',
        confidence: 'high'
      });
    }

    // Check for React
    if (html.includes('react') || html.includes('__REACT_DEVTOOLS_GLOBAL_HOOK__')) {
      technologies.push({
        name: 'React',
        category: 'framework',
        confidence: 'high'
      });
    }

    // Check for Vue
    if (html.includes('vue')) {
      technologies.push({
        name: 'Vue.js',
        category: 'framework',
        confidence: 'high'
      });
    }

    // Check for Angular
    if (html.includes('angular')) {
      technologies.push({
        name: 'Angular',
        category: 'framework',
        confidence: 'high'
      });
    }

    // Check for jQuery
    if ($('script[src*="jquery"]').length > 0) {
      technologies.push({
        name: 'jQuery',
        category: 'library',
        confidence: 'high'
      });
    }

    // Check for Bootstrap
    if ($('link[href*="bootstrap"]').length > 0) {
      technologies.push({
        name: 'Bootstrap',
        category: 'library',
        confidence: 'high'
      });
    }

    // Check for Google Analytics
    if ($('script[src*="google-analytics"]').length > 0 || $('script[src*="gtag"]').length > 0) {
      technologies.push({
        name: 'Google Analytics',
        category: 'analytics',
        confidence: 'high'
      });
    }

    // Check for Netlify
    if (html.includes('netlify') || $('meta[name*="netlify"]').length > 0) {
      technologies.push({
        name: 'Netlify',
        category: 'hosting',
        confidence: 'medium'
      });
    }

    // Check for Vercel
    if (html.includes('vercel') || $('meta[name*="vercel"]').length > 0) {
      technologies.push({
        name: 'Vercel',
        category: 'hosting',
        confidence: 'medium'
      });
    }

    return technologies;
  } catch (error) {
    console.error('Error detecting technologies:', error);
    throw new Error('Failed to detect technologies');
  }
} 