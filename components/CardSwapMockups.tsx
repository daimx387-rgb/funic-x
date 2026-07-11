/* ======================================================================= */
/*  CardSwapMockups — premium monochrome SaaS "screenshots" (inline SVG)   */
/*  OpenAI / Linear / Vercel / Stripe / Framer / Apple inspired.            */
/*  Always light-themed product UI (matches white cards).                  */
/* ======================================================================= */

const INK = "#0a0a0a";
const INK_SOFT = "#525252";
const INK_MUTE = "#9ca3af";
const LINE = "#ececec";
const LINE_SOFT = "#f4f4f5";
const SURFACE = "#fafafa";
const PAPER = "#ffffff";
const PURPLE = "#6d4aff";

const Shot = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 560 320"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block", width: "100%", height: "100%" }}
  >
    <rect width="560" height="320" fill={PAPER} />
    {children}
  </svg>
);

/* ----------------------------------------------------------------------- */
/*  1. AI Chat Assistant — OpenAI-style conversation panel                  */
/* ----------------------------------------------------------------------- */
export const ChatAssistantShot = () => (
  <Shot>
    {/* sidebar */}
    <rect x="0" y="0" width="96" height="320" fill={SURFACE} />
    <rect x="95.5" y="0" width="1" height="320" fill={LINE} />
    {/* logo */}
    <rect x="16" y="18" width="22" height="22" rx="7" fill={INK} />
    <circle cx="27" cy="29" r="4.5" fill={PAPER} opacity="0.95" />
    <text x="46" y="33" fontFamily="Inter,system-ui,sans-serif" fontSize="12" fontWeight="600" fill={INK}>Assistant</text>
    {/* new chat pill */}
    <rect x="16" y="52" width="64" height="24" rx="12" fill={INK} />
    <path d="M30 64h24M42 58v12" stroke={PAPER} strokeWidth="1.4" strokeLinecap="round" />
    {/* conversation items */}
    <rect x="12" y="92" width="72" height="26" rx="7" fill={PAPER} />
    <rect x="20" y="101" width="40" height="3" rx="1.5" fill={INK_SOFT} />
    <rect x="20" y="108" width="28" height="2.5" rx="1.25" fill={INK_MUTE} />
    <rect x="12" y="122" width="72" height="26" rx="7" fill="transparent" />
    <rect x="20" y="131" width="32" height="3" rx="1.5" fill={INK_MUTE} />
    <rect x="20" y="138" width="22" height="2.5" rx="1.25" fill={INK_MUTE} opacity="0.7" />
    <rect x="12" y="152" width="72" height="26" rx="7" fill="transparent" />
    <rect x="20" y="161" width="36" height="3" rx="1.5" fill={INK_MUTE} opacity="0.8" />
    <rect x="20" y="168" width="24" height="2.5" rx="1.25" fill={INK_MUTE} opacity="0.6" />
    {/* bottom avatar */}
    <circle cx="27" cy="296" r="11" fill={INK} />
    <text x="27" y="300" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9" fontWeight="600" fill={PAPER}>JD</text>

    {/* main top bar */}
    <rect x="96" y="0" width="464" height="44" fill={PAPER} />
    <rect x="96" y="43.5" width="464" height="1" fill={LINE} />
    <circle cx="116" cy="22" r="5" fill={PURPLE} opacity="0.9" />
    <text x="128" y="26" fontFamily="Inter,system-ui,sans-serif" fontSize="12.5" fontWeight="600" fill={INK}>GPT-4o</text>
    <path d="M168 23l4 4 4-4" stroke={INK_MUTE} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="478" cy="22" r="9" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <path d="M474 22h8M478 18v8" stroke={INK_SOFT} strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="508" cy="22" r="9" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <path d="M504 24c1-3 3-4 4-4s3 1 4 4" stroke={INK_SOFT} strokeWidth="1.3" fill="none" strokeLinecap="round" />
    <circle cx="508" cy="19.5" r="1" fill={INK_SOFT} />

    {/* user message — right aligned */}
    <rect x="318" y="62" width="220" height="46" rx="14" fill="#f4f4f5" />
    <rect x="332" y="74" width="160" height="3.5" rx="1.75" fill={INK_SOFT} />
    <rect x="332" y="83" width="120" height="3.5" rx="1.75" fill={INK_SOFT} opacity="0.75" />
    <rect x="332" y="92" width="64" height="3.5" rx="1.75" fill={INK_SOFT} opacity="0.55" />

    {/* ai response — left */}
    <circle cx="124" cy="138" r="12" fill={INK} />
    <path d="M124 133l4 2.3v4.4l-4 2.3-4-2.3v-4.4z" fill={PURPLE} opacity="0.95" />
    <rect x="144" y="126" width="200" height="3.5" rx="1.75" fill={INK} />
    <rect x="144" y="135" width="240" height="3.5" rx="1.75" fill={INK_SOFT} />
    <rect x="144" y="144" width="210" height="3.5" rx="1.75" fill={INK_SOFT} opacity="0.85" />
    <rect x="144" y="153" width="150" height="3.5" rx="1.75" fill={INK_SOFT} opacity="0.7" />
    {/* purple accent underline */}
    <rect x="144" y="150" width="90" height="6" rx="3" fill={PURPLE} opacity="0.16" />
    {/* small code chip */}
    <rect x="144" y="166" width="92" height="20" rx="6" fill="#f6f5ff" />
    <text x="152" y="180" fontFamily="ui-monospace,monospace" fontSize="8.5" fontWeight="500" fill={PURPLE}>generateEmbedding</text>

    {/* input bar */}
    <rect x="116" y="250" width="424" height="44" rx="22" fill="#fafafa" stroke={LINE} strokeWidth="1" />
    <rect x="132" y="266" width="180" height="3.5" rx="1.75" fill={INK_MUTE} />
    <rect x="132" y="274" width="0.5" height="10" fill={PURPLE}>
      <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
    </rect>
    {/* attachments */}
    <circle cx="510" cy="272" r="9" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <path d="M506 274c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5M506 270v4h4" stroke={INK_MUTE} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    {/* send button — purple */}
    <circle cx="526" cy="272" r="14" fill={PURPLE} />
    <path d="M526 265l5.5 11-5.5-2.6-5.5 2.6z" fill={PAPER} />
  </Shot>
);

