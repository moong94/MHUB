import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import DesigningAnimation from "./components/DesigningAnimation";
import MCPInfoForm from "./components/MCPInfoForm";
import AppStructureInfo from "./components/AppStructureInfo";
import AppDeployForm from "./components/AppDeployForm";

gsap.registerPlugin(useGSAP, SplitText, TextPlugin);

const STEPS = {
  COMPOSE: "COMPOSE",
  DESIGN: "DESIGN",
  MCP_INFO: "MCP_INFO",
  DEPLOY: "DEPLOY",
} as const;

function App() {
  const [step, setStep] = useState<keyof typeof STEPS>(STEPS.COMPOSE);

  // DESIGN 단계에서 2초 후 MCP_INFO로 자동 이동
  React.useEffect(() => {
    if (step === STEPS.DESIGN) {
      const timer = setTimeout(() => setStep(STEPS.MCP_INFO), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfdfa] px-4">
      {step === STEPS.COMPOSE && (
        <>
          {/* 로고 */}
          <h1 className="text-5xl font-semibold mb-12 text-[#1a3a3a] tracking-tight select-none">
            ㅅㄱㅄ
          </h1>

          {/* 채팅 입력창 카드 */}
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 flex flex-col items-center mb-8">
            <Input
              type="text"
              placeholder="무슨 앱을 만들고 싶은가요?"
              className="w-full text-lg mb-4"
            />
            <div className="flex gap-2 w-full justify-end">
              <Button
                className="font-medium"
                onClick={() => setStep(STEPS.DESIGN)}
              >
                만들기
              </Button>
            </div>
          </div>
        </>
      )}
      {step === STEPS.DESIGN && <DesigningAnimation />}
      {step === STEPS.MCP_INFO && (
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start justify-center min-w-0">
          {/* 데스크탑에서만 sticky, 모바일에서는 일반 노출 */}
          <div className="hidden md:block md:w-2/5 min-w-[260px] sticky top-8 self-start">
            <AppStructureInfo />
          </div>
          <div className="w-full md:flex-1 pt-8">
            <MCPInfoForm
              onNext={() => setStep(STEPS.DEPLOY)}
              onPrev={() => setStep(STEPS.COMPOSE)}
            />
          </div>
        </div>
      )}
      {step === STEPS.DEPLOY && (
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-start justify-center min-w-0">
          <div className="hidden md:block md:w-2/5 min-w-[260px] sticky top-8 self-start">
            <AppStructureInfo />
          </div>
          <div className="w-full md:flex-1">
            <AppDeployForm
              onPrev={() => setStep(STEPS.MCP_INFO)}
              onDeploy={(meta) => {
                alert(`앱 "${meta.name}"이(가) 성공적으로 배포되었습니다!`);
                // 실제 배포 로직 연결 가능
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
