"use client";

import React from "react";
import { MessageSquare, Wand2, RefreshCw, Sparkles } from "lucide-react";

interface MessageInputProps {
  message: string;
  setMessage: (msg: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const EXAMPLE_MESSAGES = [
  {
    label: "🪙 투자 차트/수익 자랑",
    text: "오늘 비트코인이랑 이더리움 단기 매매로 3500 S$ 수익 났어요! 차트 분석법 조금만 알면 누구나 쉽게 벌 수 있어요. 제가 도와줄게요, 같이 해볼래요?",
  },
  {
    label: "🕵️ 개인정보/자산 캐묻기",
    text: "오빠는 평소에 직장에서 연봉 얼마나 받아요? 저축은 어디에 주로 해둬요? 서울 어디 동네에 자가로 사시는 거예요?",
  },
  {
    label: "📱 사기 앱 설치/링크 유도",
    text: "제가 쓰는 VIP 전용 글로벌 거래소 앱인데 일반 스토어엔 아직 없어요. 이 링크 들어가서 APK 다운받고 가입 코드 8899 넣으시면 보너스 코인도 줘요!",
  },
];

export const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          상대방이 보낸 메시지 붙여넣기
        </label>
        <span className="text-xs text-slate-500">{message.length}자</span>
      </div>

      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="사기꾼이 보낸 카톡/라인/텔레그램/DM 메시지를 여기에 그대로 붙여넣으세요..."
          rows={4}
          className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/80 transition resize-none leading-relaxed"
        />
      </div>

      {/* Preset example buttons */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" /> 예시 불러오기:
        </span>
        {EXAMPLE_MESSAGES.map((ex, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setMessage(ex.text)}
            className="text-xs bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700/60 transition active:scale-95"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading || !message.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
              <span>사기꾼 멘탈 탈탈 터는 중...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 text-pink-200" />
              <span>시간 낭비 답변 3가지 생성하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
