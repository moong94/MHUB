import React, { useState } from "react";
import { Button } from "./ui/button";

interface AppDeployFormProps {
  onPrev?: () => void;
  onDeploy?: (meta: { name: string; description: string }) => void;
}

function AppDeployForm({ onPrev, onDeploy }: AppDeployFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6 items-center">
      <h2 className="text-2xl font-bold text-[#1a3a3a] mb-2">
        앱 메타데이터 입력
      </h2>
      <div className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            앱 이름
          </label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
            placeholder="예: 나만의 챗봇"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            앱 설명
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] resize-none"
            placeholder="앱의 주요 기능, 목적 등을 간단히 적어주세요."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-center w-full mt-4">
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
          onClick={() => onDeploy && onDeploy({ name, description })}
          disabled={!name.trim()}
        >
          배포하기
        </Button>
      </div>
    </div>
  );
}

export default AppDeployForm;
