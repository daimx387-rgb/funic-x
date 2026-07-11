"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Metrics } from "@/components/dashboard/metrics";
import { Chart } from "@/components/dashboard/chart";
import {
  RecentActivity,
  ApiStatus,
  SystemHealth,
  ActiveModels,
} from "@/components/dashboard/panels";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden px-6 pb-20 pt-24 lg:ml-[280px] lg:px-8 lg:pt-12">
        <div className="mx-auto max-w-[1400px] space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4"
          >
            <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-white">
              Overview
            </h1>
            <p className="mt-1 text-[14px] text-[#666]">
              Monitor your AI infrastructure in real time.
            </p>
          </motion.div>

          {/* Metric cards */}
          <Metrics />

          {/* Analytics chart */}
          <Chart />

          {/* Bottom panels — 2x2 grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentActivity />
            <ApiStatus />
            <SystemHealth />
            <ActiveModels />
          </div>
        </div>
      </main>
    </div>
  );
}
