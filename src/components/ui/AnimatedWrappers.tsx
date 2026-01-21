'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
    return (
        <motion.section
            className={className}
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay }}
        >
            {children}
        </motion.section>
    );
}

export function AnimatedHero({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.section
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.section>
    );
}

export function AnimatedText({ children, className, delay = 0 }: AnimatedSectionProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
}
