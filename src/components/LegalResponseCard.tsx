import { useState } from "react";
import { ChevronDown, Shield, BookOpen, Gavel, MapPin, Wrench } from "lucide-react";

interface LegalSection {
  id: string;
  sectionName: string;
  confidence: number;
  applicableLaw: string;
  explanation: string;
  punishment: string;
  whatToDo: string;
  whereToFile: string;
}

interface LegalResponseCardProps {
  section: LegalSection;
  index: number;
}

const ConfidenceBadge = ({ value }: { value: number }) => {
  const cls =
    value >= 75 ? "badge-high" : value >= 50 ? "badge-medium" : "badge-low";
  return (
    <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${cls}`}>
      {value}% Confidence
    </span>
  );
};

interface CollapsibleBlockProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleBlock = ({ icon, label, children, defaultOpen = false }: CollapsibleBlockProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/5 bg-white/[0.01] rounded-[16px] overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors text-left"
      >
        <div className="flex items-center gap-3 text-white/90 font-sans font-medium text-[13px] tracking-wide uppercase">
          <span className="text-primary">{icon}</span>
          {label}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-[14px] text-white/70 font-sans leading-relaxed border-t border-white/5 pt-4 bg-black/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LegalResponseCard = ({ section, index }: LegalResponseCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white/[0.03] border border-white/10 rounded-[20px] overflow-hidden animate-fade-in shadow-xl hover:border-primary/20 transition-colors duration-500"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between p-5 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block shadow-[0_0_8px_hsl(var(--primary))]" />
            <h3 className="font-display font-medium text-white/95 text-lg tracking-wide">
              {section.sectionName}
            </h3>
          </div>
          <ConfidenceBadge value={section.confidence} />
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] text-primary hover:text-white uppercase tracking-widest font-sans font-medium flex items-center gap-1.5 transition-colors mt-0.5 border border-primary/20 hover:border-white/20 px-3 py-1.5 rounded-full"
        >
          {expanded ? "Collapse" : "View Details"}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Quick law preview */}
      <div className="px-5 pb-5">
        <p className="text-[13px] font-sans text-white/50 leading-relaxed font-light line-clamp-2">
          {section.applicableLaw}
        </p>
      </div>

      {/* Expanded Details */}
      <div 
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 space-y-3 border-t border-white/5 pt-5">
            <CollapsibleBlock icon={<Shield className="w-3.5 h-3.5" />} label="📌 Applicable Law" defaultOpen>
              {section.applicableLaw}
            </CollapsibleBlock>
            <CollapsibleBlock icon={<BookOpen className="w-3.5 h-3.5" />} label="📖 Explanation in Simple Terms" defaultOpen>
              {section.explanation}
            </CollapsibleBlock>
            <CollapsibleBlock icon={<Gavel className="w-3.5 h-3.5" />} label="⚖ Possible Punishment">
              {section.punishment}
            </CollapsibleBlock>
            <CollapsibleBlock icon={<Wrench className="w-3.5 h-3.5" />} label="🛠 What You Can Do">
              {section.whatToDo}
            </CollapsibleBlock>
            <CollapsibleBlock icon={<MapPin className="w-3.5 h-3.5" />} label="🏛 Where to File Complaint">
              {section.whereToFile}
            </CollapsibleBlock>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalResponseCard;
