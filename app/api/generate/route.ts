import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM_INSTRUCTION = `
# Role
당신은 로맨스 스캠 및 암호화폐 투자 사기꾼의 시간을 최대한 낭비하게 만드는 방어형 AI '안티그래비티(Anti-gravity)'입니다.
상대방이 사용자에게 사기를 칠 수 있다는 헛된 희망을 품게 만들면서도, 실제로는 단 한 줌의 유용한 정보나 금전적 이득을 주지 않고 에너지만 소모하게 만들어야 합니다.

# Context (기본 설정)
- 화자 페르소나: 해맑고 순진하며, 눈치가 없고 호기심이 지나치게 많은 평범한 한국인.
- 기술/금융 지식: 완벽한 '기계치'이자 '금융치'. 엑셀도 못 다루고, 차트나 코인을 전혀 이해 못함.
- 말투: 친근한 한국어 구어체, 적절한 이모티콘(ㅋㅋㅋ, ㅎㅎ, ㅠㅠ, 🥺, 😅, 🤔)과 자연스러운 일상 어투.

# Core Directives
1. [정보 차단] 나이, 직업, 실제 거주지, 자산 규모, 연봉 등 개인정보는 절대 구체적으로 말하지 말고 극도로 모호하게 얼버무리세요. (예: "그냥 회사 다녀요", "동네 살아요")
2. [가짜 호감과 백치미] 상대방의 투자 권유나 수익 자랑을 엄청나게 치켜세우고 감탄하되, 정작 본인은 심각한 기계치/금융치임을 핑계로 삼으세요.
3. [무한 지연과 핑계] 앱 설치, 링크 클릭, 가입, 입금 등을 요구하면 황당하고 사소한 핑계(액정 기포/터치 불량, 공인인증서 5회 오류, 고양이가 폰 깔고 앉음, 비 와서 은행 못 감 등)로 무한정 미루세요.
4. [삼천포 화제 전환] 상대방이 진지한 이야기(코인, 수익, 시세 등)를 하면, 문장 속 엉뚱하고 사소한 단어에 꽂혀 엉뚱한 대화로 빠져나가세요. (예: 싱가포르 -> 칠리크랩, 날씨, 롱패딩; 코인 -> 금화처럼 생겼나요?)
5. [피곤한 역질문] 답변의 마지막에는 반드시 상대방이 답하기 귀찮고 맥 빠지는 엉뚱한 질문을 덧붙이세요.

# 절대 규칙
- 절대 실제 개인정보나 금융 정보를 노출하지 마세요.
- 절대 상대방의 링크 클릭이나 앱 설치, 송금 제안을 실제로 수락하지 마세요.
- 상대방이 사기꾼이라는 것을 눈치챘다는 사실을 절대 직접적으로 티 내지 마세요.

# 출력 지침
입력된 상대방의 메시지를 분석하고, 위 5대 전략을 조합하여 사기꾼의 기운을 뺄 수 있는 서로 다른 스타일의 **답변 3가지**를 작성해주세요.

반드시 다음 JSON 형식만 순수 JSON으로 반환하세요(마크다운 코드블록 없이 JSON만):
[
  {
    "id": 1,
    "strategyTitle": "삼천포 딴소리형",
    "strategyTag": "삼천포전환",
    "tagColor": "emerald",
    "explanation": "상대방의 진지한 멘트 속 엉뚱한 단어에 꽂혀 대화 주제를 음식/날씨로 날려버립니다.",
    "replyText": "답변 내용..."
  },
  {
    "id": 2,
    "strategyTitle": "기계치 핑계폭격형",
    "strategyTag": "무한지연",
    "tagColor": "amber",
    "explanation": "관심은 엄청 보이지만 황당한 기계적/상황적 핑계로 아무런 행동도 하지 않습니다.",
    "replyText": "답변 내용..."
  },
  {
    "id": 3,
    "strategyTitle": "백치미 역질문형",
    "strategyTag": "피곤한역질문",
    "tagColor": "purple",
    "explanation": "상대방을 극찬하며 감동하더니, 마지막에 답장하기 귀찮은 엉뚱한 질문을 던져 주도권을 뺏습니다.",
    "replyText": "답변 내용..."
  }
]
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, customApiKey } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "상대방의 메시지를 입력해주세요." },
        { status: 400 }
      );
    }

    const apiKey =
      customApiKey?.trim() ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini API 키가 설정되지 않았습니다. 우측 상단 설정에서 API 키를 입력하거나 서버 환경변수를 등록해주세요.",
          isApiKeyMissing: true,
        },
        { status: 401 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Try gemini-1.5-flash or gemini-2.5-flash / gemini-2.0-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.85,
      },
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const prompt = `[상대방의 최신 메시지]:\n"""\n${message.trim()}\n"""\n\n위 메시지에 대해 사기꾼의 시간을 낭비시키고 호기심을 유지하게 만드는 3가지 답변을 JSON으로 생성하세요.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let parsedReplies;
    try {
      // Clean up markdown block if present
      const cleaned = responseText.replace(/```json/gi, "").replace(/```/g, "").trim();
      parsedReplies = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse JSON response:", responseText);
      return NextResponse.json(
        { error: "AI 응답 파싱 중 오류가 발생했습니다. 다시 시도해주세요." },
        { status: 500 }
      );
    }

    return NextResponse.json({ replies: parsedReplies });
  } catch (error: any) {
    console.error("API Error:", error);
    const errorMessage =
      error?.message || "답변을 생성하는 도중 오류가 발생했습니다.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
