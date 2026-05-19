"use client";

import { motion } from "framer-motion";
import { User, Bell, Shield, Trash2, Eye, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold">
          Account Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your profile, preferences, and account settings.
        </p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-indigo" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-border">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-gradient-to-br from-indigo to-violet text-white text-xl font-bold">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="rounded-xl">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input
                  defaultValue={user?.name || "User"}
                  className="mt-1.5 rounded-xl bg-secondary border-border"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input
                  defaultValue={user?.email || "user@example.com"}
                  disabled
                  className="mt-1.5 rounded-xl bg-secondary border-border opacity-60"
                />
              </div>
            </div>

            <Button className="bg-gradient-to-r from-indigo to-violet text-white rounded-xl">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Provider Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="h-4 w-4 text-violet" />
              Provider Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">
                Default Provider
              </Label>
              <Select defaultValue="pollinations">
                <SelectTrigger className="mt-1.5 rounded-xl bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pollinations">Pollinations</SelectItem>
                  <SelectItem value="nvidia">NVIDIA NIMs</SelectItem>
                  <SelectItem value="huggingface">HuggingFace</SelectItem>
                  <SelectItem value="togetherai">TogetherAI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                Default Model
              </Label>
              <Select defaultValue="flux-schnell">
                <SelectTrigger className="mt-1.5 rounded-xl bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flux-schnell">FLUX Schnell</SelectItem>
                  <SelectItem value="sdxl">SDXL</SelectItem>
                  <SelectItem value="juggernautxl">JuggernautXL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto-upscale</p>
                <p className="text-xs text-muted-foreground">
                  Automatically upscale generated images
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Generation Complete",
                desc: "Get notified when a generation finishes",
              },
              {
                title: "Daily Limit Reset",
                desc: "Alert when your daily limit resets",
              },
              {
                title: "Product Updates",
                desc: "New features and improvements",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="bg-card border-error/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-error">
              <Shield className="h-4 w-4" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. All your
              generations and data will be permanently removed.
            </p>
            <Button
              variant="outline"
              className="border-error/30 text-error hover:bg-error/10 rounded-xl"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
