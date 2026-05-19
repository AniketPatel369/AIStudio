// ═══════════════════════════════════════════════
// AIStudio Constants & Preset Data
// ═══════════════════════════════════════════════

import { PresetCategory } from "@/types";

export const APP_NAME = "AIStudio";
export const APP_TAGLINE = "AI-Powered Product Photography";
export const APP_DESCRIPTION =
  "Transform your product photos with AI-powered professional studio lighting, cinematic backgrounds, and commercial-grade aesthetics.";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
export const POLL_INTERVAL = 3000; // 3 seconds
export const FREE_DAILY_LIMIT = 3;

// ── Navigation Links ───────────────────────────

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Create", href: "/dashboard/create", icon: "Sparkles" },
  { label: "History", href: "/dashboard/history", icon: "History" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

// ── Preset Data ────────────────────────────────

export interface PresetOption {
  id: string;
  name: string;
  description: string;
  category: PresetCategory;
  icon: string;
  gradient: string;
}

export const LIGHTING_PRESETS: PresetOption[] = [
  { id: "softbox", name: "Softbox", description: "Soft, diffused studio light", category: "lighting", icon: "☀️", gradient: "from-amber-500/20 to-yellow-500/20" },
  { id: "luxury-rim", name: "Luxury Rim Light", description: "Premium edge highlighting", category: "lighting", icon: "✨", gradient: "from-indigo-500/20 to-purple-500/20" },
  { id: "cinematic", name: "Cinematic", description: "Dramatic, moody lighting", category: "lighting", icon: "🎬", gradient: "from-blue-500/20 to-cyan-500/20" },
  { id: "golden-hour", name: "Golden Hour", description: "Warm, sunset-like glow", category: "lighting", icon: "🌅", gradient: "from-orange-500/20 to-amber-500/20" },
  { id: "studio-white", name: "Studio White", description: "Clean, bright studio setup", category: "lighting", icon: "💡", gradient: "from-gray-400/20 to-white/10" },
  { id: "moody-dark", name: "Moody Dark", description: "Low-key, mysterious atmosphere", category: "lighting", icon: "🌙", gradient: "from-slate-700/30 to-zinc-800/30" },
];

export const AESTHETIC_PRESETS: PresetOption[] = [
  { id: "apple-style", name: "Apple Style", description: "Clean, minimalist, premium", category: "aesthetic", icon: "🍎", gradient: "from-gray-400/20 to-zinc-500/20" },
  { id: "nike-style", name: "Nike Style", description: "Bold, dynamic, athletic", category: "aesthetic", icon: "👟", gradient: "from-red-500/20 to-orange-500/20" },
  { id: "minimal-luxury", name: "Minimal Luxury", description: "Understated elegance", category: "aesthetic", icon: "💎", gradient: "from-amber-500/20 to-yellow-500/20" },
  { id: "korean-commercial", name: "Korean Commercial", description: "Soft, dreamy aesthetic", category: "aesthetic", icon: "🌸", gradient: "from-pink-500/20 to-rose-500/20" },
  { id: "cyberpunk", name: "Cyberpunk", description: "Neon, futuristic, edgy", category: "aesthetic", icon: "🌆", gradient: "from-violet-500/20 to-fuchsia-500/20" },
  { id: "festive-indian", name: "Festive Indian", description: "Vibrant, colorful, celebratory", category: "aesthetic", icon: "🪔", gradient: "from-orange-500/20 to-red-500/20" },
];

export const BACKGROUND_PRESETS: PresetOption[] = [
  { id: "marble", name: "Marble", description: "Luxurious marble surface", category: "background", icon: "🏛️", gradient: "from-gray-300/20 to-white/10" },
  { id: "acrylic-black", name: "Acrylic Black", description: "Sleek black reflective", category: "background", icon: "⬛", gradient: "from-zinc-800/30 to-black/20" },
  { id: "gradient", name: "Gradient", description: "Smooth color gradient", category: "background", icon: "🎨", gradient: "from-indigo-500/20 to-violet-500/20" },
  { id: "wooden", name: "Wooden", description: "Natural wood texture", category: "background", icon: "🪵", gradient: "from-amber-700/20 to-yellow-800/20" },
  { id: "transparent", name: "Transparent", description: "Clean transparent cutout", category: "background", icon: "🔲", gradient: "from-gray-500/20 to-gray-600/20" },
  { id: "fabric-luxury", name: "Fabric Luxury", description: "Rich fabric backdrop", category: "background", icon: "🧶", gradient: "from-red-900/20 to-amber-900/20" },
];

export const CAMERA_PRESETS: PresetOption[] = [
  { id: "macro", name: "Macro", description: "Extreme close-up detail", category: "camera", icon: "🔍", gradient: "from-green-500/20 to-emerald-500/20" },
  { id: "closeup", name: "Close-up", description: "Product-focused framing", category: "camera", icon: "📷", gradient: "from-blue-500/20 to-sky-500/20" },
  { id: "top-angle", name: "Top Angle", description: "Flat-lay overhead view", category: "camera", icon: "⬇️", gradient: "from-teal-500/20 to-cyan-500/20" },
  { id: "85mm-portrait", name: "85mm Portrait", description: "Professional portrait lens", category: "camera", icon: "📸", gradient: "from-violet-500/20 to-purple-500/20" },
  { id: "cinematic-wide", name: "Cinematic Wide", description: "Wide cinematic framing", category: "camera", icon: "🎥", gradient: "from-indigo-500/20 to-blue-500/20" },
];

export const COLOR_SCHEME_PRESETS: PresetOption[] = [
  { id: "warm-gold", name: "Warm Gold", description: "Luxurious golden tones", category: "color_scheme", icon: "🥇", gradient: "from-amber-500/20 to-yellow-500/20" },
  { id: "monochrome", name: "Monochrome", description: "Black and white elegance", category: "color_scheme", icon: "⚫", gradient: "from-gray-500/20 to-zinc-500/20" },
  { id: "pastel", name: "Pastel", description: "Soft, gentle colors", category: "color_scheme", icon: "🎀", gradient: "from-pink-300/20 to-blue-300/20" },
  { id: "vibrant", name: "Vibrant", description: "Bold, eye-catching colors", category: "color_scheme", icon: "🌈", gradient: "from-red-500/20 to-violet-500/20" },
  { id: "cold-silver", name: "Cold Silver", description: "Cool metallic tones", category: "color_scheme", icon: "🥈", gradient: "from-slate-400/20 to-gray-500/20" },
];

// ── Feature List ───────────────────────────────

export const FEATURES = [
  {
    title: "AI-Powered Generation",
    description: "Transform product photos into professional studio shots using state-of-the-art AI models.",
    icon: "Sparkles",
  },
  {
    title: "Multiple AI Providers",
    description: "Choose from NVIDIA NIMs, HuggingFace, Pollinations, TogetherAI, and more.",
    icon: "Cpu",
  },
  {
    title: "Professional Presets",
    description: "Studio lighting, cinematic aesthetics, and commercial-grade backgrounds at your fingertips.",
    icon: "Palette",
  },
  {
    title: "Lightning Fast",
    description: "Generate stunning product photos in seconds, not hours. Queue system ensures reliability.",
    icon: "Zap",
  },
  {
    title: "HD Upscaling",
    description: "Automatic upscaling with Real-ESRGAN and SUPIR for print-ready output quality.",
    icon: "ArrowUpRight",
  },
  {
    title: "Smart Comparison",
    description: "Side-by-side before/after comparison with zoom, pan, and fullscreen preview.",
    icon: "Columns2",
  },
] as const;

// ── Pricing Plans ──────────────────────────────

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out AIStudio",
    features: [
      "3 generations per day",
      "Basic AI models",
      "Standard resolution",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious product photographers",
    features: [
      "Unlimited generations",
      "All AI models & providers",
      "4K resolution output",
      "Priority queue",
      "Advanced presets",
      "API access",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per month",
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Custom models",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "Team management",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
] as const;

// ── Testimonials ───────────────────────────────

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "E-commerce Director",
    company: "LuxBrand Co.",
    content: "AIStudio completely transformed our product photography workflow. What used to take a full day studio shoot now takes minutes.",
    avatar: "/avatars/avatar-1.jpg",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Creative Director",
    company: "Pixel Studios",
    content: "The quality of AI-generated product photos is indistinguishable from professional studio shots. Our clients are amazed.",
    avatar: "/avatars/avatar-2.jpg",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Founder",
    company: "ShopVibe",
    content: "As a small business owner, AIStudio saved me thousands on product photography. The presets are incredibly versatile.",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5,
  },
] as const;

