import { Storybook } from '@/types/game';

// This will be populated by the API route
let storybooksCache: Storybook[] = [];

export function setStorybooksCache(storybooks: Storybook[]) {
  storybooksCache = storybooks;
}

export function getStorybooks(): Storybook[] {
  return storybooksCache;
}

export function getRandomStorybook(): Storybook {
  const randomIndex = Math.floor(Math.random() * storybooksCache.length);
  return storybooksCache[randomIndex];
} 