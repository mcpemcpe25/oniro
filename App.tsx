import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QUESTIONS, RESULTS, THEMES, FORTUNE_COOKIE_PHRASES } from './data';
import { Option, ResultType } from './types';
import { 
  Sparkles, ArrowRight, BookOpen, X, ArrowLeft, Moon, Brain, Eye, 
  Zap, Activity, Fingerprint, Share2, Ticket, Award
} from 'lucide-react';

type Screen = 'home' | 'biometric' | 'quiz' | 'calculating' | 'result';

interface Metrics {
  topThemes: { id: number; name: string; score: number; percent: number }[];
  intuitionPercent: number;
  logicPercent: number;
  energyPercent: number;
  conflictPercent: number;
  depthPercent: number;
  emotionalIntensity: { label: string; emoji: string };
  rarity: number;
}

const REFERENCES = [
  "A Interpretação dos Sonhos – Sigmund Freud (1899)", "Sobre os Sonhos – Sigmund Freud (1901)", "Psicologia do Inconsciente – C.G. Jung (1912)", "Tipos Psicológicos – C.G. Jung (1921)", "A Dinâmica do Inconsciente – C.G. Jung (1952)", "O Homem e Seus Símbolos – C.G. Jung (1964)", "Os Arquétipos e o Inconsciente Coletivo – C.G. Jung (1959)", "Memórias, Sonhos, Reflexões – C.G. Jung (1961)", "O Eu e o Inconsciente – C.G. Jung (1928)", "Estudos sobre a Histeria – Josef Breuer e Sigmund Freud (1895)", "O Caráter Neurótico – Alfred Adler (1912)", "Conhecimento do Homem – Alfred Adler (1927)", "A Prática e a Teoria da Psicologia Individual – Alfred Adler (1920)", "O Ego e os Mecanismos de Defesa – Anna Freud (1936)", "Inveja e Gratidão – Melanie Klein (1957)", "O Caminho dos Sonhos – Marie-Louise von Franz (1988)", "A Interpretação dos Contos de Fada – Marie-Louise von Franz (1970)", "Alquimia e Imaginação Ativa – Marie-Louise von Franz (1979)", "O Sonho e o Mundo Inferior – James Hillman (1979)", "Re-vendo a Psicologia – James Hillman (1975)", "O Código da Alma – James Hillman (1996)", "Ego e Arquétipo – Edward F. Edinger (1972)", "A Criação da Consciência – Edward F. Edinger (1984)", "Inner Work (Trabalho Interior) – Robert A. Johnson (1986)", "She: A Chave do Entendimento da Psicologia Feminina – Robert A. Johnson (1976)", "He: A Chave do Entendimento da Psicologia Masculina – Robert A. Johnson (1974)", "Owning Your Own Shadow (Assumindo sua Sombra) – Robert A. Johnson (1991)", "O Herói de Mil Faces – Joseph Campbell (1949)", "O Poder do Mito – Joseph Campbell (1988)", "Mulheres que Correm com os Lobos – Clarissa Pinkola Estés (1992)", "A Poética do Espaço – Gaston Bachelard (1957)", "A Psicanálise do Fogo – Gaston Bachelard (1938)", "Dicionário de Símbolos – Jean Chevalier e Alain Gheerbrant (1969)", "O Livro Vermelho – C.G. Jung (2009 - publicação póstuma)", "Lucid Dreaming – Stephen LaBerge (1985)", "Exploring the World of Lucid Dreaming – Stephen LaBerge e Howard Rheingold (1990)", "Control Your Dreams – Jayne Gackenbach (1989)", "Lucid Dreaming: Gateway to the Inner Self – Robert Waggoner (2008)", "Sleep and Dreaming – Edward Maquet (2001)", "Why We Sleep (Por Que Nós Dormimos) – Matthew Walker (2017)", "The Dreaming Brain – J. Allan Hobson (1988)", "Sleep – J. Allan Hobson (1989)", "Consciousness, Sleep, and Dreaming – J. Allan Hobson (1998)", "The Neuropsychology of Dreams – Mark Solms (1997)", "Dreaming: An Introduction to the Science of Sleep – J. Allan Hobson (2002)", "The Committee of Sleep – Deirdre Barrett (2001)", "Are You Dreaming? – Daniel Love (2013)", "A Field Guide to Lucid Dreaming – Dylan Tuccillo (2013)", "Gestalt Therapy Verbatim – Fritz Perls (1969)", "O Eu, a Fome e a Agressão – Fritz Perls (1942)", "A Abordagem Gestáltica – Fritz Perls (1973)", "Existential Foundations of Medicine and Psychology – Medard Boss (1979)", "The Analysis of Dreams – Medard Boss (1958)", "Terapia Existencial – Irvin D. Yalom (1980)", "Tornar-se Pessoa – Carl Rogers (1961)", "Motivação e Personalidade – Abraham Maslow (1954)", "Introdução à Psicologia do Ser – Abraham Maslow (1962)", "Focusing – Eugene Gendlin (1978)", "Let Your Body Interpret Your Dreams – Eugene Gendlin (1986)", "The Content Analysis of Dreams – Calvin S. Hall e Robert Van de Castle (1966)", "The Meaning of Dreams – Calvin S. Hall (1953)", "Mito e Realidade – Mircea Eliade (1963)", "O Sagrado e o Profano – Mircea Eliade (1957)", "Imagens e Símbolos – Mircea Eliade (1952)", "A Ramo de Ouro – James George Frazer (1890)", "Sonhos, Ilusão e Outras Realidades – Wendy Doniger O'Flaherty (1984)", "The Dream in Islam – Iain R. Edgar (2011)", "Dreamtime & Inner Space – Holger Kalweit (1984)", "Shamanism: Archaic Techniques of Ecstasy – Mircea Eliade (1951)", "A Erva do Diabo – Carlos Castaneda (1968)", "Wisdom of Your Dreams – Jeremy Taylor (2009)", "Where People Fly and Water Runs Uphill – Jeremy Taylor (1992)", "Dream Work – Jeremy Taylor (1983)", "Trauma and Dreams – Deirdre Barrett (1996)", "Pandemic Dreams – Deirdre Barrett (2020)", "The Mind at Night – Andrea Rock (2004)", "Our Dreaming Mind – Robert L. Van de Castle (1994)", "Living Your Dreams – Gayle Delaney (1981)", "Breakthrough Dreaming – Gayle Delaney (1991)", "Creative Dreaming – Patricia Garfield (1974)", "Pathway to Ecstasy: The Way of the Dream Mandala – Patricia Garfield (1979)", "Dreams and the Construction of Personal Reality – John S. Antrobus (1992)", "Regularly Occurring Periods of Eye Motility and Concomitant Phenomena During Sleep – Aserinsky & Kleitman (1953)", "The Activation-Synthesis Hypothesis of Dreaming – Hobson & McCarley (1977)", "Dreaming and the Brain – J. Allan Hobson (1986)", "The Continuity Hypothesis of Dreaming – G. William Domhoff (1996)", "Finding Meaning in Dreams: A Quantitative Approach – G. William Domhoff (1996)", "The Scientific Study of Dreams – G. William Domhoff (2003)", "Dreaming as a Model for Psychosis – J. Allan Hobson (1994)", "Nightmares: The Science and Solution – Patrick McNamara (2008)", "The Functions of Dreaming – Alan Moffitt (1993)", "Conscious Mind, Sleeping Brain – J. Gackenbach (1988)", "O Espectro da Consciência – Ken Wilber (1977)", "No Boundary – Ken Wilber (1979)", "Psicologia Transpessoal – Stanislav Grof (1975)", "Reinos do Inconsciente Humano – Stanislav Grof (1975)", "A Psicologia do Futuro – Stanislav Grof (2000)", "Sonhos e Crescimento Espiritual – Louis Savary (1984)", "O Livro Tibetano do Sono e dos Sonhos – Tenzin Wangyal Rinpoche (1998)"
];