/* ----------------------------------------------------------------------- */
/*  2. Workflow Automation — node editor canvas                            */
/* ----------------------------------------------------------------------- */
export const WorkflowAutomationShot = () => (
  <Shot>
    <defs>
      <pattern id="dmGrid" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.9" fill="#e6e6e6" />
      </pattern>
    </defs>
    {/* top toolbar */}
    <rect x="0" y="0" width="560" height="40" fill={PAPER} />
    <rect x="0" y="39.5" width="560" height="1" fill={LINE} />
    <rect x="16" y="12" width="18" height="18" rx="9" fill={INK} />
    <text x="42" y="26" fontFamily="Inter,system-ui,sans-serif" fontSize="12" fontWeight="600" fill={INK}>Workflows</text>
    <path d="M104 22l3 3 3-3" stroke={INK_MUTE} strokeWidth="1.3" fill="none" strokeLinecap="round" />
    <text x="118" y="26" fontFamily="Inter,system-ui,sans-serif" fontSize="11.5" fill={INK_SOFT}>Lead Enrichment</text>
    {/* save pill */}
    <rect x="470" y="11" width="74" height="20" rx="10" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="507" y="25" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill={INK_SOFT}>Draft</text>
    {/* run button */}
    <rect x="494" y="0" width="0" height="0" />
    <rect x="396" y="11" width="64" height="20" rx="10" fill={INK} />
    <path d="M406 16l7 5-7 5z" fill={PAPER} />
    <text x="418" y="25" fontFamily="Inter,system-ui,sans-serif" fontSize="9.5" fontWeight="600" fill={PAPER}>Run</text>

    {/* canvas */}
    <rect x="0" y="40" width="560" height="280" fill={PAPER} />
    <rect x="0" y="40" width="560" height="280" fill="url(#dmGrid)" />

    {/* connection lines */}
    <path d="M120 120 C 190 120 175 168 250 168" stroke={INK_MUTE} strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M308 168 C 360 168 360 120 410 120" stroke={INK_MUTE} strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M440 144 C 440 190 360 210 308 230" stroke={INK_MUTE} strokeWidth="1.5" fill="none" opacity="0.5" />

    {/* node 1 — Trigger */}
    <rect x="62" y="96" width="58" height="48" rx="12" fill={PAPER} stroke={LINE} strokeWidth="1" />
    <rect x="74" y="108" width="22" height="22" rx="7" fill={INK} />
    <path d="M79 119l8-4 8 4-8 4z" fill={PAPER} />
    <circle cx="116" cy="138" r="2.6" fill={PURPLE} opacity="0.85" />

    {/* node 2 — AI */}
    <rect x="250" y="144" width="58" height="48" rx="12" fill={PAPER} stroke={LINE} strokeWidth="1" />
    <rect x="262" y="156" width="22" height="22" rx="7" fill={INK} />
    <path d="M273 160l1.6 3.4 3.4 1.6-3.4 1.6L273 174l-1.6-3.4-3.4-1.6 3.4-1.6z" fill={PURPLE} />
    <circle cx="304" cy="186" r="2.6" fill={INK} opacity="0.7" />

    {/* node 3 — Output */}
    <rect x="410" y="96" width="58" height="48" rx="12" fill={PAPER} stroke={LINE} strokeWidth="1" />
    <rect x="422" y="108" width="22" height="22" rx="7" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <path d="M427 120h12M427 117h9" stroke={INK_SOFT} strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="464" cy="138" r="2.6" fill={INK} opacity="0.7" />

    {/* node 4 — Filter */}
    <rect x="250" y="216" width="58" height="48" rx="12" fill={PAPER} stroke={LINE} strokeWidth="1" />
    <rect x="262" y="228" width="22" height="22" rx="7" fill={INK} />
    <path d="M267 233h13l-4 5v6l-2 1 0-7z" fill={PAPER} opacity="0.95" />

    {/* node labels */}
    <text x="91" y="160" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill={INK_SOFT}>Webhook</text>
    <text x="279" y="208" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill={INK_SOFT}>GPT-4</text>
    <text x="439" y="160" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill={INK_SOFT}>Notify</text>
    <text x="279" y="280" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="9.5" fontWeight="500" fill={INK_SOFT}>Filter</text>

    {/* status badge bottom-left */}
    <rect x="16" y="296" width="86" height="18" rx="9" fill={PAPER} stroke={LINE} strokeWidth="1" />
    <circle cx="27" cy="305" r="3" fill={PURPLE} />
    <text x="38" y="308" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5" fontWeight="500" fill={INK_SOFT}>Automated</text>
  </Shot>
);

