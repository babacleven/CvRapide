"use client";
import React from "react";

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  statusTone?: "dark" | "light";
  screenClassName?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  className = "w-[290px]",
  statusTone = "light",
  screenClassName = "bg-[#0d0d0f]",
}) => {
  return (
    <div
      className={`relative aspect-[9/19.4] shrink-0 rounded-[48px] bg-panel p-[9px] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.7),0_30px_80px_-50px_rgba(96,165,250,0.55)] ring-1 ring-white/10 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[110px] h-9 w-[3px] rounded-l bg-panel/60"
      />
      <span
        aria-hidden="true"
        className="absolute -left-[3px] top-[165px] h-14 w-[3px] rounded-l bg-panel/60"
      />
      <span
        aria-hidden="true"
        className="absolute -right-[3px] top-[140px] h-20 w-[3px] rounded-r bg-panel/60"
      />
      <div
        className={`relative isolate h-full w-full overflow-hidden rounded-[40px] text-left text-white select-none ${screenClassName}`}
      >
        <div
          className={`absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between px-7 pt-1 text-[12px] font-semibold ${
            statusTone === "dark" ? "text-[#050505]" : "text-white"
          }`}
        >
          <span>9:41</span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <svg viewBox="0 0 18 12" className="size-3 fill-current">
              <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
              <rect x="4.5" y="6" width="2.5" height="6" rx="0.5" />
              <rect x="9" y="3" width="2.5" height="9" rx="0.5" />
              <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
            </svg>
            <svg viewBox="0 0 16 12" className="size-3 fill-current">
              <path d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM3.5 6.5A6.5 6.5 0 0 1 12.5 6.5l-1.4 1.4A4.5 4.5 0 0 0 4.9 7.9L3.5 6.5zM1 3.5a10 10 0 0 1 14 0l-1.4 1.4a8 8 0 0 0-11.2 0L1 3.5z" />
            </svg>
            <svg viewBox="0 0 24 12" className="size-4 fill-current">
              <rect
                x="0"
                y="0"
                width="20"
                height="12"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <rect x="2" y="2" width="13" height="8" rx="1.5" />
              <path d="M22 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-30 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black shadow-inner"
        />
        {children}
        <div
          aria-hidden="true"
          className="absolute bottom-1.5 left-1/2 z-30 h-1 w-24 -translate-x-1/2 rounded-full bg-white/70"
        />
      </div>
    </div>
  );
};
