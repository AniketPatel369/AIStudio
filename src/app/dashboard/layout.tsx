"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Create", href: "/dashboard/create", icon: Sparkles },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync user with backend
  useEffect(() => {
    if (session?.user) {
      api.get('/user/profile').catch(console.error);
    }
  }, [session]);

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-[#111827] border-r border-border">
        <div className="flex flex-col flex-1 p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 px-2 mb-8">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo to-violet flex items-center justify-center shadow-lg shadow-indigo/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
              AI<span className="gradient-text">Studio</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                      ? "bg-indigo/15 text-indigo border border-indigo/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  {link.label === "Create" && (
                    <Badge className="ml-auto bg-indigo/20 text-indigo border-indigo/30 text-[10px] px-1.5">
                      New
                    </Badge>
                  )}
                </Link>
              );
            })}

            <Separator className="my-4 bg-border" />

            {/* Admin link */}
            <Link
              href="/dashboard/admin"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname === "/dashboard/admin"
                  ? "bg-indigo/15 text-indigo border border-indigo/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              <Shield className="h-4 w-4" />
              Admin Panel
            </Link>
          </nav>

          {/* User Section */}
          <div className="mt-auto">
            <Separator className="mb-4 bg-border" />
            <div className="flex items-center gap-3 p-2">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarImage src={user?.image || ""} />
                <AvatarFallback className="bg-gradient-to-br from-indigo to-violet text-white text-xs font-semibold">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || "Loading..."}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 glass-strong">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo to-violet flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
              AI<span className="gradient-text">Studio</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-border p-4 flex flex-col"
            >
              <nav className="mt-14 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                          ? "bg-indigo/15 text-indigo"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                      <ChevronRight className="h-3 w-3 ml-auto opacity-50" />
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile User Section */}
              <div className="mt-auto">
                <Separator className="mb-4 bg-border" />
                <div className="flex items-center gap-3 p-2">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo to-violet text-white text-xs font-semibold">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email || "Loading..."}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        <div className="pt-14 lg:pt-0">
          <div className="p-6 lg:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
