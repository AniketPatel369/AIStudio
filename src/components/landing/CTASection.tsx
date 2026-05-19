"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo/20 via-violet/10 to-indigo/20" />
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Glow orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet/20 rounded-full blur-[100px]" />

          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5 text-indigo" />
              Start for free, no credit card required
            </div>

            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl mx-auto">
              Ready to Transform Your{" "}
              <span className="gradient-text">Product Photography?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Join thousands of creators using AI to generate stunning product
              photos. Start with 3 free generations per day.
            </p>

            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo to-violet hover:opacity-90 text-white shadow-xl shadow-indigo/30 rounded-2xl px-10 py-6 text-base font-semibold group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
