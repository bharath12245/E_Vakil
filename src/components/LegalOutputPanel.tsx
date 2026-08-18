import { FileText } from "lucide-react";
import { LegalResponseCard } from "./LegalResponseCard";
import { FollowUpChips } from "./FollowUpChips";

export interface LegalSection {
  id: string;
  sectionName: string;
  confidence: number;
  applicableLaw: string;
  explanation: string;
  punishment: string;
  whatToDo: string;
  whereToFile: string;
}

interface LegalOutputPanelProps {
  sections: LegalSection[];
  followUpQuestions?: { id: string; label: string }[];
  onFollowUp?: (question: string) => void;
  isLoading?: boolean;
  outputPanelTitle?: string;
  emptyTitle?: string;
  emptyDesc?: string;
  followUpLabel?: string;
  disclaimerShort?: string;
}

export const LegalOutputPanel = ({
  sections,
  followUpQuestions,
  onFollowUp,
  isLoading,
  outputPanelTitle = "Structured Legal Analysis",
  emptyTitle = "Legal analysis appears here",
  emptyDesc = "After you describe your issue, applicable sections of law will be identified and displayed as structured cards.",
  followUpLabel = "Clarification needed — please select:",
  disclaimerShort = "⚖ e-Vakil provides legal educational guidance and does not deliver judicial decisions or replace professional legal advice.",
}: LegalOutputPanelProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border/50 flex items-center gap-2 flex-shrink-0">
        <div className="w-1 h-4 rounded-full bg-gold" />
        <h2 className="font-display text-sm font-semibold text-foreground">{outputPanelTitle}</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom p-4 space-y-3">
        {!isLoading && sections.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 py-12 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <p className="font-display text-foreground/70 text-base">{emptyTitle}</p>
            <p className="font-sans text-muted-foreground text-xs max-w-xs leading-relaxed">{emptyDesc}</p>
          </div>
        )}

        {isLoading && (
          <div className="space-y-3 animate-fade-in">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card rounded-xl p-4 space-y-2" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-3 bg-muted rounded w-1/3 animate-pulse" />
                <div className="h-3 bg-muted rounded w-full animate-pulse" />
                <div className="h-3 bg-muted rounded w-4/5 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {sections.map((section, idx) => (
          <LegalResponseCard key={section.id} section={section} index={idx} />
        ))}

        {!isLoading && followUpQuestions && followUpQuestions.length > 0 && onFollowUp && (
          <div className="pt-2">
            <FollowUpChips questions={followUpQuestions} onSelect={onFollowUp} label={followUpLabel} />
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-border/30 flex-shrink-0">
        <p className="font-sans text-[10px] text-muted-foreground leading-relaxed text-center">{disclaimerShort}</p>
      </div>
    </div>
  );
};

export default LegalOutputPanel;
