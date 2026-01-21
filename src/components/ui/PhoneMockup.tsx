"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
    className?: string;
    children?: React.ReactNode;
}

export function PhoneMockup({ className, children }: PhoneMockupProps) {
    return (
        <div className={cn("relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl", className)}>
            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white relative">
                {/* Header Bar inside Phone */}
                <div className="absolute top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-sm z-20 border-b border-gray-100 flex items-center justify-center pt-4">
                    <span className="font-serif font-bold text-xs text-primary">Montreal Backstage</span>
                </div>

                <div className="w-full h-full overflow-hidden relative bg-fog">
                    <motion.div
                        className="w-full px-4 pt-20 pb-8 space-y-6"
                        animate={{ y: [-20, -600] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear"
                        }}
                    >
                        {/* Simulated Content Feed */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-6">
                                {/* Article 1 */}
                                <div className="bg-white p-4 rounded-sm shadow-sm space-y-3">
                                    <div className="h-32 w-full bg-gradient-to-br from-slate-200 to-gray-300 rounded-sm"></div>
                                    <div className="space-y-2">
                                        <div className="h-3 w-3/4 bg-gray-200 rounded-full"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                                        <div className="h-2 w-5/6 bg-gray-100 rounded-full"></div>
                                        <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Article 2 */}
                                <div className="bg-white p-4 rounded-sm shadow-sm space-y-3">
                                    <div className="flex gap-3 items-center mb-2">
                                        <div className="w-8 h-8 rounded-full bg-accent/20"></div>
                                        <div className="h-2 w-24 bg-gray-200 rounded-full"></div>
                                    </div>
                                    <div className="h-4 w-full bg-gray-800 rounded-sm"></div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                                </div>

                                {/* Article 3 (Image heavy) */}
                                <div className="bg-white p-2 rounded-sm shadow-sm">
                                    <div className="h-40 w-full bg-gradient-to-tr from-[#2F3A44] to-[#1E1E1E] rounded-sm relative overflow-hidden">
                                        <div className="absolute bottom-3 left-3 right-3 text-white/80 text-[10px]">
                                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-sm">
                                                The architecture of the ...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Fade overlay for bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10"></div>
                </div>
            </div>
        </div>
    );
}
