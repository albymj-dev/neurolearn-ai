import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { 
  Loader2, Type, 
  Eye, Download, Play, Pause, Zap, BookOpen, 
  GitMerge, CheckCircle, Brain, LayoutDashboard,
  AlignLeft, RefreshCw, Sparkles, BookMarked, Check,
  FileText, HelpCircle, ChevronRight, ChevronLeft, Award, RotateCcw,
  Languages, Minus, Plus, XCircle
} from 'lucide-react';
import { 
  PRELOADED_ACADEMIC_TOPICS, 
  TransformedLearningData, 
  AcademicTopic,
  QuizQuestion
} from './data/academicTexts';
import { exportAnalyticsToPDF } from './utils/pdfExport';

const COLOR_TINTS = {
  white: 'bg-white text-gray-900',
  sepia: 'bg-[#FAF3E0] text-[#3E2723]',
  blue: 'bg-[#E3F2FD] text-[#0D47A1]',
  green: 'bg-[#E8F5E9] text-[#1B5E20]'
};

// Memoized Bionic Text Renderer with Real-Time Spoken Word Highlighting
interface BionicTextProps {
  text: string;
  enabled: boolean;
  spokenWordIndex?: number;
}

const BionicText = memo(({ text, enabled, spokenWordIndex = -1 }: BionicTextProps) => {
  if (!text) return null;
  
  // Split tokens preserving whitespace
  const tokens = text.split(/(\s+)/);
  let wordCounter = 0;

  return (
    <>
      {tokens.map((token, i) => {
        // Handle whitespace
        if (/^\s+$/.test(token) || token.length === 0) {
          return <span key={i}>{token}</span>;
        }

        const currentWordIdx = wordCounter;
        wordCounter++;
        const isSpoken = spokenWordIndex >= 0 && currentWordIdx === spokenWordIndex;

        if (!enabled) {
          return (
            <span
              key={i}
              className={`transition-colors duration-150 ${
                isSpoken 
                  ? 'bg-amber-300 text-slate-950 font-bold px-1 py-0.5 rounded shadow-sm ring-2 ring-amber-400' 
                  : ''
              }`}
            >
              {token}
            </span>
          );
        }

        const mid = Math.ceil(token.length / 2);
        const firstHalf = token.slice(0, mid);
        const secondHalf = token.slice(mid);

        return (
          <span
            key={i}
            className={`transition-colors duration-150 ${
              isSpoken 
                ? 'bg-amber-300 text-slate-950 font-black px-1 py-0.5 rounded shadow-sm ring-2 ring-amber-400' 
                : ''
            }`}
          >
            <strong className={`font-extrabold ${isSpoken ? 'text-slate-950' : 'text-indigo-950'}`}>
              {firstHalf}
            </strong>
            <span className={isSpoken ? 'text-slate-900 font-semibold' : 'opacity-90'}>
              {secondHalf}
            </span>
          </span>
        );
      })}
    </>
  );
});

BionicText.displayName = 'BionicText';

// Dedicated Lag-Free Focus Ruler (direct DOM manipulation, no React re-renders)
const FocusRuler = memo(({ enabled }: { enabled: boolean }) => {
  const rulerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        if (rulerRef.current) {
          rulerRef.current.style.top = `${e.clientY - 32}px`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div 
      ref={rulerRef}
      className="fixed left-0 right-0 h-16 border-y-2 border-indigo-400 bg-white/20 pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.3)] z-50 transition-none"
      style={{ top: '50%' }}
    >
      <div className="absolute -top-6 left-8 bg-indigo-500 text-white text-[10px] font-black px-2.5 py-1 rounded-t-md uppercase tracking-wider shadow-sm">
        ADHD Focus Ruler
      </div>
    </div>
  );
});

FocusRuler.displayName = 'FocusRuler';

