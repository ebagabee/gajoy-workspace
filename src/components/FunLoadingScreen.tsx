import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const funnyMessages = [
  "Preparando as piadas...",
  "Alimentando os hamsters do servidor...",
  "Procurando as chaves do sistema...",
  "Convencendo os pixels a cooperarem...",
  "Carregando o café virtual...",
  "Acordando os servidores...",
  "Debugando os bugs dos bugs...",
  "Calculando o sentido da vida...",
];

export const FunLoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-lg font-medium text-center"
      >
        {funnyMessages[messageIndex]}
      </motion.p>
    </motion.div>
  );
};
