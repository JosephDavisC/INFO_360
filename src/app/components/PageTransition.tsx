import { motion } from 'motion/react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      className="flex flex-col h-full"
    >
      {children}
    </motion.div>
  );
}
