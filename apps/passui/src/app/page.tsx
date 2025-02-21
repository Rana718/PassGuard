'use client';
import { motion } from "framer-motion";
import { ArrowDownIcon, ShieldCheckIcon, LockClosedIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1B41]">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-[#D6D6D6] mb-6">
              Secure Your Digital Life
              <span className="text-[#3B82F6]"> with PassGurd</span>
            </h1>

            <p className="text-xl text-[#D6D6D6] mb-8 max-w-2xl mx-auto">
              Your ultimate password manager with military-grade encryption
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2E1A47] text-[#D6D6D6] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#3B82F6] transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>

        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <ArrowDownIcon className="w-8 h-8 text-[#3B82F6]" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#2E1A47]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<ShieldCheckIcon className="w-12 h-12 text-[#FF8800]" />}
              title="Advanced Security"
              description="End-to-end encryption keeps your passwords safe"
            />
            <FeatureCard
              icon={<LockClosedIcon className="w-12 h-12 text-[#FF8800]" />}
              title="Password Generator"
              description="Create strong, unique passwords instantly"
            />
            <FeatureCard
              icon={<KeyIcon className="w-12 h-12 text-[#FF8800]" />}
              title="Auto-Fill"
              description="Save time with automatic password filling"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 rounded-xl bg-[#1A1B41] hover:shadow-lg transition-shadow"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-[#D6D6D6] mb-2">{title}</h3>
    <p className="text-[#D6D6D6]/80">{description}</p>
  </motion.div>
);