const CALCULATION_TEXTS = [
  "Conectando aos servidores oníricos...",
  "Calibrando parâmetros psíquicos...",
  "Analisando matriz simbólica...",
  "Decodificando arquétipos...",
  "Compilando relatório do subconsciente..."
];

const FortuneCookie = ({ onClick }: { onClick: () => void }) => (
    <div className="flex flex-col items-center cursor-pointer group" onClick={onClick}>
        <div className="text-7xl group-hover:scale-110 transition-transform">🍪</div>
        <p className="text-slate-400 mt-2 text-sm">Clique para uma mensagem final</p>
    </div>
);

const FortunePopup = ({ fortune, onClose }: { fortune: string; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
    <div className="glass-panel fortune-popup w-full max-w-md rounded-2xl p-8 border border-white/20 text-center" onClick={e => e.stopPropagation()}>
      <p className="text-lg text-slate-200 font-serif italic mb-4">" {fortune} "</p>
       <button onClick={onClose} className="text-xs text-slate-500 hover:text-white transition-colors">Fechar</button>
    </div>
  </div>
);


const ScratchCard = ({ numbers }: { numbers: number[] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScratched, setIsScratched] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#a855f7');
        gradient.addColorStop(1, '#d946ef');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = 'destination-out';
    }, []);

    const scratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const pos = 'touches' in e ? e.touches[0] : e;
        const x = pos.clientX - rect.left;
        const y = pos.clientY - rect.top;

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        if (!isScratched) setIsScratched(true);
    };

    return (
        <div className="scratch-card glass-panel rounded-2xl p-6 relative aspect-[2/1] flex flex-col items-center justify-center overflow-hidden">
            <div className="z-0 text-center">
                 <p className="text-slate-300 text-sm mb-4">Seus números da sorte oníricos:</p>
                 <div className="flex gap-3">
                    {numbers.map(num => (
                        <div key={num} className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-lg font-bold text-violet-300 border border-slate-700">
                           {String(num).padStart(2, '0')}
                        </div>
                    ))}
                 </div>
            </div>
            <canvas ref={canvasRef} onMouseMove={scratch} onTouchMove={scratch} />
            {!isScratched && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none z-20">
                    <p className="font-bold text-xl">Bilhete Onírico</p>
                    <p className="text-sm opacity-80">Raspe para revelar</p>
                </div>
            )}
        </div>
    );
};

