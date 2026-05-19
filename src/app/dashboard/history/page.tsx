"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Heart,
  Copy,
  Maximize2,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockGenerations = [
  { id: "1", preset: "Apple Style + Softbox", status: "SUCCESS", time: "2 min ago", gradient: "from-gray-400/30 to-zinc-500/30", favorite: true },
  { id: "2", preset: "Cinematic + Rim Light", status: "SUCCESS", time: "15 min ago", gradient: "from-blue-500/20 to-indigo/20", favorite: false },
  { id: "3", preset: "Korean + Golden Hour", status: "SUCCESS", time: "1 hour ago", gradient: "from-pink-500/20 to-rose-500/20", favorite: true },
  { id: "4", preset: "Nike + Studio White", status: "FAILED", time: "2 hours ago", gradient: "from-red-500/20 to-orange-500/20", favorite: false },
  { id: "5", preset: "Minimal Luxury + Marble", status: "SUCCESS", time: "3 hours ago", gradient: "from-amber-500/20 to-yellow-500/20", favorite: false },
  { id: "6", preset: "Cyberpunk + Gradient", status: "SUCCESS", time: "5 hours ago", gradient: "from-violet-500/20 to-fuchsia-500/20", favorite: true },
  { id: "7", preset: "Festive + Fabric", status: "SUCCESS", time: "1 day ago", gradient: "from-orange-500/20 to-red-500/20", favorite: false },
  { id: "8", preset: "Apple + Macro", status: "SUCCESS", time: "1 day ago", gradient: "from-gray-300/20 to-white/10", favorite: false },
  { id: "9", preset: "Korean + Close-up", status: "REFUNDED", time: "2 days ago", gradient: "from-pink-300/20 to-blue-300/20", favorite: false },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredGenerations = mockGenerations.filter((gen) => {
    const matchesSearch = gen.preset.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || gen.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold">
          Generation History
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Browse and manage all your generated product photos.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search generations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl bg-secondary border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={(val) => val && setStatusFilter(val)}>
          <SelectTrigger className="w-full sm:w-40 rounded-xl bg-secondary border-border">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="SUCCESS">Success</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="REFUNDED">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filteredGenerations.map((gen, index) => (
          <motion.div
            key={gen.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-indigo/30 transition-all"
          >
            {/* Image placeholder */}
            <div
              className={`bg-gradient-to-br ${gen.gradient}`}
              style={{
                aspectRatio: index % 3 === 0 ? "3/4" : index % 3 === 1 ? "1/1" : "4/3",
              }}
            />

            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <Badge
                className={`text-[10px] px-1.5 ${
                  gen.status === "SUCCESS"
                    ? "bg-success/20 text-success border-success/30"
                    : gen.status === "FAILED"
                    ? "bg-error/20 text-error border-error/30"
                    : "bg-warning/20 text-warning border-warning/30"
                }`}
              >
                {gen.status}
              </Badge>
            </div>

            {/* Favorite */}
            <button className="absolute top-3 right-3">
              <Heart
                className={`h-4 w-4 transition-colors ${
                  gen.favorite
                    ? "fill-red-500 text-red-500"
                    : "text-white/50 hover:text-white"
                }`}
              />
            </button>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <p className="text-sm text-white font-medium mb-0.5">
                {gen.preset}
              </p>
              <p className="text-xs text-white/60 mb-3">{gen.time}</p>
              <div className="flex gap-1.5">
                <Button
                  size="sm"
                  className="h-7 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg flex-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  className="h-7 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  className="h-7 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  className="h-7 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGenerations.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No generations found</p>
        </div>
      )}
    </div>
  );
}
