# Next.js Template Utilities Documentation

This document provides detailed information about the custom hooks, utilities, and library files available in this project. Use this as a reference for implementing common functionality across the website.

## Table of Contents

- [React Hooks](#react-hooks)
  - [useMediaQuery](#usemediaquery)
  - [useLocalStorage](#uselocalstorage)
  - [useScrollPosition](#usescrollposition)
  - [useClickOutside](#useclickoutside)
  - [useAnimation](#useanimation)
- [Utility Functions](#utility-functions)
  - [Format Utilities](#format-utilities)
  - [Validation Utilities](#validation-utilities)
  - [String Utilities](#string-utilities)
  - [Animation Utilities](#animation-utilities)
- [Library Files](#library-files)
  - [API Client](#api-client)
  - [Analytics](#analytics)
  - [Storage](#storage)

## React Hooks

### useMediaQuery

**Purpose**: Detect if a media query matches the current viewport.

**Use Cases**:
- Responsive design implementation
- Conditionally rendering elements based on screen size
- Implementing mobile-first or desktop-first designs
- Adapting layouts for different devices

**Implementation**:
```tsx
import { useMediaQuery } from '@/hooks';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div>
      {isMobile ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}
```

**Available Breakpoints**:
```tsx
// Pre-defined breakpoints
const isXs = useMediaQuery('(max-width: 640px)');
const isSm = useMediaQuery('(min-width: 641px) and (max-width: 768px)');
const isMd = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
const isLg = useMediaQuery('(min-width: 1025px) and (max-width: 1280px)');
const isXl = useMediaQuery('(min-width: 1281px)');
```

### useLocalStorage

**Purpose**: Persist state in localStorage with TypeScript support.

**Use Cases**:
- Saving user preferences (theme, language)
- Storing form data to prevent loss on refresh
- Implementing "remember me" functionality
- Caching data to reduce API calls

**Implementation**:
```tsx
import { useLocalStorage } from '@/hooks';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### useScrollPosition

**Purpose**: Track scroll position, direction, and detect when at top/bottom of page.

**Use Cases**:
- Creating sticky headers that appear/disappear on scroll
- Implementing infinite scrolling
- Triggering animations when elements enter viewport
- Building progress indicators for long content

**Implementation**:
```tsx
import { useScrollPosition } from '@/hooks';

function ScrollAwareHeader() {
  const { y, direction } = useScrollPosition();
  
  // Hide header when scrolling down, show when scrolling up
  const headerClass = direction === 'down' && y > 100 ? 'hidden' : 'visible';
  
  return (
    <header className={headerClass}>
      Site Navigation
    </header>
  );
}
```

### useClickOutside

**Purpose**: Detect clicks outside of a specified element.

**Use Cases**:
- Closing dropdowns when clicking elsewhere
- Dismissing modals by clicking outside
- Implementing custom select components
- Building context menus that close when clicking away

**Implementation**:
```tsx
import { useClickOutside } from '@/hooks';
import { useRef, useState } from 'react';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useClickOutside(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });
  
  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
        </div>
      )}
    </div>
  );
}
```

### useAnimation

**Purpose**: Create and control animations with play, pause, reset, and seek functionality.

**Use Cases**:
- Creating complex, multi-step animations
- Building interactive animations that respond to user input
- Implementing animations that can be paused, reversed, or restarted
- Coordinating multiple animated elements

**Implementation**:
```tsx
import { useAnimation } from '@/hooks';
import { useRef } from 'react';

function AnimatedCounter() {
  const elementRef = useRef(null);
  const { play, pause, reset, reverse } = useAnimation({
    target: elementRef,
    startValue: 0,
    endValue: 100,
    duration: 2000,
    easing: 'easeOutQuad',
    onUpdate: (value) => {
      if (elementRef.current) {
        elementRef.current.textContent = Math.round(value);
      }
    }
  });
  
  return (
    <div>
      <div ref={elementRef}>0</div>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
        <button onClick={reverse}>Reverse</button>
      </div>
    </div>
  );
}
```

## Utility Functions

### Format Utilities

**Purpose**: Format data for display in user-friendly ways.

**Available Functions**:

#### formatCurrency
```tsx
import { formatCurrency } from '@/utils';

// Basic usage
formatCurrency(1234.56); // "$1,234.56"

// With options
formatCurrency(1234.56, {
  locale: 'cs-CZ',
  currency: 'CZK'
}); // "1 234,56 Kč"
```

#### formatDate
```tsx
import { formatDate } from '@/utils';

// Basic usage
formatDate(new Date()); // "Jan 1, 2023"

// With options
formatDate(new Date(), {
  format: 'full',
  locale: 'cs-CZ'
}); // "1. ledna 2023"

// Available formats: 'short', 'medium', 'long', 'full'
```

#### formatNumber
```tsx
import { formatNumber } from '@/utils';

// Basic usage
formatNumber(1234567.89); // "1,234,567.89"

// With options
formatNumber(1234567.89, {
  locale: 'cs-CZ',
  maximumFractionDigits: 0
}); // "1 234 568"
```

#### formatFileSize
```tsx
import { formatFileSize } from '@/utils';

formatFileSize(1024); // "1.0 KB"
formatFileSize(1048576); // "1.0 MB"
formatFileSize(1073741824); // "1.0 GB"
```

#### formatPhoneNumber
```tsx
import { formatPhoneNumber } from '@/utils';

// Czech phone number
formatPhoneNumber('420123456789', '+### ### ### ###'); // "+420 123 456 789"
```

### Validation Utilities

**Purpose**: Validate user input and data.

**Available Functions**:

#### isValidEmail
```tsx
import { isValidEmail } from '@/utils';

isValidEmail('user@example.com'); // true
isValidEmail('invalid-email'); // false
```

#### validatePassword
```tsx
import { validatePassword } from '@/utils';

// Basic usage
validatePassword('Password123!'); // { valid: true }

// With custom requirements
validatePassword('pass', {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
});
// { valid: false, errors: ['Password must be at least 8 characters', 'Password must contain at least one number', 'Password must contain at least one special character'] }
```

#### isValidPhoneNumber
```tsx
import { isValidPhoneNumber } from '@/utils';

isValidPhoneNumber('+420123456789'); // true
isValidPhoneNumber('123'); // false
```

#### isValidUrl
```tsx
import { isValidUrl } from '@/utils';

isValidUrl('https://example.com'); // true
isValidUrl('not-a-url'); // false
```

#### isValidCreditCard
```tsx
import { isValidCreditCard } from '@/utils';

isValidCreditCard('4111111111111111'); // true (passes Luhn algorithm)
isValidCreditCard('1234567890123456'); // false
```

### String Utilities

**Purpose**: Manipulate and transform text.

**Available Functions**:

#### truncate
```tsx
import { truncate } from '@/utils';

// Basic usage
truncate('This is a long text that needs to be truncated', 20); // "This is a long text..."

// With custom ellipsis
truncate('This is a long text that needs to be truncated', 20, ' [more]'); // "This is a long text [more]"
```

#### Case Conversion
```tsx
import { toTitleCase, toCamelCase, toKebabCase, toSnakeCase } from '@/utils';

toTitleCase('hello world'); // "Hello World"
toCamelCase('hello world'); // "helloWorld"
toKebabCase('helloWorld'); // "hello-world"
toSnakeCase('helloWorld'); // "hello_world"
```

#### randomString
```tsx
import { randomString } from '@/utils';

// Generate a random string of length 10
randomString(10); // e.g., "a1b2c3d4e5"

// With custom character set
randomString(8, 'ABCDEF0123456789'); // e.g., "A1B2C3D4"
```

#### stripHtml
```tsx
import { stripHtml } from '@/utils';

stripHtml('<p>This is <strong>HTML</strong> content</p>'); // "This is HTML content"
```

### Animation Utilities

**Purpose**: Create smooth visual transitions and effects.

**Available Functions**:

#### Easing Functions
```tsx
import { easing } from '@/utils';

// Available easing functions:
// - linear
// - easeInQuad, easeOutQuad, easeInOutQuad
// - easeInCubic, easeOutCubic, easeInOutCubic
// - easeInElastic, easeOutElastic, easeInOutElastic

// Usage with animation
const progress = 0.5; // 50% through animation
const value = easing.easeOutQuad(progress); // Transformed value based on easing
```

#### animateValue
```tsx
import { animateValue } from '@/utils';

// Animate a counter from 0 to 100 over 2 seconds
animateValue({
  startValue: 0,
  endValue: 100,
  duration: 2000,
  easing: 'easeOutQuad',
  onUpdate: (value) => {
    document.getElementById('counter').textContent = Math.round(value);
  },
  onComplete: () => {
    console.log('Animation completed');
  }
});
```

#### scrollToElement
```tsx
import { scrollToElement } from '@/utils';

// Scroll to an element with ID 'section-2'
scrollToElement('#section-2', {
  duration: 800,
  offset: -80, // Account for fixed header
  easing: 'easeInOutCubic'
});
```

#### fadeIn/fadeOut
```tsx
import { fadeIn, fadeOut } from '@/utils';

// Fade in an element
const element = document.getElementById('notification');
fadeIn(element, {
  duration: 500,
  easing: 'easeOutQuad',
  onComplete: () => {
    console.log('Fade in completed');
  }
});

// Later, fade it out
fadeOut(element, {
  duration: 500,
  easing: 'easeInQuad',
  onComplete: () => {
    element.remove(); // Remove after fade out
  }
});
```

#### slideDown/slideUp
```tsx
import { slideDown, slideUp } from '@/utils';

// Expand an element
const element = document.getElementById('accordion-content');
slideDown(element, {
  duration: 300,
  easing: 'easeOutCubic'
});

// Later, collapse it
slideUp(element, {
  duration: 300,
  easing: 'easeInCubic'
});
```

## Library Files

### API Client

**Purpose**: Make HTTP requests to backend services with consistent error handling.

**Use Cases**:
- Fetching data from your backend services
- Submitting form data
- Uploading files
- Implementing consistent error handling for network requests

**Implementation**:

```tsx
import { api } from '@/lib';

// GET request
async function fetchUsers() {
  try {
    const users = await api.get('/users');
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

// POST request
async function createUser(userData) {
  try {
    const newUser = await api.post('/users', userData);
    return newUser;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

// PUT request
async function updateUser(userId, userData) {
  try {
    const updatedUser = await api.put(`/users/${userId}`, userData);
    return updatedUser;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
}

// DELETE request
async function deleteUser(userId) {
  try {
    await api.delete(`/users/${userId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete user:', error);
    return false;
  }
}

// With custom options
async function fetchWithOptions() {
  const data = await api.request({
    url: '/data',
    method: 'GET',
    headers: {
      'Custom-Header': 'value'
    },
    timeout: 5000,
    withCredentials: true
  });
  return data;
}
```

### Analytics

**Purpose**: Track user behavior and interactions.

**Use Cases**:
- Tracking page views for popular content analysis
- Monitoring user interactions with specific features
- Collecting conversion data for marketing campaigns
- Understanding user journeys through your site

**Implementation**:

```tsx
import { analytics } from '@/lib';

// Initialize analytics (call once at app start)
analytics.init({
  trackingId: 'UA-XXXXXXXXX-X', // Google Analytics ID
  debug: process.env.NODE_ENV === 'development'
});

// Track page view
function ProductPage() {
  useEffect(() => {
    analytics.trackPageView('/products/123', 'Product Detail Page');
  }, []);
  
  return <div>Product Content</div>;
}

// Track custom event
function AddToCartButton({ productId, price }) {
  const handleClick = () => {
    // Business logic for adding to cart
    
    // Track the event
    analytics.trackEvent('ecommerce', 'add_to_cart', {
      product_id: productId,
      value: price,
      currency: 'CZK'
    });
  };
  
  return <button onClick={handleClick}>Add to Cart</button>;
}

// Set user properties
function ProfilePage({ user }) {
  useEffect(() => {
    if (user) {
      analytics.setUserProperties({
        user_id: user.id,
        membership_level: user.tier,
        has_completed_profile: Boolean(user.profile)
      });
    }
  }, [user]);
  
  return <div>Profile Content</div>;
}
```

### Storage

**Purpose**: Provide a consistent API for browser storage with error handling.

**Use Cases**:
- Creating a consistent API for different storage types
- Handling storage errors gracefully
- Automatically serializing/deserializing complex data
- Setting expiration times for cached data

**Implementation**:

```tsx
import { storage } from '@/lib';

// Store data in localStorage
function saveUserPreferences(preferences) {
  storage.local.setItem('userPreferences', preferences);
}

// Retrieve data from localStorage
function getUserPreferences() {
  return storage.local.getItem('userPreferences', {
    defaultValue: { theme: 'light', fontSize: 'medium' }
  });
}

// Store data in sessionStorage (cleared when tab is closed)
function saveSessionData(data) {
  storage.session.setItem('sessionData', data);
}

// Store data with expiration
function cacheApiResponse(key, data) {
  storage.local.setItem(key, data, {
    expires: 60 * 60 * 1000 // 1 hour in milliseconds
  });
}

// Check if storage is available
if (storage.isAvailable('localStorage')) {
  // Safe to use localStorage
}

// Clear all stored data
function logout() {
  storage.local.clear();
  storage.session.clear();
}
```

## Best Practices

1. **Import from index files** for cleaner code:
   ```tsx
   // Good
   import { useMediaQuery, useLocalStorage } from '@/hooks';
   import { formatCurrency, isValidEmail } from '@/utils';
   
   // Avoid
   import { useMediaQuery } from '@/hooks/useMediaQuery';
   import { useLocalStorage } from '@/hooks/useLocalStorage';
   ```

2. **Use TypeScript generics** with hooks for type safety:
   ```tsx
   // With proper typing
   const [user, setUser] = useLocalStorage<User>('user', null);
   
   // Now TypeScript knows user is either User or null
   ```

3. **Combine hooks** for complex functionality:
   ```tsx
   function ResponsiveModal() {
     const modalRef = useRef(null);
     const isMobile = useMediaQuery('(max-width: 768px)');
     
     useClickOutside(modalRef, () => {
       if (!isMobile) {
         // Only close on outside click for desktop
         closeModal();
       }
     });
     
     // Rest of component
   }
   ```

4. **Use the API client consistently** across your application:
   ```tsx
   // Create a service file for each API domain
   // services/userService.ts
   import { api } from '@/lib';
   
   export const userService = {
     getUsers: () => api.get('/users'),
     getUserById: (id) => api.get(`/users/${id}`),
     createUser: (data) => api.post('/users', data),
     updateUser: (id, data) => api.put(`/users/${id}`, data),
     deleteUser: (id) => api.delete(`/users/${id}`)
   };
   ```

5. **Handle errors gracefully**:
   ```tsx
   async function fetchData() {
     try {
       setLoading(true);
       const data = await api.get('/endpoint');
       setData(data);
     } catch (error) {
       // Use a consistent error handling approach
       if (error.status === 401) {
         // Handle unauthorized
       } else {
         // Handle other errors
       }
     } finally {
       setLoading(false);
     }
   }
   ```

---

This documentation is a living document and will be updated as new utilities are added or existing ones are modified.