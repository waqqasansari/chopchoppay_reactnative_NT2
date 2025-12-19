# Landing Page Structure

## 📁 File Organization

The landing page follows a modular component-based architecture:

```
constants/
├── theme.ts          # Comprehensive design system (colors, typography, spacing, etc.)
└── landing.ts        # Landing page content and configuration

components/
└── landing/
    ├── index.ts           # Barrel exports
    ├── LandingPage.tsx    # Main orchestrator component
    ├── LandingHero.tsx    # Hero section with title and subtitle
    ├── LandingFeatures.tsx # Feature cards grid
    └── LandingCTA.tsx     # Call-to-action buttons

hooks/
└── useFirstTimeUser.ts # Hook for detecting first-time users

app/
└── index.tsx          # App entry point showing landing page
```

## 🎨 Design System

### Theme (`constants/theme.ts`)
- **Colors**: Comprehensive palette with light/dark mode support
  - Primary, Secondary, Accent colors
  - Semantic colors (success, warning, error, info)
  - Neutral grays
  - UI element colors (borders, cards, overlays)
  
- **Typography**: 
  - Font families (sans, serif, rounded, mono)
  - Font sizes (xs to 6xl)
  - Font weights (light to extrabold)

- **Spacing**: Consistent spacing scale (xs to 5xl)
- **Border Radius**: Predefined radius values
- **Shadows**: Platform-specific shadow presets
- **Durations**: Animation timing constants

### Landing Content (`constants/landing.ts`)
- Hero section text
- Feature list with icons and descriptions
- CTA button labels
- Animation and layout configuration

## 🧩 Components

### LandingPage (Main Component)
- Orchestrates all sub-components
- Handles animations with staggered entrance
- Manages scroll view
- Props:
  - `onGetStarted`: Callback for primary CTA
  - `onLearnMore`: Optional callback for secondary CTA

### LandingHero
- Displays app title, subtitle, and description
- Animated fade-in effect
- Responsive text sizing

### LandingFeatures
- Grid layout of feature cards
- Each card includes:
  - Icon with colored background
  - Title
  - Description
- Animated entrance with translation

### LandingCTA
- Primary button (filled)
- Secondary button (outlined)
- Press state animations
- Shadow effects

## 🎯 Usage

### Basic Implementation
```tsx
import { LandingPage } from '@/components/landing';

export default function Index() {
  const handleGetStarted = () => {
    // Navigate to main app
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
}
```

### With First-Time User Detection
```tsx
import { useFirstTimeUser } from '@/hooks/useFirstTimeUser';
import { LandingPage } from '@/components/landing';

export default function Index() {
  const { isFirstTime, markAsReturningUser } = useFirstTimeUser();

  const handleGetStarted = () => {
    markAsReturningUser();
    // Navigate to main app
  };

  if (!isFirstTime) {
    // Show main app
    return <MainApp />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}
```

## 🎬 Animations

The landing page uses staggered animations for a polished entrance:

1. **Hero Section** (800ms fade-in)
2. **Features Section** (800ms fade-in with translation)
3. **CTA Buttons** (800ms fade-in)

All animations use native driver for optimal performance.

## 🎨 Customization

### Updating Content
Edit `constants/landing.ts`:
```ts
export const LandingContent = {
  hero: {
    title: 'Your App Name',
    subtitle: 'Your tagline',
    description: 'Your description',
  },
  features: [
    {
      id: '1',
      icon: 'icon-name', // Ionicons name
      title: 'Feature Title',
      description: 'Feature description',
    },
    // Add more features...
  ],
};
```

### Updating Colors
Edit `constants/theme.ts`:
```ts
const palette = {
  primary: {
    500: '#YourColor',
    // ...
  },
};
```

### Updating Layout
Edit `constants/landing.ts`:
```ts
export const LandingConfig = {
  animation: {
    heroFadeIn: 800,
    // ...
  },
  layout: {
    maxWidth: 600,
    // ...
  },
};
```

## 📱 Responsive Design

- Components use percentage-based widths
- Feature cards adapt to screen size (48% width for 2-column grid)
- Horizontal padding ensures content doesn't touch edges
- ScrollView allows content to overflow gracefully

## 🌓 Dark Mode Support

All components automatically adapt to system color scheme:
- Uses `useColorScheme()` hook
- Accesses appropriate colors from theme
- Smooth transitions between modes

## 🔄 Next Steps

Now that the structure is set up, you can:
1. Provide your design specifications
2. Customize colors and typography
3. Add/modify features
4. Adjust animations
5. Add images or illustrations
6. Implement navigation logic
