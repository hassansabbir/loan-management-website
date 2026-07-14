// Export all library modules for easy imports
export * from './api';
export * from './analytics';
export * from './storage';

// Export default objects
import api from './api';
import analytics from './analytics';
import storage from './storage';

export { api, analytics, storage };

// This allows importing multiple libraries from a single import:
// import { api, analytics, storage } from '@/lib';