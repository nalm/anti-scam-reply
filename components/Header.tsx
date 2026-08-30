"use client";

import React from "react";
import { ShieldAlert, Key, Sparkles, Bot } from "lucide-react";

interface HeaderProps {
  onOpenKeyModal: () => void;
  savedApiKey: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenKeyModal, savedApiKey }) => {
  const isClaude = savedApiKey.startsWith("sk-ant");
  const isGemini = savedApiKey.startsWith("AIzaSy");
  const hasCustomKey = !!savedApiKey;

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-900/30">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">
                안티그래비티 <span className="text-purple-400 font-medium text-sm">Anti-Scam</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Claude / Gemini AI
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              사기꾼의 시간과 멘탈을 털어버리는 맞춤형 방어 답변 생성기
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              hasCustomKey
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40"
                : "bg-slate-900/80 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isClaude
                ? "Claude 키 적용됨"
                : isGemini
                ? "Gemini 키 적용됨"
                : hasCustomKey
                ? "API 키 적용됨"
                : "API 키 설정"}
            </span>
            <span className="sm:hidden">
              {hasCustomKey ? "키 등록됨" : "API 키"}
            </span>
            {hasCustomKey && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
