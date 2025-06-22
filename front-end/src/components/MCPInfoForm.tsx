import React from "react";
import { Button } from "./ui/button";

interface MCP {
  id: string;
  name: string;
  description: string;
  fields: { label: string; placeholder: string; key: string }[];
}

interface MCPInfoFormProps {
  stickyHeader?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

const MCP_LIST: MCP[] = [
  {
    id: "kakao",
    name: "카카오톡",
    description: "국민 메신저, 채팅/알림/친구 관리 등",
    fields: [
      { label: "채널명", placeholder: "예: 내 카카오채널", key: "channel" },
      { label: "API Key", placeholder: "API Key 입력", key: "apiKey" },
    ],
  },
  {
    id: "figma",
    name: "피그마",
    description: "디자인 협업 툴, UI/UX 설계 등",
    fields: [
      {
        label: "프로젝트명",
        placeholder: "예: 내 피그마 프로젝트",
        key: "project",
      },
      { label: "Access Token", placeholder: "Access Token 입력", key: "token" },
    ],
  },
  {
    id: "upbit",
    name: "업비트",
    description: "가상자산 거래소, 시세/거래/알림 등",
    fields: [
      { label: "계정명", placeholder: "예: 내 업비트 계정", key: "account" },
      { label: "API Key", placeholder: "API Key 입력", key: "apiKey" },
    ],
  },
];

function MCPInfoForm({ onNext, onPrev }: MCPInfoFormProps) {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h2 className="text-2xl font-bold text-[#1a3a3a]">
        앱에 필요한 MCP 정보를 입력하세요
      </h2>
      <div className="flex flex-col gap-6 w-full">
        {MCP_LIST.map((mcp) => (
          <MCPCard key={mcp.id} mcp={mcp} />
        ))}
      </div>
      <div className="flex gap-2 justify-center w-full mt-8">
        <Button
          type="button"
          className="w-full md:w-auto"
          size={"lg"}
          variant={"secondary"}
          onClick={onPrev}
        >
          이전 단계로
        </Button>
        <Button
          type="button"
          className="w-full md:w-auto"
          size={"lg"}
          variant={"default"}
          onClick={onNext}
        >
          다음 단계로
        </Button>
      </div>
    </div>
  );
}

function MCPCard({ mcp }: { mcp: MCP }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
      <div className="font-semibold text-lg text-[#0ea5e9]">{mcp.name}</div>
      <div className="text-sm text-gray-500 mb-2">{mcp.description}</div>
      {mcp.fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type="text"
            placeholder={field.placeholder}
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
          />
        </div>
      ))}
    </div>
  );
}

export default MCPInfoForm;
