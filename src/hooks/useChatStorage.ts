import { useState, useEffect } from "react";
import { Message } from "@/components/ChatPanel";
import { LegalSection } from "@/components/LegalOutputPanel";

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string; // ISO string to map to Date easily
  messages: Message[];
  sections: LegalSection[]; // Accumulated sections if any
}

export function useChatStorage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isTemporary, setIsTemporary] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("evakil_chats");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessions(parsed);
      } catch (e) {
        console.error("Failed to parse chat storage", e);
      }
    }
  }, []);

  const saveSessions = (newSessions: ChatSession[]) => {
    setSessions(newSessions);
    localStorage.setItem("evakil_chats", JSON.stringify(newSessions));
  };

  const createSession = () => {
    const newId = `session-${Date.now()}`;
    if (!isTemporary) {
      const emptySession: ChatSession = {
        id: newId,
        title: "New Chat",
        createdAt: new Date().toISOString(),
        messages: [],
        sections: [],
      };
      saveSessions([...sessions, emptySession]);
    }
    setCurrentSessionId(newId);
    return newId;
  };

  const updateCurrentSession = (messages: Message[], sections: LegalSection[] = []) => {
    if (isTemporary || !currentSessionId) return;

    const newSessions = sessions.map((s) => {
      if (s.id === currentSessionId) {
        // Generate a title based on the first user message if it's currently "New Chat"
        let title = s.title;
        if (title === "New Chat" && messages.length > 0) {
          const firstUserMsg = messages.find((m) => m.role === "user");
          if (firstUserMsg) {
            title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? "..." : "");
          }
        }
        return { ...s, title, messages, sections };
      }
      return s;
    });
    saveSessions(newSessions);
  };

  const loadSession = (id: string) => {
    setCurrentSessionId(id);
    setIsTemporary(false);
  };

  const deleteSession = (id: string) => {
    const newSessions = sessions.filter((s) => s.id !== id);
    saveSessions(newSessions);
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
  };

  const clearHistory = () => {
    saveSessions([]);
    setCurrentSessionId(null);
  };

  const toggleTemporary = () => {
    setIsTemporary((prev) => {
      const next = !prev;
      if (next) {
        // Switching to temporary chat removes active link to persistent session
        setCurrentSessionId(null);
      } else {
        createSession();
      }
      return next;
    });
  };

  return {
    sessions,
    currentSessionId,
    isTemporary,
    createSession,
    updateCurrentSession,
    loadSession,
    deleteSession,
    clearHistory,
    toggleTemporary,
  };
}
