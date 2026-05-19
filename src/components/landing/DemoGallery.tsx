"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LIGHTING_PRESETS, AESTHETIC_PRESETS, BACKGROUND_PRESETS } from "@/constants";

const demoCategories = [
  { label: "Lighting", presets: LIGHTING_PRESETS },
  { label: "Aesthetics", presets: AESTHETIC_PRESETS },
  { label: "Backgrounds", presets: BACKGROUND_PRESETS },
];

export default function DemoGallery() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activePreset, setActivePreset] = useState(0);

  return (
    <section id="gallery" className="relative py-20 md:py-32">
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
            Gallery
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            See the <span className="gradient-text">Magic</span> in Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our preset library and see how each style transforms your
            products.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {demoCategories.map((cat, index) => (
            <button
              key={cat.label}
              onClick={() => {
                setActiveCategory(index);
                setActivePreset(0);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === index
                  ? "bg-gradient-to-r from-indigo to-violet text-white shadow-lg shadow-indigo/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Presets Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {demoCategories[activeCategory].presets.map((preset, index) => (
            <motion.button
              key={preset.id}
              onClick={() => setActivePreset(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-shrink-0 px-4 py-3 rounded-xl border transition-all ${
                activePreset === index
                  ? "border-indigo/50 bg-indigo/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{preset.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-medium">{preset.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {preset.description}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Preview Grid */}
        <motion.div
          key={`${activeCategory}-${activePreset}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-card border border-border hover:border-indigo/30 transition-all"
            >
              {/* Gradient placeholder representing generated images */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  demoCategories[activeCategory].presets[activePreset]?.gradient ||
                  "from-indigo/20 to-violet/20"
                } opacity-60`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">
                    {demoCategories[activeCategory].presets[activePreset]?.icon}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">
                    {demoCategories[activeCategory].presets[activePreset]?.name}{" "}
                    {i + 1}
                  </span>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs text-white font-medium">
                  View Full Size →
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
