"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { FunLoadingScreen } from "@/components/FunLoadingScreen";
import { motion } from "framer-motion";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (isLoading) {
    return <FunLoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <header className="p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-xl font-bold"
          >
            Gajoy Workspace
          </motion.h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto p-4"
      >
        {children}
      </motion.main>
    </motion.div>
  );
}