// ── FAQ Data ───────────────────────────────────

export const FAQ_ITEMS = [
  {
    question: "What AI models does AIStudio use?",
    answer: "AIStudio supports multiple AI providers including NVIDIA NIMs, HuggingFace, Pollinations, and TogetherAI. We use models like FLUX Schnell, SDXL, JuggernautXL, and RealVisXL for image generation, with Real-ESRGAN and SUPIR for upscaling.",
  },
  {
    question: "How many free generations do I get?",
    answer: "Free users get 3 successful generations per day. Failed or refunded generations don't count toward your daily limit. Only successfully completed generations are counted.",
  },
  {
    question: "What image formats are supported?",
    answer: "AIStudio supports PNG, JPG, JPEG, and WEBP formats. The maximum file size is 10MB. We recommend high-resolution product photos for the best results.",
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "Yes! All images generated through AIStudio are yours to use commercially. We don't claim any rights to your generated content.",
  },
  {
    question: "How does the queue system work?",
    answer: "When you submit a generation request, it enters our queue system. The generation goes through stages: Pending → Processing → Upscaling → Completed. You can track progress in real-time.",
  },
  {
    question: "What happens if a generation fails?",
    answer: "If a generation fails, it does not count toward your daily limit. The system automatically marks it as failed and refunds your generation slot.",
  },
] as const;
