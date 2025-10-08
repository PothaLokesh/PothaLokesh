# Portfolio Website Design Guidelines - William

## Design Approach
**Reference-Based Approach**: This portfolio follows modern portfolio design patterns similar to Dribbble/Behance creator portfolios, with a clean, professional aesthetic emphasizing visual hierarchy and personal branding.

## Color Palette

**Light Mode (Primary Theme)**:
- Background: 0 0% 98% (Off-white/cream)
- Surface: 0 0% 100% (Pure white for cards)
- Primary/Accent: 328 100% 54% (Vibrant pink/magenta - #FF1493)
- Text Primary: 0 0% 10% (Near black)
- Text Secondary: 0 0% 40% (Medium gray)
- Borders: 0 0% 90% (Light gray)

**Dark Mode**: Not required for this design

## Typography

**Font Families**:
- Primary: Inter or similar modern sans-serif via Google Fonts
- All text uses single font family for consistency

**Type Scale**:
- Hero Heading: text-5xl/text-6xl, font-bold, tracking-tight
- Section Headings: text-3xl/text-4xl, font-bold
- Body Text: text-base/text-lg, font-normal, leading-relaxed
- Card Titles: text-xl, font-semibold
- Small Text/Labels: text-sm, font-medium

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Container max-width: max-w-6xl
- Component gaps: gap-6 to gap-8 for grids
- Internal padding: p-6 for cards

**Grid System**:
- Services: 4-column grid (lg:grid-cols-4, md:grid-cols-2, grid-cols-1)
- Portfolio: 2-column grid (lg:grid-cols-2, grid-cols-1)
- Consistent gap-6 to gap-8 between items

## Core Components

### Navigation Header
- Fixed/sticky top navigation with white background
- Logo "William" on left (text-2xl, font-bold)
- Horizontal menu items on right: Home, About me, Services, My work, Testimonials
- Subtle shadow or border-bottom for depth
- Padding: px-6 py-4

### Hero Section
- Two-column layout (50/50 split on desktop, stacked on mobile)
- Left column: 
  - Profile image (rounded-full, w-64 h-64 or similar)
  - Positioned with creative spacing
- Right column:
  - Small label "Frontend developer" (text-sm, text-secondary)
  - Large heading "frontend web developer based in london" (lowercase, text-5xl/6xl, font-bold, leading-tight)
  - Description paragraph (text-lg, text-secondary, max-w-prose)
  - CTA buttons row: "Download CV" (pink primary button) + "My work" (outline button with blurred bg when on image)
- Background: Clean white/cream

### About Me Section
- Two-column layout
- Left: Large professional image (rounded-2xl, aspect-square or portrait)
- Right: 
  - Section heading "About me"
  - Bio text (multiple paragraphs, leading-relaxed)
  - Stats row (3 items): "10 years experience", "12+ clients worldwide", "20+ success projects" (text-4xl numbers, text-sm labels)
  - Social icons row: Telegram, WhatsApp, Figma, Dribbble, Behance (circular buttons, w-10 h-10)

### Services Section
- Section heading "Services"
- 4-column grid of service cards
- Each card:
  - Icon container (bg-pink-50, rounded, p-4)
  - Service title (text-xl, font-semibold)
  - Description text (text-sm, text-secondary)
  - White background, rounded-xl, p-6, subtle shadow or border

### Portfolio/Latest Work Section
- Section heading "Latest work"
- 2-column grid of project cards
- Each card:
  - Project image (rounded-xl, aspect-video or 4:3)
  - Title below image (text-xl, font-semibold)
  - Heart icon (top-right, pink accent)
  - Hover effect: subtle scale transform
  - Projects shown: E-commerce Food, Online Real App, Marketplace, Local advertising

### Contact Form Section
- Section heading "Get in touch"
- Single column form layout
- Form fields:
  - Name input (full width)
  - Email input (full width)
  - Message textarea (full width, rows-6)
  - "Send email" button (pink primary, w-full or auto)
- Field styling: border, rounded-lg, p-3, focus:ring-pink

### Footer
- Three-column layout (stacked on mobile)
- Left: "William" branding + social icons
- Center: Copyright text
- Right: Links (Terms of Service, Privacy Policy, Contact with me)
- Background: light gray (bg-gray-50)
- Padding: py-12

## Images

**Required Images**:
1. **Hero Profile Image**: Circular portrait of William, professional headshot, centered in hero left column
2. **About Me Image**: Larger professional photo, possibly full-body or creative pose, rounded corners
3. **Portfolio Project Images**: 4 project screenshots/mockups for E-commerce Food, Online Real App, Marketplace, Local advertising apps

**Image Treatment**:
- All images rounded (rounded-full for profile, rounded-xl/2xl for others)
- Subtle shadow for depth
- Optimized aspect ratios (square for profile, 4:3 or 16:9 for projects)

## Interactive Elements

**Buttons**:
- Primary: bg-pink-500, text-white, rounded-full, px-8 py-3, font-medium, hover:bg-pink-600
- Outline: border-2 border-pink-500, text-pink-500, rounded-full, backdrop-blur-sm bg-white/80 when on images
- Icon buttons: rounded-full, border, p-2

**Cards**: Hover effect with subtle scale (hover:scale-105) and shadow increase

**Links**: Underline on hover, pink color for active/hover states

## Animations

Minimal, purposeful animations only:
- Smooth transitions on hover (transition-all duration-300)
- Fade-in on scroll for sections (optional, subtle)
- No distracting motion

## Accessibility

- Maintain WCAG AA contrast ratios (pink on white passes)
- Form labels and ARIA attributes
- Keyboard navigation support
- Focus states visible on all interactive elements