/* ----------------------------------------------------------------------- */
/*  3. Analytics Dashboard — KPIs + line + bar charts                      */
/* ----------------------------------------------------------------------- */
export const AnalyticsDashboardShot = () => (
  <Shot>
    <defs>
      <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={INK} stopOpacity="0.14" />
        <stop offset="100%" stopColor={INK} stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* top header */}
    <text x="16" y="26" fontFamily="Inter,system-ui,sans-serif" fontSize="13" fontWeight="600" fill={INK}>Revenue</text>
    <rect x="486" y="14" width="58" height="18" rx="9" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="515" y="26" textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5" fontWeight="500" fill={INK_SOFT}>30 days</text>
    <path d="M496 23l3 3 3-3" stroke={INK_MUTE} strokeWidth="1.2" fill="none" strokeLinecap="round" />

    {/* KPI row */}
    <rect x="16" y="40" width="168" height="46" rx="10" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="28" y="58" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="0.1em" fill={INK_MUTE}>TOTAL REVENUE</text>
    <text x="28" y="76" fontFamily="Inter,system-ui,sans-serif" fontSize="17" fontWeight="700" fill={INK}>$48,290</text>
    <path d="M148 55l5-5 5 5h-3v6h-4v-6z" fill={INK} />
    <text x="172" y="58" fontFamily="ui-monospace,monospace" fontSize="8" fontWeight="500" textAnchor="end" fill={INK_SOFT}>12.4%</text>

    <rect x="196" y="40" width="168" height="46" rx="10" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="208" y="58" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="0.1em" fill={INK_MUTE}>ACTIVE USERS</text>
    <text x="208" y="76" fontFamily="Inter,system-ui,sans-serif" fontSize="17" fontWeight="700" fill={INK}>12,847</text>
    <path d="M328 55l5-5 5 5h-3v6h-4v-6z" fill={INK} />
    <text x="352" y="58" fontFamily="ui-monospace,monospace" fontSize="8" fontWeight="500" textAnchor="end" fill={INK_SOFT}>3.2%</text>

    <rect x="376" y="40" width="168" height="46" rx="10" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="388" y="58" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="0.1em" fill={INK_MUTE}>CONVERSION</text>
    <text x="388" y="76" fontFamily="Inter,system-ui,sans-serif" fontSize="17" fontWeight="700" fill={INK}>3.42%</text>
    <path d="M508 61l5 5 5-5h-3v-6h-4v6z" fill={INK_MUTE} />
    <text x="532" y="58" fontFamily="ui-monospace,monospace" fontSize="8" fontWeight="500" textAnchor="end" fill={INK_MUTE}>0.4%</text>

    {/* main chart card */}
    <rect x="16" y="100" width="360" height="204" rx="12" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="32" y="122" fontFamily="Inter,system-ui,sans-serif" fontSize="11" fontWeight="600" fill={INK}>Revenue trend</text>
    {/* gridlines */}
    <line x1="32" y1="150" x2="360" y2="150" stroke={LINE} strokeWidth="1" />
    <line x1="32" y1="180" x2="360" y2="180" stroke={LINE} strokeWidth="1" />
    <line x1="32" y1="210" x2="360" y2="210" stroke={LINE} strokeWidth="1" />
    <line x1="32" y1="240" x2="360" y2="240" stroke={LINE} strokeWidth="1" />
    {/* area + line */}
    <path d="M32 230 C 70 232 90 205 120 200 S 170 175 200 185 S 240 150 270 140 S 320 120 360 145 L 360 260 L 32 260 Z" fill="url(#areaFill)" />
    <path d="M32 230 C 70 232 90 205 120 200 S 170 175 200 185 S 240 150 270 140 S 320 120 360 145" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* data points */}
    <circle cx="120" cy="200" r="2.6" fill={INK} />
    <circle cx="200" cy="185" r="2.6" fill={INK} />
    <circle cx="270" cy="140" r="3.2" fill={PAPER} stroke={INK} strokeWidth="2" />
    <circle cx="360" cy="145" r="2.6" fill={INK} />
    {/* x labels */}
    <text x="32" y="298" fontFamily="ui-monospace,monospace" fontSize="7.5" fill={INK_MUTE}>W1</text>
    <text x="120" y="298" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7.5" fill={INK_MUTE}>W2</text>
    <text x="200" y="298" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7.5" fill={INK_MUTE}>W3</text>
    <text x="270" y="298" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7.5" fill={INK_MUTE}>W4</text>
    <text x="360" y="298" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="7.5" fill={INK_MUTE}>W5</text>

    {/* side breakdown card */}
    <rect x="392" y="100" width="152" height="204" rx="12" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="406" y="122" fontFamily="Inter,system-ui,sans-serif" fontSize="10.5" fontWeight="600" fill={INK}>Top channels</text>
    {/* bars */}
    {[
      { y: 138, w: 110, l: "Direct" },
      { y: 168, w: 78, l: "Organic" },
      { y: 198, w: 64, l: "Referral" },
      { y: 228, w: 40, l: "Email" },
    ].map((b, i) => (
      <g key={i}>
        <text x="406" y={b.y - 6} fontFamily="Inter,system-ui,sans-serif" fontSize="8.5" fill={INK_SOFT}>{b.l}</text>
        <rect x="406" y={b.y} width={b.w} height="9" rx="4.5" fill={INK} opacity={0.95 - i * 0.16} />
        <text x="536" y={b.y - 6} textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="8" fill={INK_MUTE}>{b.w}%</text>
      </g>
    ))}
    <line x1="406" y1="262" x2="530" y2="262" stroke={LINE} strokeWidth="1" />
    <text x="406" y="284" fontFamily="ui-monospace,monospace" fontSize="8" fill={INK_MUTE}>CHART · LIVE</text>
    <circle cx="528" cy="281" r="2.4" fill={PURPLE} opacity="0.9" />
  </Shot>
);

