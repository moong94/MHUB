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
import AppListView from "./components/AppListView";

gsap.registerPlugin(useGSAP, SplitText, TextPlugin);

const STEPS = {
  COMPOSE: "COMPOSE",
  DESIGN: "DESIGN",
  MCP_INFO: "MCP_INFO",
  DEPLOY: "DEPLOY",
  LIST: "LIST",
} as const;

interface AppItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: "active" | "inactive";
}

function App() {
  const [step, setStep] = useState<keyof typeof STEPS>(STEPS.COMPOSE);
  const [apps, setApps] = useState<AppItem[]>([]);

  // DESIGN 단계에서 2초 후 MCP_INFO로 자동 이동
  React.useEffect(() => {
    if (step === STEPS.DESIGN) {
      const timer = setTimeout(() => setStep(STEPS.MCP_INFO), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleAppDeploy = (meta: { name: string; description: string }) => {
    const newApp: AppItem = {
      id: Date.now().toString(),
      name: meta.name,
      description: meta.description || "새로운 앱",
      createdAt: new Date().toISOString(),
      status: "active",
    };

    setApps((prev) => [...prev, newApp]);
    setStep(STEPS.LIST);
  };

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
              onDeploy={handleAppDeploy}
            />
          </div>
        </div>
      )}
      {step === STEPS.LIST && (
        <AppListView apps={apps} onCreateNew={() => setStep(STEPS.COMPOSE)} />
      )}
    </div>
  );
}

export default App;
