import { useState, useEffect } from "react";
import { type Message } from "@/components/ChatPanel";
import { type LegalSection } from "@/components/LegalOutputPanel";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string; 
  messages: Message[];
  sections: LegalSection[]; 
}

export function useChatStorage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isTemporary, setIsTemporary] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Securely pull in global auth state
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    // Hold fetching sequence until the Auth engine fully boots
    if (authLoading) return;

    if (!user) {
      setSessions([]);
      setIsLoaded(true);
      return;
    }

    // Initial fetch from Supabase Cloud specifically for this user
    const fetchSessions = async () => {
      try {
        const { data, error } = await supabase
          .from('sessions')
          .select('*')
          .eq('user_id', user.id) // Restricts query to authenticated profile ONLY
          .order('created_at', { ascending: true });
          
        if (!error && data) {
          const mappedSessions: ChatSession[] = data.map(d => ({
            id: d.id,
            title: d.title,
            createdAt: d.created_at,
            messages: d.messages || [],
            sections: d.sections || [],
          }));
          setSessions(mappedSessions);
        } else if (error) {
          console.error("Supabase fetch error:", error);
        }
      } finally {
        setIsLoaded(true); // Flag that DB has responded
      }
    };
    
    fetchSessions();
  }, [user, authLoading]);

  const saveSessions = async (newSessions: ChatSession[], syncTarget?: ChatSession) => {
    setSessions(newSessions);
    
    // Safety abort if not authenticated
    if (!user) return;

    // Strictly sync current session directly to this exact user's profile
    if (syncTarget && !isTemporary) {
      const { error } = await supabase.from('sessions').upsert({
        id: syncTarget.id,
        user_id: user.id, // Secure profile identity binding
        title: syncTarget.title,
        messages: syncTarget.messages,
        sections: syncTarget.sections,
        created_at: syncTarget.createdAt
      });
      if (error) console.error("Supabase upsert error:", error);
    }
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
      saveSessions([...sessions, emptySession], emptySession);
    }
    setCurrentSessionId(newId);
    return newId;
  };

  const updateCurrentSession = (messages: Message[], sections: LegalSection[] = []) => {
    if (isTemporary || !currentSessionId) return;

    let targetSession: ChatSession | null = null;
    const newSessions = sessions.map((s) => {
      if (s.id === currentSessionId) {
        let title = s.title;
        if (title === "New Chat" && messages.length > 0) {
          const firstUserMsg = messages.find((m) => m.role === "user");
          if (firstUserMsg) {
            title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? "..." : "");
          }
        }
        targetSession = { ...s, title, messages, sections };
        return targetSession;
      }
      return s;
    });
    
    if (targetSession) {
      saveSessions(newSessions, targetSession);
    }
  };

  const loadSession = (id: string) => {
    setCurrentSessionId(id);
    setIsTemporary(false);
  };

  const deleteSession = async (id: string) => {
    const newSessions = sessions.filter((s) => s.id !== id);
    setSessions(newSessions);
    if (currentSessionId === id) {
      setCurrentSessionId(null);
    }
    if (user) await supabase.from('sessions').delete().eq('id', id).eq('user_id', user.id);
  };

  const clearHistory = async () => {
    setSessions([]);
    setCurrentSessionId(null);
    if (user) await supabase.from('sessions').delete().eq('user_id', user.id);
  };

  const toggleTemporary = () => {
    setIsTemporary((prev) => {
      const next = !prev;
      if (next) {
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
    isLoaded,
    createSession,
    updateCurrentSession,
    loadSession,
    deleteSession,
    clearHistory,
    toggleTemporary,
  };
}
