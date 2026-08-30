"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MessageInput } from "@/components/MessageInput";
import { ReplyCard, ReplyItem } from "@/components/ReplyCard";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { StrategyGuide } from "@/components/StrategyGuide";
import { AlertTriangle, Sparkles, MessageSquareDashed } from "lucide-react";

const STORAGE_KEY = "anti_scam_claude_api_key";

export default function Home() {
  const [message, setMessage] = useState("");
  const [replies, setReplies] = useState<ReplyItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState("");

  // Load saved API key from localStorage
  useEffect(() => {
    try {
      const key = localStorage.getItem(STORAGE_KEY);
      if (key) {
        setSavedApiKey(key);
      }
    } catch (e) {
      console.error("Failed to load API key from localStorage:", e);
    }
  }, []);

  const handleSaveKey = (key: string) => {
    setSavedApiKey(key);
    try {
      if (key) {
        localStorage.setItem(STORAGE_KEY, key);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to save API key to localStorage:", e);
    }
  };

  const handleGenerate = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          customApiKey: savedApiKey,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.isApiKeyMissing) {
          setIsKeyModalOpen(true);
        }
        throw new Error(data.error || "답변을 생성하지 못했습니다.");
      }

      if (Array.isArray(data.replies)) {
        setReplies(data.replies);
      } else {
        throw new Error("올바른 형식의 응답을 받지 못했습니다.");
      }
    } catch (err: any) {
      setError(err?.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100">
      <Header
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        hasCustomKey={!!savedApiKey}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Intro Hero banner */}
        <div className="text-center space-y-2 py-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            시간 낭비 방어 솔루션 (Claude 3.5 AI)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            사기꾼에겐 헛된 희망을, 내게는 여유를 🎣
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            로맨스 스캠·코인 사기꾼의 메시지를 붙여넣으세요. 내 정보는 철저히 숨기고,
            상대방의 에너지만 쪽쪽 빨아먹는 최적의 답변 3가지를 Claude가 생성해 드립니다.
          </p>
        </div>

        {/* 5 Strategies Guide */}
        <StrategyGuide />

        {/* Message Input Section */}
        <MessageInput
          message={message}
          setMessage={setMessage}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 flex items-start gap-3 text-rose-200 text-xs animate-shake">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-rose-100">생성 실패</p>
              <p className="text-rose-300 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Results Area */}
        {replies.length > 0 ? (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🎯 추천 방어 답변 3가지</span>
                <span className="text-xs font-normal text-slate-400">
                  (마음에 드는 답변을 복사해서 전송하세요)
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {replies.map((item, idx) => (
                <ReplyCard key={item.id || idx} item={item} index={idx} />
              ))}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="border border-dashed border-slate-800/80 rounded-2xl p-10 text-center text-slate-500 flex flex-col items-center justify-center gap-2.5">
              <MessageSquareDashed className="w-8 h-8 text-slate-600" />
              <p className="text-xs text-slate-400">
                상대방 메시지를 입력하고 답변 생성 버튼을 누르면 여기에 3가지 전략 답변이 나타납니다.
              </p>
            </div>
          )
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <p>
          안티그래비티 (Anti-Scam Reply) • Powered by Anthropic Claude 3.5
        </p>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        savedApiKey={savedApiKey}
        onSaveKey={handleSaveKey}
      />
    </div>
  );
}
