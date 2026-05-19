"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Radial gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet/10 rounded-full blur-[120px] animate-pulse delay-1000" />

        {/* Top gradient fade */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo/10 border border-indigo/20 text-indigo text-sm font-medium mb-8"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Product Photography
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Transform Products Into{" "}
            <span className="gradient-text">Studio-Quality</span>{" "}
            Photography
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your product. Choose your style. Let AI generate
            professional studio lighting, cinematic backgrounds, and
            commercial-grade aesthetics in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo to-violet hover:opacity-90 text-white shadow-xl shadow-indigo/25 rounded-2xl px-8 py-6 text-base font-semibold group"
              >
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 py-6 text-base border-border hover:bg-white/5"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { value: "50K+", label: "Images Generated" },
              { value: "10K+", label: "Active Users" },
              { value: "99%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Image / Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="relative mx-auto max-w-5xl">
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo/20 via-violet/20 to-indigo/20 rounded-3xl blur-2xl opacity-50" />

            {/* Main preview card */}
            <div className="relative glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-1">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-black/30 rounded-t-xl">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-white/5 rounded-md text-xs text-muted-foreground">
                      app.aistudio.com/create
                    </div>
                  </div>
                </div>

                {/* Screenshot placeholder - generation interface */}
                <div className="aspect-[16/9] bg-gradient-to-br from-[#111827] to-[#09090B] relative overflow-hidden rounded-b-xl">
                  {/* Mock generation UI */}
                  <div className="absolute inset-0 flex">
                    {/* Left panel - Upload */}
                    <div className="w-1/3 p-6 border-r border-white/5">
                      <div className="h-4 w-20 bg-white/10 rounded mb-4" />
                      <div className="aspect-square bg-white/5 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-10 w-10 rounded-full bg-indigo/20 flex items-center justify-center mx-auto mb-2">
                            <Sparkles className="h-5 w-5 text-indigo" />
                          </div>
                          <div className="h-3 w-24 bg-white/10 rounded mx-auto" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-3 w-16 bg-white/10 rounded" />
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className={`aspect-square rounded-lg ${
                                i === 0
                                  ? "bg-indigo/30 border border-indigo/50"
                                  : "bg-white/5"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right panel - Result */}
                    <div className="flex-1 p-6">
                      <div className="h-4 w-32 bg-white/10 rounded mb-4" />
                      <div className="grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden"
                          >
                            <div className="aspect-square bg-gradient-to-br from-indigo/10 via-transparent to-violet/10 shimmer" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