const AnimateOnScroll = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                ref.current?.classList.add('is-visible');
                observer.unobserve(ref.current!);
            }
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return <div ref={ref} className="animate-on-scroll" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};


const ReferencesPopup = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
    <div className="glass-panel w-full max-w-2xl max-h-[80vh] rounded-2xl p-6 border border-white/20 flex flex-col" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white flex items-center"><BookOpen className="mr-2"/> Referências & Obras</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-5 h-5"/>
        </button>
      </div>
      <div className="overflow-y-auto pr-4">
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          {REFERENCES.map((ref, i) => <li key={i}>{ref}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showReferences, setShowReferences] = useState(false);
  const [calculatingText, setCalculatingText] = useState(CALCULATION_TEXTS[0]);
  const [luckyNumbers, setLuckyNumbers] = useState<number[]>([]);
  const [fortune, setFortune] = useState('');
  const [showFortune, setShowFortune] = useState(false);
  const [isCookieCracked, setIsCookieCracked] = useState(false);

  const [scanProgress, setScanProgress] = useState(0);
  const scanIntervalRef = useRef<number | null>(null);
  const scanTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: (e.clientX / window.innerWidth) * 20 - 10, y: (e.clientY / window.innerHeight) * 20 - 10 });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStart = () => {
    setScreen('biometric');
    // Reset all states
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setMetrics(null);
    setIsTransitioning(false);
    setIsCookieCracked(false);
    setLuckyNumbers([]);
    setFortune('');
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        setAnswers(prev => prev.slice(0, -1));
    }
  };

  const handleBiometricStart = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanIntervalRef.current = window.setInterval(() => setScanProgress(prev => Math.min(prev + 1, 100)), 50);
    scanTimeoutRef.current = window.setTimeout(() => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      setScreen('quiz');
    }, 5000);
  };

  const handleBiometricEnd = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    if (scanProgress < 100) setScanProgress(0);
  };

  const handleAnswer = (option: Option) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      calculateResult(newAnswers);
    }
  };
  
  const calculateResult = useCallback((finalAnswers: Option[]) => {
    setScreen('calculating');
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex++;
      setCalculatingText(CALCULATION_TEXTS[textIndex % CALCULATION_TEXTS.length]);
    }, 1000);

    const scores: Record<number, number> = {};
    THEMES.forEach(t => scores[t.id] = 0);
    finalAnswers.forEach(ans => {
      scores[ans.primaryThemeId] = (scores[ans.primaryThemeId] || 0) + 2;
      scores[ans.secondaryThemeId] = (scores[ans.secondaryThemeId] || 0) + 1;
    });

    let maxScore = -1;
    let winnerId = 1;
    Object.entries(scores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winnerId = parseInt(id);
      }
    });

    const calculatedResult = RESULTS.find(r => r.themeId === winnerId) || RESULTS[0];
    const toPercent = (val: number, max: number = 24) => Math.min(Math.round((val / max) * 100), 100);
    const sortedThemes = Object.entries(scores).map(([id, score]) => ({ id: parseInt(id), name: THEMES.find(t => t.id === parseInt(id))?.name || '', score, percent: toPercent(score) })).sort((a, b) => b.score - a.score).slice(0, 4);
    
    // Metrics
    const intuitionIds = [3, 4, 5, 6, 8, 9, 12, 14], logicIds = [1, 2, 7, 10, 11, 13];
    const intuitionScore = intuitionIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const logicScore = logicIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const activeIds = [2, 6, 8, 9, 10, 13, 14], passiveIds = [1, 3, 4, 5, 7, 11, 12];
    const activeScore = activeIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const passiveScore = passiveIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const conflictIds = [4, 10, 11, 13], depthIds = [4, 5, 8, 9, 12];
    const conflictScore = conflictIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const depthScore = depthIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    
    let emotionLabel = { label: "Sereno", emoji: "😌" };
    if (scores[4] > 8 || scores[11] > 8) emotionLabel = { label: "Intenso", emoji: "⛈️" };
    else if (scores[6] > 8) emotionLabel = { label: "Apaixonado", emoji: "❤️‍🔥" };
    else if (scores[12] > 8) emotionLabel = { label: "Místico", emoji: "🔮" };

    setMetrics({
      topThemes: sortedThemes,
      intuitionPercent: Math.round((intuitionScore / (intuitionScore + logicScore || 1)) * 100),
      logicPercent: Math.round((logicScore / (intuitionScore + logicScore || 1)) * 100),
      energyPercent: Math.round((activeScore / (activeScore + passiveScore || 1)) * 100),
      conflictPercent: toPercent(conflictScore, 30),
      depthPercent: toPercent(depthScore, 35),
      emotionalIntensity: emotionLabel,
      rarity: Math.floor(Math.random() * (75 - 5 + 1)) + 5,
    });
    
    // New features data
    const nums = new Set<number>();
    while (nums.size < 6) nums.add(Math.floor(Math.random() * 61));
    setLuckyNumbers(Array.from(nums));
    setFortune(FORTUNE_COOKIE_PHRASES[Math.floor(Math.random() * FORTUNE_COOKIE_PHRASES.length)]);

    setResult(calculatedResult);
    setTimeout(() => {
        clearInterval(textInterval);
        setScreen('result');
    }, 4000);
  }, []);

  const renderGaugeTicks = () => [...Array(31)].map((_, i) => {
      const angle = (i / 30) * 180 - 180, isMajor = i % 6 === 0, length = isMajor ? 8 : 4, rad = (angle * Math.PI) / 180;
      const x1 = 50 + (40 - length) * Math.cos(rad), y1 = 50 + (40 - length) * Math.sin(rad), x2 = 50 + 40 * Math.cos(rad), y2 = 50 + 40 * Math.sin(rad);
      const lx = 50 + (40 - 15) * Math.cos(rad), ly = 50 + (40 - 15) * Math.sin(rad);
      let color = '#4ade80'; if (i > 10) color = '#facc15'; if (i > 20) color = '#f87171';
      return <React.Fragment key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={isMajor ? 1.5 : 0.5}/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="text-[6px] fill-slate-400 font-bold" transform={`rotate(${angle + 90}, ${lx}, ${ly})`}>{isMajor ? i / 6 : ''}</text></React.Fragment>
  });

  const question = QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-slate-900 text-white flex flex-col items-center justify-center selection:bg-violet-500 selection:text-white font-sans">
      {showReferences && <ReferencesPopup onClose={() => setShowReferences(false)} />}
      {showFortune && <FortunePopup fortune={fortune} onClose={() => setShowFortune(false)} />}
      <div className={`fixed inset-0 bg-gradient-to-br from-violet-950 via-slate-950 to-black z-0 transition-opacity duration-1000 ${screen === 'result' ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`fixed inset-0 bg-slate-950 z-[-1] transition-opacity duration-1000 ${screen === 'result' ? 'opacity-0' : 'opacity-100'}`} />
      
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none" style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}/>
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse delay-75 pointer-events-none" style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}/>
      
      <div className="relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl px-6 py-8 flex flex-col items-center min-h-[100vh] md:min-h-0 justify-center">
        {screen === 'home' && (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
            <Moon className="w-24 h-24 text-violet-200 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">Explore seus <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 animate-gradient bg-300%">Sonhos</span></h1>
            <p className="text-lg text-slate-300 max-w-md leading-relaxed">Descubra o significado oculto em seu subconsciente através da psicologia arquetípica.</p>
            <button onClick={handleStart} className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-violet-600 rounded-full hover:bg-violet-500 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 focus:ring-offset-slate-900"><span className="mr-2 text-lg">Começar análise</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
            <button onClick={() => setShowReferences(true)} className="text-slate-500 text-sm hover:text-violet-300 transition-colors">Referências & Obras</button>
          </div>
        )}
        
        {screen === 'biometric' && (
           <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
             <h2 className="text-2xl font-bold text-white">Autenticação Onírica</h2>
             <p className="text-slate-300 max-w-sm">Pressione e segure para conectar-se ao seu subconsciente.</p>
             <div className="relative w-40 h-40 flex items-center justify-center cursor-pointer select-none" onMouseDown={handleBiometricStart} onMouseUp={handleBiometricEnd} onMouseLeave={handleBiometricEnd} onTouchStart={(e) => { e.preventDefault(); handleBiometricStart(); }} onTouchEnd={(e) => { e.preventDefault(); handleBiometricEnd(); }}>
                <Fingerprint className="w-20 h-20 text-slate-500 z-10"/>
                <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                <div className="absolute inset-0 rounded-full border-4 border-violet-500 transition-all duration-100 ease-linear" style={{ clipPath: `inset(0 ${100 - scanProgress}% 0 0)` }}/>
                <div className="scan-effect absolute inset-0 rounded-full" style={{ '--progress': `${scanProgress}%` } as React.CSSProperties}></div>
             </div>
           </div>
        )}

        {screen === 'quiz' && question && (
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 shadow-2xl animate-fade-in border border-white/10">
             <div className="flex items-center mb-8">
                {currentQuestionIndex > 0 && <button onClick={handleBack} className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4"><ArrowLeft className="w-5 h-5"/></button>}
                <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm"><div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}/></div>
             </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white leading-snug min-h-[4rem] flex items-center">{question.text}</h2>
            <div className="grid grid-cols-1 gap-4">
              {question.options.map((option) => (
                <button key={option.id} onClick={() => handleAnswer(option)} disabled={isTransitioning} className={`w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden ${isTransitioning ? 'opacity-50 cursor-not-allowed border-white/5 bg-white/5' : 'border-white/10 bg-white/5 hover:bg-violet-600/20 hover:border-violet-500/50 active:scale-[0.98]'}`}>
                  <div className="relative z-10 flex items-center">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 transition-colors duration-300 ${isTransitioning ? 'bg-white/5 text-slate-500' : 'bg-white/10 text-slate-300 group-hover:bg-violet-500 group-hover:text-white'}`}>{option.id}</span>
                    <span className="text-lg text-slate-200 group-hover:text-white transition-colors">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 'calculating' && (
          <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="w-24 h-24 relative mb-6"><div className="absolute inset-0 border-4 border-violet-500/30 rounded-full"></div><div className="absolute inset-0 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div><Moon className="absolute inset-0 m-auto w-8 h-8 text-violet-300 opacity-50" /></div>
            <h2 className="text-2xl font-bold text-white mb-2">Analisando...</h2>
            <p className="text-violet-300 text-sm uppercase tracking-widest transition-opacity duration-300">{calculatingText}</p>
          </div>
        )}

        {screen === 'result' && result && metrics && (
          <div className="w-full animate-fade-in pb-12">
            <AnimateOnScroll>
              <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden border border-violet-500/20 flex flex-col md:flex-row items-center gap-8">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                   <div className="relative w-48 h-48 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90"><circle cx="50%" cy="50%" r="45%" className="stroke-slate-800/50" strokeWidth="8" fill="none" /><circle cx="50%" cy="50%" r="45%" className="stroke-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 45}%`} strokeDashoffset={`${2 * Math.PI * 45 * (1 - metrics.topThemes[0].percent / 100)}%`} strokeLinecap="round"/></svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white"><span className="text-5xl font-bold">{metrics.topThemes[0].percent}%</span><span className="text-xs uppercase tracking-widest opacity-70 mt-1">Compatibilidade</span></div>
                   </div>
                   <div className="flex-1 text-center md:text-left z-10">
                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{result.title}</h2>
                     <p className="text-violet-300 text-lg mb-4 font-medium">{result.subtitle}</p>
                     <p className="text-slate-300 leading-relaxed text-sm md:text-base">{result.description}</p>
                   </div>
                </div>
                <div className="glass-panel rounded-3xl p-6 border border-violet-500/20 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center"><Activity className="w-5 h-5 mr-2 text-fuchsia-400" />Composição Onírica</h3>
                  <div className="space-y-6">{metrics.topThemes.map((theme, idx) => (<div key={theme.id} className="group"><div className="flex justify-between text-sm mb-2"><span className="text-slate-300 group-hover:text-white transition-colors">{theme.name}</span><span className="font-mono text-violet-300">{theme.percent}%</span></div><div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className={`h-full rounded-full ${idx === 0 ? 'bg-violet-500' : 'bg-slate-600 group-hover:bg-fuchsia-500'} transition-all duration-1000`} style={{ width: `${theme.percent}%` }}/></div></div>))}</div>
                </div>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px]"><div className="relative w-20 h-20 mb-3"><svg className="absolute inset-0 w-full h-full transform -rotate-90"><circle cx="50%" cy="50%" r="45%" className="stroke-slate-800" strokeWidth="6" fill="none" /><circle cx="50%" cy="50%" r="45%" className="stroke-fuchsia-500" strokeWidth="6" fill="none" strokeDasharray="100 100" strokeDashoffset={100 - metrics.intuitionPercent} strokeLinecap="round" /></svg><svg className="absolute inset-0 w-full h-full transform -rotate-90 scale-75"><circle cx="50%" cy="50%" r="45%" className="stroke-slate-800" strokeWidth="8" fill="none" /><circle cx="50%" cy="50%" r="45%" className="stroke-blue-500" strokeWidth="8" fill="none" strokeDasharray="100 100" strokeDashoffset={100 - metrics.logicPercent} strokeLinecap="round" /></svg></div><div className="text-center"><div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Dominância</div><div className="text-sm font-bold text-white">{metrics.intuitionPercent > metrics.logicPercent ? 'Intuição' : 'Lógica'}</div></div></div>
                <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden"><div className="w-full h-20 flex justify-center items-end relative mb-2"><svg viewBox="0 0 100 55" className="w-full h-full max-w-[140px]">{renderGaugeTicks()}<g transform={`rotate(${(metrics.conflictPercent / 100) * 180 - 90}, 50, 50)`}><polygon points="50,50 48,20 52,20" fill="white" /><circle cx="50" cy="50" r="3" fill="white" /></g></svg></div><div className="bg-yellow-500 text-slate-900 text-sm font-bold rounded-md px-2 py-1 -mt-4 z-10 shadow-lg">{((metrics.conflictPercent / 100) * 5).toFixed(1)}</div><div className="text-center mt-2"><div className="text-xs text-slate-400 uppercase tracking-wider">Conflito</div></div></div>
                <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px]"><Zap className={`w-8 h-8 mb-3 ${metrics.energyPercent > 50 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-400'}`} /><div className="w-full bg-slate-800 h-3 rounded-full mb-2 overflow-hidden"><div className="h-full bg-yellow-400 transition-all duration-1000" style={{ width: `${metrics.energyPercent}%` }}/></div><div className="text-center"><div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Energia</div><div className="text-sm font-bold text-white">{metrics.energyPercent}%</div></div></div>
                 <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px] overflow-hidden relative"><div className="absolute inset-0 opacity-20 flex items-center justify-center"><Fingerprint className="w-24 h-24 text-violet-500" /></div><svg className="w-full h-16 z-10" viewBox="0 0 100 40" preserveAspectRatio="none"><path d={`M0,20 Q25,${20 - (metrics.depthPercent/3)} 50,20 T100,20`} fill="none" stroke="currentColor" strokeWidth="3" className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(232,121,249,0.5)]"/></svg><div className="text-center z-10 mt-2"><div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Profundidade</div><div className="text-sm font-bold text-white">{metrics.depthPercent}%</div></div></div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="glass-panel rounded-2xl p-4 mb-8 flex items-center justify-between border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-900/20 to-transparent">
                <div className="flex items-center gap-4"><div className="text-4xl">{metrics.emotionalIntensity.emoji}</div><div><h4 className="text-slate-400 text-xs uppercase tracking-widest font-bold">Clima Emocional</h4><span className="text-xl font-bold text-white">{metrics.emotionalIntensity.label}</span></div></div>
                <div className="hidden md:block h-10 w-px bg-white/10 mx-4"></div>
                <div className="text-right"><div className="text-slate-400 text-xs uppercase tracking-widest">Raridade do Sonho</div><p className="text-lg font-bold text-white">Apenas <span className="text-violet-300">{100 - metrics.rarity}%</span> dos sonhadores relatam um arquétipo similar.</p></div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="bg-slate-950/50 rounded-3xl p-8 border border-violet-500/30 relative overflow-hidden mb-6">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                 <div className="flex items-center mb-6 text-violet-300"><Sparkles className="w-5 h-5 mr-2" /><h3 className="text-lg font-bold uppercase tracking-wider">{result.oracleTitle}</h3></div>
                 <p className="text-slate-200 text-lg leading-loose font-serif italic">"{result.oracleText}"</p>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={400}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel rounded-3xl p-8 hover:bg-white/5 transition-colors border border-white/5"><div className="flex items-center mb-6 text-blue-400"><Ticket className="w-6 h-6 mr-3" /><h3 className="text-xl font-bold">Bilhete Onírico</h3></div><ScratchCard numbers={luckyNumbers} /></div>
                <div className="glass-panel rounded-3xl p-8 hover:bg-white/5 transition-colors border border-white/5"><div className="flex items-center mb-6 text-emerald-400"><Award className="w-6 h-6 mr-3" /><h3 className="text-xl font-bold">Mensagem Final</h3></div><div className="flex justify-center items-center h-full"><div className={isCookieCracked ? 'cookie-crack' : ''}><FortuneCookie onClick={() => { setIsCookieCracked(true); setTimeout(() => setShowFortune(true), 500); }} /></div></div></div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                 <div className="glass-panel rounded-3xl p-8 hover:bg-white/5 transition-colors border border-white/5"><div className="flex items-center mb-6 text-blue-400"><Brain className="w-6 h-6 mr-3" /><h3 className="text-xl font-bold">Reflexões</h3></div><ul className="space-y-4">{result.reflections.map((ref, idx) => (<li key={idx} className="flex items-start text-slate-300 group"><span className="mr-3 text-blue-500 mt-1">•</span><span className="group-hover:text-white transition-colors">{ref}</span></li>))}</ul></div>
                 <div className="glass-panel rounded-3xl p-8 hover:bg-white/5 transition-colors border border-white/5"><div className="flex items-center mb-6 text-emerald-400"><Eye className="w-6 h-6 mr-3" /><h3 className="text-xl font-bold">Prática</h3></div><div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/20"><p className="text-slate-200 leading-relaxed font-medium">{result.exercise}</p></div></div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={600}><div className="text-center mt-8">
                <a href="https://api.whatsapp.com/send?text=Acabei%20de%20analisar%20meu%20sonho%20no%20Oniro%20-%20Interpretador%20de%20Sonhos!%20Descubra%20o%20seu:%20https://bit.ly/oniros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 bg-emerald-500 rounded-full hover:bg-emerald-400 hover:scale-105"><Share2 className="w-4 h-4" /> Compartilhar no WhatsApp</a>
                <button onClick={() => setShowReferences(true)} className="block mx-auto mt-4 text-slate-500 text-sm hover:text-violet-300 transition-colors">Referências & Obras</button>
            </div></AnimateOnScroll>
          </div>
        )}
      </div>
    </div>
  );
}