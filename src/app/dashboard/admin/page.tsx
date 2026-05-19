"use client";

import { motion } from "framer-motion";
import {
  Users,
  Image,
  Server,
  Activity,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  Check,
  X,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const adminStats = [
  { title: "Total Users", value: "1,247", change: "+23 today", icon: Users, gradient: "from-indigo/20 to-violet/20", iconColor: "text-indigo" },
  { title: "Total Generations", value: "45,892", change: "+342 today", icon: Image, gradient: "from-violet/20 to-purple/20", iconColor: "text-violet" },
  { title: "Active Providers", value: "4/5", change: "1 offline", icon: Server, gradient: "from-emerald-500/20 to-green-500/20", iconColor: "text-emerald-400" },
  { title: "System Health", value: "99.8%", change: "Uptime", icon: Activity, gradient: "from-amber-500/20 to-yellow-500/20", iconColor: "text-amber-400" },
];

const mockUsers = [
  { id: "1", name: "Sarah Chen", email: "sarah@luxbrand.co", role: "USER", status: "ACTIVE", generations: 89, joined: "2024-01-15" },
  { id: "2", name: "Marcus Rivera", email: "marcus@pixel.studio", role: "USER", status: "ACTIVE", generations: 234, joined: "2024-02-01" },
  { id: "3", name: "Priya Sharma", email: "priya@shopvibe.com", role: "ADMIN", status: "ACTIVE", generations: 156, joined: "2024-01-20" },
  { id: "4", name: "John Doe", email: "john@example.com", role: "USER", status: "SUSPENDED", generations: 12, joined: "2024-03-10" },
];

const mockProviders = [
  { name: "Pollinations", code: "pollinations", enabled: true, priority: 1, status: "Online" },
  { name: "NVIDIA NIMs", code: "nvidia", enabled: true, priority: 2, status: "Online" },
  { name: "HuggingFace", code: "huggingface", enabled: true, priority: 3, status: "Online" },
  { name: "TogetherAI", code: "togetherai", enabled: true, priority: 4, status: "Online" },
  { name: "Local Models", code: "local", enabled: false, priority: 5, status: "Offline" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold">
          Admin Panel
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage users, providers, and monitor platform analytics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border">
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

      {/* Tabs */}
      <Tabs defaultValue="users">
        <TabsList className="bg-secondary/50 p-1">
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg"
          >
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger
            value="providers"
            className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg"
          >
            <Server className="h-4 w-4 mr-2" />
            Providers
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">User Management</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10 rounded-xl bg-secondary border-border text-sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Generations</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-indigo to-violet text-white text-xs">
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.role === "ADMIN"
                              ? "bg-indigo/20 text-indigo border-indigo/30"
                              : "bg-secondary text-muted-foreground"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === "ACTIVE"
                              ? "bg-success/20 text-success border-success/30"
                              : "bg-error/20 text-error border-error/30"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {user.generations}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.joined}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Providers Tab */}
        <TabsContent value="providers" className="mt-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-base">Provider Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProviders.map((provider) => (
                  <div
                    key={provider.code}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          provider.enabled ? "bg-success" : "bg-muted-foreground"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium">{provider.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Priority: {provider.priority} · {provider.status}
                        </p>
                      </div>
                    </div>
                    <Switch checked={provider.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-indigo" />
                  Generation Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder chart area */}
                <div className="h-48 bg-secondary/30 rounded-xl flex items-center justify-center border border-dashed border-border">
                  <p className="text-sm text-muted-foreground">
                    📊 Chart coming with backend integration
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-violet" />
                  Provider Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Pollinations", pct: 45 },
                    { name: "NVIDIA NIMs", pct: 30 },
                    { name: "HuggingFace", pct: 15 },
                    { name: "TogetherAI", pct: 10 },
                  ].map((p) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{p.name}</span>
                        <span className="font-medium">{p.pct}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo to-violet rounded-full transition-all"
                          style={{ width: `${p.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
