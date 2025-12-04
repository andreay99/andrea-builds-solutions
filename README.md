# Andrea's Portfolio Website

A modern, interactive portfolio website showcasing full-stack AI/ML projects, technical architecture, and professional experience. Built with React, TypeScript, and Framer Motion for smooth animations and engaging user interactions.

🌐 **Live Site**: [andrea-builds-solutions.vercel.app](https://andrea-builds-solutions.vercel.app)

## ✨ Features

- **Interactive Project Showcases**: Detailed case studies with technical architecture diagrams, demo videos, and impact metrics
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations, scroll effects, and interactive components
- **Tech Architecture Visualizations**: Interactive diagrams showing system design for each project
- **Dark/Light Theme Support**: Tailwind CSS with theme switching
- **Performance Optimized**: Vite build system, lazy image loading, code splitting
- **Accessible**: WCAG compliant with proper semantic HTML and ARIA attributes

## 🚀 Featured Projects

### Recall
**AI-powered digital memory assistant for Alzheimer's & Dementia patients**
- Best Use of Grok (xAI) - HackPrinceton 2025
- Best Use of Arm (MLH) - HackPrinceton 2025
- Tech: Raspberry Pi, OpenCV, Flask, MongoDB, ElevenLabs TTS

### OffScript
**Real-time AI-powered technical interview simulator with dynamic feedback**
- Tech: Next.js, FastAPI, Vapi Voice AI, Gemini AI, SQLite, Monaco Editor

### SONA AI
**Real-time emotion detection and mental health insights platform**
- Tech: FastAPI, TensorFlow, PostgreSQL, Librosa, React

### Bikeshare Analytics
**Data analytics pipeline for NYC Citi Bike share system**
- Tech: Python, PostgreSQL, Pandas, Plotly, Prophet ML

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite v5.4.19
- **Styling**: Tailwind CSS 3.4.17, PostCSS
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Deployment**: Vercel
- **Build Tool**: Vite

## 📦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/andreay99/andrea-builds-solutions.git
cd andrea-builds-solutions

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   ├── Navigation.tsx   # Main navigation
│   ├── CareerTimeline.tsx
│   ├── InteractiveArchitecture.tsx
│   └── ...
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── projects/       # Individual project pages
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── assets/             # Images and media
└── index.css          # Global styles
```

## 🎨 Design Highlights

- **Custom Cursor**: Magnetic button effects with smooth interactions
- **Parallax Scrolling**: Background parallax effects on scroll
- **Responsive Grid**: Bento-style project grid that adapts to screen size
- **Interactive Charts**: Skill visualization with circular charts
- **Smooth Transitions**: Page transitions and route animations
- **Mobile-First**: Optimized mobile experience with touch-friendly components

## 🚀 Deployment

The site is deployed on **Vercel** with automatic CI/CD from the main branch.

```bash
# Deploy to production
vercel --prod
```

### SPA Routing
Uses `vercel.json` to configure client-side routing for React Router:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Architecture components adapt:
- **Desktop**: Interactive absolute-positioned diagrams with SVG connectors
- **Mobile**: Clean 2-column grid layout

## 🔄 Recent Updates

- ✅ Fixed mobile scroll container height with responsive viewport
- ✅ Made entire project cards clickable
- ✅ Added responsive architecture layouts for all projects
- ✅ Implemented timeline animations with Framer Motion
- ✅ Fixed SPA routing with Vercel configuration

## 📝 License

Personal portfolio - © 2025 Andrea. All rights reserved.

## 🤝 Contact

- **Email**: [Contact page](https://andrea-builds-solutions.vercel.app/contact)
- **GitHub**: [@andreay99](https://github.com/andreay99)
- **LinkedIn**: [Andrea's LinkedIn]

---

**Built with ❤️ using React, TypeScript, and Framer Motion**
