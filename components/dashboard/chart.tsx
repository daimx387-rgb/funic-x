"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";

const HOURS = ["00:00", "06:00", "12:00", "18:00", "24:00"];

const data = [
  420, 380, 520, 480, 680, 590, 720, 650, 830, 760, 910, 850,
  980, 900, 1050, 970, 1100, 1020, 1180, 1090, 1240, 1150, 1310, 1220,
  1380, 1290, 1420, 1350, 1480, 1400, 1520, 1460, 1580, 1500, 1620, 1550,
  1680, 1600, 1720, 1650, 1760, 1700, 1800, 1740, 1820, 1770, 1860, 1810,
];

const CHART_W = 960;
const CHART_H = 260;
const PAD_L = 42;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 28;

function buildPath(values: number[]) {
  const w = CHART_W - PAD_L - PAD_R;
  const h = CHART_H - PAD_T - PAD_B;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);

  const points = values.map((v, i) => {
    const x = PAD_L + i * stepX;
    const y = PAD_T + h - ((v - min) / range) * h;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  });

  return points.join(" ");
}

function buildArea(values: number[]) {
  const w = CHART_W - PAD_L - PAD_R;
  const h = CHART_H - PAD_T - PAD_B;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = w / (values.length - 1);

  const line = values
    .map((v, i) => {
      const x = PAD_L + i * stepX;
      const y = PAD_T + h - ((v - min) / range) * h;
      return `${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" L ");

  const lastX = PAD_L + (values.length - 1) * stepX;
  const baseline = PAD_T + h;
  return `M ${PAD_L.toFixed(1)} ${baseline.toFixed(1)} L ${line} L ${lastX.toFixed(1)} ${baseline.toFixed(1)} Z`;
}

const pathD = buildPath(data);
const areaD = buildArea(data);

const yTicks = [0, 500, 1000, 1500, 2000];

export function Chart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chart-line",
        { strokeDasharray: 2000, strokeDashoffset: 2000 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
            onEnter: () => setAnimated(true),
          },
        }
      );
      gsap.fromTo(
        ".chart-area",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.8,
          ease: "power2.in",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="overflow-hidden rounded-[22px] border border-[#1a1a1a] bg-[#0a0a0a] p-7"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold text-white">
            Inference Traffic
          </div>
          <div className="mt-0.5 text-[12px] text-[#666]">
            Requests per hour
          </div>
        </div>
        <div className="flex gap-1.5">
          {["24h", "7d", "30d"].map((range, i) => (
            <button
              key={range}
              className={`rounded-[10px] px-3 py-1.5 text-[12px] font-medium transition-all ${
                i === 0
                  ? "bg-white text-[#050505]"
                  : "bg-[#111] text-[#888] hover:bg-[#1a1a1a] hover:text-[#aaa]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="h-[260px] w-full min-w-[600px]"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.12" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick) => {
            const y =
              PAD_T +
              (CHART_H - PAD_T - PAD_B) * (1 - tick / 2000);
            return (
              <g key={tick}>
                <line
                  x1={PAD_L}
                  y1={y}
                  x2={CHART_W - PAD_R}
                  y2={y}
                  stroke="#1a1a1a"
                  strokeWidth="0.5"
                  strokeDasharray="3 3"
                />
                <text
                  x={PAD_L - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#555"
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                >
                  {tick.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Area */}
          <path d={areaD} fill="url(#areaGrad)" className="chart-area" />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line"
          />

          {/* Glow under line */}
          <path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.08"
            className="chart-line"
          />

          {/* Active dot */}
          {animated && data.length > 0 && (
            <ActiveDot data={data} />
          )}
        </svg>
      </div>

      {/* X-axis labels */}
      <div className="mt-2 flex justify-between px-[42px] pr-[16px]">
        {HOURS.map((h) => (
          <span key={h} className="text-[10px] text-[#555]">
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ActiveDot({ data }: { data: number[] }) {
  const w = CHART_W - PAD_L - PAD_R;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = CHART_H - PAD_T - PAD_B;
  const stepX = w / (data.length - 1);
  const lastIdx = data.length - 1;
  const cx = PAD_L + lastIdx * stepX;
  const cy = PAD_T + h - ((data[lastIdx] - min) / range) * h;

  return (
    <circle cx={cx} cy={cy} r="4" fill="white">
      <animate
        attributeName="r"
        values="4;7;4"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="1;0.3;1"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  );
}