/* ----------------------------------------------------------------------- */
/*  4. Multi-Agent System — orchestration panel                            */
/* ----------------------------------------------------------------------- */
export const MultiAgentSystemShot = () => (
  <Shot>
    {/* top header */}
    <rect x="0" y="0" width="560" height="40" fill={PAPER} />
    <rect x="0" y="39.5" width="560" height="1" fill={LINE} />
    <rect x="16" y="11" width="18" height="18" rx="9" fill={INK} />
    <path d="M25 16v8M21 20h8" stroke={PAPER} strokeWidth="1.3" strokeLinecap="round" />
    <text x="42" y="25" fontFamily="Inter,system-ui,sans-serif" fontSize="12" fontWeight="600" fill={INK}>Agents</text>
    <rect x="468" y="12" width="76" height="18" rx="9" fill="#f4f4f5" />
    <circle cx="478" cy="21" r="3" fill={PURPLE} />
    <text x="487" y="24" fontFamily="Inter,system-ui,sans-serif" fontSize="8.5" fontWeight="500" fill={INK_SOFT}>4 active</text>

    {/* orchestrator rail */}
    <rect x="16" y="52" width="528" height="34" rx="10" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <rect x="28" y="60" width="18" height="18" rx="6" fill={INK} />
    <path d="M37 64l2 3 3 1-3 1-2 3-2-3-3-1 3-1z" fill={PURPLE} />
    <text x="54" y="73" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fontWeight="600" fill={INK}>Orchestrator</text>
    <text x="142" y="73" fontFamily="ui-monospace,monospace" fontSize="8" fill={INK_MUTE}>routing · 6 tasks</text>
    {/* mini progress */}
    <rect x="400" y="66" width="128" height="6" rx="3" fill={LINE} />
    <rect x="400" y="66" width="92" height="6" rx="3" fill={INK} />

    {/* agent grid 2 x 3 */}
    {[
      { x: 16,  y: 98,  name: "Atlas", role: "Research", active: true,  pct: 78 },
      { x: 196, y: 98,  name: "Nova",  role: "Writer",   active: true,  pct: 54 },
      { x: 376, y: 98,  name: "Orion",  role: "Analyst", active: true,  pct: 92 },
      { x: 16,  y: 166, name: "Vega",  role: "QA",      active: false, pct: 30 },
      { x: 196, y: 166, name: "Echo",  role: "Support", active: true,  pct: 66 },
      { x: 376, y: 166, name: "Lumen", role: "Coder",   active: false, pct: 12 },
    ].map((a, i) => (
      <g key={i}>
        <rect x={a.x} y={a.y} width="168" height="62" rx="12" fill={PAPER} stroke={LINE} strokeWidth="1" />
        {/* avatar */}
        <rect x={a.x + 12} y={a.y + 12} width="22" height="22" rx="7" fill={a.active ? INK : SURFACE} stroke={a.active ? "none" : LINE} strokeWidth="1" />
        <text x={a.x + 23} y={a.y + 27} textAnchor="middle" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fontWeight="600" fill={a.active ? PAPER : INK_SOFT}>{a.name[0]}</text>
        {/* name + role */}
        <text x={a.x + 42} y={a.y + 24} fontFamily="Inter,system-ui,sans-serif" fontSize="10.5" fontWeight="600" fill={INK}>{a.name}</text>
        <text x={a.x + 42} y={a.y + 35} fontFamily="Inter,system-ui,sans-serif" fontSize="8.5" fill={INK_MUTE}>{a.role}</text>
        {/* status dot */}
        <circle cx={a.x + 42} cy={a.y + 44} r="2.6" fill={a.active ? PURPLE : "none"} stroke={a.active ? "none" : INK_MUTE} strokeWidth="1.2" />
        <text x={a.x + 50} y={a.y + 47} fontFamily="ui-monospace,monospace" fontSize="7.5" fill={INK_SOFT}>{a.active ? "active" : "idle"}</text>
        {/* progress */}
        <rect x={a.x + 96} y={a.y + 44} width="60" height="4" rx="2" fill={LINE} />
        <rect x={a.x + 96} y={a.y + 44} width={Math.round(60 * a.pct / 100)} height="4" rx="2" fill={a.active ? INK : INK_MUTE} opacity={a.active ? 0.95 : 0.5} />
      </g>
    ))}

    {/* footer status bar */}
    <rect x="16" y="240" width="528" height="64" rx="12" fill={SURFACE} stroke={LINE} strokeWidth="1" />
    <text x="32" y="262" fontFamily="Inter,system-ui,sans-serif" fontSize="10" fontWeight="600" fill={INK}>System health</text>
    <circle cx="32" cy="278" r="3" fill={PURPLE} />
    <text x="42" y="281" fontFamily="ui-monospace,monospace" fontSize="8.5" fill={INK_SOFT}>All systems operational</text>
    {/* mini sparkline */}
    <path d="M430 286 C 446 286 452 268 464 268 S 484 290 498 278 S 510 270 524 272" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <text x="524" y="298" textAnchor="end" fontFamily="ui-monospace,monospace" fontSize="7.5" fill={INK_MUTE}>99.98%</text>
  </Shot>
);