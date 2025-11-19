
import React, { useState, useEffect } from 'react';
import { QUESTIONS, RESULTS, THEMES } from './data';
import { Option, ResultType } from './types';
import { 
  Sparkles, ArrowRight, RefreshCw, Moon, Brain, Eye, 
  Zap, Activity, Fingerprint
} from 'lucide-react';

type Screen = 'home' | 'quiz' | 'calculating' | 'result';

interface Metrics {
  topThemes: { id: number; name: string; score: number; percent: number }[];
  intuitionPercent: number;
  logicPercent: number;
  energyPercent: number;
  conflictPercent: number;
  depthPercent: number;
  emotionalIntensity: { label: string; emoji: string };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  
  // Lock for transitions
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Background parallax effect state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStart = () => {
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
    setMetrics(null);
    setIsTransitioning(false);
  };

  const handleAnswer = (option: Option) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Delay slightly for better UX
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: Option[]) => {
    setScreen('calculating');

    // 1. Calculate Raw Scores
    const scores: Record<number, number> = {};
    THEMES.forEach(t => scores[t.id] = 0);

    finalAnswers.forEach(ans => {
      scores[ans.primaryThemeId] = (scores[ans.primaryThemeId] || 0) + 2;
      scores[ans.secondaryThemeId] = (scores[ans.secondaryThemeId] || 0) + 1;
    });

    // 2. Determine Winner
    let maxScore = -1;
    let winnerId = 1;

    // Shuffle entries to break ties randomly instead of always favoring low IDs
    const shuffledThemes = Object.entries(scores).sort(() => Math.random() - 0.5);

    shuffledThemes.forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winnerId = parseInt(id);
      }
    });

    const calculatedResult = RESULTS.find(r => r.themeId === winnerId) || RESULTS[0];

    // 3. Calculate Detailed Metrics for Charts
    
    // Helper to normalize score to percentage (assuming max likely score is around 20-25)
    const toPercent = (val: number, max: number = 24) => Math.min(Math.round((val / max) * 100), 100);

    // Top Themes Breakdown
    const sortedThemes = Object.entries(scores)
      .map(([id, score]) => ({
        id: parseInt(id),
        name: THEMES.find(t => t.id === parseInt(id))?.name || '',
        score,
        percent: toPercent(score)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4); // Top 4

    // Categories for Intuition vs Logic
    const intuitionIds = [3, 4, 5, 6, 8, 9, 12, 14]; // Abstract, Emotion, Shadow
    const logicIds = [1, 2, 7, 10, 11, 13]; // Structure, Social, Control
    
    const intuitionScore = intuitionIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const logicScore = logicIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const totalMental = intuitionScore + logicScore || 1;

    // Categories for Energy (Active vs Passive)
    const activeIds = [2, 6, 8, 9, 10, 13, 14]; // Social, Desire, Power
    const passiveIds = [1, 3, 4, 5, 7, 11, 12]; // Safety, Shadow, Mystery
    const activeScore = activeIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const passiveScore = passiveIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const totalEnergy = activeScore + passiveScore || 1;

    // Conflict & Depth
    const conflictIds = [4, 10, 11, 13]; // Shadow, Power, Loss, Conflict
    const depthIds = [4, 5, 8, 9, 12]; // Shadow, Identity, Mystery
    
    const conflictScore = conflictIds.reduce((acc, id) => acc + (scores[id] || 0), 0);
    const depthScore = depthIds.reduce((acc, id) => acc + (scores[id] || 0), 0);

    // Emotional Intensity Label
    let emotionLabel = { label: "Sereno", emoji: "😌" };
    if (scores[4] > 8 || scores[11] > 8) emotionLabel = { label: "Intenso", emoji: "⛈️" };
    else if (scores[6] > 8) emotionLabel = { label: "Apaixonado", emoji: "❤️‍🔥" };
    else if (scores[12] > 8) emotionLabel = { label: "Místico", emoji: "🔮" };
    else if (scores[10] > 8) emotionLabel = { label: "Tenso", emoji: "⚡" };
    else if (scores[9] > 8) emotionLabel = { label: "Vibrante", emoji: "✨" };

    setMetrics({
      topThemes: sortedThemes,
      intuitionPercent: Math.round((intuitionScore / totalMental) * 100),
      logicPercent: Math.round((logicScore / totalMental) * 100),
      energyPercent: Math.round((activeScore / totalEnergy) * 100),
      conflictPercent: toPercent(conflictScore, 30), // Normalize conflict relative to high conflict
      depthPercent: toPercent(depthScore, 35),
      emotionalIntensity: emotionLabel
    });

    setResult(calculatedResult);
    
    // Simulate calculation delay without AI call
    setTimeout(() => {
        setScreen('result');
    }, 2500);
  };

  // Helper to generate gauge ticks
  const renderGaugeTicks = () => {
    const ticks = [];
    const totalTicks = 30;
    const radius = 40;
    const cx = 50;
    const cy = 50;
    
    for (let i = 0; i <= totalTicks; i++) {
      const angle = (i / totalTicks) * 180 - 180; // -180 to 0 degrees
      const isMajor = i % 6 === 0;
      const length = isMajor ? 8 : 4;
      const rad = (angle * Math.PI) / 180;
      
      const x1 = cx + (radius - length) * Math.cos(rad);
      const y1 = cy + (radius - length) * Math.sin(rad);
      const x2 = cx + radius * Math.cos(rad);
      const y2 = cy + radius * Math.sin(rad);
      
      let color = '#4ade80'; // green
      if (i > 10) color = '#facc15'; // yellow
      if (i > 20) color = '#f87171'; // red

      ticks.push(
        <line 
          key={i} 
          x1={x1} y1={y1} x2={x2} y2={y2} 
          stroke={color} 
          strokeWidth={isMajor ? 1.5 : 0.5}
        />
      );

      // Labels
      if (isMajor) {
         const val = i / 6; // 0 to 5
         const labelRadius = radius - 15;
         const lx = cx + labelRadius * Math.cos(rad);
         const ly = cy + labelRadius * Math.sin(rad);
         ticks.push(
            <text 
              key={`label-${i}`} 
              x={lx} y={ly} 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="text-[6px] fill-slate-400 font-bold"
              transform={`rotate(${angle + 90}, ${lx}, ${ly})`}
            >
               {val}
            </text>
         )
      }
    }
    return ticks;
  };

  // Helper for needle rotation
  const getNeedleRotation = (percent: number) => {
      // Percent 0-100 maps to -90deg to 90deg for css rotation if origin is bottom
      // Or maps to angle in SVG.
      // Let's stick to SVG coordinates used in ticks: -180 to 0.
      const value0to5 = (percent / 100) * 5;
      const angle = (value0to5 / 5) * 180 - 180;
      return angle;
  };

  const question = QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative bg-slate-900 text-white flex flex-col items-center justify-center selection:bg-violet-500 selection:text-white font-sans">
      
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-violet-950 via-slate-950 to-black z-0"
      />
      
      {/* Animated Blobs */}
      <div 
        className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none"
        style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
      />
      <div 
        className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse delay-75 pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-md md:max-w-2xl lg:max-w-4xl px-6 py-8 flex flex-col items-center min-h-[100vh] md:min-h-0 justify-center">
        
        {screen === 'home' && (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-violet-500 blur-[50px] opacity-30 rounded-full group-hover:opacity-50 transition-opacity"></div>
              <Moon className="w-24 h-24 text-violet-200 relative z-10 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Explore seus <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 animate-gradient bg-300%">
                Sonhos
              </span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-md leading-relaxed">
              Descubra o significado oculto em seu subconsciente através da psicologia arquetípica.
            </p>

            <button 
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-violet-600 rounded-full hover:bg-violet-500 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 focus:ring-offset-slate-900"
            >
              <span className="mr-2 text-lg">Começar análise</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {screen === 'quiz' && question && (
          <div className="w-full max-w-lg glass-panel rounded-3xl p-8 shadow-2xl animate-fade-in border border-white/10">
             {/* Minimalist Progress Bar */}
            <div className="mb-8 w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
               <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
               />
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white leading-snug min-h-[4rem] flex items-center">
              {question.text}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 gap-4">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option)}
                  disabled={isTransitioning}
                  className={`
                    w-full text-left p-5 rounded-xl border transition-all duration-300 group relative overflow-hidden
                    ${isTransitioning 
                      ? 'opacity-50 cursor-not-allowed border-white/5 bg-white/5' 
                      : 'border-white/10 bg-white/5 hover:bg-violet-600/20 hover:border-violet-500/50 active:scale-[0.98]'
                    }
                  `}
                >
                  <div className="relative z-10 flex items-center">
                    <span className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 transition-colors duration-300
                      ${isTransitioning ? 'bg-white/5 text-slate-500' : 'bg-white/10 text-slate-300 group-hover:bg-violet-500 group-hover:text-white'}
                    `}>
                      {option.id}
                    </span>
                    <span className="text-lg text-slate-200 group-hover:text-white transition-colors">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 'calculating' && (
          <div className="flex flex-col items-center text-center animate-pulse">
            <div className="w-24 h-24 relative mb-6">
              <div className="absolute inset-0 border-4 border-violet-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
              <Moon className="absolute inset-0 m-auto w-8 h-8 text-violet-300 opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Decifrando Símbolos...</h2>
            <p className="text-violet-300 text-sm uppercase tracking-widest">Conectando com o inconsciente</p>
          </div>
        )}

        {screen === 'result' && result && metrics && (
          <div className="w-full animate-fade-in-up pb-12">
            
            {/* DASHBOARD HEADER */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              
              {/* Main Archetype Card (Left - Large) */}
              <div className="lg:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden border border-violet-500/20 flex flex-col md:flex-row items-center gap-8">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                 
                 {/* Circular Progress */}
                 <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" className="stroke-slate-800/50" strokeWidth="8" fill="none" />
                      <circle 
                        cx="50%" 
                        cy="50%" 
                        r="45%" 
                        className="stroke-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]" 
                        strokeWidth="8" 
                        fill="none" 
                        strokeDasharray={`${2 * Math.PI * 45}%`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - metrics.topThemes[0].percent / 100)}%`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <span className="text-5xl font-bold">{metrics.topThemes[0].percent}%</span>
                      <span className="text-xs uppercase tracking-widest opacity-70 mt-1">Compatibilidade</span>
                    </div>
                 </div>

                 <div className="flex-1 text-center md:text-left z-10">
                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{result.title}</h2>
                   <p className="text-violet-300 text-lg mb-4 font-medium">{result.subtitle}</p>
                   <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                     {result.description}
                   </p>
                 </div>
              </div>

              {/* Theme Breakdown (Right - List) */}
              <div className="glass-panel rounded-3xl p-6 border border-violet-500/20 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-fuchsia-400" />
                  Composição Onírica
                </h3>
                <div className="space-y-6">
                  {metrics.topThemes.map((theme, idx) => (
                    <div key={theme.id} className="group">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300 group-hover:text-white transition-colors">{theme.name}</span>
                        <span className="font-mono text-violet-300">{theme.percent}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${idx === 0 ? 'bg-violet-500' : 'bg-slate-600 group-hover:bg-fuchsia-500'} transition-all duration-1000`} 
                          style={{ width: `${theme.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WIDGETS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              
              {/* 1. Intuition vs Logic */}
              <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px]">
                 <div className="relative w-20 h-20 mb-3">
                    {/* Outer Ring (Intuition) */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                       <circle cx="50%" cy="50%" r="45%" className="stroke-slate-800" strokeWidth="6" fill="none" />
                       <circle cx="50%" cy="50%" r="45%" className="stroke-fuchsia-500" strokeWidth="6" fill="none" strokeDasharray="100 100" strokeDashoffset={100 - metrics.intuitionPercent} strokeLinecap="round" />
                    </svg>
                    {/* Inner Ring (Logic) */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90 scale-75">
                       <circle cx="50%" cy="50%" r="45%" className="stroke-slate-800" strokeWidth="8" fill="none" />
                       <circle cx="50%" cy="50%" r="45%" className="stroke-blue-500" strokeWidth="8" fill="none" strokeDasharray="100 100" strokeDashoffset={100 - metrics.logicPercent} strokeLinecap="round" />
                    </svg>
                 </div>
                 <div className="text-center">
                   <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Dominância</div>
                   <div className="text-sm font-bold text-white">
                     {metrics.intuitionPercent > metrics.logicPercent ? 'Intuição' : 'Lógica'}
                   </div>
                 </div>
              </div>

              {/* 2. Conflict Thermometer (Gauge Chart) */}
              <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
                <div className="w-full h-20 flex justify-center items-end relative mb-2">
                   <svg viewBox="0 0 100 55" className="w-full h-full max-w-[140px]">
                      {/* Gauge Ticks */}
                      {renderGaugeTicks()}
                      {/* Needle */}
                      <g transform={`rotate(${getNeedleRotation(metrics.conflictPercent)}, 50, 50)`}>
                         <polygon points="50,50 48,20 52,20" fill="white" />
                         <circle cx="50" cy="50" r="3" fill="white" />
                      </g>
                   </svg>
                </div>
                {/* Digital Value Box */}
                <div className="bg-yellow-500 text-slate-900 text-sm font-bold rounded-md px-2 py-1 -mt-4 z-10 shadow-lg">
                    {((metrics.conflictPercent / 100) * 5).toFixed(1)}
                </div>
                <div className="text-center mt-2">
                   <div className="text-xs text-slate-400 uppercase tracking-wider">Conflito</div>
                 </div>
              </div>

              {/* 3. Energy Battery */}
              <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px]">
                <Zap className={`w-8 h-8 mb-3 ${metrics.energyPercent > 50 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-400'}`} />
                <div className="w-full bg-slate-800 h-3 rounded-full mb-2 overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-1000" 
                    style={{ width: `${metrics.energyPercent}%` }}
                  />
                </div>
                <div className="text-center">
                   <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Energia</div>
                   <div className="text-sm font-bold text-white">{metrics.energyPercent}%</div>
                 </div>
              </div>

               {/* 4. Subconscious Line */}
               <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center min-h-[160px] overflow-hidden relative">
                 <div className="absolute inset-0 opacity-20 flex items-center justify-center">
                    <Fingerprint className="w-24 h-24 text-violet-500" />
                 </div>
                 {/* Simulated Wavy Line */}
                 <svg className="w-full h-16 z-10" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path 
                      d={`M0,20 Q25,${20 - (metrics.depthPercent/3)} 50,20 T100,20`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(232,121,249,0.5)]"
                    />
                 </svg>
                 <div className="text-center z-10 mt-2">
                   <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Profundidade</div>
                   <div className="text-sm font-bold text-white">{metrics.depthPercent}%</div>
                 </div>
              </div>

            </div>

            {/* EMOTIONAL MAP BANNER */}
            <div className="glass-panel rounded-2xl p-4 mb-8 flex items-center justify-between border-l-4 border-l-violet-500 bg-gradient-to-r from-violet-900/20 to-transparent">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{metrics.emotionalIntensity.emoji}</div>
                <div>
                  <h4 className="text-slate-400 text-xs uppercase tracking-widest font-bold">Clima Emocional</h4>
                  <span className="text-xl font-bold text-white">{metrics.emotionalIntensity.label}</span>
                </div>
              </div>
              <div className="hidden md:block h-10 w-px bg-white/10 mx-4"></div>
              <div className="hidden md:block text-right">
                 <div className="text-slate-400 text-xs uppercase tracking-widest">Impacto no Presente</div>
                 <div className="text-lg font-bold text-white">{(metrics.depthPercent + metrics.conflictPercent) / 2}%</div>
              </div>
            </div>

            {/* AI/ORACLE ANALYSIS & REFLECTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
               {/* AI/Oracle Card - NOW STATIC */}
               <div className="md:col-span-2 bg-slate-950/50 rounded-3xl p-8 border border-violet-500/30 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                 <div className="flex items-center mb-6 text-violet-300">
                   <Sparkles className="w-5 h-5 mr-2" />
                   <h3 className="text-lg font-bold uppercase tracking-wider">{result.oracleTitle}</h3>
                 </div>
                 
                 <p className="text-slate-200 text-lg leading-loose font-serif italic">
                   "{result.oracleText}"
                 </p>
               </div>
              
              {/* Reflections */}
              <div className="glass-panel rounded-3xl p-8 hover:bg-white/5 transition-colors border border-white/5">
                <div className="flex items-center mb-6 text-blue-400">
                  <Brain className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Reflexões</h3>
                </div>
                <ul className="space-y-4">
                  {result.reflections.map((ref, idx) => (
                    <li key={idx} className="flex items-start text-slate-300 group">
                      <span className="mr-3 text-blue-500 mt-1">•</span>
                      <span className="group-hover:text-white transition-colors">{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exercise */}
              <div className="glass-panel rounded-3xl p-8 hover:bg-white/5 transition-colors border border-white/5">
                 <div className="flex items-center mb-6 text-emerald-400">
                  <Eye className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Prática</h3>
                </div>
                <div className="bg-emerald-900/20 p-6 rounded-2xl border border-emerald-500/20">
                   <p className="text-slate-200 leading-relaxed font-medium">
                    {result.exercise}
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
