// src/lib/featured-article.js
// Supporting logic for featured article component

import featuredArticleData from '../_data/featured-article.js';

// Get featured article data and ensure it has required fields
export function getFeaturedArticleContent() {
  const data = typeof featuredArticleData === 'function' 
    ? featuredArticleData() 
    : featuredArticleData;
  
  if (!data || typeof data !== 'object') {
    return null;
  }
  
  // Validate required fields for featured article display
  const hasContent = data.title && data.url;
  
  return hasContent ? data : null;
}

// Helper to check if featured article should be displayed
export function shouldShowFeaturedArticle() {
  return getFeaturedArticleContent() !== null;
}

// Utility to format date if needed
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}