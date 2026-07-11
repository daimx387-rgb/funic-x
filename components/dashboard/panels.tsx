"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  HardDrive,
  MemoryStick,
  Box,
  Circle,
} from "lucide-react";

/* ==================== Panel wrapper ==================== */
function Panel({
  title,
  subtitle,
  children,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      className="overflow-hidden rounded-[22px] border border-[#1a1a1a] bg-[#0a0a0a] p-7 transition-all duration-500 hover:border-[#2a2a2a]"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold text-white">{title}</div>
          {subtitle && (
            <div className="mt-0.5 text-[12px] text-[#666]">{subtitle}</div>
          )}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

/* ==================== Recent Activity ==================== */
const activities = [
  { action: "Model deployed", target: "GPT-4o Turbo", time: "2 min ago", status: "success" },
  { action: "API key rotated", target: "production-key-01", time: "14 min ago", status: "success" },
  { action: "Rate limit hit", target: "public-api", time: "28 min ago", status: "warning" },
  { action: "Fine-tuning complete", target: "claude-3-sonnet", time: "1 hr ago", status: "success" },
  { action: "New dataset uploaded", target: "training-v4.jsonl", time: "2 hr ago", status: "success" },
];

export function RecentActivity() {
  return (
    <Panel title="Recent Activity" subtitle="Last 24 hours" delay={0.1}>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-[14px] p-2.5 transition-colors hover:bg-[#0f0f0f]"
          >
            <div className="mt-0.5 flex-shrink-0">
              {a.status === "success" ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#0a0a0a] ring-1 ring-[#222]">
                  <CheckCircle2 size={14} className="text-[#999]" />
                </div>
              ) : (
                <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#0a0a0a] ring-1 ring-[#222]">
                  <AlertTriangle size={14} className="text-[#999]" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-white">{a.action}</div>
              <div className="text-[12px] text-[#888]">{a.target}</div>
            </div>
            <div className="flex-shrink-0 text-[11px] text-[#555]">{a.time}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ==================== API Status ==================== */
const endpoints = [
  { name: "Chat Completions", path: "/v1/chat", status: "operational", latency: 42 },
  { name: "Embeddings", path: "/v1/embeddings", status: "operational", latency: 18 },
  { name: "Fine-tuning", path: "/v1/fine-tunes", status: "degraded", latency: 120 },
  { name: "Models", path: "/v1/models", status: "operational", latency: 8 },
];

export function ApiStatus() {
  return (
    <Panel title="API Status" subtitle="6 endpoints monitored" delay={0.15}>
      <div className="space-y-3">
        {endpoints.map((ep) => (
          <div
            key={ep.path}
            className="flex items-center gap-3 rounded-[14px] p-2.5 transition-colors hover:bg-[#0f0f0f]"
          >
            <div
              className={`h-2 w-2 flex-shrink-0 rounded-full ${
                ep.status === "operational" ? "bg-white" : "bg-[#666]"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-white">{ep.name}</div>
              <div className="font-mono text-[11px] text-[#555]">{ep.path}</div>
            </div>
            <div className="flex items-center gap-3 text-right">
              <span
                className={`text-[11px] font-medium ${
                  ep.status === "operational" ? "text-[#888]" : "text-[#999]"
                }`}
              >
                {ep.status}
              </span>
              <span className="w-14 text-right font-mono text-[12px] tabular-nums text-[#666]">
                {ep.latency}ms
              </span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ==================== System Health ==================== */
const healthMetrics = [
  { label: "CPU", value: 32, icon: Cpu, unit: "%" },
  { label: "Memory", value: 68, icon: MemoryStick, unit: "%" },
  { label: "Disk", value: 45, icon: HardDrive, unit: "%" },
];

function HealthBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#111]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={`h-full rounded-full ${
          value > 80 ? "bg-[#999]" : value > 50 ? "bg-white" : "bg-white/70"
        }`}
      />
    </div>
  );
}

export function SystemHealth() {
  return (
    <Panel title="System Health" subtitle="Cluster status" delay={0.2}>
      <div className="space-y-6">
        {healthMetrics.map((m) => (
          <div key={m.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[#111] ring-1 ring-[#1a1a1a]">
                  <m.icon size={13} className="text-[#888]" />
                </div>
                <span className="text-[13px] font-medium text-white">{m.label}</span>
              </div>
              <span className="font-mono text-[13px] tabular-nums text-[#999]">
                {m.value}{m.unit}
              </span>
            </div>
            <HealthBar value={m.value} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ==================== Active Models ==================== */
const models = [
  { name: "GPT-4o", provider: "OpenAI", requests: "142K", status: "active" },
  { name: "Claude 3 Opus", provider: "Anthropic", requests: "98K", status: "active" },
  { name: "Gemini Pro", provider: "Google", requests: "56K", status: "idle" },
  { name: "Llama 3 70B", provider: "Meta", requests: "34K", status: "active" },
];

export function ActiveModels() {
  return (
    <Panel title="Active Models" subtitle="4 models running" delay={0.25}>
      <div className="space-y-3">
        {models.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-3 rounded-[14px] p-2.5 transition-colors hover:bg-[#0f0f0f]"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#111] ring-1 ring-[#1a1a1a]">
              <Box size={14} className="text-[#888]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium text-white">{m.name}</span>
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    m.status === "active" ? "bg-white" : "bg-[#444]"
                  }`}
                />
              </div>
              <div className="text-[11px] text-[#666]">{m.provider}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[12px] tabular-nums text-[#aaa]">
                {m.requests}
              </div>
              <div className="text-[10px] text-[#555]">requests</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
