# Components Documentation

This document provides detailed information about each component in the application.

## Layout Components

### Navbar
- **Purpose**: Main navigation component
- **Location**: `src/components/Navbar.tsx`
- **Features**:
  - Responsive navigation menu
  - Page routing
  - Navigation state management

### Footer
- **Purpose**: Site-wide footer
- **Location**: `src/components/Footer.tsx`
- **Features**:
  - Links to important pages
  - Contact information
  - Social media links

## Page Components

### Hero
- **Purpose**: Main landing section
- **Location**: `src/components/Hero.tsx`
- **Features**:
  - Main call-to-action
  - Primary messaging
  - Navigation to key sections

### Features
- **Purpose**: Features showcase
- **Location**: `src/components/Features.tsx`
- **Features**:
  - Display of key product/service features
  - Visual representations
  - Feature descriptions

### Domaines
- **Purpose**: Services/domains presentation
- **Location**: `src/components/Domaines.tsx`
- **Features**:
  - List of service areas
  - Detailed service descriptions
  - Service categories

### Blog Components

#### Blog
- **Purpose**: Blog listing page
- **Location**: `src/components/Blog.tsx`
- **Features**:
  - Blog post grid/list
  - Post previews
  - Navigation to individual posts

#### BlogPost
- **Purpose**: Individual blog post display
- **Location**: `src/components/BlogPost.tsx`
- **Features**:
  - Full post content
  - Author information
  - Post metadata
  - Related posts

#### RecentBlogs
- **Purpose**: Recent blog posts showcase
- **Location**: `src/components/RecentBlogs.tsx`
- **Features**:
  - Latest post previews
  - Quick navigation to full posts

### Interactive Components

#### Contact
- **Purpose**: Contact form and information
- **Location**: `src/components/Contact.tsx`
- **Features**:
  - Contact form
  - Form validation
  - Contact information display

#### WarMap
- **Purpose**: Interactive map visualization
- **Location**: `src/components/WarMap.tsx`
- **Features**:
  - Interactive map interface
  - Data visualization
  - Location markers

### Team Components

#### Team
- **Purpose**: Team members showcase
- **Location**: `src/components/Team.tsx`
- **Features**:
  - Team member profiles
  - Role descriptions
  - Contact information

#### Founder
- **Purpose**: Founder information section
- **Location**: `src/components/Founder.tsx`
- **Features**:
  - Founder biography
  - Vision statement
  - Contact details

## Component Best Practices

1. **State Management**
   - Use React Query for server state
   - Local state with useState/useReducer
   - Props for component communication

2. **Styling**
   - Utilize Tailwind CSS classes
   - Follow responsive design principles
   - Maintain consistent styling patterns

3. **TypeScript**
   - Define proper interfaces/types
   - Use proper prop typing
   - Implement error boundaries

4. **Performance**
   - Implement proper memoization
   - Lazy loading when appropriate
   - Optimize re-renders

5. **Accessibility**
   - Include proper ARIA labels
   - Ensure keyboard navigation
   - Maintain proper heading hierarchy
