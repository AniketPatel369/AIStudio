"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const contactMethods = [
  { icon: Mail, title: "Email", value: "hello@aistudio.com", href: "mailto:hello@aistudio.com" },
  { icon: MessageSquare, title: "Live Chat", value: "Available 9am-6pm IST", href: "#" },
  { icon: MapPin, title: "Location", value: "Mumbai, India", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <Card key={method.title} className="bg-card border-border hover:border-indigo/20 transition-colors">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo/20 to-violet/20 flex items-center justify-center text-indigo flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{method.title}</p>
                        <a
                          href={method.href}
                          className="text-xs text-muted-foreground hover:text-indigo transition-colors"
                        >
                          {method.value}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <Input
                        placeholder="Your name"
                        className="mt-1.5 rounded-xl bg-secondary border-border"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1.5 rounded-xl bg-secondary border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Subject</Label>
                    <Input
                      placeholder="How can we help?"
                      className="mt-1.5 rounded-xl bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Message</Label>
                    <Textarea
                      placeholder="Tell us more..."
                      rows={5}
                      className="mt-1.5 rounded-xl bg-secondary border-border resize-none"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-indigo to-violet hover:opacity-90 text-white rounded-xl py-5 font-semibold">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
