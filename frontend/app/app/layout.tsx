"use client"

import type React from "react"

import { AppSidebar } from "@/components/app/sidebar"
import { TopBar } from "@/components/app/topbar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar className="hidden lg:flex" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
