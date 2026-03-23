# Lotto Number Generator Blueprint

## Overview
A modern, visually appealing web application that generates 6 random lotto numbers (1-45) with smooth animations and a premium feel. This app is designed to be mobile-responsive and provide an intuitive user experience.

## Project Outline
### Style & Design
- **Typography**: Uses 'Plus Jakarta Sans' from Google Fonts for a modern, clean look.
- **Color Palette**:
  - Primary: Indigo (#4f46e5)
  - Secondary: Pink (#ec4899)
  - Background: Slate (#f8fafc) with a subtle dot pattern.
  - Ball Colors: Red, Orange, Green, Blue, Purple, and Grey for variety.
- **Visual Effects**:
  - Glassmorphism: The main container has a subtle backdrop blur and a thin white border.
  - Depth: Multi-layered drop shadows on the container and lotto balls.
  - Gradients: Used for the title text and the generate button.
- **Layout**: Centered, flexible layout using Flexbox, adapting to different screen sizes.

### Features
- **Lotto Generation**: Generates 6 unique numbers between 1 and 45.
- **Sorting**: Numbers are automatically sorted in ascending order.
- **Animations**:
  - `popIn`: Balls appear with a scale and opacity animation.
  - `staggered delay`: Each ball appears one after another for a dynamic effect.
  - `button feedback`: Subtle scale effect when the button is clicked.
- **Placeholder State**: Displays empty circles with dashes before the first generation.

## Implementation Steps (Current Change)
1. **HTML Structure**: Created a container with a header, main display area (div#lotto-display), and a footer.
2. **CSS Styling**: 
   - Defined CSS variables for consistency.
   - Implemented a responsive container with a modern shadow.
   - Created the `.ball` class with circular shape, centered text, and 3D-like shadows.
   - Added `@keyframes` for the entrance animation.
3. **JS Logic**:
   - Used `DOMContentLoaded` to ensure the DOM is ready.
   - Implemented `generateLottoNumbers` using a while loop and `Math.random`.
   - Implemented `displayNumbers` to dynamically create and append ball elements with staggered delays.
   - Added event listener to the generate button with a small bounce delay.
