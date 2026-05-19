# frontend.md

# AI Product Photography Platform — Frontend Architecture

## 1. Frontend Goal

The frontend is responsible for:
- user experience
- generation workflow
- provider/model selection
- image upload
- generation controls
- generation history
- account/dashboard management
- responsive commercial SaaS UI
- communicating with backend APIs
- displaying generation status and results

Frontend must feel:
- premium
- cinematic
- modern AI product
- commercial photography oriented
- minimal but powerful

Not a generic AI chatbot UI.

---

# 2. Frontend Technology Stack

## Core Framework
- Next.js 15+
- React 19+
- TypeScript

## Styling
- Tailwind CSS
- CSS Variables for themes

## Component System
- shadcn/ui

## Icons
- Lucide React
- Heroicons

## Animations
- Framer Motion

## State Management
- Zustand

## API Communication
- Axios

## Authentication
- Supabase Google Auth

## Forms
- React Hook Form
- Zod validation

## Notifications
- Sonner Toast

## File Upload
- React Dropzone

## Image Optimization
- Next/Image

---

# 3. UI Design Philosophy

## Design Style
- cinematic
- premium SaaS
- luxury photography platform
- glassmorphism minimalism
- dark-first experience

## UI Feel
The interface should feel like:
- professional photography software
- creative direction tool
- AI studio environment

Not:
- casual generator
- meme AI tool

---

# 4. Theme System

## Primary Theme
Dark Mode Default

## Secondary Theme
Light Mode Optional

## Theme Colors

### Background
- #09090B
- #111827
- #18181B

### Cards
- #1E1E24
- #27272A

### Accent
- #6366F1
- #8B5CF6

### Success
- #22C55E

### Error
- #EF4444

### Warning
- #F59E0B

### Text
- #FAFAFA
- #D4D4D8
- #A1A1AA

---

# 5. Typography

## Fonts

### Headings
- Space Grotesk

### Body
- Inter

### Optional Display Font
- Satoshi

## Typography Rules

### Heading Sizes
- H1: 48px
- H2: 36px
- H3: 28px
- H4: 22px

### Body
- 16px default
- 14px secondary

### Button Text
- 14px semibold

---

# 6. Spacing System

## Border Radius
- cards: 20px
- buttons: 14px
- inputs: 14px

## Padding
- section: 80px vertical
- card: 24px
- button: 12px 18px

## Layout Width
- max-width: 1440px

## Grid Gap
- 20px

---

# 7. Responsive Design Rules

## Mobile First
Frontend must fully support:
- mobile
- tablet
- desktop

## Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Mobile UX Rules
- bottom sheets for controls
- sticky generate button
- horizontal preset scroll
- optimized upload UI

---

# 8. Animation Guidelines

## Animation Library
Framer Motion

## Required Animations
- page transitions
- hover glow
- smooth card entrance
- image reveal animation
- loading shimmer
- progress animations
- floating effects
- subtle parallax

## Animation Duration
- micro interactions: 150ms
- standard: 300ms
- page transitions: 500ms

## Avoid
- excessive bouncing
- distracting animations
- laggy motion

---

# 9. Frontend Pages

## Public Pages

### 1. Landing Page
Sections:
- hero
- demo gallery
- features
- presets showcase
- before/after comparison
- pricing
- testimonials
- FAQ
- footer

### 2. Login Page
- Google sign-in only

### 3. Privacy Policy

### 4. Terms of Service

### 5. Contact Page

---

## Authenticated Pages

### 6. Dashboard
Features:
- generation stats
- remaining free generations
- recent generations
- quick generate button

### 7. Create Generation Page
Main generation workflow.

Sections:
- upload product
- provider selection
- model selection
- lighting preset
- aesthetic preset
- camera preset
- background preset
- color scheme preset
- advanced settings
- queue status
- generate button

### 8. Generation History
Features:
- generated images grid
- search
- filtering
- download
- regenerate

### 9. Account Settings
Features:
- profile
- provider preferences
- usage limits
- delete account

### 10. Admin Panel
Features:
- users
- generations
- providers
- models
- logs
- moderation
- analytics

---

# 10. Upload System

## Upload Rules
- drag and drop
- click upload
- image preview
- upload progress

## Supported Formats
- PNG
- JPG
- JPEG
- WEBP

