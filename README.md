# Apex Design - Landing Page Hero Section

A modern, responsive hero section for Apex Design's kitchen and bath remodeling landing page built with Next.js, React, and Tailwind CSS.

## Features

✅ **Responsive Design** - Optimized for mobile, tablet, and desktop
✅ **Bold Headlines** - Eye-catching primary and secondary messaging
✅ **Trust Elements** - Displays key credentials and certifications
✅ **QR Code Integration** - Mobile-friendly contact method
✅ **CTA Buttons** - Both email and phone action buttons
✅ **Hero Image** - Background image with gradient overlay
✅ **Accessibility** - Semantic HTML and ARIA labels

## Project Structure

```
/Applications/MAMP/htdocs/APEX/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global Tailwind styles
├── components/
│   └── HeroSection.tsx     # Hero component
├── public/
│   └── images/
│       └── kitchen-hero.jpg  # Hero background image
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

1. **Install Dependencies**
   ```bash
   cd /Applications/MAMP/htdocs/APEX
   npm install
   ```

2. **Add Hero Image**
   - Create `public/images/` directory
   - Add a modern kitchen/bathroom image as `kitchen-hero.jpg`
   - Recommended size: 1920x1080px or larger

3. **Update Configuration**
   - Update the `qrCodeUrl` in `components/HeroSection.tsx` with your actual contact form URL
   - Update company phone number if different from (949) 432-0359
   - Customize colors in `tailwind.config.ts`

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Key Components

### Hero Section (`HeroSection.tsx`)

The main component includes:

- **Brand Logo** - Apex Design branding with orange accent
- **Headline** - "Remodel with Precision. Built to Last."
- **Subheadline** - Company value proposition
- **Trust Elements Grid** - 4 key credentials with icons:
  - 5-Star Rated by OC Homeowners
  - Licensed & Insured Contractor
  - 100% Satisfaction Before Final Payment
  - OC-Based Team — No Outsourcing

- **CTA Buttons**:
  - Primary: "Get Your Free In-Home Estimate" (orange)
  - Secondary: Phone button with clickable tel: link

- **QR Code Section** - Scans to contact form
- **Why Choose Apex** - Secondary value proposition with bullet points
- **24/7 Support Badge** - Floating badge (desktop only)

## Customization

### Colors
Update `tailwind.config.ts` theme colors:
```ts
colors: {
  'apex-navy': '#1a2332',
  'apex-orange': '#ff6b35',
  'apex-light': '#f5f5f5',
}
```

### Content
Update in `components/HeroSection.tsx`:
- Headline and subheadline text
- Trust elements array
- QR code URL
- CTA button text and actions
- Phone number

### Images
Replace `kitchen-hero.jpg` with your own image. Next.js Image component automatically optimizes it.

## Mobile Optimization

The hero section is fully responsive:
- **Mobile (< 640px)** - Single column layout, stacked CTAs
- **Tablet (640px - 1024px)** - Adjusted spacing and font sizes
- **Desktop (> 1024px)** - Two-column grid layout with all features visible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- **next**: 14.0.0 - React framework
- **react**: 18.2.0 - UI library
- **tailwindcss**: 3.3.0 - CSS utility framework
- **qrcode.react**: 1.0.1 - QR code generation
- **lucide-react**: 0.x.x - Icon library

## Performance Notes

- Image is lazy-loaded with optimizations
- Tailwind CSS is purged for production
- Uses Next.js Image component for automatic optimization
- Minimal JavaScript for fast load times

## Accessibility

- Semantic HTML structure
- Color contrast meets WCAG AA standards
- Phone numbers use `tel:` protocol for accessibility
- Alt text for images

## Tips for Production

1. Replace placeholder images with real kitchen/bathroom photos
2. Update QR code URL to your actual contact form
3. Consider adding analytics tracking
4. Test on real devices before deployment
5. Optimize hero image size (compress while maintaining quality)
6. Consider adding a navigation bar above the hero
7. Add form validation for estimate requests

## Support

For questions or issues, contact the development team or refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

**Built for Apex Design - Kitchen & Bath Remodeling**
Orange County, California
