"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Box,
  Activity,
  Settings,
  BookOpen,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Box, label: "Models" },
  { icon: Activity, label: "APIs" },
  { icon: Settings, label: "Settings" },
  { icon: BookOpen, label: "Docs" },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] text-[#999] backdrop-blur-xl transition-colors hover:border-[#333] hover:text-white lg:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-5 top-5 z-40 flex h-[calc(100vh-40px)] w-[260px] flex-col rounded-[24px] border border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_32px_rgba(0,0,0,0.4)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-x-0" : "-translate-x-[calc(100%+40px)]",
          "lg:translate-x-0 lg:static lg:z-auto lg:h-[calc(100vh-40px)]",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#050505]">
              <path d="M12 2L4 7v10l8 5 8-5V7L12 2z" fill="currentColor" opacity="0.9" />
              <path d="M12 8L8 10.5v5L12 18l4-2.5v-5L12 8z" fill="#050505" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
            Funic X
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={[
                "group flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-[14px] font-medium transition-all duration-200",
                item.active
                  ? "bg-white text-[#050505]"
                  : "text-[#888] hover:bg-[#111] hover:text-white",
              ].join(" ")}
            >
              <item.icon
                size={17}
                className={item.active ? "text-[#050505]" : "text-[#666] group-hover:text-[#aaa]"}
              />
              {item.label}
              {item.active && (
                <ChevronRight size={14} className="ml-auto opacity-60" />
              )}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />

        {/* User profile */}
        <div className="flex items-center gap-3 rounded-[14px] px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#111] text-[12px] font-semibold text-[#aaa] ring-1 ring-[#1a1a1a]">
            D
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="truncate text-[13px] font-medium text-white">Developer</div>
            <div className="truncate text-[11px] text-[#666]">dev@funicx.app</div>
          </div>
        </div>
      </aside>
    </>
  );
}
