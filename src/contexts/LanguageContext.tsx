import React, { createContext, useContext, useState } from "react";

// ── Language codes ────────────────────────────────────────────────────────────
export type LangCode = "en" | "hi" | "ta" | "te" | "bn";

export interface Language {
  code: LangCode;
  label: string;          // Display name in own script
  labelEn: string;        // English name for tooltips
  speechLang: string;     // BCP-47 for Web Speech API
  dir: "ltr" | "rtl";
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English",    labelEn: "English",  speechLang: "en-IN", dir: "ltr" },
  { code: "hi", label: "हिन्दी",      labelEn: "Hindi",    speechLang: "hi-IN", dir: "ltr" },
  { code: "ta", label: "தமிழ்",       labelEn: "Tamil",    speechLang: "ta-IN", dir: "ltr" },
  { code: "te", label: "తెలుగు",      labelEn: "Telugu",   speechLang: "te-IN", dir: "ltr" },
  { code: "bn", label: "বাংলা",       labelEn: "Bengali",  speechLang: "bn-IN", dir: "ltr" },
];

// ── Translation map ───────────────────────────────────────────────────────────
export interface Translations {
  // Navbar
  navDomains: string;
  navAbout: string;
  navStartAnalysis: string;
  navBeta: string;

  // Hero
  heroTag: string;
  heroSubtitle: string;
  heroDesc: string;
  heroCta: string;
  pillMVA: string;
  pillIT: string;
  pillIPC: string;

  // Domain section
  domainsLabel: string;
  domainsTitle: string;
  domainsSubtitle: string;
  domainExplore: string;
  domainMVATitle: string;
  domainMVADesc: string;
  domainITTitle: string;
  domainITDesc: string;
  domainIPCTitle: string;
  domainIPCDesc: string;

  // How it works
  howLabel: string;
  howTitle: string;
  step1Title: string; step1Desc: string;
  step2Title: string; step2Desc: string;
  step3Title: string; step3Desc: string;

  // Footer / disclaimer
  disclaimer: string;

  // Case Analysis
  caseTitle: string;
  chatPanelTitle: string;
  outputPanelTitle: string;
  aiActive: string;
  chatEmptyTitle: string;
  chatEmptyDesc: string;
  inputPlaceholder: string;

  // Voice
  voiceListening: string;
  voiceInactive: string;

  // Legal output
  outputEmptyTitle: string;
  outputEmptyDesc: string;
  followUpLabel: string;
  disclaimerShort: string;

  // Legal card
  viewDetails: string;
  collapse: string;
  confidenceLabel: string;
}

