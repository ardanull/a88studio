# a88studio - Professional Digital Agency Website

A modern, high-performance digital agency website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Core Features
- ✅ **Modern Design** - Minimalist, professional aesthetic with smooth animations
- ✅ **Fully Responsive** - Mobile-first design approach
- ✅ **Bilingual** - Turkish (TR) and English (EN) support
- ✅ **SEO Optimized** - Complete metadata, Open Graph, and Twitter Cards
- ✅ **Performance** - Optimized images, lazy loading, and code splitting

### Pages
- 🏠 **Home** - Hero, Stats, Brands, Work showcase, Services, Testimonials, Team, FAQ, Contact
- 🎨 **Services** - Detailed service offerings with premium card design
- 📝 **Blog** - Full-featured blog with dynamic routing
- 🔍 **Blog Posts** - Individual blog post pages with author info
- 🚫 **404** - Custom animated 404 page

### Components
- Navigation with mobile menu
- Scroll progress indicator
- Toast notifications system
- Loading states and animations
- Language switcher
- Preloader animation
- Contact form with API integration

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts)

## 📦 Installation

\`\`\`powershell
# Clone the repository
git clone https://github.com/yourusername/a88studio-nextjs.git

# Navigate to project directory
cd a88studio-nextjs

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
a88studio-nextjs/
├── app/
│   ├── api/
│   │   └── contact/          # Contact form API endpoint
│   ├── blog/
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   └── page.tsx         # Blog list page
│   ├── services/
│   │   └── page.tsx         # Services page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── not-found.tsx        # 404 page
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── robots.ts            # Robots.txt
│   └── globals.css          # Global styles
├── components/
│   ├── Navigation.tsx       # Header navigation
│   ├── Hero.tsx             # Hero section
│   ├── Stats.tsx            # Animated statistics
│   ├── Brands.tsx           # Client logos
│   ├── Work.tsx             # Project showcase
│   ├── Services.tsx         # Services grid
│   ├── Testimonials.tsx     # Client testimonials
│   ├── Team.tsx             # Team members
│   ├── FAQ.tsx              # Frequently asked questions
│   ├── Contact.tsx          # Contact form
│   ├── Footer.tsx           # Footer
│   ├── ScrollProgress.tsx   # Scroll indicator
│   ├── Preloader.tsx        # Initial loading animation
│   ├── LanguageContext.tsx  # Language state management
│   ├── LanguageSwitcher.tsx # Language toggle
│   └── ToastProvider.tsx    # Toast notifications
├── lib/
│   ├── blog.ts              # Blog data and helpers
│   └── seo.ts               # SEO metadata helper
├── public/                  # Static assets
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
\`\`\`

## 🎨 Key Design Patterns

### Color System
- HSL-based CSS variables for easy theming
- Light/Dark mode support (prefers-color-scheme)
- Gradient accents for premium feel

### Typography
- Inter font for body text
- Consistent type scale
- Proper heading hierarchy

### Animations
- Framer Motion for smooth transitions
- Scroll-triggered animations
- Micro-interactions on hover
- Custom keyframe animations

### Components
- Reusable, modular components
- Consistent spacing and padding
- Mobile-first responsive design

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

\`\`\`env
# Site URL
NEXT_PUBLIC_SITE_URL=https://a88studio.com

# Email Service (optional)
# RESEND_API_KEY=your_resend_api_key
# EMAIL_FROM=onboarding@resend.dev
# EMAIL_TO=hello@a88studio.com
\`\`\`

### SEO Configuration

Edit \`lib/seo.ts\` to customize:
- Site name
- Base URL
- Default description
- Social media handles
- Open Graph image

## 📱 Features Breakdown

### SEO & Performance
- ✅ Dynamic metadata for each page
- ✅ Open Graph tags for social sharing
- ✅ Twitter Cards
- ✅ Automatic sitemap.xml generation
- ✅ robots.txt configuration
- ✅ Image optimization with Next/Image
- ✅ Font optimization
- ✅ Code splitting

### User Experience
- ✅ Toast notifications for form feedback
- ✅ Loading states
- ✅ Smooth page transitions
- ✅ Scroll progress indicator
- ✅ Custom 404 page
- ✅ Keyboard navigation support
- ✅ ARIA labels for accessibility

### Blog System
- ✅ Dynamic routing
- ✅ Full blog post content
- ✅ Author information
- ✅ Reading time
- ✅ Tags and categories
- ✅ Featured images
- ✅ Bilingual content

### Contact Form
- ✅ Client-side validation
- ✅ API endpoint
- ✅ Toast notifications
- ✅ Loading states
- ✅ Error handling
- ✅ Email integration ready

## 🚀 Deployment

### Vercel (Recommended)

\`\`\`powershell
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Build for Production

\`\`\`powershell
npm run build
npm start
\`\`\`

## 📈 Performance Targets

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: 100

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Contact

- Website: [a88studio.com](https://a88studio.com)
- Email: hello@a88studio.com
- Phone: +90 555 123 45 67
- Location: İzmir, Turkey

## 🙏 Acknowledgments

- Design inspiration from leading digital agencies
- Icons by [Lucide](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)
- Built with [Next.js](https://nextjs.org)

---

Made with ❤️ by a88studio
