'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Platform Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-body)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/10 blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-900/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-glass max-w-lg w-full p-8 md:p-12 text-center relative z-10 border-red-500/20"
      >
        <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-500/20">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-3xl font-poppins font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-[var(--text-sub)] mb-8 leading-relaxed">
          We encountered an unexpected error on the Ecomate platform. Don&apos;t worry, your data is safe. Let&apos;s try to get you back on track.
        </p>

        {error.digest && (
          <div className="bg-white/5 rounded-xl p-3 mb-8">
             <span className="text-xs font-mono text-[var(--text-muted)]">Error Digest: {error.digest}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary w-full sm:w-auto px-8 flex items-center justify-center gap-2 group"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
