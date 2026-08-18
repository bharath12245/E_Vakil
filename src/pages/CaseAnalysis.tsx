import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, ArrowLeft, Menu, LogOut } from "lucide-react";
import { ChatPanel, type Message } from "@/components/ChatPanel";
import { Sidebar } from "@/components/Sidebar";
import { useChatStorage } from "@/hooks/useChatStorage";
import { VoiceInput } from "@/components/VoiceInput";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { generateLegalResponse } from "@/lib/gemini";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

// ── Component ──────────────────────────────────────────────────────────────────
export const CaseAnalysis = () => {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { user, isLoading: isAuthLoading, logout } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate("/auth");
    }
  }, [user, isAuthLoading, navigate]);

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Session Management ──
  const {
    sessions, currentSessionId, isTemporary, isLoaded,
    createSession, updateCurrentSession, loadSession, deleteSession, toggleTemporary
  } = useChatStorage();

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  // Initialize first session automatically if needed
  useEffect(() => {
    if (!isLoaded) return; // Wait for Supabase to finish fetching!

    if (!currentSessionId && sessions.length === 0 && !isTemporary) {
      createSession();
    } else if (!currentSessionId && sessions.length > 0 && !isTemporary) {
      loadSession(sessions[0].id); // Load most recent
    } else if (!currentSessionId && isTemporary) {
      // It handles itself
    }
  }, [sessions, currentSessionId, isTemporary, isLoaded, createSession, loadSession]);


  const simulateAIResponse = async (currentMsgs: Message[], userInput: string) => {
    setIsLoading(true);

    // Get the response directly from Google Gemini Live!
    const { replyText, sections } = await generateLegalResponse(currentMsgs.slice(0, -1), userInput);

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: "assistant",
      content: replyText,
      timestamp: new Date(),
      sections: sections,
    };
    
    const updatedMsgs = [...currentMsgs, aiMsg];
    updateCurrentSession(updatedMsgs, sections);
    setIsLoading(false);
  };

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;
    
    // Ensure we have a session to write to
    if (!currentSessionId && !isTemporary) {
      createSession();
    }

    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", content: text, timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    updateCurrentSession(newMessages, currentSession?.sections || []);
    
    setInputValue("");
    simulateAIResponse(newMessages, text);
  };

  const handleVoiceTranscript = (text: string) => {
    setInputValue(text);
    inputRef.current?.focus();
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex bg-[#050505] selection:bg-primary/30 overflow-hidden text-white/90">
      
      {/* ── Sidebar ── */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        isTemporary={isTemporary}
        onSelectSession={loadSession}
        onNewChat={createSession}
        onDeleteSession={deleteSession}
        onToggleTemporary={toggleTemporary}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* ── Main Chat Area ── */}
      <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
        {/* Top Header */}
        <header className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center transition-all bg-[#0a0a0a]/80 backdrop-blur-md shadow-lg"
            >
              <Menu className="w-4 h-4 text-white/70" />
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 flex items-center gap-2 transition-all bg-[#0a0a0a]/80 backdrop-blur-md shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-white/70" />
              <span className="font-display font-medium text-white/80 text-sm tracking-wide">Back to Home</span>
            </button>
          </div>
          <div className="flex items-center gap-4 pointer-events-auto">
            <LanguageSwitcher />

            <button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-full border border-destructive/20 hover:bg-destructive/10 flex items-center gap-2 transition-all bg-[#0a0a0a]/80 backdrop-blur-md shadow-lg group"
            >
              <LogOut className="w-3.5 h-3.5 text-destructive/70 group-hover:text-destructive" />
              <span className="font-sans text-[11px] font-medium tracking-widest text-destructive/70 group-hover:text-destructive uppercase">Exit Secure Vault</span>
            </button>

            <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
              <span className={`w-2 h-2 rounded-full ${isLoading ? "bg-gold animate-bounce shadow-[0_0_10px_hsl(var(--gold))]" : "bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary))]"}`} />
              <span className="font-sans text-[11px] font-medium tracking-widest text-primary uppercase">{isLoading ? "Thinking..." : t.aiActive}</span>
            </div>
          </div>
        </header>

        {/* Ambient Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Chat Feed (Centered Content) */}
        <div className="flex-1 overflow-y-auto scrollbar-custom scroll-smooth pt-20 flex justify-center">
          <div className="w-full max-w-3xl pb-[200px]">
            <ChatPanel 
              messages={messages} 
              isLoading={isLoading} 
              emptyTitle={t.chatEmptyTitle} 
              emptyDesc={isTemporary ? "Temporary Chat Enabled. This conversation will not be saved." : t.chatEmptyDesc} 
            />
          </div>
        </div>

        {/* Floating Input Dock */}
        <div className="absolute bottom-0 left-0 right-0 pt-10 pb-8 px-4 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent flex justify-center pointer-events-none">
          <div className="w-full max-w-3xl pointer-events-auto relative">
            <div className="flex items-end gap-2 p-2 bg-[#0a0a0a]/90 backdrop-blur-xl rounded-2xl border border-white/10 focus-within:border-primary/50 focus-within:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-300 shadow-2xl">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t.inputPlaceholder}
                disabled={isLoading}
                className="flex-1 bg-transparent px-5 py-4 font-sans text-sm md:text-base text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50"
              />
              <div className="flex items-center gap-1 mb-0.5 mr-0.5">
                <VoiceInput
                  onTranscript={handleVoiceTranscript}
                  disabled={isLoading}
                  speechLang={lang.speechLang}
                  inline={true}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center hover:bg-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 group shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                >
                  <Send className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <span className="font-sans text-[10px] text-white/30 tracking-wide font-light">{t.disclaimerShort}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CaseAnalysis;
