"use client";

import React, { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp, Lock, HeartHandshake, Hourglass, Compass, HelpCircle } from "lucide-react";

export const StrategyGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const rules = [
    {
      icon: <Lock className="w-4 h-4 text-rose-400" />,
      title: "1. 철저한 정보 차단",
      desc: "나이, 연봉, 사는 동네, 가족 관계 등을 물어보면 극도로 뭉뚱그려 얼버무립니다.",
    },
    {
      icon: <HeartHandshake className="w-4 h-4 text-pink-400" />,
      title: "2. 가짜 호감과 백치미",
      desc: "상대의 자랑에 엄청 감탄하며 치켜세우지만, 본인은 극심한 '기계치/금융치'임을 강조합니다.",
    },
    {
      icon: <Hourglass className="w-4 h-4 text-amber-400" />,
      title: "3. 무한 지연과 핑계",
      desc: "앱 설치나 입금 요구 시 액정 기포, 공인인증서 오류, 고양이 방해 등 황당한 이유로 미룹니다.",
    },
    {
      icon: <Compass className="w-4 h-4 text-emerald-400" />,
      title: "4. 삼천포 화제 전환",
      desc: "상대가 진지한 코인 얘기를 꺼내면 음식, 날씨, 엉뚱한 단어에 꽂혀 딴소리로 빠져나갑니다.",
    },
    {
      icon: <HelpCircle className="w-4 h-4 text-purple-400" />,
      title: "5. 피곤한 역질문 폭격",
      desc: "대화 끝에 상대가 답하기 피곤한 사소한 질문을 던져 사기꾼의 에너지를 소모시킵니다.",
    },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white transition"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>안티스캠 5대 방어 전략 보기</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs"
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-1">
                {rule.icon}
                <span>{rule.title}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
