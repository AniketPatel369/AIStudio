"use client";

import { motion } from "framer-motion";
import { Sparkles, Cpu, Palette, Zap, ArrowUpRight, Columns2 } from "lucide-react";
import { FEATURES } from "@/constants";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  ArrowUpRight: <ArrowUpRight className="h-6 w-6" />,
  Columns2: <Columns2 className="h-6 w-6" />,
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 md:py-32">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo/10 border border-indigo/20 text-indigo text-xs font-medium mb-4">
            Features
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="gradient-text">Perfect Product Shots</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional-grade tools powered by the latest AI models, designed
            for commercial product photography.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl bg-card border border-border hover:border-indigo/30 transition-all duration-300 card-hover">
                {/* Icon */}
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo/20 to-violet/20 flex items-center justify-center text-indigo mb-4 group-hover:shadow-lg group-hover:shadow-indigo/20 transition-shadow">
                  {iconMap[feature.icon]}
                </div>

                {/* Content */}
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo/5 to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