## Validation
- max 10MB
- image dimensions validation
- mime type validation

---

# 11. Generation Preset System

## Preset Categories

### Lighting
- softbox
- luxury rim light
- cinematic
- golden hour
- studio white
- moody dark

### Aesthetic
- apple style
- nike style
- minimal luxury
- korean commercial
- cyberpunk
- festive indian

### Background
- marble
- acrylic black
- gradient
- wooden
- transparent
- fabric luxury

### Camera
- macro
- closeup
- top angle
- 85mm portrait
- cinematic wide

### Color Scheme
- warm gold
- monochrome
- pastel
- vibrant
- cold silver

---

# 12. Generation Result UI

## Result Features
- side-by-side comparison
- zoom
- fullscreen preview
- regenerate
- variation generation
- download
- favorite
- copy prompt

## Result Layout
- masonry grid
- responsive cards

---

# 13. Frontend Security

## Security Rules
- sanitize all inputs
- avoid exposing API keys
- secure cookies
- token validation
- CSRF protection

---

# 14. SEO Requirements

## SEO Setup
- metadata
- OpenGraph
- Twitter cards
- sitemap
- robots.txt
- structured schema

---

# 15. Accessibility

## Requirements
- keyboard navigation
- ARIA labels
- screen reader support
- proper contrast
- focus states

---

# 16. Frontend Performance

## Optimization
- lazy loading
- code splitting
- image optimization
- route prefetching
- CDN caching

## Lighthouse Goals
- performance > 90
- accessibility > 90
- SEO > 90

---

# 17. Frontend Folder Structure

```txt
src/
 ├── app/
 ├── components/
 ├── features/
 ├── hooks/
 ├── lib/
 ├── services/
 ├── stores/
 ├── styles/
 ├── types/
 ├── utils/
 └── constants/
```

---

# 18. Future Frontend Features

- AI image editing
- relighting
- background replacement
- video generation
- realtime collaboration
- generation templates
- AI prompt assistant
- mobile app



# backend.md

# AI Product Photography Platform — Backend Architecture

## 1. Backend Goal

Backend is responsible for:
- authentication
- authorization
- provider orchestration
- model routing
- generation workflow
- image processing
- limits
- queues
- storage
- analytics
- moderation
- logging

---

# 2. Backend Technology Stack

## Core Backend
- Spring Boot 3+
- Java 21

## Build Tool
- Maven

## Database
- MySQL

## Cache
- Redis

## Queue
- BullMQ compatible Redis queue OR RabbitMQ

## ORM
- Spring Data JPA
- Hibernate

## Auth
- Supabase JWT validation

## AI Worker
- Python FastAPI Worker

## Image Processing
- Pillow
- OpenCV

## AI Libraries
- Diffusers
- Transformers

---

# 3. High-Level Backend Architecture

```txt
Frontend
   ↓
Spring Boot API
   ↓
Redis Queue
   ↓
Python AI Worker
   ↓
External Providers
```

---

# 4. Provider System

## Supported Providers
- NVIDIA NIMs
- HuggingFace
- Pollinations
- TogetherAI
- Local models

## Provider Features
- enable/disable
- priority routing
- rate limit tracking
- model availability
- fallback provider

---

# 5. Model System

## Example Models

### Text Models
- DeepSeek
- Qwen
- Llama

### Image Models
- FLUX Schnell
- SDXL
- JuggernautXL
- RealVisXL

### Enhancement Models
- Real-ESRGAN
- SUPIR

---

# 6. Backend Modules

## Modules
- auth
- user
- generation
- provider
- model
- preset
- queue
- analytics
- admin
- storage
- moderation

---

# 7. Database Tables

## users

Fields:
- id
- uuid
- name
- email
- avatar
- auth_provider
- role
- status
- created_at
- updated_at

---

## user_limits

Fields:
- id
- user_id
- daily_generation_count
- last_reset_date
- fingerprint_hash
- ip_hash
- blocked

---

## providers

Fields:
- id
- name
- code
- enabled
- priority
- api_url
- created_at

---

## models

Fields:
- id
- provider_id
- name
- code
- model_type
- enabled
- free_tier
- max_resolution
- supports_ip_adapter

---

## presets

Fields:
- id
- category
- name
- prompt
- negative_prompt
- thumbnail
- enabled

---

## generations

