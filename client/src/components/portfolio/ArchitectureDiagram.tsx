import { useState } from "react";
import { Server, ShieldAlert, Cpu, Database, Layout, RefreshCw, Network, HardDrive, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface DiagramNodeProps {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: React.ReactNode;
  detail: string;
  stats?: string;
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}

function DiagramNode({ id, x, y, label, icon, detail, stats, activeNode, setActiveNode }: DiagramNodeProps) {
  const isActive = activeNode === id;
  
  return (
    <g
      className="cursor-pointer"
      onMouseEnter={() => setActiveNode(id)}
      onMouseLeave={() => setActiveNode(null)}
    >
      {/* Node Glow Layer */}
      {isActive && (
        <circle
          cx={x}
          cy={y}
          r="38"
          fill="none"
          stroke="url(#purplePinkGlow)"
          strokeWidth="3"
          className="animate-pulse"
        />
      )}
      
      {/* Node Body */}
      <circle
        cx={x}
        cy={y}
        r="32"
        fill="#0B132B"
        stroke={isActive ? "#06b6d4" : "rgba(255, 255, 255, 0.1)"}
        strokeWidth="2"
        className="transition-all duration-300"
      />
      
      {/* Icon Wrapper */}
      <g transform={`translate(${x - 12}, ${y - 12})`}>
        <foreignObject width="24" height="24">
          <div className={`text-white transition-colors duration-300 ${isActive ? "text-brand-cyan" : "text-white/60"}`}>
            {icon}
          </div>
        </foreignObject>
      </g>
      
      {/* Label */}
      <text
        x={x}
        y={y + 48}
        textAnchor="middle"
        fill={isActive ? "#ffffff" : "#cbd5e1"}
        fontSize="12"
        fontWeight="bold"
        className="transition-all duration-300"
      >
        {label}
      </text>
      
      {/* Floating stats tag */}
      {stats && (
        <g transform={`translate(${x - 35}, ${y - 48})`}>
          <rect
            width="70"
            height="18"
            rx="9"
            fill="rgba(6, 182, 212, 0.15)"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="1"
          />
          <text
            x="35"
            y="12"
            textAnchor="middle"
            fill="#06b6d4"
            fontSize="9"
            fontWeight="bold"
          >
            {stats}
          </text>
        </g>
      )}
    </g>
  );
}

export default function ArchitectureDiagram({ projectType }: { projectType: "learning" | "chatcal" }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const learningNodes = [
    {
      id: "client",
      x: 60,
      y: 120,
      label: "Next.js 16 Web UI",
      icon: <Layout className="w-5 h-5" />,
      detail: "Responsive Frontend Client utilizing Server Components and client-side interaction pages.",
    },
    {
      id: "nginx",
      x: 180,
      y: 120,
      label: "Nginx Gateway",
      icon: <Network className="w-5 h-5" />,
      detail: "Serves as reverse proxy & load balancer. Routes requests to 3 Express Docker replicas.",
      stats: "Proxy Route",
    },
    {
      id: "replicas",
      x: 320,
      y: 120,
      label: "3x Docker Replicas",
      icon: <Server className="w-5 h-5" />,
      detail: "Decoupled Express backend replicated in 3 Docker containers for horizontal scaling.",
      stats: "+300% Cap",
    },
    {
      id: "gemini",
      x: 460,
      y: 60,
      label: "Gemini Embeddings",
      icon: <Cpu className="w-5 h-5" />,
      detail: "Google Gemini Embeddings model converts text content into dense vectors for indexing.",
    },
    {
      id: "pgvector",
      x: 460,
      y: 180,
      label: "Postgres + pgvector",
      icon: <Database className="w-5 h-5" />,
      detail: "Saves embeddings and course contents. Vector search performs similarity search on lessons.",
      stats: "<50ms Query",
    },
  ];

  const chatcalNodes = [
    {
      id: "client",
      x: 80,
      y: 120,
      label: "React Client",
      icon: <Layout className="w-5 h-5" />,
      detail: "Real-time client establishing persistent WebSockets connection for chat communication.",
    },
    {
      id: "socket",
      x: 220,
      y: 120,
      label: "Express Socket.IO",
      icon: <Network className="w-5 h-5" />,
      detail: "Real-time bi-directional messaging, managing user presence, media upload alerts, and JWT auth.",
      stats: "WebSockets",
    },
    {
      id: "geminiai",
      x: 360,
      y: 60,
      label: "Gemini AI Agent",
      icon: <Cpu className="w-5 h-5" />,
      detail: "Scans real-time messages, detects meeting intents, and performs LLM structured JSON extraction.",
      stats: "AI Parser",
    },
    {
      id: "gcal",
      x: 360,
      y: 180,
      label: "Google Calendar API",
      icon: <Calendar className="w-5 h-5" />,
      detail: "Generates calendar events automatically from the extracted meeting metadata (date, time, title).",
    },
    {
      id: "db",
      x: 480,
      y: 120,
      label: "MongoDB",
      icon: <HardDrive className="w-5 h-5" />,
      detail: "Stores chat room details, user collections, message history logs, and event records.",
    },
  ];

  const nodes = projectType === "learning" ? learningNodes : chatcalNodes;

  // Active details content selector
  const activeDetailContent = nodes.find(n => n.id === activeNode);

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      {/* SVG Canvas */}
      <div className="w-full bg-[#050B14]/80 rounded-2xl border border-white/10 p-4 relative overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 540 240" className="w-full max-w-[500px] h-[220px]">
          <defs>
            {/* Arrow Marker */}
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(255,255,255,0.2)" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#06b6d4" />
            </marker>
            
            {/* Glowing filter */}
            <linearGradient id="purplePinkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>

          {/* Connection Lines (Paths) */}
          {projectType === "learning" ? (
            <>
              {/* Client -> Nginx */}
              <line
                x1="92"
                y1="120"
                x2="148"
                y2="120"
                stroke={activeNode === "client" || activeNode === "nginx" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "client" || activeNode === "nginx" ? "2" : "1"}
                markerEnd={activeNode === "client" || activeNode === "nginx" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* Nginx -> Replicas */}
              <path
                d="M 212 120 L 288 120"
                stroke={activeNode === "nginx" || activeNode === "replicas" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "nginx" || activeNode === "replicas" ? "2" : "1"}
                fill="none"
                markerEnd={activeNode === "nginx" || activeNode === "replicas" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* Replicas -> Gemini */}
              <path
                d="M 345 100 Q 380 60 428 60"
                stroke={activeNode === "replicas" || activeNode === "gemini" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "replicas" || activeNode === "gemini" ? "2" : "1"}
                fill="none"
                markerEnd={activeNode === "replicas" || activeNode === "gemini" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* Replicas -> pgvector */}
              <path
                d="M 345 140 Q 380 180 428 180"
                stroke={activeNode === "replicas" || activeNode === "pgvector" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "replicas" || activeNode === "pgvector" ? "2" : "1"}
                fill="none"
                markerEnd={activeNode === "replicas" || activeNode === "pgvector" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* Gemini -> pgvector */}
              <line
                x1="460"
                y1="92"
                x2="460"
                y2="148"
                stroke={activeNode === "gemini" || activeNode === "pgvector" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "gemini" || activeNode === "pgvector" ? "2" : "1"}
                markerEnd={activeNode === "gemini" || activeNode === "pgvector" ? "url(#arrow-active)" : "url(#arrow)"}
              />
            </>
          ) : (
            <>
              {/* Client -> Socket */}
              <line
                x1="112"
                y1="120"
                x2="188"
                y2="120"
                stroke={activeNode === "client" || activeNode === "socket" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "client" || activeNode === "socket" ? "2" : "1"}
                markerEnd={activeNode === "client" || activeNode === "socket" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* Socket -> Gemini AI */}
              <path
                d="M 245 100 Q 280 60 328 60"
                stroke={activeNode === "socket" || activeNode === "geminiai" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "socket" || activeNode === "geminiai" ? "2" : "1"}
                fill="none"
                markerEnd={activeNode === "socket" || activeNode === "geminiai" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* Socket -> GCal */}
              <path
                d="M 245 140 Q 280 180 328 180"
                stroke={activeNode === "socket" || activeNode === "gcal" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "socket" || activeNode === "gcal" ? "2" : "1"}
                fill="none"
                markerEnd={activeNode === "socket" || activeNode === "gcal" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* Gemini AI -> MongoDB */}
              <path
                d="M 392 60 Q 430 80 452 100"
                stroke={activeNode === "geminiai" || activeNode === "db" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "geminiai" || activeNode === "db" ? "2" : "1"}
                fill="none"
                markerEnd={activeNode === "geminiai" || activeNode === "db" ? "url(#arrow-active)" : "url(#arrow)"}
              />
              {/* GCal -> MongoDB */}
              <path
                d="M 392 180 Q 430 160 452 140"
                stroke={activeNode === "gcal" || activeNode === "db" ? "#06b6d4" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={activeNode === "gcal" || activeNode === "db" ? "2" : "1"}
                fill="none"
                markerEnd={activeNode === "gcal" || activeNode === "db" ? "url(#arrow-active)" : "url(#arrow)"}
              />
            </>
          )}

          {/* Node Renderers */}
          {nodes.map((node) => (
            <DiagramNode
              key={node.id}
              id={node.id}
              x={node.x}
              y={node.y}
              label={node.label}
              icon={node.icon}
              detail={node.detail}
              stats={node.stats}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
            />
          ))}
        </svg>
      </div>

      {/* Info card display on hover */}
      <div className="h-[90px] glass p-4 rounded-xl border border-white/10 relative overflow-hidden flex flex-col justify-center">
        {activeDetailContent ? (
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-brand-cyan mb-1 flex items-center gap-1.5">
              <span>●</span> {activeDetailContent.label}
            </h4>
            <p className="text-xs text-gray-300 leading-normal">
              {activeDetailContent.detail}
            </p>
          </div>
        ) : (
          <div className="text-center text-xs text-gray-500 font-medium">
            Hover over nodes in the diagram above to inspect architecture layers, flow steps, and metrics.
          </div>
        )}
      </div>
    </div>
  );
}
