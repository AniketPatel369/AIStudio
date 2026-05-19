"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING_PLANS } from "@/constants";

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/[0.02] to-transparent" />

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
            Pricing
          </span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free. Upgrade when you need more power.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                plan.popular
                  ? "bg-gradient-to-b from-indigo/10 to-card border-2 border-indigo/40 shadow-xl shadow-indigo/10 scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo to-violet text-white text-xs font-semibold shadow-lg shadow-indigo/30">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm ml-1">
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                  >
                    <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-xl py-5 font-semibold ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo to-violet hover:opacity-90 text-white shadow-lg shadow-indigo/25"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
