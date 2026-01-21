"use client";

import { motion } from "framer-motion";

export function MontrealMap() {
    return (
        <div className="relative w-full aspect-square md:aspect-video max-w-4xl mx-auto opacity-80 hover:opacity-100 transition-opacity duration-1000">
            <svg
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Abstract Island Shape - Highly stylized */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M100,400 C150,350 200,380 300,320 C350,290 400,280 500,250 C600,220 650,200 700,150"
                    stroke="var(--color-secondary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Connection bridges lines */}
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    d="M300,320 L300,500"
                    stroke="var(--color-muted)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />

                {/* Hotspots */}
                <MapMarker x={300} y={320} label="Old Port" delay={1} />
                <MapMarker x={420} y={280} label="Downtown" delay={1.2} />
                <MapMarker x={450} y={240} label="Plateau" delay={1.4} />
                <MapMarker x={380} y={350} label="Griffintown" delay={1.6} />
            </svg>
        </div>
    );
}

function MapMarker({ x, y, label, delay }: { x: number, y: number, label: string, delay: number }) {
    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
        >
            <circle cx={x} cy={y} r="6" fill="var(--color-accent)" />
            <circle cx={x} cy={y} r="12" stroke="var(--color-accent)" strokeWidth="1" opacity="0.3" />
            <text x={x + 15} y={y + 5} fill="var(--color-primary)" fontSize="14" fontFamily="var(--font-serif)" fontWeight="bold">
                {label}
            </text>
        </motion.g>
    )
}
