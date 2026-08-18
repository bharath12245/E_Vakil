import { Clock, MessageSquare, Plus, Trash2, Ghost } from "lucide-react";
import { ChatSession } from "@/hooks/useChatStorage";

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isTemporary: boolean;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onToggleTemporary: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({
  sessions,
  currentSessionId,
  isTemporary,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onToggleTemporary,
  isOpen,
  setIsOpen,
}: SidebarProps) => {
  return (
    <div
      className={`fixed md:relative z-40 h-full bg-[#030303] border-r border-white/5 transition-all duration-300 flex flex-col ${
        isOpen ? "w-72 left-0" : "-left-72 md:left-0 md:w-0 overflow-hidden"
      }`}
    >
      <div className="p-4 flex-shrink-0">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.08] transition-colors rounded-xl border border-white/10 text-white/90 text-sm font-sans font-medium"
        >
          <Plus className="w-4 h-4 text-white/50" />
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-custom">
        {sessions.length === 0 && !isTemporary && (
          <div className="text-center px-4 py-8 text-white/30 text-xs font-sans">
            No history yet. Start a conversation.
          </div>
        )}

        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
              currentSessionId === session.id && !isTemporary
                ? "bg-white/[0.08] text-white"
                : "text-white/60 hover:bg-white/[0.03] hover:text-white/90"
            }`}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-50" />
              <span className="truncate text-sm font-sans font-light select-none">
                {session.title}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSession(session.id);
              }}
              className={`opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity p-1`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/5 flex-shrink-0">
        <button
          onClick={onToggleTemporary}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-sans font-medium ${
            isTemporary
              ? "bg-primary/10 border-primary/20 text-primary"
              : "bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/[0.05]"
          }`}
        >
          <div className="flex items-center gap-3">
            <Ghost className={`w-4 h-4 ${isTemporary ? "text-primary" : "opacity-50"}`} />
            Temporary Chat
          </div>
          {isTemporary && (
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
        </button>
      </div>

      {/* Mobile close button overlay would normally go here, but omitted for simplicity. Handled by generic clicks in wrapper. */}
    </div>
  );
};
