import React from "react";

function AppStructureInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 w-full h-fit min-w-0">
      <h2 className="text-xl font-bold text-[#1a3a3a] mb-2">앱 구성 안내</h2>
      <p className="text-sm text-gray-700 mb-2">
        이 앱은 여러 MCP(외부 서비스)와 연동하여 다양한 기능을 제공합니다.
        <br />
        아래는 예시 앱의 구조입니다.
      </p>
      {/* Mermaid 다이어그램 */}
      <div className="flex justify-center items-center w-full overflow-x-auto py-2">
        <MermaidDiagram />
      </div>
      <ul className="text-xs text-gray-600 list-disc pl-4">
        <li>
          <b>카카오톡</b>: 사용자에게 알림 또는 메시지를 전송합니다.
        </li>
        <li>
          <b>피그마</b>: 디자인 데이터를 불러오거나 연동합니다.
        </li>
        <li>
          <b>업비트</b>: 실시간 가상자산 시세를 조회합니다.
        </li>
      </ul>
    </div>
  );
}

function MermaidDiagram() {
  // SVG로 간단한 플로우차트 구현 (Mermaid 대체)
  return (
    <svg
      viewBox="0 0 340 120"
      width="100%"
      height="80"
      className="min-w-[300px] max-w-full"
    >
      {/* 사용자 박스 */}
      <rect x="130" y="10" width="80" height="30" rx="8" fill="#e0f2fe" />
      <text
        x="170"
        y="30"
        textAnchor="middle"
        fontSize="14"
        fill="#0369a1"
        fontWeight="bold"
      >
        사용자
      </text>
      {/* 화살표 */}
      <line
        x1="170"
        y1="40"
        x2="170"
        y2="60"
        stroke="#888"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      {/* MCP 박스들 */}
      <rect x="10" y="70" width="80" height="30" rx="8" fill="#fef9c3" />
      <rect x="130" y="70" width="80" height="30" rx="8" fill="#f1f5f9" />
      <rect x="250" y="70" width="80" height="30" rx="8" fill="#f3e8ff" />
      <text
        x="50"
        y="90"
        textAnchor="middle"
        fontSize="13"
        fill="#b45309"
        fontWeight="bold"
      >
        카카오톡
      </text>
      <text
        x="170"
        y="90"
        textAnchor="middle"
        fontSize="13"
        fill="#334155"
        fontWeight="bold"
      >
        피그마
      </text>
      <text
        x="290"
        y="90"
        textAnchor="middle"
        fontSize="13"
        fill="#7c3aed"
        fontWeight="bold"
      >
        업비트
      </text>
      {/* 분기 화살표 */}
      <line
        x1="170"
        y1="60"
        x2="50"
        y2="70"
        stroke="#bbb"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
      <line
        x1="170"
        y1="60"
        x2="170"
        y2="70"
        stroke="#bbb"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
      <line
        x1="170"
        y1="60"
        x2="290"
        y2="70"
        stroke="#bbb"
        strokeWidth="1.5"
        markerEnd="url(#arrow)"
      />
      {/* 화살표 마커 */}
      <defs>
        <marker
          id="arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#888" />
        </marker>
      </defs>
    </svg>
  );
}

export default AppStructureInfo;
