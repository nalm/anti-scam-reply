"use client";

import React, { useState } from "react";
import { Copy, Check, Info, Sparkles, SendHorizontal } from "lucide-react";

export interface ReplyItem {
  id: number;
  strategyTitle: string;
  strategyTag: string;
  tagColor?: string;
  explanation: string;
  replyText: string;
}

interface ReplyCardProps {
  item: ReplyItem;
  index: number;
}

export const ReplyCard: React.FC<ReplyCardProps> = ({ item, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.replyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  // Color mapping for tags
  const getBadgeStyle = (tag: string) => {
    if (tag.includes("삼천포")) {
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    }
    if (tag.includes("지연") || tag.includes("핑계")) {
      return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    }
    return "bg-purple-500/15 text-purple-300 border-purple-500/30";
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-xl transition-all hover:shadow-2xl hover:shadow-purple-950/20 flex flex-col justify-between group relative overflow-hidden">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center border border-slate-700">
              {index + 1}
            </span>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              {item.strategyTitle}
            </h3>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getBadgeStyle(
                item.strategyTag
              )}`}
            >
              #{item.strategyTag}
            </span>
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              copied
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/40"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white"
            }`}
            title="클립보드에 복사"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>복사</span>
              </>
            )}
          </button>
        </div>

        {/* Strategy Explanations */}
        {item.explanation && (
          <div className="flex items-start gap-1.5 text-xs text-slate-400 bg-slate-950/60 rounded-lg p-2.5 mb-3 border border-slate-900">
            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{item.explanation}</span>
          </div>
        )}

        {/* Reply text content */}
        <div className="text-sm text-slate-100 bg-slate-950/90 rounded-xl p-4 border border-slate-800/80 font-sans leading-relaxed whitespace-pre-wrap selection:bg-purple-500/40">
          {item.replyText}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" />
          시간 낭비 효과: 극대화
        </span>
        <button
          onClick={handleCopy}
          className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 group-hover:underline"
        >
          <SendHorizontal className="w-3 h-3" />
          복사해서 전송하기
        </button>
      </div>
    </div>
  );
};
