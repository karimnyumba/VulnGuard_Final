"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Package, Users, ShoppingCart, DollarSign, BadgeDollarSign, Pill, Shield, AlertTriangle, FileCode, Database, Lock, Globe, Bug, Settings, Moon, Sun, ChevronRight, LogOut, Calendar, FileText, HelpCircle, User } from 'lucide-react'
import { useAuth } from "@/contexts/AuthContext"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarFooter,
  SidebarMenuBadge
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const { user } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("main")

  // Debug logging
  console.log("DashboardLayout - User:", user)
  console.log("DashboardLayout - User role:", user?.role)

  // Define navigation items with role-based visibility
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      showForAll: true
    },
    {
      title: "Scans",
      icon: Calendar,
      path: "/dashboard/inventory",
      showForAll: true
    },

    {
      title: "User Management",
      icon: Users,
      path: "/dashboard/users",
      showForAll: false, // Only show for admins
      adminOnly: true
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
      showForAll: true
    }
  ]

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => {
    if (item.showForAll) return true
    if (item.adminOnly && user?.role === 'ADMIN') return true
    return false
  })

  console.log("DashboardLayout - Filtered nav items:", filteredNavItems)

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className="flex h-screen w-full bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-blue-600">VulnGuard</span>
        </div>
        <nav className="flex-1 py-6 px-2">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium text-gray-700 transition
                      ${isActive ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500" : "hover:bg-gray-50"}
                    `}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-blue-500" : "text-gray-400"}`} />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-[#f8fafc] p-8 overflow-auto">{children}</main>
    </div>
  )
}