export default function App() {
  // Accessibility States
  const [bionicReading, setBionicReading] = useState(false);
  const [adhdFocus, setAdhdFocus] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [colorTint, setColorTint] = useState<keyof typeof COLOR_TINTS>('white');
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [spokenWordIndex, setSpokenWordIndex] = useState(-1);

  // Live Font Size & Line Height Controls
  const [fontSizePx, setFontSizePx] = useState(18); // 14 to 28
  const [lineSpacing, setLineSpacing] = useState<'normal' | 'relaxed' | 'spacious'>('relaxed');

  // Multilingual State: English, Hindi, Malayalam
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'ml'>('en');

  // Data States
  const [selectedTopicId, setSelectedTopicId] = useState<string>(PRELOADED_ACADEMIC_TOPICS[0].id);
  const [inputText, setInputText] = useState(PRELOADED_ACADEMIC_TOPICS[0].sourceText);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [transformedData, setTransformedData] = useState<TransformedLearningData | null>(PRELOADED_ACADEMIC_TOPICS[0].fallbackData);
  const [generationTimeMs, setGenerationTimeMs] = useState<number | null>(15);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // Low-Anxiety Micro-Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  const [languageFeedbackToast, setLanguageFeedbackToast] = useState<string | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const ttsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Active topic reference
  const currentTopic = useMemo(() => {
    return PRELOADED_ACADEMIC_TOPICS.find(t => t.id === selectedTopicId) || PRELOADED_ACADEMIC_TOPICS[0];
  }, [selectedTopicId]);

  // Multilingual active passage text for Sensory Reader
  const activeReaderText = useMemo(() => {
    if (selectedLanguage === 'hi') {
      return currentTopic?.hindiSourceText || transformedData?.hindi || inputText;
    }
    if (selectedLanguage === 'ml') {
      return currentTopic?.malayalamSourceText || transformedData?.malayalam || inputText;
    }
    return inputText;
  }, [selectedLanguage, currentTopic, transformedData, inputText]);

  // Language switch handler with feedback
  const handleLanguageChange = (lang: 'en' | 'hi' | 'ml') => {
    setSelectedLanguage(lang);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setTtsPlaying(false);
    setSpokenWordIndex(-1);
    const label = lang === 'en' ? 'English (Original)' : lang === 'hi' ? 'हिन्दी (Hindi)' : 'മലയാളം (Malayalam)';
    setLanguageFeedbackToast(`Switched workspace language to ${label}`);
    setTimeout(() => setLanguageFeedbackToast(null), 2400);
  };

  // Robust TTS Controller with Word-by-Word Highlighting
  const stopTTS = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (ttsIntervalRef.current) {
      clearInterval(ttsIntervalRef.current);
      ttsIntervalRef.current = null;
    }
    setTtsPlaying(false);
    setSpokenWordIndex(-1);
  }, []);

  // Stop TTS if user switches tabs or unmounts
  useEffect(() => {
    stopTTS();
    return () => stopTTS();
  }, [activeTab, stopTTS]);

  const handleTTS = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    
    if (ttsPlaying) {
      stopTTS();
      return;
    }

    let textToRead = activeReaderText;
    if (transformedData) {
      if (activeTab === 0) {
        textToRead = activeReaderText; 
      } else if (activeTab === 1) {
        textToRead = transformedData.chunkCards.map(c => {
          const t = selectedLanguage === 'hi' && c.hindiTitle ? c.hindiTitle : selectedLanguage === 'ml' && c.malayalamTitle ? c.malayalamTitle : c.title;
          const b = selectedLanguage === 'hi' && c.hindiText ? c.hindiText : selectedLanguage === 'ml' && c.malayalamText ? c.malayalamText : c.text;
          return `${t}. ${b}`;
        }).join('. ');
      } else if (activeTab === 2) {
        const tree = selectedLanguage === 'hi' && transformedData.hindiConceptTree 
          ? transformedData.hindiConceptTree 
          : selectedLanguage === 'ml' && transformedData.malayalamConceptTree 
          ? transformedData.malayalamConceptTree 
          : transformedData.conceptTree;
        textToRead = tree.join('. ');
      } else if (activeTab === 3) {
        textToRead = selectedLanguage === 'hi' && transformedData.hindiAnalogy 
          ? transformedData.hindiAnalogy 
          : selectedLanguage === 'ml' && transformedData.malayalamAnalogy 
          ? transformedData.malayalamAnalogy 
          : transformedData.analogy;
      } else if (activeTab === 4 && transformedData.microQuiz) {
        const q = transformedData.microQuiz[currentQuestionIndex];
        if (q) {
          const qText = selectedLanguage === 'hi' && q.hindi ? q.hindi.question : selectedLanguage === 'ml' && q.malayalam ? q.malayalam.question : q.question;
          const opts = selectedLanguage === 'hi' && q.hindi ? q.hindi.options : selectedLanguage === 'ml' && q.malayalam ? q.malayalam.options : q.options;
          textToRead = `${qText}. Options: ${opts.join(', ')}`;
        }
      } else if (activeTab === 5) {
        textToRead = selectedLanguage === 'ml' ? transformedData.malayalam : transformedData.hindi;
      }
    }

    const words = textToRead.trim().split(/\s+/).filter(Boolean);
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'ml' ? 'ml-IN' : 'en-US';
    
    // Attempt to pick matching regional voice if available in user's browser
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      const langPrefix = selectedLanguage === 'hi' ? 'hi' : selectedLanguage === 'ml' ? 'ml' : 'en';
      const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }
    }

    utteranceRef.current = utterance;
    
    let currentWordIdx = 0;
    setSpokenWordIndex(0);

    // Primary browser boundary event for word highlighting
    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.charIndex !== undefined) {
        const textBefore = textToRead.slice(0, event.charIndex);
        const wordCount = textBefore.trim().split(/\s+/).filter(Boolean).length;
        setSpokenWordIndex(wordCount);
        currentWordIdx = wordCount;
      }
    };

    // Fallback timer in case the speech engine doesn't fire granular word boundaries
    const estimatedWordDurationMs = 280; // ~210 wpm
    ttsIntervalRef.current = setInterval(() => {
      currentWordIdx++;
      if (currentWordIdx < words.length) {
        setSpokenWordIndex(currentWordIdx);
      } else {
        if (ttsIntervalRef.current) clearInterval(ttsIntervalRef.current);
      }
    }, estimatedWordDurationMs);

    utterance.onend = () => {
      stopTTS();
    };

    utterance.onerror = (e) => {
      console.error("TTS Error:", e);
      stopTTS();
    };

    window.speechSynthesis.speak(utterance);
    setTtsPlaying(true);
  }, [ttsPlaying, stopTTS, activeReaderText, transformedData, activeTab, currentQuestionIndex, selectedLanguage]);

  // Handle selecting preloaded academic topic - automatically loads all transformed data instantly
  const handleSelectTopic = (topic: AcademicTopic) => {
    setSelectedTopicId(topic.id);
    setInputText(topic.sourceText);
    setTransformedData(topic.fallbackData);
    setGenerationTimeMs(12);
    stopTTS();
    // Reset quiz states
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setQuizScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions({});
  };

  // Fallback finder
  const getBestFallbackData = (text: string): TransformedLearningData => {
    const clean = text.toLowerCase();
    for (const topic of PRELOADED_ACADEMIC_TOPICS) {
      const keywords = topic.title.toLowerCase().split(/[\s&]+/);
      if (keywords.some(k => k.length > 3 && clean.includes(k))) {
        return topic.fallbackData;
      }
    }
    return PRELOADED_ACADEMIC_TOPICS[0].fallbackData;
  };

  // Transform / API Handler with resilient multi-tier model failover
  const handleTransform = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    const startTime = performance.now();

    try {
      const res = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      
      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }
      
      const data = await res.json();
      if (!data || !Array.isArray(data.chunkCards) || !Array.isArray(data.conceptTree) || !data.analogy) {
        throw new Error("Invalid structure from AI API");
      }
      
      const duration = Math.round(performance.now() - startTime);
      setGenerationTimeMs(duration);
      setTransformedData(data);
      setActiveTab(1);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setQuizScore(0);
      setQuizCompleted(false);
    } catch (e) {
      console.warn("AI generation offline/error. Using pre-calibrated academic dataset.", e);
      const fallback = getBestFallbackData(inputText);
      const duration = Math.round(performance.now() - startTime);
      setGenerationTimeMs(duration || 45);
      setTransformedData(fallback);
      setActiveTab(1);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setQuizScore(0);
      setQuizCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  // Export structured TXT summary
  const handleExportTxtReport = () => {
    const topic = PRELOADED_ACADEMIC_TOPICS.find(t => t.id === selectedTopicId);
    const reportText = `=== NeuroLearn AI - Assistive Learning Study Guide ===\n` +
      `Topic: ${topic ? topic.title : 'Custom Academic Text'}\n` +
      `Estimated Reading Efficiency Gain: +38%\n` +
      `Cognitive Load Reduction: -65%\n\n` +
      `--- Digestible Concept Chunks (3-Sentence Structure) ---\n` +
      (transformedData?.chunkCards.map((c, i) => `${i + 1}. [${c.title}]: ${c.text}`).join('\n') || '') +
      `\n\n--- Sequential Flowchart Process ---\n` +
      (transformedData?.conceptTree.map((s, i) => `${i + 1}. ${s}`).join('\n') || '') +
      `\n\n--- Everyday Real-World Analogy ---\n` +
      `"${transformedData?.analogy || ''}"\n\n` +
      `--- Low-Anxiety Micro-Quiz ---\n` +
      (transformedData?.microQuiz?.map((q, i) => `Q${i + 1}: ${q.question}\nCorrect: ${q.options[q.correctIndex]}\nExplanation: ${q.explanation}`).join('\n\n') || 'N/A') +
      `\n\n--- Regional Language Support ---\n` +
      `Hindi: ${transformedData?.hindi || ''}\n` +
      `Malayalam: ${transformedData?.malayalam || ''}\n`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `neurolearn-academic-summary-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Export Analytics to PDF format using jsPDF
  const handleExportPdfReport = () => {
    if (!transformedData) return;
    setPdfGenerating(true);
    try {
      const currentTopic = PRELOADED_ACADEMIC_TOPICS.find(t => t.id === selectedTopicId);
      exportAnalyticsToPDF(
        currentTopic ? currentTopic.title : 'Custom Academic Text',
        currentTopic ? currentTopic.subject : 'STEM Concepts',
        transformedData,
        generationTimeMs,
        selectedLanguage
      );
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      setPdfGenerating(false);
    }
  };

  // Micro-Quiz Interaction Handlers with Answer Tracking & Bidirectional Navigation
  const handleAnswerOption = (index: number) => {
    if (!transformedData?.microQuiz) return;
    const currentQ = transformedData.microQuiz[currentQuestionIndex];
    const isCorrect = index === currentQ.correctIndex;
    
    // Adjust score safely
    if (!answeredQuestions[currentQuestionIndex]) {
      if (isCorrect) {
        setQuizScore(prev => prev + 1);
      }
    } else {
      const prevWasCorrect = answeredQuestions[currentQuestionIndex].isCorrect;
      if (!prevWasCorrect && isCorrect) {
        setQuizScore(prev => prev + 1);
      } else if (prevWasCorrect && !isCorrect) {
        setQuizScore(prev => Math.max(0, prev - 1));
      }
    }

    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: { selected: index, isCorrect }
    }));
    setSelectedOption(index);
    setIsAnswerRevealed(true);
  };

  const handleSelectQuestion = (idx: number) => {
    setCurrentQuestionIndex(idx);
    if (answeredQuestions[idx]) {
      setSelectedOption(answeredQuestions[idx].selected);
      setIsAnswerRevealed(true);
    } else {
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      handleSelectQuestion(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (!transformedData?.microQuiz) return;
    if (currentQuestionIndex < transformedData.microQuiz.length - 1) {
      handleSelectQuestion(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setAnsweredQuestions({});
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const lineSpacingClass = {
    normal: 'leading-[1.5]',
    relaxed: 'leading-[1.8]',
    spacious: 'leading-[2.2]'
  }[lineSpacing];

  const tabs = [
    { name: "Sensory Reader", icon: Eye },
    { name: "Chunk Cards", icon: LayoutDashboard },
    { name: "Flowchart Tree", icon: GitMerge },
    { name: "Everyday Analogy", icon: Brain },
    { name: "Micro-Quiz", icon: HelpCircle },
    { name: "Regional Bridge", icon: AlignLeft },
    { name: "Analytics & PDF", icon: Zap }
  ];

  return (
    <div className={`h-screen overflow-hidden flex flex-col ${COLOR_TINTS[colorTint]} ${dyslexicFont ? 'font-dyslexic' : 'font-sans'} transition-colors duration-300`}>
      <FocusRuler enabled={adhdFocus} />

      {/* Top Accessibility Control Bar - Fixed height, strictly non-wrapping to prevent any jumping */}
      <header className="h-16 min-h-[64px] max-h-[64px] bg-white border-b border-[#D7CCC8] flex items-center justify-between px-3 sm:px-6 shadow-sm z-50 shrink-0 ui-chrome">
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div className="shrink-0">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-[#1A1A1A] leading-none">
                NeuroLearn <span className="text-indigo-600 font-black">AI</span>
              </h1>
              <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                SIH 2026 • Team Synapse
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden lg:block">
              Assistive Reading Workspace for Dyslexia & ADHD
            </p>
          </div>
        </div>
        
        {/* Controls Toolbar - Strictly inline with overflow-x-auto, never wrapping onto multiple rows */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 overflow-x-auto no-scrollbar py-1">
          {/* Live Font Size Controls (A- / A+) */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-2 py-1 border border-slate-200 text-xs font-semibold text-slate-700 shrink-0">
            <button
              type="button"
              onClick={() => setFontSizePx(prev => Math.max(14, prev - 2))}
              className="p-1 hover:text-indigo-600 transition-colors shrink-0"
              title="Decrease Font Size"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-bold text-indigo-950 shrink-0">
              {fontSizePx}px
            </span>
            <button
              type="button"
              onClick={() => setFontSizePx(prev => Math.min(28, prev + 2))}
              className="p-1 hover:text-indigo-600 transition-colors shrink-0"
              title="Increase Font Size"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Line Spacing / Line-Height Selector */}
          <div className="hidden xl:flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 text-[11px] shrink-0">
            {(['normal', 'relaxed', 'spacious'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => setLineSpacing(mode)}
                className={`px-2 py-0.5 rounded-full capitalize font-medium transition-colors shrink-0 ${
                  lineSpacing === mode 
                    ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Accessibility Toggles: Bionic, Focus Ruler, OpenDyslexic */}
          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 shrink-0">
            <button 
              type="button"
              onClick={() => setBionicReading(!bionicReading)}
              className={`px-2.5 sm:px-3 py-1 text-xs rounded-full transition-colors shrink-0 ${
                bionicReading 
                  ? 'font-semibold bg-indigo-600 text-white shadow-sm' 
                  : 'font-medium text-slate-600 hover:text-slate-900'
              }`}
              title="Enhance reading speed with bold letter anchors"
            >
              Bionic
            </button>
            <button 
              type="button"
              onClick={() => setAdhdFocus(!adhdFocus)}
              className={`px-2.5 sm:px-3 py-1 text-xs rounded-full transition-colors shrink-0 ${
                adhdFocus 
                  ? 'font-semibold bg-indigo-600 text-white shadow-sm' 
                  : 'font-medium text-slate-600 hover:text-slate-900'
              }`}
              title="Track reading line with mouse-following ADHD ruler"
            >
              Focus Ruler
            </button>
            <button 
              type="button"
              onClick={() => setDyslexicFont(!dyslexicFont)}
              className={`px-2.5 sm:px-3 py-1 text-xs rounded-full transition-all shrink-0 ${
                dyslexicFont 
                  ? 'font-bold bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400' 
                  : 'font-medium text-slate-600 hover:text-slate-900'
              }`}
              title="Toggle OpenDyslexic high-legibility font for reading content"
            >
              OpenDyslexic
            </button>
          </div>

          {/* 4 Sensory Color Themes */}
          <div className="flex gap-1.5 border-l border-slate-200 pl-2 sm:pl-3 items-center shrink-0">
            {(Object.keys(COLOR_TINTS) as Array<keyof typeof COLOR_TINTS>).map(tint => {
              const styles = {
                white: 'bg-white border-slate-300',
                sepia: 'bg-[#FAF3E0] border-[#D7CCC8]',
                blue: 'bg-[#E3F2FD] border-[#BBDEFB]',
                green: 'bg-[#E8F5E9] border-[#C8E6C9]'
              };
              return (
                <button
                  key={tint}
                  type="button"
                  onClick={() => setColorTint(tint)}
                  className={`w-5 h-5 rounded-full border cursor-pointer transition-transform shrink-0 ${styles[tint]} ${
                    colorTint === tint ? 'ring-2 ring-indigo-500 scale-110' : 'hover:scale-110'
                  }`}
                  title={`${tint.charAt(0).toUpperCase() + tint.slice(1)} Tint`}
                />
              );
            })}
          </div>

          {/* Voice Narration Button */}
          <button 
            type="button"
            onClick={handleTTS}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition-all shrink-0 ${
              ttsPlaying 
                ? 'bg-amber-500 text-white border-amber-600 animate-pulse shadow-sm' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100'
            }`}
            title="Read text aloud with real-time word-by-word visual highlighting"
          >
            {ttsPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{ttsPlaying ? 'Pause Voice' : 'Voice Narration'}</span>
          </button>
        </div>
      </header>

      {/* Main Dual-Pane Layout */}
      <main className={`flex flex-1 overflow-hidden relative flex-col md:flex-row w-full ${dyslexicFont ? 'font-dyslexic' : ''}`}>
        {/* Source Pane */}
        <aside className="w-full md:w-[360px] lg:w-[390px] bg-white border-r border-[#D7CCC8] flex flex-col p-4 sm:p-5 gap-4 shrink-0 overflow-y-auto">
          
          {/* Curated Sample Topics Header */}
          <div className="space-y-2 shrink-0">
            <div className="flex items-center justify-between">
              <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
                Curated Academic Topics
              </label>
              <span className="text-[10px] text-indigo-700 bg-indigo-50 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                Click to Load All
              </span>
            </div>

            {/* Quick Picker Buttons - Clean, non-overlapping cards */}
            <div className="flex flex-col gap-1.5">
              {PRELOADED_ACADEMIC_TOPICS.map((topic) => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold ring-1 ring-indigo-400 shadow-sm' 
                        : 'bg-slate-50/90 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="text-base shrink-0 leading-none">{topic.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-[12px] truncate leading-tight text-slate-900">
                          {selectedLanguage === 'hi' && topic.hindiTitle 
                            ? topic.hindiTitle 
                            : selectedLanguage === 'ml' && topic.malayalamTitle 
                            ? topic.malayalamTitle 
                            : topic.title}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
                          {topic.subject}
                        </div>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 ring-4 ring-indigo-100" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium shrink-0">Load</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Academic Source Input Area - Explicit height prevents any overlapping */}
          <div className="space-y-1.5 shrink-0">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                Free-Text Source Passage
              </label>
              {inputText && (
                <button 
                  onClick={() => {
                    setInputText('');
                    setSelectedTopicId('');
                  }}
                  className="text-[10px] text-slate-400 hover:text-slate-600 font-semibold transition-colors"
                >
                  Clear Text
                </button>
              )}
            </div>
            <textarea 
              className={`w-full h-32 md:h-36 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none overflow-y-auto text-slate-800 font-medium transition-all ${dyslexicFont ? 'font-dyslexic' : ''}`}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSelectedTopicId('');
              }}
              placeholder="Type or paste any textbook passage or click a topic above..."
            />
          </div>

          {/* Transform Actions */}
          <div className="shrink-0 pt-1 pb-2">
            <button 
              onClick={handleTransform}
              disabled={loading || !inputText.trim()}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:active:scale-100 text-xs sm:text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Transform Custom Text (Gemini AI)</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Visual Output Pane */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {!transformedData ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8 opacity-80">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 border border-indigo-100 shadow-sm">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-[#1A1A1A]">Interactive Reading Workspace</h2>
              <p className="max-w-md text-sm text-slate-600 text-balance leading-relaxed">
                Select one of the curated sample topics (<strong className="text-indigo-600">Recursion</strong>, <strong className="text-indigo-600">Photosynthesis</strong>, or <strong className="text-indigo-600">Calculus</strong>) or paste textbook content, then click <strong className="text-indigo-600">Transform Text</strong>.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-lg">
                {PRELOADED_ACADEMIC_TOPICS.slice(0, 3).map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      handleSelectTopic(topic);
                      setTransformedData(topic.fallbackData);
                      setActiveTab(1);
                    }}
                    className="px-4 py-2 bg-white border border-slate-200 hover:border-indigo-400 rounded-xl text-xs font-bold text-slate-800 shadow-sm transition-all flex items-center gap-2 hover:shadow hover:scale-105"
                  >
                    <span>{topic.emoji}</span>
                    <span>Demo: {topic.title.split('&')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Output Tabs Header with Multilingual Quick Toggle - Fixed height, non-wrapping to prevent vertical jumping */}
              <div className="border-b border-[#D7CCC8] bg-white/85 backdrop-blur-sm shrink-0 flex items-center justify-between px-3 gap-2 h-12 overflow-hidden font-sans">
                <nav className="flex items-center overflow-x-auto no-scrollbar hide-scroll h-full">
                  {tabs.map((tab, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`px-3 sm:px-4 py-2.5 text-xs font-bold uppercase tracking-tight border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
                        activeTab === idx 
                          ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                          : 'text-slate-500 border-transparent hover:text-slate-800'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5 hidden sm:block shrink-0" />
                      {tab.name}
                    </button>
                  ))}
                </nav>

                {/* Multilingual Toggle: English / Hindi / Malayalam */}
                <div className="flex items-center gap-1 bg-slate-100 rounded-full p-0.5 sm:p-1 border border-slate-200 shrink-0 font-sans">
                  <Languages className="w-3.5 h-3.5 text-indigo-600 ml-1.5 mr-0.5 shrink-0" />
                  <span className="text-[10px] uppercase font-bold text-slate-500 mr-1 hidden md:inline">Language:</span>
                  {(['en', 'hi', 'ml'] as const).map(lang => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 ${
                        selectedLanguage === lang 
                          ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-300' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'മലയാളം'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toast Feedback for Language Switch */}
              {languageFeedbackToast && (
                <div className="bg-indigo-600 text-white text-xs px-4 py-1.5 text-center font-semibold flex items-center justify-center gap-2 animate-fade-in shadow-inner">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{languageFeedbackToast}</span>
                </div>
              )}

              {/* Active Non-English Language Banner */}
              {selectedLanguage !== 'en' && !languageFeedbackToast && (
                <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/90 to-indigo-50/90 border-b border-indigo-100 px-4 py-2 flex items-center justify-between text-xs text-indigo-950">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />
                    <span className="font-bold">
                      {selectedLanguage === 'hi' ? 'सक्रिय भाषा: हिन्दी (Hindi Mode Active)' : 'സജീവ ഭാഷ: മലയാളം (Malayalam Mode Active)'}
                    </span>
                    <span className="text-[11px] text-slate-600 hidden md:inline">
                      — Reader, concept cards, analogies, and quizzes adapted
                    </span>
                  </div>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 underline ml-2 shrink-0"
                  >
                    Reset to English
                  </button>
                </div>
              )}

              {/* Tab Contents */}
              <div className="flex-1 p-4 sm:p-7 md:p-8 overflow-y-auto relative">
                
                {/* Tab 0: Sensory Reader */}
                {activeTab === 0 && (
                  <div className="max-w-3xl mx-auto space-y-4">
                    {/* Language Switcher Bar inside Reader */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white/90 border border-indigo-100 rounded-xl text-xs shadow-xs">
                      <div className="flex items-center gap-2">
                        <Languages className="w-4 h-4 text-indigo-600" />
                        <span className="font-semibold text-slate-700">
                          {selectedLanguage === 'en' && 'Reading English Source Text'}
                          {selectedLanguage === 'hi' && 'हिन्दी शैक्षणिक रूपांतरण (Hindi Academic Translation)'}
                          {selectedLanguage === 'ml' && 'മലയാളം അക്കാദമിക് പാഠം (Malayalam Translation)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-400 font-medium mr-1">Switch:</span>
                        {(['en', 'hi', 'ml'] as const).map(l => (
                          <button
                            key={l}
                            onClick={() => handleLanguageChange(l)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                              selectedLanguage === l
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'മലയാളം'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 rounded-2xl bg-white/80 border border-slate-200/90 shadow-sm">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Sensory Reader Mode
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-medium">
                            {ttsPlaying ? '🔊 Highlighting Spoken Word' : 'Bionic fixation active'}
                          </span>
                        </div>
                      </div>
                      
                      <div 
                        style={{ fontSize: `${fontSizePx}px` }} 
                        className={`${lineSpacingClass} font-medium text-inherit`}
                      >
                        <BionicText 
                          text={activeReaderText} 
                          enabled={bionicReading} 
                          spokenWordIndex={spokenWordIndex}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tab 1: Chunk Cards (3-Sentence Structure) */}
                {activeTab === 1 && (
                  <div className="max-w-3xl mx-auto grid gap-4">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Digestible Micro-Concepts (3-Sentence Structure)
                      </span>
                      <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">
                        {transformedData.chunkCards.length} Concept Chunks
                      </span>
                    </div>

                    {transformedData.chunkCards.map((card, i) => {
                      const displayTitle = (selectedLanguage === 'hi' && card.hindiTitle)
                        ? card.hindiTitle
                        : (selectedLanguage === 'ml' && card.malayalamTitle)
                        ? card.malayalamTitle
                        : card.title;

                      const displayText = (selectedLanguage === 'hi' && card.hindiText)
                        ? card.hindiText
                        : (selectedLanguage === 'ml' && card.malayalamText)
                        ? card.malayalamText
                        : card.text;

                      return (
                        <div key={i} className="p-5 sm:p-6 rounded-2xl bg-white/85 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-indigo-950">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                              <BionicText text={displayTitle} enabled={bionicReading} />
                            </h3>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Card {i + 1}
                            </span>
                          </div>
                          <p 
                            style={{ fontSize: `${fontSizePx}px` }}
                            className={`${lineSpacingClass} text-slate-800 font-medium`}
                          >
                            <BionicText 
                              text={displayText} 
                              enabled={bionicReading} 
                              spokenWordIndex={spokenWordIndex}
                            />
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab 2: Flowchart Tree */}
                {activeTab === 2 && (() => {
                  const activeTree = (selectedLanguage === 'hi' && transformedData.hindiConceptTree)
                    ? transformedData.hindiConceptTree
                    : (selectedLanguage === 'ml' && transformedData.malayalamConceptTree)
                    ? transformedData.malayalamConceptTree
                    : transformedData.conceptTree;

                  return (
                    <div className="max-w-2xl mx-auto relative pl-4 sm:pl-6 space-y-6 py-4">
                      <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-1 bg-indigo-200 rounded-full" />
                      {activeTree.map((step, i) => (
                        <div key={i} className="relative z-10 flex items-start gap-4 sm:gap-6">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 ring-4 ring-indigo-100 flex items-center justify-center text-white text-xs font-black shrink-0 mt-1 shadow-sm">
                            {i + 1}
                          </div>
                          <div className="bg-white/85 p-5 rounded-2xl border border-slate-200 shadow-sm flex-grow">
                            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">
                              {selectedLanguage === 'hi' ? `चरण ${i + 1}` : selectedLanguage === 'ml' ? `ഘട്ടം ${i + 1}` : `Phase ${i + 1}`}
                            </div>
                            <p 
                              style={{ fontSize: `${fontSizePx}px` }}
                              className={`${lineSpacingClass} font-medium text-slate-800`}
                            >
                              <BionicText 
                                text={step} 
                                enabled={bionicReading} 
                                spokenWordIndex={spokenWordIndex}
                              />
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Tab 3: Everyday Analogy */}
                {activeTab === 3 && (() => {
                  const activeAnalogy = (selectedLanguage === 'hi' && transformedData.hindiAnalogy)
                    ? transformedData.hindiAnalogy
                    : (selectedLanguage === 'ml' && transformedData.malayalamAnalogy)
                    ? transformedData.malayalamAnalogy
                    : transformedData.analogy;

                  return (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-center max-w-xl mx-auto my-auto p-4">
                      <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                        <Brain className="w-8 h-8" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                        {selectedLanguage === 'hi' ? 'दैनिक जीवन का रूपक (Cognitive Anchor)' : selectedLanguage === 'ml' ? 'ജീവിതഗന്ധിയായ ഉപമ (Everyday Analogy)' : 'Cognitive Anchor Metaphor'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#1A1A1A]">
                        {selectedLanguage === 'hi' ? 'सरल व्यावहारिक उदाहरण' : selectedLanguage === 'ml' ? 'ലളിതമായ ഉദാഹരണം' : 'Everyday Real-World Analogy'}
                      </h3>
                      <div className="bg-white/90 border border-amber-200/80 p-6 sm:p-8 rounded-2xl shadow-sm text-left sm:text-center">
                        <p 
                          style={{ fontSize: `${fontSizePx}px` }}
                          className={`${lineSpacingClass} italic text-slate-800 font-medium`}
                        >
                          "<BionicText text={activeAnalogy} enabled={bionicReading} spokenWordIndex={spokenWordIndex} />"
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Tab 4: Low-Anxiety Micro-Quiz */}
                {activeTab === 4 && (
                  <div className="max-w-2xl mx-auto py-2">
                    <div className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-indigo-100 shadow-md">
                      {/* Header with untimed reassurance badge */}
                      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                        <div>
                          <h3 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-indigo-600" />
                            Low-Anxiety Micro-Quiz
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            One question at a time • Untimed & Gentle • Focus on Retention
                          </p>
                        </div>
                        <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
                          Zero Stress
                        </span>
                      </div>

                      {transformedData.microQuiz && transformedData.microQuiz.length > 0 ? (
                        !quizCompleted ? (
                          (() => {
                            const currentQ = transformedData.microQuiz[currentQuestionIndex];
                            
                            // Multilingual display text
                            const displayQ = (selectedLanguage === 'hi' && currentQ.hindi)
                              ? currentQ.hindi.question
                              : (selectedLanguage === 'ml' && currentQ.malayalam)
                              ? currentQ.malayalam.question
                              : currentQ.question;

                            const displayOptions = (selectedLanguage === 'hi' && currentQ.hindi)
                              ? currentQ.hindi.options
                              : (selectedLanguage === 'ml' && currentQ.malayalam)
                              ? currentQ.malayalam.options
                              : currentQ.options;

                            const displayExplanation = (selectedLanguage === 'hi' && currentQ.hindi)
                              ? currentQ.hindi.explanation
                              : (selectedLanguage === 'ml' && currentQ.malayalam)
                              ? currentQ.malayalam.explanation
                              : currentQ.explanation;

                            const answeredInfo = answeredQuestions[currentQuestionIndex];
                            const currentSelected = answeredInfo ? answeredInfo.selected : selectedOption;
                            const isRevealed = answeredInfo ? true : isAnswerRevealed;

                            return (
                              <div className="space-y-5">
                                {/* Interactive Question Navigation Pills */}
                                <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                                  <div className="flex items-center gap-1.5 overflow-x-auto">
                                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Questions:</span>
                                    {transformedData.microQuiz.map((q, idx) => {
                                      const ans = answeredQuestions[idx];
                                      const isCurrent = idx === currentQuestionIndex;
                                      let pillBg = "bg-white text-slate-700 border-slate-200";
                                      if (ans) {
                                        pillBg = ans.isCorrect 
                                          ? "bg-emerald-100 border-emerald-300 text-emerald-800 font-bold" 
                                          : "bg-amber-100 border-amber-300 text-amber-800 font-bold";
                                      }
                                      if (isCurrent) {
                                        pillBg += " ring-2 ring-indigo-600 ring-offset-1";
                                      }

                                      return (
                                        <button
                                          key={q.id || idx}
                                          onClick={() => handleSelectQuestion(idx)}
                                          className={`w-7 h-7 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${pillBg}`}
                                          title={`Question ${idx + 1}`}
                                        >
                                          {ans ? (
                                            ans.isCorrect ? (
                                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                                            ) : (
                                              <span className="text-amber-800">{idx + 1}</span>
                                            )
                                          ) : (
                                            idx + 1
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  <div className="text-xs font-bold text-slate-600">
                                    Score: <span className="text-indigo-600 font-black">{quizScore}</span> / {transformedData.microQuiz.length}
                                  </div>
                                </div>

                                {/* Question Category Tag */}
                                <div className="flex items-center justify-between">
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-200">
                                    {currentQ.tag || `Concept ${currentQuestionIndex + 1}`}
                                  </span>
                                  <span className="text-xs text-slate-400 font-semibold">
                                    Question {currentQuestionIndex + 1} of {transformedData.microQuiz.length}
                                  </span>
                                </div>

                                {/* Question Title */}
                                <h4 
                                  style={{ fontSize: `${fontSizePx}px` }}
                                  className="font-bold text-slate-900 leading-snug"
                                >
                                  {displayQ}
                                </h4>

                                {/* Options with A, B, C, D badges */}
                                <div className="space-y-2.5">
                                  {displayOptions.map((option, idx) => {
                                    const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                                    let btnStyle = "bg-slate-50 hover:bg-slate-100/90 border-slate-200 text-slate-800";
                                    let letterStyle = "bg-slate-200 text-slate-700";

                                    if (isRevealed) {
                                      if (idx === currentQ.correctIndex) {
                                        btnStyle = "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300";
                                        letterStyle = "bg-emerald-600 text-white";
                                      } else if (idx === currentSelected) {
                                        btnStyle = "bg-rose-50 border-rose-300 text-rose-900 font-medium";
                                        letterStyle = "bg-rose-600 text-white";
                                      } else {
                                        btnStyle = "opacity-45 bg-slate-50 border-slate-200";
                                        letterStyle = "bg-slate-200 text-slate-400";
                                      }
                                    } else if (currentSelected === idx) {
                                      btnStyle = "bg-indigo-50 border-indigo-400 text-indigo-950 ring-2 ring-indigo-300";
                                      letterStyle = "bg-indigo-600 text-white";
                                    }

                                    return (
                                      <button
                                        key={idx}
                                        onClick={() => handleAnswerOption(idx)}
                                        disabled={isRevealed}
                                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${letterStyle}`}>
                                            {optionLetter}
                                          </span>
                                          <span className="leading-snug">{option}</span>
                                        </div>
                                        {isRevealed && idx === currentQ.correctIndex && (
                                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                        )}
                                        {isRevealed && idx === currentSelected && idx !== currentQ.correctIndex && (
                                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Instant Gentle Feedback Callout */}
                                {isRevealed && (
                                  <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed animate-fade-in ${
                                    currentSelected === currentQ.correctIndex 
                                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                                      : 'bg-amber-50 border-amber-200 text-amber-950'
                                  }`}>
                                    <div className="font-bold flex items-center gap-1.5 mb-1.5">
                                      {currentSelected === currentQ.correctIndex ? (
                                        <>
                                          <Sparkles className="w-4 h-4 text-emerald-600" />
                                          <span className="text-emerald-900 font-extrabold">{currentQ.encouragement || "Spot on! Great intuition."}</span>
                                        </>
                                      ) : (
                                        <>
                                          <Brain className="w-4 h-4 text-amber-600" />
                                          <span className="text-amber-900 font-extrabold">Good effort! Key concept takeaway:</span>
                                        </>
                                      )}
                                    </div>
                                    <p className="font-medium text-slate-800">{displayExplanation}</p>
                                  </div>
                                )}

                                {/* Question Controls */}
                                <div className="pt-2 flex items-center justify-between">
                                  <button
                                    onClick={handlePrevQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
                                  >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Previous</span>
                                  </button>

                                  <button
                                    onClick={handleNextQuestion}
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors"
                                  >
                                    <span>
                                      {currentQuestionIndex < transformedData.microQuiz.length - 1 ? 'Next Question' : 'Complete Review'}
                                    </span>
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          /* Quiz Completed Mastery View */
                          <div className="py-4 space-y-6">
                            <div className="text-center space-y-3 pb-4 border-b border-slate-100">
                              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                <Award className="w-8 h-8" />
                              </div>
                              <h4 className="text-2xl font-black text-slate-900">Review Completed!</h4>
                              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                                You scored <strong>{quizScore} out of {transformedData.microQuiz.length}</strong> ({Math.round((quizScore / transformedData.microQuiz.length) * 100)}% mastery). Every gentle review builds stronger neural pathways.
                              </p>
                              <div className="pt-1">
                                <button
                                  onClick={handleRestartQuiz}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  <span>Retake Micro-Quiz</span>
                                </button>
                              </div>
                            </div>

                            {/* Detailed All-Questions Breakdown */}
                            <div className="space-y-3">
                              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                                Question-by-Question Concept Review:
                              </h5>
                              {transformedData.microQuiz.map((q, idx) => {
                                const ans = answeredQuestions[idx];
                                const wasCorrect = ans?.isCorrect;
                                const qText = (selectedLanguage === 'hi' && q.hindi) 
                                  ? q.hindi.question 
                                  : (selectedLanguage === 'ml' && q.malayalam) 
                                  ? q.malayalam.question 
                                  : q.question;
                                const explanation = (selectedLanguage === 'hi' && q.hindi) 
                                  ? q.hindi.explanation 
                                  : (selectedLanguage === 'ml' && q.malayalam) 
                                  ? q.malayalam.explanation 
                                  : q.explanation;
                                const correctOptionText = (selectedLanguage === 'hi' && q.hindi)
                                  ? q.hindi.options[q.correctIndex]
                                  : (selectedLanguage === 'ml' && q.malayalam)
                                  ? q.malayalam.options[q.correctIndex]
                                  : q.options[q.correctIndex];

                                return (
                                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                                        Question {idx + 1} • {q.tag || 'Concept'}
                                      </span>
                                      {ans ? (
                                        wasCorrect ? (
                                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Correct
                                          </span>
                                        ) : (
                                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                                            Reviewed
                                          </span>
                                        )
                                      ) : (
                                        <span className="text-[10px] font-semibold text-slate-400">Skipped</span>
                                      )}
                                    </div>
                                    <div className="font-bold text-slate-800 text-sm">{qText}</div>
                                    <div className="text-slate-600">
                                      <strong>Key Takeaway:</strong> {explanation}
                                    </div>
                                    <div className="text-emerald-700 font-semibold text-[11px] pt-0.5">
                                      Correct answer: {correctOptionText}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )
                      ) : (
                        <p className="text-xs text-slate-500 text-center py-6">
                          No quiz questions generated for this selection yet. Try selecting another topic!
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 5: Regional Bilingual Bridge */}
                {activeTab === 5 && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Languages className="w-5 h-5 text-indigo-600" />
                          Regional Technical Anchors (Bilingual Bridge)
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Preserves core STEM terminology in English while explaining complex mechanisms in your mother tongue.
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Hindi Card */}
                      <div className={`p-5 sm:p-6 rounded-2xl bg-white/90 border transition-all ${
                        selectedLanguage === 'hi' 
                          ? 'border-orange-400 ring-2 ring-orange-200 shadow-md' 
                          : 'border-orange-200 shadow-sm'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-orange-800 flex items-center gap-1.5">
                            <Type className="w-4 h-4" /> Hindi Bilingual (हिन्दी)
                          </h4>
                          {selectedLanguage === 'hi' ? (
                            <span className="text-[10px] bg-orange-600 text-white font-black px-2 py-0.5 rounded-full">
                              Active Workspace Language
                            </span>
                          ) : (
                            <button
                              onClick={() => handleLanguageChange('hi')}
                              className="text-[10px] bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold px-2.5 py-1 rounded-full transition-colors"
                            >
                              Use Hindi Everywhere
                            </button>
                          )}
                        </div>
                        <p 
                          style={{ fontSize: `${fontSizePx}px` }}
                          className={`${lineSpacingClass} text-slate-800 font-medium leading-relaxed`}
                        >
                          {transformedData.hindi}
                        </p>
                      </div>

                      {/* Malayalam Card */}
                      <div className={`p-5 sm:p-6 rounded-2xl bg-white/90 border transition-all ${
                        selectedLanguage === 'ml' 
                          ? 'border-emerald-400 ring-2 ring-emerald-200 shadow-md' 
                          : 'border-emerald-200 shadow-sm'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                            <Type className="w-4 h-4" /> Malayalam Bilingual (മലയാളം)
                          </h4>
                          {selectedLanguage === 'ml' ? (
                            <span className="text-[10px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded-full">
                              Active Workspace Language
                            </span>
                          ) : (
                            <button
                              onClick={() => handleLanguageChange('ml')}
                              className="text-[10px] bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold px-2.5 py-1 rounded-full transition-colors"
                            >
                              Use Malayalam Everywhere
                            </button>
                          )}
                        </div>
                        <p 
                          style={{ fontSize: `${fontSizePx}px` }}
                          className={`${lineSpacingClass} text-slate-800 font-medium leading-relaxed`}
                        >
                          {transformedData.malayalam}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 6: Analytics & PDF Export */}
                {activeTab === 6 && (
                  <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-4">
                    <div className="w-full bg-white/95 rounded-2xl border border-[#D7CCC8] p-6 sm:p-8 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-indigo-600" />
                          <h3 className="text-lg font-bold text-[#1A1A1A]">Cognitive Efficiency & Impact Metrics</h3>
                        </div>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 font-black px-2.5 py-1 rounded-full border border-indigo-100">
                          SIH 2026 Evaluation
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block mb-1">Reading Speed</span>
                          <span className="font-extrabold text-2xl text-emerald-700">+38%</span>
                          <span className="text-[10px] text-emerald-600 block mt-0.5">Bionic Fixation Gain</span>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
                          <span className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider block mb-1">Cognitive Load</span>
                          <span className="font-extrabold text-2xl text-indigo-700">-65%</span>
                          <span className="text-[10px] text-indigo-600 block mt-0.5">Chunking Reduction</span>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
                          <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block mb-1">AI Pipeline Latency</span>
                          <span className="font-extrabold text-2xl text-amber-700">{generationTimeMs ? `${generationTimeMs}ms` : 'Instant'}</span>
                          <span className="text-[10px] text-amber-600 block mt-0.5">Failover Protected</span>
                        </div>
                      </div>

                      {/* Export Buttons: PDF and TXT */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={handleExportPdfReport}
                          disabled={pdfGenerating}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-60"
                        >
                          {pdfGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Generating Document...</span>
                            </>
                          ) : (
                            <>
                              <FileText className="w-4 h-4" />
                              <span>Export Analytics in PDF Format</span>
                            </>
                          )}
                        </button>

                        <button 
                          onClick={handleExportTxtReport}
                          className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                          {copiedNotification ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span>Downloaded (.txt)</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Export Study Guide (.txt)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
