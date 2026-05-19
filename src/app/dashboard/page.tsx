"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Image,
  Clock,
  TrendingUp,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Generations",
    value: "127",
    change: "+12%",
    icon: Image,
    gradient: "from-indigo/20 to-violet/20",
    iconColor: "text-indigo",
  },
  {
    title: "Today's Generations",
    value: "2",
    change: "1 remaining",
    icon: Sparkles,
    gradient: "from-violet/20 to-purple/20",
    iconColor: "text-violet",
  },
  {
    title: "Avg. Generation Time",
    value: "4.2s",
    change: "-0.3s",
    icon: Clock,
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
  },
  {
    title: "Success Rate",
    value: "98.4%",
    change: "+0.2%",
    icon: TrendingUp,
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
  },
];

const recentGenerations = [
  {
    id: "1",
    status: "SUCCESS",
    preset: "Apple Style",
    time: "2 min ago",
    gradient: "from-gray-400/20 to-zinc-500/20",
  },
  {
    id: "2",
    status: "SUCCESS",
    preset: "Cinematic Light",
    time: "15 min ago",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "3",
    status: "PROCESSING",
    preset: "Korean Commercial",
    time: "Just now",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "4",
    status: "SUCCESS",
    preset: "Luxury Rim Light",
    time: "1 hour ago",
    gradient: "from-indigo/20 to-purple-500/20",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back! Here&apos;s your generation overview.
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button className="bg-gradient-to-r from-indigo to-violet hover:opacity-90 text-white shadow-lg shadow-indigo/25 rounded-xl group">
            <Plus className="mr-2 h-4 w-4" />
            New Generation
            <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-indigo/20 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {stat.title}
                      </p>
                      <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center ${stat.iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Free Tier Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium">Daily Free Generations</h3>
                <p className="text-xs text-muted-foreground">
                  2 of 3 used today
                </p>
              </div>
              <Badge className="bg-indigo/20 text-indigo border-indigo/30">
                Free Tier
              </Badge>
            </div>
            <Progress value={66} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Resets in 8 hours.{" "}
              <Link href="#" className="text-indigo hover:underline">
                Upgrade to Pro
              </Link>{" "}
              for unlimited.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Generations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-[family-name:var(--font-space-grotesk)] text-lg">
                Recent Generations
              </CardTitle>
              <Link
                href="/dashboard/history"
                className="text-xs text-indigo hover:underline"
              >
                View All →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recentGenerations.map((gen) => (
                <div
                  key={gen.id}
                  className="group relative rounded-xl overflow-hidden border border-border hover:border-indigo/30 transition-all cursor-pointer"
                >
                  <div
                    className={`aspect-square bg-gradient-to-br ${gen.gradient}`}
                  />
                  <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div>
                      <p className="text-xs text-white font-medium">
                        {gen.preset}
                      </p>
                      <p className="text-[10px] text-white/70">{gen.time}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge
                      className={`text-[10px] px-1.5 py-0 ${
                        gen.status === "SUCCESS"
                          ? "bg-success/20 text-success border-success/30"
                          : gen.status === "PROCESSING"
                          ? "bg-indigo/20 text-indigo border-indigo/30 animate-pulse"
                          : "bg-error/20 text-error border-error/30"
                      }`}
                    >
                      {gen.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