Fields:
- id
- uuid
- user_id
- provider_id
- model_id
- status
- prompt
- enhanced_prompt
- output_image
- input_image
- generation_time
- failed_reason
- created_at

---

## generation_variants

Fields:
- id
- generation_id
- image_url
- upscale_url
- width
- height

---

## generation_logs

Fields:
- id
- generation_id
- step_name
- log_message
- created_at

---

## moderation_logs

Fields:
- id
- generation_id
- moderation_type
- result
- reason

---

# 8. Queue System

## Queue Stages
- pending
- processing
- upscaling
- completed
- failed
- refunded

---

# 9. Generation Flow

```txt
1. Upload image
2. Validate limits
3. Store image
4. Analyze product
5. Build prompts
6. Inject presets
7. Queue generation
8. Generate image
9. Validate output
10. Upscale
11. Save output
12. Return result
```

---

# 10. Controllers

## AuthController

Endpoints:
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

---

## GenerationController

Endpoints:
- POST /api/generations/create
- GET /api/generations/{id}
- GET /api/generations/history
- DELETE /api/generations/{id}
- POST /api/generations/regenerate

---

## ProviderController

Endpoints:
- GET /api/providers
- GET /api/providers/models

---

## PresetController

Endpoints:
- GET /api/presets
- GET /api/presets/category/{type}

---

## UserController

Endpoints:
- GET /api/user/profile
- PUT /api/user/profile
- GET /api/user/limits

---

## AdminController

Endpoints:
- GET /api/admin/users
- GET /api/admin/generations
- POST /api/admin/provider/toggle

---

# 11. Services

## AuthService
Responsibilities:
- JWT validation
- user creation
- session validation

---

## GenerationService
Responsibilities:
- generation orchestration
- queue management
- validation

---

## PromptBuilderService
Responsibilities:
- prompt composition
- preset injection
- negative prompts

---

## ProviderRouterService
Responsibilities:
- provider selection
- fallback handling
- model routing

---

## StorageService
Responsibilities:
- file uploads
- output storage
- signed URLs

---

## LimitService
Responsibilities:
- daily limits
- IP tracking
- fingerprint validation

---

# 12. Repository Layer

## Repositories
- UserRepository
- ProviderRepository
- ModelRepository
- GenerationRepository
- PresetRepository
- UserLimitRepository

---

# 13. DAO Layer

## DAO Responsibilities
- optimized custom queries
- analytics queries
- admin reporting
- pagination queries

---

# 14. Security

## Security Features
- JWT auth
- role-based access
- rate limiting
- request validation
- secure headers
- CORS config
- IP hashing

---

# 15. Backend Configurations

## application.yml
Contains:
- DB config
- Redis config
- queue config
- provider config
- storage config
- JWT config

---

# 16. Logging

## Logging Stack
- SLF4J
- Logback

## Log Types
- request logs
- provider logs
- generation logs
- moderation logs
- error logs

---

# 17. File Storage Structure

```txt
/uploads
/generated
/upscaled
/thumbnails
/temp
```

---

# 18. Future Backend Features

- AI editing
- video generation
- AI relighting
- virtual try-on
- realtime websocket progress
- billing
- subscriptions
- API marketplace



# integration.md

# AI Product Photography Platform — Frontend/Backend Integration

## 1. Integration Goal

This document defines:
- frontend/backend communication
- API contracts
- request/response structure
- ownership responsibilities
- task separation
- validation rules
- error handling

---

# 2. Responsibility Separation

## Frontend Responsibilities

Frontend handles:
- UI rendering
- form validation
- upload interactions
- displaying results
- loading states
- local UX state
- image previews
- responsive layout

Frontend DOES NOT:
- generate prompts directly
- call AI providers directly
- expose provider secrets
- bypass generation limits

---

## Backend Responsibilities

Backend handles:
- authentication
- limits
- queue management
- provider routing
- model selection validation
- prompt generation
- AI orchestration
- storage
- moderation
- logging

---

# 3. Authentication Flow

## Flow

```txt
1. User clicks Google Login
2. Supabase authenticates user
3. Frontend receives JWT
4. JWT attached to API requests
5. Backend validates JWT
6. Backend creates user if missing
```

---

# 4. API Communication Rules

## Base URL

```txt
/api
```

## Content Type

```txt
application/json
```

