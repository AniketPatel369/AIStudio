<div align="center">

# ✨ AIStudio

### AI-Powered Product Photography Platform

Transform your product photos into professional studio-quality shots using cutting-edge AI models.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)

</div>

---

## 🎯 Overview

AIStudio is a full-stack SaaS platform that enables users to upload product images and generate professional, commercial-grade product photography using AI. The platform supports multiple AI providers, customizable presets for lighting, aesthetics, backgrounds, camera angles, and color schemes.

<div align="center">

### 🖥️ Landing Page

| Feature | Description |
|---------|-------------|
| 🎬 **Cinematic UI** | Dark-first, glassmorphism design with smooth animations |
| 🎨 **Preset System** | 30+ presets across 5 categories |
| 🤖 **Multi-Provider** | NVIDIA NIMs, HuggingFace, Pollinations, TogetherAI |
| ⚡ **Queue System** | Real-time generation tracking with polling |
| 📱 **Responsive** | Mobile-first design for all screen sizes |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│              Next.js 15 + React 19 + TypeScript              │
│           Tailwind CSS + shadcn/ui + Framer Motion           │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API (Axios)
┌─────────────────────▼───────────────────────────────────────┐
│                        BACKEND                               │
│              Spring Boot 3 + Java 21 + MySQL                 │
│           Supabase JWT Auth + Redis Queue                    │
└─────────────────────┬───────────────────────────────────────┘
                      │ Redis Queue
┌─────────────────────▼───────────────────────────────────────┐
│                      AI WORKER                               │
│              Python FastAPI + Pillow + OpenCV                 │
│          Diffusers + Transformers + Real-ESRGAN              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Java** 21+
- **Python** 3.10+
- **MySQL** 8+
- **Redis** 7+

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/AniketPatel369/AIStudio.git
cd AIStudio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Backend Setup

```bash
cd backend

# Configure application.yml with your database credentials

# Run with Maven
mvn spring-boot:run
```

### AI Worker Setup

```bash
cd worker

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the worker
python main.py
```

---

## 📁 Project Structure

```
AIStudio/
├── src/                          # Frontend (Next.js)
│   ├── app/                      # App Router pages
│   │   ├── page.tsx              # Landing page
│   │   ├── login/                # Authentication
│   │   ├── dashboard/            # Authenticated pages
│   │   │   ├── page.tsx          # Dashboard home
│   │   │   ├── create/           # Generation workflow
│   │   │   ├── history/          # Generation history
│   │   │   ├── settings/         # Account settings
│   │   │   └── admin/            # Admin panel
│   │   ├── privacy/              # Privacy policy
│   │   ├── terms/                # Terms of service
│   │   └── contact/              # Contact page
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/               # Navbar, Footer, Sidebar
│   │   └── landing/              # Landing page sections
│   ├── stores/                   # Zustand state management
│   ├── services/                 # API service layer (Axios)
│   ├── types/                    # TypeScript definitions
│   ├── constants/                # App constants & presets
│   └── lib/                      # Utilities & Supabase client
├── backend/                      # Backend (Spring Boot)
│   └── src/main/java/com/aistudio/
│       ├── controller/           # REST controllers
│       ├── service/              # Business logic
│       ├── repository/           # Data access
│       ├── entity/               # JPA entities
│       ├── dto/                  # Request/Response DTOs
│       ├── config/               # Security, CORS, Redis
│       └── security/             # JWT validation
├── worker/                       # AI Worker (Python FastAPI)
│   ├── providers/                # AI provider integrations
│   └── processing/               # Image processing pipeline
└── plan.md                       # Full architecture documentation
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Background** | `#09090B` · `#111827` · `#18181B` |
| **Cards** | `#1E1E24` · `#27272A` |
| **Accent** | `#6366F1` (Indigo) · `#8B5CF6` (Violet) |
| **Success** | `#22C55E` |
| **Error** | `#EF4444` |
| **Warning** | `#F59E0B` |
| **Headings** | Space Grotesk |
| **Body** | Inter |
| **Radius** | Cards: 20px · Buttons: 14px |

---

## 📋 Features

### Public Pages
- 🏠 **Landing Page** — Hero, demo gallery, features, pricing, testimonials, FAQ
- 🔐 **Login** — Google Sign-In via Supabase
- 📄 **Privacy & Terms** — Legal pages
- 📧 **Contact** — Contact form

### Authenticated Pages
- 📊 **Dashboard** — Stats, usage, recent generations
- ✨ **Create Generation** — Upload, presets, provider/model selection
- 📜 **History** — Masonry grid, search, filter, download, regenerate
- ⚙️ **Settings** — Profile, preferences, notifications
- 🛡️ **Admin Panel** — Users, providers, analytics

### Generation Presets
- ☀️ **Lighting**: Softbox, Luxury Rim, Cinematic, Golden Hour, Studio, Moody
- 🎨 **Aesthetic**: Apple, Nike, Minimal Luxury, Korean, Cyberpunk, Festive
- 🖼️ **Background**: Marble, Acrylic Black, Gradient, Wooden, Transparent, Fabric
- 📷 **Camera**: Macro, Close-up, Top Angle, 85mm Portrait, Cinematic Wide
- 🎨 **Color**: Warm Gold, Monochrome, Pastel, Vibrant, Cold Silver

---

## 🔧 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| Next.js 15 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| shadcn/ui | Component system |
| Framer Motion | Animations |
| Zustand | State management |
| Axios | API communication |
| Supabase | Google Auth |
| React Hook Form + Zod | Forms & validation |
| Sonner | Toast notifications |
| React Dropzone | File upload |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|-----------|---------|
| Spring Boot 3 | Java web framework |
| Java 21 | Runtime |
| MySQL | Database |
| Redis | Cache & Queue |
| Spring Data JPA | ORM |
| Supabase JWT | Authentication |

### AI Worker
| Technology | Purpose |
|-----------|---------|
| FastAPI | Python web framework |
| Pillow | Image processing |
| OpenCV | Computer vision |
| Diffusers | Model inference |
| Real-ESRGAN | Image upscaling |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with JWT |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/generations/create` | Create generation |
| GET | `/api/generations/{id}` | Get generation (polling) |
| GET | `/api/generations/history` | Get history |
| DELETE | `/api/generations/{id}` | Delete generation |
| POST | `/api/generations/regenerate` | Regenerate |
| GET | `/api/providers` | List providers |
| GET | `/api/providers/models` | List models |
| GET | `/api/presets` | List all presets |
| GET | `/api/presets/category/{type}` | Presets by category |
| GET | `/api/user/profile` | Get profile |
| PUT | `/api/user/profile` | Update profile |
| GET | `/api/user/limits` | Get usage limits |
| GET | `/api/admin/users` | Admin: List users |
| GET | `/api/admin/generations` | Admin: All generations |
| POST | `/api/admin/provider/toggle` | Admin: Toggle provider |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is proprietary. All rights reserved.

---

<div align="center">

**Built with ❤️ using AI-powered tools**

[Website](https://aistudio.com) · [Documentation](https://docs.aistudio.com) · [Report Bug](https://github.com/AniketPatel369/AIStudio/issues)

</div>
