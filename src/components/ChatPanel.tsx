import { useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { LegalResponseCard } from "./LegalResponseCard";
import type { LegalSection } from "./LegalOutputPanel";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sections?: LegalSection[];
}

interface ChatPanelProps {
  messages: Message[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDesc?: string;
}

const TypingIndicator = () => (
  <div className="flex items-end gap-2 animate-fade-in">
    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
      <Bot className="w-4 h-4 text-primary" />
    </div>
    <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-sm">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  </div>
);

export const ChatPanel = ({ messages, isLoading, emptyTitle = "Describe your legal situation", emptyDesc = "Type or speak your issue and e-Vakil will identify applicable laws and guide you." }: ChatPanelProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="w-full space-y-6 p-6 mb-10">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12 animate-fade-in relative">
          <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div className="relative z-10 space-y-1">
            <p className="font-display text-white/90 text-2xl tracking-tight">{emptyTitle}</p>
            <p className="font-sans text-white/50 text-sm max-w-xs leading-relaxed font-light">{emptyDesc}</p>
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={msg.id}
          className={`flex items-end gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          style={{ animationDelay: `${idx * 0.05}s` }}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === "user" ? "bg-primary text-black" : "bg-white/[0.05] border border-white/10 text-primary"}`}>
            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
          <div className="flex flex-col gap-3 max-w-[85%]">
            <div
              className={`px-5 py-3.5 rounded-[20px] font-sans text-sm leading-relaxed shadow-xl ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-white/95 rounded-br-sm backdrop-blur-md self-end"
                  : "bg-white/[0.04] border border-white/10 text-white/80 rounded-bl-sm backdrop-blur-md"
              }`}
            >
              {msg.content}
              <div className={`text-[10px] mt-2 ${msg.role === "user" ? "text-primary/70 text-right" : "text-white/30 text-left"}`}>
                {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
            
            {/* Inline Rendering of Legal Components */}
            {msg.sections && msg.sections.length > 0 && (
              <div className="mt-2 space-y-4">
                {msg.sections.map((section, sIdx) => (
                  <LegalResponseCard key={section.id} section={section} index={sIdx} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && <TypingIndicator />}
      
      {/* 
        This empty block creates physical space at the bottom of the scroll container 
        so the final message stops well above the floating input dock. 
      */}
      <div ref={bottomRef} className="h-[250px] w-full flex-shrink-0 pointer-events-none" />
    </div>
  );
};

export default ChatPanel;
