import { motion } from "framer-motion";
import Link from "next/link";

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed w-full top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-accent/10"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold gradient-text">
          PassGuard
        </Link>
        <div className="flex gap-6">
          <Link href="/features" className="text-primary hover:text-accent transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-primary hover:text-accent transition-colors">
            Pricing
          </Link>
          <Link href="/login" className="text-accent hover:text-accent-secondary transition-colors">
            Login
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