## Upload Type

```txt
multipart/form-data
```

---

# 5. Standard API Response Format

## Success Response

```json
{
  "success": true,
  "message": "Generation created successfully",
  "data": {},
  "timestamp": "2026-01-01T10:00:00"
}
```

---

## Error Response

```json
{
  "success": false,
  "error": {
    "code": "LIMIT_EXCEEDED",
    "message": "Daily limit reached"
  },
  "timestamp": "2026-01-01T10:00:00"
}
```

---

# 6. Error Types

## Authentication Errors
- INVALID_TOKEN
- TOKEN_EXPIRED
- UNAUTHORIZED

## Validation Errors
- INVALID_IMAGE
- FILE_TOO_LARGE
- INVALID_PROVIDER
- INVALID_MODEL

## Generation Errors
- GENERATION_FAILED
- PROVIDER_DOWN
- MODEL_UNAVAILABLE
- UPSCALE_FAILED

## Limit Errors
- DAILY_LIMIT_EXCEEDED
- IP_LIMIT_EXCEEDED
- FINGERPRINT_BLOCKED

## System Errors
- INTERNAL_SERVER_ERROR
- STORAGE_FAILED
- QUEUE_FAILED

---

# 7. Generation API Flow

## Request

POST /api/generations/create

### Form Data
- image
- provider_id
- model_id
- lighting_preset
- aesthetic_preset
- background_preset
- camera_preset
- color_scheme
- variants

---

## Backend Processing

```txt
1. Validate JWT
2. Validate limits
3. Validate provider
4. Validate model
5. Save upload
6. Build prompts
7. Create queue job
8. Return generation ID
```

---

## Response

```json
{
  "success": true,
  "data": {
    "generation_id": "abc123",
    "status": "PENDING"
  }
}
```

---

# 8. Polling System

Frontend polls:

```txt
GET /api/generations/{id}
```

Polling interval:
- every 3 seconds

Stop polling when:
- SUCCESS
- FAILED

---

# 9. Generation Status Types

## Status Values
- PENDING
- PROCESSING
- UPSCALING
- SUCCESS
- FAILED
- REFUNDED

---

# 10. Queue Ownership

## Backend Owns
- job queue
- retries
- provider fallback
- timeout handling
- failed generation recovery

Frontend only displays:
- status
- progress
- messages

---

# 11. Prompt System Ownership

## Frontend
Sends:
- selected presets
- selected provider
- selected model

## Backend
Generates:
- final enhanced prompt
- negative prompt
- commercial instructions
- style injection

---

# 12. Upload Validation Rules

## Frontend Validation
- file size
- mime type
- image dimensions

## Backend Validation
- malware check
- duplicate detection
- content moderation
- final validation

---

# 13. Provider Routing Logic

## Backend Routing Logic

```txt
IF selected provider available
    use selected provider
ELSE
    use fallback provider
```

---

# 14. Failed Generation Rules

If generation fails:
- do not count toward limit
- mark FAILED
- automatically refund slot

---

# 15. Daily Limit Rules

## Free User
- 3 successful generations/day

## Counting Rule
Only SUCCESS generations count.

FAILED or REFUNDED do not count.

---

# 16. Security Integration Rules

## Frontend
- never store provider secrets
- never expose backend secrets

## Backend
- validate every request
- validate ownership
- sanitize prompts

---

# 17. Logging Responsibilities

## Frontend Logs
- UI errors
- upload failures
- rendering issues

## Backend Logs
- generation logs
- provider failures
- queue failures
- auth failures

---

# 18. Frontend Task List

## Phase 1
- authentication UI
- upload system
- preset UI
- dashboard
- history page
- polling UI
- responsive layout

## Phase 2
- animations
- advanced controls
- comparison sliders
- favorites

---

# 19. Backend Task List

## Phase 1
- auth validation
- generation APIs
- queue system
- provider routing
- prompt builder
- storage system
- limits system

## Phase 2
- analytics
- moderation
- admin panel
- fallback routing
- advanced retries

---

# 20. AI Worker Responsibilities

Python worker handles:
- model inference
- upscaling
- preprocessing
- background removal
- image enhancement
- provider communication

---

# 21. Future Integration Features

- websocket realtime progress
- batch generation
- collaborative editing
- realtime relighting
- AI video generation
- mobile app APIs

