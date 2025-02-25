"use client";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Secure Your Digital Life with{" "}
            <span className="gradient-text">PassGuard</span>
          </h1>
          <p className="text-lg md:text-xl text-primary/80 max-w-3xl mx-auto mb-8">
            A modern and secure password manager designed to protect your digital identity.
            Store, generate, and manage your passwords with confidence.
          </p>
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button className="bg-accent hover:bg-accent-secondary text-background px-6 py-3 rounded-lg font-medium transition-colors">
              Get Started
            </button>
            <button className="border border-accent text-accent hover:bg-accent/10 px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-surface p-8 rounded-2xl"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-xl bg-background/50"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-primary/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Secure Encryption",
    description: "Your data is protected with military-grade encryption standards",
  },
  {
    title: "Cross-Platform",
    description: "Access your passwords anywhere, on any device",
  },
  {
    title: "Password Generator",
    description: "Create strong, unique passwords with our built-in generator",
  },
];
