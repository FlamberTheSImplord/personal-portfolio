// Uilora StrokeFill — application adaptation; source and terms in SOURCES.md.
"use client";

import React from "react";
import { motion } from "motion/react";

interface StrokeFillProps {
    text?: string;
    duration?: number;
}

export const StrokeFill = ({
    text = "Elegance",
    duration = 3,
}: StrokeFillProps) => {
    return (
        <div className="luma-stroke-wrap">
            <svg viewBox="0 0 800 200" className="luma-stroke-svg">
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="1.5"
                    className="luma-stroke-text"
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0, fill: "#78457e" }}
                    transition={{
                        duration,
                        ease: "easeInOut",
                        fill: { delay: duration * 0.67, duration: duration * 0.33, ease: "easeIn" },
                    }}
                >
                    {text}
                </motion.text>
            </svg>
        </div>
    );
};
