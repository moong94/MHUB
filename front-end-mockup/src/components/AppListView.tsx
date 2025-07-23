import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, CheckCircle, XCircle } from "lucide-react";

interface AppItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: "active" | "inactive";
}

interface AppListViewProps {
  apps: AppItem[];
  onCreateNew: () => void;
}

const AppListView: React.FC<AppListViewProps> = ({ apps, onCreateNew }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a3a3a] mb-2">내 앱 목록</h1>
          <p className="text-gray-600">{apps.length}개의 앱이 있습니다</p>
        </div>
        <Button
          onClick={onCreateNew}
          className="flex items-center gap-2 bg-[#1a3a3a] hover:bg-[#2a4a4a] text-white"
        >
          <Plus size={20} />새 앱 만들기
        </Button>
      </div>

      {/* 앱 목록 */}
      {apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Plus size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            아직 만든 앱이 없습니다
          </h3>
          <p className="text-gray-600 mb-6">첫 번째 앱을 만들어보세요!</p>
          <Button
            onClick={onCreateNew}
            className="bg-[#1a3a3a] hover:bg-[#2a4a4a] text-white"
          >
            앱 만들기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              {/* 앱 상태 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {app.status === "active" ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={16} className="text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      app.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {app.status === "active" ? "활성" : "비활성"}
                  </span>
                </div>
              </div>

              {/* 앱 정보 */}
              <h3 className="text-xl font-semibold text-[#1a3a3a] mb-2">
                {app.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {app.description}
              </p>

              {/* 생성 날짜 */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={14} />
                {formatDate(app.createdAt)}
              </div>

              {/* 액션 버튼들 */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  수정
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppListView;