const T: Record<LangCode, Translations> = {
  en: {
    navDomains: "Domains",
    navAbout: "About",
    navStartAnalysis: "Start Analysis",
    navBeta: "BETA",

    heroTag: "AI Legal Education Platform",
    heroSubtitle: "AI Legal Education Assistant for Indian Citizens",
    heroDesc: "Understand your legal rights. Learn applicable laws. Take informed action. Powered by AI, grounded in Indian law.",
    heroCta: "Start Case Analysis",
    pillMVA: "Motor Vehicles Act",
    pillIT: "IT Act 2000",
    pillIPC: "Indian Penal Code",

    domainsLabel: "Legal Domains",
    domainsTitle: "Areas of Legal Guidance",
    domainsSubtitle: "Select a domain or let e-Vakil automatically identify the applicable area of law based on your description.",
    domainExplore: "Explore domain",
    domainMVATitle: "Motor Vehicles Act",
    domainMVADesc: "Traffic violations, accident liability, insurance claims, licensing issues, and vehicular offences under MV Act 1988.",
    domainITTitle: "Cyber Crime — IT Act",
    domainITDesc: "Online fraud, data theft, cyberbullying, phishing, identity theft, and digital offences under IT Act 2000.",
    domainIPCTitle: "Indian Penal Code",
    domainIPCDesc: "Criminal offences, assault, fraud, cheating, extortion, domestic violence, and IPC provisions explained simply.",

    howLabel: "How It Works",
    howTitle: "Three Steps to Legal Clarity",
    step1Title: "Describe Your Issue",
    step1Desc: "Type or speak your legal situation in plain language — no legal jargon required.",
    step2Title: "AI Analyses the Law",
    step2Desc: "e-Vakil identifies applicable sections across Motor Vehicles Act, IT Act, and IPC.",
    step3Title: "Take Informed Action",
    step3Desc: "Get structured guidance on your rights, penalties, and where to file complaints.",

    disclaimer: "e-Vakil provides legal educational guidance and does not deliver judicial decisions or replace professional legal advice. Always consult a qualified advocate for legal representation.",

    caseTitle: "Case Analysis",
    chatPanelTitle: "Case Description",
    outputPanelTitle: "Structured Legal Analysis",
    aiActive: "AI Active",
    chatEmptyTitle: "Describe your legal situation",
    chatEmptyDesc: "Type or speak your issue and e-Vakil will identify applicable laws and guide you.",
    inputPlaceholder: "Describe your legal situation...",

    voiceListening: "Listening...",
    voiceInactive: "Voice Inactive",

    outputEmptyTitle: "Legal analysis appears here",
    outputEmptyDesc: "After you describe your issue, applicable sections of law will be identified and displayed as structured cards.",
    followUpLabel: "Clarification needed — please select:",
    disclaimerShort: "⚖ e-Vakil provides legal educational guidance and does not deliver judicial decisions or replace professional legal advice.",

    viewDetails: "View Details",
    collapse: "Collapse",
    confidenceLabel: "Confidence",
  },

  hi: {
    navDomains: "क्षेत्र",
    navAbout: "परिचय",
    navStartAnalysis: "विश्लेषण शुरू करें",
    navBeta: "बीटा",

    heroTag: "AI कानूनी शिक्षा मंच",
    heroSubtitle: "भारतीय नागरिकों के लिए AI कानूनी सहायक",
    heroDesc: "अपने कानूनी अधिकार समझें। लागू कानून जानें। सूचित निर्णय लें। AI द्वारा संचालित, भारतीय कानून पर आधारित।",
    heroCta: "केस विश्लेषण शुरू करें",
    pillMVA: "मोटर वाहन अधिनियम",
    pillIT: "आईटी अधिनियम 2000",
    pillIPC: "भारतीय दंड संहिता",

    domainsLabel: "कानूनी क्षेत्र",
    domainsTitle: "कानूनी मार्गदर्शन के क्षेत्र",
    domainsSubtitle: "कोई क्षेत्र चुनें या e-Vakil को आपके विवरण के आधार पर स्वचालित रूप से पहचानने दें।",
    domainExplore: "क्षेत्र देखें",
    domainMVATitle: "मोटर वाहन अधिनियम",
    domainMVADesc: "यातायात उल्लंघन, दुर्घटना दायित्व, बीमा दावे, लाइसेंस समस्याएं और MV Act 1988 के तहत वाहन अपराध।",
    domainITTitle: "साइबर अपराध — आईटी अधिनियम",
    domainITDesc: "ऑनलाइन धोखाधड़ी, डेटा चोरी, साइबरबुलिंग, फिशिंग, पहचान चोरी और IT Act 2000 के तहत डिजिटल अपराध।",
    domainIPCTitle: "भारतीय दंड संहिता",
    domainIPCDesc: "आपराधिक अपराध, हमला, धोखाधड़ी, जबरन वसूली, घरेलू हिंसा और IPC प्रावधान सरल भाषा में।",

    howLabel: "कैसे काम करता है",
    howTitle: "कानूनी स्पष्टता के तीन चरण",
    step1Title: "अपनी समस्या बताएं",
    step1Desc: "अपनी कानूनी स्थिति सरल भाषा में टाइप करें या बोलें — कोई कानूनी शब्दावली आवश्यक नहीं।",
    step2Title: "AI कानून का विश्लेषण करेगा",
    step2Desc: "e-Vakil मोटर वाहन अधिनियम, आईटी अधिनियम और IPC में लागू धाराओं की पहचान करेगा।",
    step3Title: "सूचित कार्रवाई करें",
    step3Desc: "अपने अधिकारों, दंड और शिकायत दर्ज करने की जगह पर संरचित मार्गदर्शन प्राप्त करें।",

    disclaimer: "e-Vakil कानूनी शैक्षिक मार्गदर्शन प्रदान करता है और न्यायिक निर्णय नहीं देता है या पेशेवर कानूनी सलाह का विकल्प नहीं है। कानूनी प्रतिनिधित्व के लिए हमेशा किसी योग्य अधिवक्ता से परामर्श लें।",

    caseTitle: "केस विश्लेषण",
    chatPanelTitle: "केस विवरण",
    outputPanelTitle: "संरचित कानूनी विश्लेषण",
    aiActive: "AI सक्रिय",
    chatEmptyTitle: "अपनी कानूनी स्थिति बताएं",
    chatEmptyDesc: "अपनी समस्या टाइप करें या बोलें और e-Vakil लागू कानूनों की पहचान करेगा।",
    inputPlaceholder: "अपनी कानूनी स्थिति बताएं...",

    voiceListening: "सुन रहा है...",
    voiceInactive: "आवाज़ निष्क्रिय",

    outputEmptyTitle: "कानूनी विश्लेषण यहाँ दिखेगा",
    outputEmptyDesc: "आपकी समस्या बताने के बाद, लागू कानून की धाराएं संरचित कार्डों के रूप में दिखाई जाएंगी।",
    followUpLabel: "स्पष्टीकरण आवश्यक — कृपया चुनें:",
    disclaimerShort: "⚖ e-Vakil कानूनी शैक्षिक मार्गदर्शन प्रदान करता है और न्यायिक निर्णय या पेशेवर कानूनी सलाह का विकल्प नहीं है।",

    viewDetails: "विवरण देखें",
    collapse: "संकुचित करें",
    confidenceLabel: "विश्वसनीयता",
  },

  ta: {
    navDomains: "துறைகள்",
    navAbout: "பற்றி",
    navStartAnalysis: "பகுப்பாய்வு தொடங்கு",
    navBeta: "பீட்டா",

    heroTag: "AI சட்ட கல்வி தளம்",
    heroSubtitle: "இந்திய குடிமக்களுக்கான AI சட்ட உதவியாளர்",
    heroDesc: "உங்கள் சட்ட உரிமைகளை புரிந்துகொள்ளுங்கள். பொருந்தும் சட்டங்களை அறியுங்கள். தகவலறிந்த நடவடிக்கை எடுங்கள்.",
    heroCta: "வழக்கு பகுப்பாய்வு தொடங்கு",
    pillMVA: "மோட்டார் வாகன சட்டம்",
    pillIT: "IT சட்டம் 2000",
    pillIPC: "இந்திய தண்டனைச் சட்டம்",

    domainsLabel: "சட்ட துறைகள்",
    domainsTitle: "சட்ட வழிகாட்டுதல் துறைகள்",
    domainsSubtitle: "ஒரு துறையை தேர்வுசெய்யுங்கள் அல்லது e-Vakil தானாக பொருந்தும் சட்ட துறையை அடையாளம் காணட்டும்.",
    domainExplore: "துறையை ஆராய",
    domainMVATitle: "மோட்டார் வாகன சட்டம்",
    domainMVADesc: "போக்குவரத்து மீறல்கள், விபத்து பொறுப்பு, காப்பீட்டு கோரிக்கைகள், உரிம சிக்கல்கள், MV சட்டம் 1988 கீழ் குற்றங்கள்.",
    domainITTitle: "சைபர் குற்றம் — IT சட்டம்",
    domainITDesc: "ஆன்லைன் மோசடி, தரவு திருட்டு, சைபர் கொடுமை, ஃபிஷிங், IT சட்டம் 2000 கீழ் டிஜிட்டல் குற்றங்கள்.",
    domainIPCTitle: "இந்திய தண்டனைச் சட்டம்",
    domainIPCDesc: "கிரிமினல் குற்றங்கள், தாக்குதல், மோசடி, மிரட்டல், குடும்ப வன்முறை, IPC விதிகள் எளிய மொழியில்.",

    howLabel: "எவ்வாறு செயல்படுகிறது",
    howTitle: "சட்ட தெளிவுக்கான மூன்று படிகள்",
    step1Title: "உங்கள் பிரச்சினையை விவரியுங்கள்",
    step1Desc: "உங்கள் சட்ட நிலைமையை எளிய மொழியில் தட்டச்சு செய்யுங்கள் அல்லது பேசுங்கள்.",
    step2Title: "AI சட்டத்தை பகுப்பாய்வு செய்யும்",
    step2Desc: "e-Vakil மோட்டார் வாகன சட்டம், IT சட்டம் மற்றும் IPC இல் பொருந்தும் பிரிவுகளை அடையாளம் காணும்.",
    step3Title: "தகவலறிந்த நடவடிக்கை எடுங்கள்",
    step3Desc: "உங்கள் உரிமைகள், தண்டனைகள் மற்றும் புகார் எங்கு செய்வது என்ற கட்டமைக்கப்பட்ட வழிகாட்டுதல் பெறுங்கள்.",

    disclaimer: "e-Vakil சட்ட கல்வி வழிகாட்டுதலை வழங்குகிறது மற்றும் நீதிமன்ற தீர்ப்புகளை வழங்காது அல்லது தொழில்முறை சட்ட ஆலோசனைக்கு மாற்றாக இல்லை.",

    caseTitle: "வழக்கு பகுப்பாய்வு",
    chatPanelTitle: "வழக்கு விவரம்",
    outputPanelTitle: "கட்டமைக்கப்பட்ட சட்ட பகுப்பாய்வு",
    aiActive: "AI செயல்படுகிறது",
    chatEmptyTitle: "உங்கள் சட்ட நிலைமையை விவரியுங்கள்",
    chatEmptyDesc: "உங்கள் பிரச்சினையை தட்டச்சு செய்யுங்கள் அல்லது பேசுங்கள், e-Vakil பொருந்தும் சட்டங்களை அடையாளம் காணும்.",
    inputPlaceholder: "உங்கள் சட்ட நிலைமையை விவரியுங்கள்...",

    voiceListening: "கேட்கிறது...",
    voiceInactive: "குரல் செயலிழந்தது",

    outputEmptyTitle: "சட்ட பகுப்பாய்வு இங்கே தோன்றும்",
    outputEmptyDesc: "உங்கள் பிரச்சினையை விவரித்த பிறகு, பொருந்தும் சட்ட பிரிவுகள் கட்டமைக்கப்பட்ட அட்டைகளாக காட்டப்படும்.",
    followUpLabel: "தெளிவுபடுத்தல் தேவை — தேர்வுசெய்யுங்கள்:",
    disclaimerShort: "⚖ e-Vakil சட்ட கல்வி வழிகாட்டுதலை வழங்குகிறது, நீதிமன்ற தீர்ப்புகளை அல்ல.",

    viewDetails: "விவரங்களை காண",
    collapse: "சுருக்கு",
    confidenceLabel: "நம்பகத்தன்மை",
  },

  te: {
    navDomains: "రంగాలు",
    navAbout: "గురించి",
    navStartAnalysis: "విశ్లేషణ ప్రారంభించు",
    navBeta: "బీటా",

    heroTag: "AI న్యాయ విద్యా వేదిక",
    heroSubtitle: "భారత పౌరులకు AI న్యాయ సహాయకుడు",
    heroDesc: "మీ చట్టపరమైన హక్కులను అర్థం చేసుకోండి. వర్తించే చట్టాలను తెలుసుకోండి. సమాచారంతో నిర్ణయాలు తీసుకోండి.",
    heroCta: "కేసు విశ్లేషణ ప్రారంభించు",
    pillMVA: "మోటారు వాహన చట్టం",
    pillIT: "IT చట్టం 2000",
    pillIPC: "భారతీయ శిక్షాస్మృతి",

    domainsLabel: "న్యాయ రంగాలు",
    domainsTitle: "న్యాయ మార్గదర్శకత రంగాలు",
    domainsSubtitle: "ఒక రంగాన్ని ఎంచుకోండి లేదా e-Vakil మీ వివరణ ఆధారంగా వర్తించే న్యాయ రంగాన్ని స్వయంచాలకంగా గుర్తించనివ్వండి.",
    domainExplore: "రంగం అన్వేషించు",
    domainMVATitle: "మోటారు వాహన చట్టం",
    domainMVADesc: "ట్రాఫిక్ నిబంధనల ఉల్లంఘన, ప్రమాద బాధ్యత, భీమా క్లెయిమ్‌లు, లైసెన్స్ సమస్యలు, MV చట్టం 1988 కింద నేరాలు.",
    domainITTitle: "సైబర్ నేరం — IT చట్టం",
    domainITDesc: "ఆన్‌లైన్ మోసం, డేటా దొంగతనం, సైబర్ వేధింపు, ఫిషింగ్, IT చట్టం 2000 కింద డిజిటల్ నేరాలు.",
    domainIPCTitle: "భారతీయ శిక్షాస్మృతి",
    domainIPCDesc: "నేరాలు, దాడి, మోసం, దోపిడీ, గృహ హింస మరియు IPC నిబంధనలు సరళమైన భాషలో వివరించబడ్డాయి.",

    howLabel: "ఎలా పని చేస్తుంది",
    howTitle: "న్యాయ స్పష్టత కోసం మూడు దశలు",
    step1Title: "మీ సమస్యను వివరించండి",
    step1Desc: "మీ న్యాయపరమైన పరిస్థితిని సరళమైన భాషలో టైప్ చేయండి లేదా మాట్లాడండి.",
    step2Title: "AI చట్టాన్ని విశ్లేషిస్తుంది",
    step2Desc: "e-Vakil మోటారు వాహన చట్టం, IT చట్టం మరియు IPCలో వర్తించే విభాగాలను గుర్తిస్తుంది.",
    step3Title: "సమాచారంతో చర్య తీసుకోండి",
    step3Desc: "మీ హక్కులు, శిక్షలు మరియు ఫిర్యాదు ఎక్కడ చేయాలో నిర్మాణాత్మక మార్గదర్శకత పొందండి.",

    disclaimer: "e-Vakil న్యాయ విద్యా మార్గదర్శకతను అందిస్తుంది మరియు న్యాయ నిర్ణయాలు ఇవ్వదు లేదా వృత్తిపరమైన న్యాయ సలహాకు ప్రత్యామ్నాయం కాదు.",

    caseTitle: "కేసు విశ్లేషణ",
    chatPanelTitle: "కేసు వివరణ",
    outputPanelTitle: "నిర్మాణాత్మక న్యాయ విశ్లేషణ",
    aiActive: "AI సక్రియంగా ఉంది",
    chatEmptyTitle: "మీ న్యాయపరమైన పరిస్థితిని వివరించండి",
    chatEmptyDesc: "మీ సమస్యను టైప్ చేయండి లేదా మాట్లాడండి, e-Vakil వర్తించే చట్టాలను గుర్తిస్తుంది.",
    inputPlaceholder: "మీ న్యాయపరమైన పరిస్థితిని వివరించండి...",

    voiceListening: "వింటోంది...",
    voiceInactive: "వాయిస్ నిష్క్రియంగా ఉంది",

    outputEmptyTitle: "న్యాయ విశ్లేషణ ఇక్కడ కనిపిస్తుంది",
    outputEmptyDesc: "మీ సమస్యను వివరించిన తర్వాత, వర్తించే చట్ట విభాగాలు నిర్మాణాత్మక కార్డులుగా ప్రదర్శించబడతాయి.",
    followUpLabel: "వివరణ అవసరం — దయచేసి ఎంచుకోండి:",
    disclaimerShort: "⚖ e-Vakil న్యాయ విద్యా మార్గదర్శకతను అందిస్తుంది, న్యాయ నిర్ణయాలు కాదు.",

    viewDetails: "వివరాలు చూడండి",
    collapse: "కుదించు",
    confidenceLabel: "విశ్వాసం",
  },

  bn: {
    navDomains: "বিভাগ",
    navAbout: "পরিচিতি",
    navStartAnalysis: "বিশ্লেষণ শুরু করুন",
    navBeta: "বিটা",

    heroTag: "AI আইন শিক্ষা প্ল্যাটফর্ম",
    heroSubtitle: "ভারতীয় নাগরিকদের জন্য AI আইনি সহায়তাকারী",
    heroDesc: "আপনার আইনি অধিকার বুঝুন। প্রযোজ্য আইন জানুন। সুচিন্তিত পদক্ষেপ নিন। AI-চালিত, ভারতীয় আইনে প্রোথিত।",
    heroCta: "মামলা বিশ্লেষণ শুরু করুন",
    pillMVA: "মোটর যানবাহন আইন",
    pillIT: "আইটি আইন ২০০০",
    pillIPC: "ভারতীয় দণ্ডবিধি",

    domainsLabel: "আইনি বিভাগ",
    domainsTitle: "আইনি নির্দেশনার ক্ষেত্র",
    domainsSubtitle: "একটি বিভাগ বেছে নিন অথবা e-Vakil কে আপনার বিবরণ থেকে স্বয়ংক্রিয়ভাবে প্রযোজ্য আইনি ক্ষেত্র শনাক্ত করতে দিন।",
    domainExplore: "বিভাগ অন্বেষণ করুন",
    domainMVATitle: "মোটর যানবাহন আইন",
    domainMVADesc: "ট্রাফিক লঙ্ঘন, দুর্ঘটনার দায়িত্ব, বীমা দাবি, লাইসেন্স সমস্যা এবং MV আইন ১৯৮৮-এর অধীনে যানবাহন অপরাধ।",
    domainITTitle: "সাইবার অপরাধ — আইটি আইন",
    domainITDesc: "অনলাইন প্রতারণা, ডেটা চুরি, সাইবার বুলিং, ফিশিং, পরিচয় চুরি এবং IT আইন ২০০০-এর অধীনে ডিজিটাল অপরাধ।",
    domainIPCTitle: "ভারতীয় দণ্ডবিধি",
    domainIPCDesc: "ফৌজদারি অপরাধ, আক্রমণ, প্রতারণা, জবরদস্তি, গৃহহিংসা এবং IPC বিধান সহজ ভাষায় ব্যাখ্যা।",

    howLabel: "কীভাবে কাজ করে",
    howTitle: "আইনি স্পষ্টতার তিনটি ধাপ",
    step1Title: "আপনার সমস্যা বর্ণনা করুন",
    step1Desc: "সরল ভাষায় আপনার আইনি পরিস্থিতি টাইপ করুন বা বলুন — কোনো আইনি পরিভাষা প্রয়োজন নেই।",
    step2Title: "AI আইন বিশ্লেষণ করবে",
    step2Desc: "e-Vakil মোটর যানবাহন আইন, আইটি আইন এবং IPC-তে প্রযোজ্য বিভাগগুলি চিহ্নিত করবে।",
    step3Title: "সুচিন্তিত পদক্ষেপ নিন",
    step3Desc: "আপনার অধিকার, জরিমানা এবং অভিযোগ কোথায় দায়ের করতে হবে সে বিষয়ে কাঠামোগত নির্দেশনা পান।",

    disclaimer: "e-Vakil আইনি শিক্ষামূলক নির্দেশনা প্রদান করে এবং বিচারিক সিদ্ধান্ত দেয় না বা পেশাদার আইনি পরামর্শের বিকল্প নয়।",

    caseTitle: "মামলা বিশ্লেষণ",
    chatPanelTitle: "মামলার বিবরণ",
    outputPanelTitle: "কাঠামোগত আইনি বিশ্লেষণ",
    aiActive: "AI সক্রিয়",
    chatEmptyTitle: "আপনার আইনি পরিস্থিতি বর্ণনা করুন",
    chatEmptyDesc: "আপনার সমস্যা টাইপ করুন বা বলুন এবং e-Vakil প্রযোজ্য আইন চিহ্নিত করবে।",
    inputPlaceholder: "আপনার আইনি পরিস্থিতি বর্ণনা করুন...",

    voiceListening: "শুনছে...",
    voiceInactive: "ভয়েস নিষ্ক্রিয়",

    outputEmptyTitle: "আইনি বিশ্লেষণ এখানে দেখাবে",
    outputEmptyDesc: "আপনার সমস্যা বর্ণনার পরে, প্রযোজ্য আইনের বিভাগগুলি কাঠামোগত কার্ড হিসেবে প্রদর্শিত হবে।",
    followUpLabel: "স্পষ্টীকরণ প্রয়োজন — দয়া করে বেছে নিন:",
    disclaimerShort: "⚖ e-Vakil আইনি শিক্ষামূলক নির্দেশনা প্রদান করে এবং বিচারিক সিদ্ধান্ত দেয় না।",

    viewDetails: "বিবরণ দেখুন",
    collapse: "সংকুচিত করুন",
    confidenceLabel: "বিশ্বাসযোগ্যতা",
  },
};

// ── Context ───────────────────────────────────────────────────────────────────
interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (code: LangCode) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [langCode, setLangCode] = useState<LangCode>("en");
  const lang = LANGUAGES.find((l) => l.code === langCode)!;
  const t = T[langCode];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang: setLangCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
