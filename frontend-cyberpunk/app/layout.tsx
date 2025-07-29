"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { CommandPalette } from "@/components/command-palette";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppContext } from "@/lib/context";
import { useIsMobile } from "@/hooks/use-media-query";
import { Chat } from "@/lib/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);
  const { apps, chats, addChat } = useAppContext();
  const isMobile = useIsMobile();

  // 현재 선택된 채팅 ID 가져오기
  const getCurrentChatId = () => {
    if (pathname.startsWith('/chat/')) {
      return pathname.split('/')[2];
    }
    return null;
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: "New App Creation", 
      messages: [],
      createdAt: new Date().toISOString(),
    };

    addChat(newChat);
    router.push(`/chat/${newChat.id}`);
  };

  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const handleAppClick = (appId: string) => {
    router.push(`/apps/${appId}`);
  };

  const handleDashboardClick = () => {
    router.push("/");
  };

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen bg-cyber-main text-white overflow-hidden w-full">
        <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-cyber-main/80 backdrop-blur-md border-b border-cyber-hover">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center gap-4">
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-[#ff0040] to-[#ff6600] bg-clip-text text-transparent">
                MHUB
              </span>

              <SidebarTrigger className="hover:bg-cyber-hover h-8 w-8 md:h-10 md:w-10" />
            </div>
          </div>
        </nav>

        <AppSidebar
          chats={chats}
          onNewChat={handleNewChat}
          onChatClick={handleChatClick}
          onDashboardClick={handleDashboardClick}
          selectedChatId={getCurrentChatId()}
        />

        <main
          className="main-content flex-1 pt-12 min-h-screen transition-all duration-300 ease-out"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.03) 0%, rgba(0, 0, 0, 0) 70%), radial-gradient(circle at 85% 20%, rgba(255, 0, 128, 0.03) 0%, rgba(0, 0, 0, 0) 70%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {children}
        </main>

        <CommandPalette
          open={commandOpen}
          onOpenChange={setCommandOpen}
          onNewChat={handleNewChat}
          onDashboard={handleDashboardClick}
          apps={apps}
          chats={chats}
          onAppClick={handleAppClick}
          onChatClick={handleChatClick}
        />
      </div>
    </SidebarProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>MHUB - AI App Builder</title>
        <meta name="description" content="Create and manage AI-powered applications with cyberpunk style" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cyber-main text-white`}
      >
        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
        </AppProvider>
      </body>
    </html>
  );
}
