"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-border/50"
          >
            <div className="flex items-center justify-between border-b border-border/20 px-6 py-4">
              <h2 className="text-lg font-black text-text-primary tracking-tight">{title}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="flex items-center justify-center rounded-full p-2 bg-black/5 text-text-primary hover:bg-black/10 transition-colors shadow-sm cursor-pointer z-50"
                aria-label="Close modal"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-6 py-4 custom-scrollbar">
              {children}
            </div>
            <div className="border-t border-border/20 px-6 py-4 bg-black/5 flex justify-end">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="rounded-xl bg-[#F59E0B] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#d97706] transition-colors shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
