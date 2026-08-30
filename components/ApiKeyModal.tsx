"use client";

import React, { useState, useEffect } from "react";
import { Key, X, Check, ExternalLink, ShieldCheck, Sparkles, Bot } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedApiKey: string;
  onSaveKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  savedApiKey,
  onSaveKey,
}) => {
  const [activeTab, setActiveTab] = useState<"claude" | "gemini">("claude");
  const [inputKey, setInputKey] = useState(savedApiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setInputKey(savedApiKey);
    if (savedApiKey.startsWith("AIzaSy")) {
      setActiveTab("gemini");
    } else if (savedApiKey.startsWith("sk-ant")) {
      setActiveTab("claude");
    }
  }, [savedApiKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  const handleClear = () => {
    setInputKey("");
    onSaveKey("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">AI API 키 설정</h2>
            <p className="text-xs text-slate-400">
              브라우저(LocalStorage)에만 안전하게 저장됩니다.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("claude")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "claude"
                ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Claude API (추천)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gemini")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "gemini"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            Google Gemini API (무료)
          </button>
        </div>

        {/* Guide Box based on active tab */}
        {activeTab === "claude" ? (
          <div className="bg-slate-950/80 rounded-xl p-3.5 border border-purple-900/40 mb-4 text-xs text-slate-300 space-y-2">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                Anthropic의 Claude 3.5 모델을 사용하여 고품질 답변을 생성합니다.
              </span>
            </div>
            <div className="flex items-center gap-1 text-purple-400 hover:text-purple-300">
              <ExternalLink className="w-3.5 h-3.5" />
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-medium"
              >
                Anthropic Console에서 Claude 키(sk-ant-...) 발급받기
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/80 rounded-xl p-3.5 border border-indigo-900/40 mb-4 text-xs text-slate-300 space-y-2">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Google AI Studio에서 무료로 발급받아 사용할 수 있습니다.
              </span>
            </div>
            <div className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300">
              <ExternalLink className="w-3.5 h-3.5" />
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-medium"
              >
                Google AI Studio에서 무료 Gemini 키(AIzaSy...) 발급받기
              </a>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {activeTab === "claude"
                ? "Anthropic Claude API Key (sk-ant-...)"
                : "Google Gemini API Key (AIzaSy...)"}
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder={
                activeTab === "claude"
                  ? "sk-ant-api03-..."
                  : "AIzaSy..."
              }
              className="w-full bg-slate-950 border border-slate-700/70 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition font-mono"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            {savedApiKey ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-red-400 hover:text-red-300 underline underline-offset-2"
              >
                등록된 키 삭제
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-900/40 flex items-center gap-1.5 transition active:scale-95"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    저장 완료!
                  </>
                ) : (
                  "저장하기"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
