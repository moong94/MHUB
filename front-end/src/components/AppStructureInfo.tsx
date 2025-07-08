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
  // SVG로 개선된 플로우차트 구현
  return (
    <svg
      viewBox="0 0 380 420"
      width="100%"
      height="320"
      className="min-w-[350px] max-w-full"
    >
      {/* 그라데이션 및 그림자 정의 */}
      <defs>
        {/* 그라데이션들 */}
        <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <linearGradient id="kakaoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fee500" />
          <stop offset="100%" stopColor="#e6cc00" />
        </linearGradient>

        <linearGradient id="figmaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0acf83" />
          <stop offset="100%" stopColor="#0a8661" />
        </linearGradient>

        <linearGradient id="upbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>

        {/* 그림자 필터 */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="3"
            dy="5"
            stdDeviation="4"
            floodColor="#000"
            floodOpacity="0.2"
          />
        </filter>

        {/* 화살표 마커 */}
        <marker
          id="arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L8,4 L0,8 L2,4 Z" fill="#4f46e5" />
        </marker>
      </defs>

      {/* 사용자 박스 */}
      <g>
        <rect
          x="20"
          y="40"
          width="160"
          height="60"
          rx="18"
          fill="url(#userGradient)"
          filter="url(#shadow)"
        />
        <text
          x="100"
          y="65"
          textAnchor="middle"
          fontSize="18"
          fill="white"
          fontWeight="700"
        >
          👤 사용자
        </text>
        <text x="100" y="85" textAnchor="middle" fontSize="13" fill="#e2e8f0">
          (채팅 인터페이스)
        </text>
      </g>

      {/* 피그마 박스 */}
      <g>
        <rect
          x="20"
          y="140"
          width="160"
          height="60"
          rx="18"
          fill="url(#figmaGradient)"
          filter="url(#shadow)"
        />
        <text
          x="100"
          y="165"
          textAnchor="middle"
          fontSize="18"
          fill="white"
          fontWeight="700"
        >
          🎨 피그마
        </text>
        <text x="100" y="185" textAnchor="middle" fontSize="13" fill="#e2e8f0">
          디자인 데이터 연동
        </text>
      </g>

      {/* 업비트 박스 */}
      <g>
        <rect
          x="20"
          y="240"
          width="160"
          height="60"
          rx="18"
          fill="url(#upbitGradient)"
          filter="url(#shadow)"
        />
        <text
          x="100"
          y="265"
          textAnchor="middle"
          fontSize="18"
          fill="white"
          fontWeight="700"
        >
          📈 업비트
        </text>
        <text x="100" y="285" textAnchor="middle" fontSize="13" fill="#e2e8f0">
          가상자산 시세 조회
        </text>
      </g>

      {/* 카카오톡 박스 */}
      <g>
        <rect
          x="20"
          y="340"
          width="160"
          height="60"
          rx="18"
          fill="url(#kakaoGradient)"
          filter="url(#shadow)"
        />
        <text
          x="100"
          y="365"
          textAnchor="middle"
          fontSize="18"
          fill="#3c2e00"
          fontWeight="700"
        >
          💬 카카오톡
        </text>
        <text x="100" y="385" textAnchor="middle" fontSize="13" fill="#5c4500">
          메시지 전송
        </text>
      </g>

      {/* 연결선들 - 순차적 흐름 */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="130"
        stroke="#4f46e5"
        strokeWidth="3"
        markerEnd="url(#arrow)"
      />

      <line
        x1="100"
        y1="200"
        x2="100"
        y2="230"
        stroke="#4f46e5"
        strokeWidth="3"
        markerEnd="url(#arrow)"
      />

      <line
        x1="100"
        y1="300"
        x2="100"
        y2="330"
        stroke="#4f46e5"
        strokeWidth="3"
        markerEnd="url(#arrow)"
      />

      {/* 제목 */}
      <text
        x="190"
        y="25"
        textAnchor="middle"
        fontSize="18"
        fill="#1e293b"
        fontWeight="800"
      >
        MCP 연동 워크플로우
      </text>

      {/* 단계 설명 */}
      <text x="200" y="65" fontSize="14" fill="#64748b" fontWeight="600">
        사용자 요청 입력
      </text>
      <text x="200" y="80" fontSize="11" fill="#94a3b8">
        채팅을 통해 명령 전달
      </text>

      <text x="200" y="165" fontSize="14" fill="#64748b" fontWeight="600">
        디자인 처리
      </text>
      <text x="200" y="180" fontSize="11" fill="#94a3b8">
        피그마에서 디자인 데이터 가져오기
      </text>

      <text x="200" y="265" fontSize="14" fill="#64748b" fontWeight="600">
        시세 조회
      </text>
      <text x="200" y="280" fontSize="11" fill="#94a3b8">
        업비트에서 가상자산 정보 조회
      </text>

      <text x="200" y="365" fontSize="14" fill="#64748b" fontWeight="600">
        결과 전송
      </text>
      <text x="200" y="380" fontSize="11" fill="#94a3b8">
        카카오톡으로 최종 결과 전달
      </text>
    </svg>
  );
}

export default AppStructureInfo;
