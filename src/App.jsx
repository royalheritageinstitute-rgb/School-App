import React, { useState, useEffect } from 'react';
import { Volume2, Play, Star, ChevronLeft, ChevronRight, Award, BookOpen, Brain, Sparkles } from 'lucide-react';
import { MOCK_DB } from './data/mockDb';

const AVATARS = ['🦁', '🐯', '🐼', '🐰', '🚀', '🌟'];
const CLASSES = [
  { id: 'nursery', label: 'Nursery' },
  { id: 'lkg', label: 'LKG' },
  { id: 'ukg', label: 'UKG' },
  { id: 'preparatory', label: 'Preparatory' },
  { id: 'class1', label: 'Class 1' },
  { id: 'class2', label: 'Class 2' },
  { id: 'class3', label: 'Class 3' },
  { id: 'class4', label: 'Class 4' },
  { id: 'class5', label: 'Class 5' },
  { id: 'class6', label: 'Class 6' },
  { id: 'class7', label: 'Class 7' },
  { id: 'class8', label: 'Class 8' },
];

// ==========================================
// 2. CUSTOM HOOKS
// ==========================================
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn("Error setting localStorage", error);
    }
  };
  return [storedValue, setValue];
}

function useVoice() {
  const speak = (text, langCode) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    // Bengali locale vs English locale
    utterance.lang = langCode === "bn" ? "bn-IN" : "en-IN";
    utterance.rate = 0.85; // Slightly slower for kids
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };
  return speak;
}

// ==========================================
// 3. SUB-COMPONENTS
// ==========================================

// --- Generic Reusable UI ---
const SpeakerIcon = ({ text, lang }) => {
  const speak = useVoice();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speak(text, lang);
      }}
      className="p-3 min-h-[44px] min-w-[44px] rounded-full bg-[#FEF3C7] text-[#1E3A8A] flex items-center justify-center active:scale-95 shadow-sm transition-transform"
      aria-label="Read text aloud"
    >
      <Volume2 size={24} />
    </button>
  );
};

const FallbackUI = ({ lang }) => (
  <div className="flex flex-col items-center justify-center p-8 mt-8 text-center gap-4 bg-[#F9FAFB] rounded-xl shadow-sm border border-gray-100">
    <div className="text-5xl text-[#EF4444]">🕵️‍♂️</div>
    <h2 className="text-xl font-bold text-[#1E3A8A]">
      {lang === "en" ? "Oops! Nothing here yet." : "ইশ! এখনও এখানে কিছু নেই।"}
    </h2>
    <p className="text-[#1E3A8A]">
      {lang === "en" ? "Let's go back and try another lesson!" : "চলো পিছনে যাই এবং অন্য পড়া দেখি!"}
    </p>
  </div>
);

// --- Media & Interactive Components ---
const VideoPlayer = ({ gdriveId, onLoad, lang }) => {
  const [error, setError] = useState(false);

  if (error || !gdriveId) return <FallbackUI lang={lang} />;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md bg-[#1E3A8A] relative border-4 border-[#F59E0B]">
      {/* Loading State can be applied here visually behind the iframe */}
      <iframe
        src={`https://drive.google.com/file/d/${gdriveId}/preview`}
        className="w-full h-full absolute top-0 left-0"
        allow="autoplay"
        onLoad={onLoad}
        onError={() => setError(true)}
        title="Video Lesson"
      />
    </div>
  );
};

const QuizCard = ({ module, lang, onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const questions = module.questions;
  const q = questions[currentQIndex];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => {
        setFeedback(null);
        if (currentQIndex + 1 < questions.length) {
          setCurrentQIndex(currentQIndex + 1);
        } else {
          onComplete(module.rewardStars);
        }
      }, 1200); // 1.2 second celebration
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className="bg-[#FFFFFF] p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 w-full">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-bold text-[#1E3A8A] leading-tight">
          {q.questionText[lang]}
        </h3>
        <SpeakerIcon text={q.questionText[lang]} lang={lang} />
      </div>

      {feedback === 'correct' && (
        <div className="flex items-center justify-center p-4 bg-[#10B981] text-white rounded-xl font-bold animate-bounce text-xl">
          {lang === 'en' ? "Very good! ✨🎉" : "খুব ভালো! ✨🎉"}
        </div>
      )}

      {feedback === 'wrong' && (
        <div className="flex items-center justify-center p-4 bg-[#EF4444] text-white rounded-xl font-bold animate-pulse text-xl">
          {lang === 'en' ? "Try again! 🔄" : "আবার চেষ্টা করো! 🔄"}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {q.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => { if (!feedback) handleAnswer(opt.isCorrect); }}
            className={`min-h-[60px] p-4 rounded-xl text-xl font-bold text-[#1E3A8A] bg-[#F9FAFB] border-2 border-[#FEF3C7] active:scale-95 transition-transform flex items-center justify-center
              ${feedback === 'correct' && opt.isCorrect ? '!bg-[#10B981] !text-white border-transparent' : ''}
              ${feedback === 'wrong' && !opt.isCorrect ? 'opacity-50' : ''}
            `}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const MathGameCard = ({ module, lang, onComplete }) => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'finished'
  const [selectedTable, setSelectedTable] = useState(null);
  const [currentQ, setCurrentQ] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct', 'wrong', 'timeout'
  const [timeLeft, setTimeLeft] = useState(5);
  const [score, setScore] = useState(0);
  const [qCount, setQCount] = useState(0);

  const TOTAL_Q = 5;

  const generateQuestion = (tableToUse) => {
    let num1, num2;
    if (module.subType === 'tables') {
      num1 = tableToUse;
      num2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
    } else if (module.subType === 'addition') {
      num1 = Math.floor(Math.random() * module.maxNum) + 1;
      num2 = Math.floor(Math.random() * module.maxNum) + 1;
    } else { // multiplication
      num1 = Math.floor(Math.random() * module.maxNum) + 1;
      num2 = Math.floor(Math.random() * module.maxNum) + 1;
    }

    const isAdd = module.subType === 'addition';
    const ans = isAdd ? num1 + num2 : num1 * num2;
    const operator = isAdd ? '+' : '×';

    // generate options
    let opts = new Set([ans]);
    while(opts.size < 4) {
      let offset = Math.floor(Math.random() * 10) - 5;
      if (offset === 0) offset = 1;
      let fakeAns = ans + offset;
      if (fakeAns > 0) opts.add(fakeAns);
    }
    opts = Array.from(opts).sort(() => Math.random() - 0.5);

    const mappedOpts = opts.map((o, idx) => ({ id: idx, text: String(o), isCorrect: o === ans }));
    
    return {
      text: `${num1} ${operator} ${num2} = ?`,
      options: mappedOpts
    };
  };

  const startGame = (table) => {
    if (table) setSelectedTable(table);
    setScore(0);
    setQCount(0);
    setCurrentQ(generateQuestion(table));
    setGameState('playing');
    setTimeLeft(5);
  };

  useEffect(() => {
    if (gameState !== 'playing' || feedback !== null) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(false, true); // timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, feedback]);

  const handleAnswer = (isCorrect, isTimeout = false) => {
    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback(isTimeout ? 'timeout' : 'wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (qCount + 1 < TOTAL_Q) {
        setQCount(c => c + 1);
        setCurrentQ(generateQuestion(selectedTable));
        setTimeLeft(5);
      } else {
        setGameState('finished');
      }
    }, 1200);
  };

  if (gameState === 'menu') {
    if (module.subType === 'tables') {
      // Show table selector
      const maxTable = module.maxTable || 12;
      const tables = Array.from({length: maxTable}, (_, i) => i + 1);
      return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 w-full animate-fade-in">
          <h3 className="text-2xl font-bold text-[#1E3A8A] text-center">
            {lang === 'en' ? "Choose a Table:" : "নামতা বেছে নাও:"}
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {tables.map(t => (
              <button key={t} onClick={() => startGame(t)} className="p-4 bg-[#FEF3C7] text-[#1E3A8A] font-bold text-xl rounded-xl active:scale-95 shadow-sm">
                {t}
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      // Just a start button for addition/multiplication
      return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 w-full text-center">
          <h3 className="text-2xl font-bold text-[#1E3A8A]">{module.instruction[lang]}</h3>
          <button onClick={() => startGame(null)} className="p-4 bg-[#10B981] text-white font-bold text-xl rounded-full active:scale-95 shadow-md">
            {lang === 'en' ? "Start Game!" : "খেলা শুরু করো!"}
          </button>
        </div>
      );
    }
  }

  if (gameState === 'finished') {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 w-full text-center animate-fade-in">
        <h3 className="text-3xl font-bold text-[#1E3A8A]">
          {lang === 'en' ? "Game Over!" : "খেলা শেষ!"}
        </h3>
        <div className="text-6xl my-4">🌟</div>
        <p className="text-[#1E3A8A] text-xl font-bold">
          {lang === 'en' ? `You scored ${score} out of ${TOTAL_Q}!` : `তুমি ${TOTAL_Q} এর মধ্যে ${score} পেয়েছো!`}
        </p>
        <button onClick={() => onComplete(Math.ceil(score * (module.rewardStars / 5)))} className="p-4 bg-[#F59E0B] text-white font-bold text-xl rounded-full active:scale-95 shadow-md">
          {lang === 'en' ? "Collect Stars" : "তারা সংগ্রহ করো"}
        </button>
      </div>
    );
  }

  if (gameState === 'playing' && currentQ) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 w-full animate-fade-in relative overflow-hidden">
        
        {/* Timer Bar */}
        <div className="w-full bg-gray-100 h-2 absolute top-0 left-0">
          <div className="h-full bg-[#EF4444] transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 5) * 100}%` }}></div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-[#EF4444] font-bold text-xl flex items-center gap-2">
            ⏱️ {timeLeft}s
          </div>
          <div className="text-[#1E3A8A] font-bold opacity-50">
            {qCount + 1} / {TOTAL_Q}
          </div>
        </div>

        <h3 className="text-5xl font-bold text-[#1E3A8A] text-center my-6">
          {currentQ.text}
        </h3>

        {feedback === 'correct' && (
          <div className="flex items-center justify-center p-4 bg-[#10B981] text-white rounded-xl font-bold animate-bounce text-xl">
            {lang === 'en' ? "Very good! ✨" : "খুব ভালো! ✨"}
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="flex items-center justify-center p-4 bg-[#EF4444] text-white rounded-xl font-bold animate-pulse text-xl">
            {lang === 'en' ? "Wrong! ❌" : "ভুল! ❌"}
          </div>
        )}
        {feedback === 'timeout' && (
          <div className="flex items-center justify-center p-4 bg-[#F59E0B] text-white rounded-xl font-bold animate-pulse text-xl">
            {lang === 'en' ? "Time's Up! ⏰" : "সময় শেষ! ⏰"}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {currentQ.options.map(opt => (
            <button
               key={opt.id}
              onClick={() => { if (!feedback) handleAnswer(opt.isCorrect); }}
              className={`min-h-[60px] p-4 rounded-xl text-3xl font-bold text-[#1E3A8A] bg-[#F9FAFB] border-2 border-[#FEF3C7] active:scale-95 transition-transform flex items-center justify-center
                ${feedback === 'correct' && opt.isCorrect ? '!bg-[#10B981] !text-white border-transparent' : ''}
                ${(feedback === 'wrong' || feedback === 'timeout') && !opt.isCorrect ? 'opacity-30' : ''}
                ${(feedback === 'wrong' || feedback === 'timeout') && opt.isCorrect ? '!bg-[#10B981] !text-white' : ''}
              `}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// --- Page Level Views ---
const OnboardingView = ({ setProfile, initialProfile, lang }) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [selectedClass, setSelectedClass] = useState(initialProfile?.classId || null);
  const [selectedAvatar, setSelectedAvatar] = useState(initialProfile?.avatar || null);

  const handleStart = () => {
    if (name.trim() && selectedClass && selectedAvatar) {
      setProfile({ name: name.trim(), classId: selectedClass, avatar: selectedAvatar });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 bg-[#FEF3C7] gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1E3A8A] mb-2">
          {lang === 'en' ? "Welcome! 🚀" : "স্বাগতম! 🚀"}
        </h1>
        <p className="text-[#1E3A8A] text-lg">
          {lang === 'en' ? "Let's set up your profile" : "চলো তোমার প্রোফাইল তৈরি করি"}
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-[#1E3A8A] font-bold text-xl">{lang === 'en' ? "1. What is your name?" : "১. তোমার নাম কী?"}</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder={lang === 'en' ? "Enter your name..." : "তোমার নাম লেখো..."}
          className="w-full p-4 rounded-xl text-xl font-bold text-[#1E3A8A] bg-white border-2 border-[#FEF3C7] focus:border-[#F59E0B] focus:outline-none shadow-sm"
        />
      </div>

      {name.trim() && (
        <div className="w-full max-w-sm flex flex-col gap-4 animate-fade-in mt-2">
          <h2 className="text-[#1E3A8A] font-bold text-xl">{lang === 'en' ? "2. Select Class" : "২. ক্লাস বেছে নাও"}</h2>
          <div className="grid grid-cols-2 gap-3">
            {CLASSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedClass(c.id)}
                className={`min-h-[50px] rounded-xl font-bold active:scale-95 transition-transform ${
                  selectedClass === c.id ? "bg-[#F59E0B] text-white shadow-md" : "bg-white text-[#1E3A8A] shadow-sm border border-gray-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedClass && (
        <div className="w-full max-w-sm flex flex-col gap-4 animate-fade-in mt-2">
          <h2 className="text-[#1E3A8A] font-bold text-xl">{lang === 'en' ? "3. Pick an Avatar" : "৩. ছবি বেছে নাও"}</h2>
          <div className="grid grid-cols-3 gap-3">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedAvatar(emoji)}
                className={`min-h-[60px] text-4xl rounded-xl active:scale-95 transition-transform flex items-center justify-center ${
                  selectedAvatar === emoji ? "bg-[#1E3A8A] shadow-md border-4 border-[#F59E0B]" : "bg-white shadow-sm border border-gray-100"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-sm flex flex-col gap-3 mt-4">
        {name.trim() && selectedClass && selectedAvatar && (
          <button
            onClick={handleStart}
            className="w-full min-h-[60px] bg-[#10B981] text-white font-bold text-2xl rounded-full shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {lang === 'en' ? (initialProfile ? "Save Profile" : "Go Play!") : (initialProfile ? "প্রোফাইল সেভ করো" : "খেলতে যাও!")}
            <Play fill="currentColor" size={24} />
          </button>
        )}
        
        {initialProfile && (
          <button
            onClick={() => setProfile(initialProfile)}
            className="w-full min-h-[50px] bg-white text-[#1E3A8A] font-bold text-lg rounded-full shadow-sm active:scale-95 transition-transform border border-gray-200"
          >
            {lang === 'en' ? "Cancel" : "বাতিল করুন"}
          </button>
        )}
      </div>
    </div>
  );
};

const DashboardView = ({ profile, lang, onSelectSubject, stats, onEditProfile }) => {
  const subjects = [
    { id: 'math', icon: <Brain size={32} />, color: "bg-[#FEF3C7]", text: { en: "Math", bn: "অঙ্ক" } },
    { id: 'english', icon: <BookOpen size={32} />, color: "bg-[#F9FAFB]", text: { en: "English", bn: "ইংরেজি" } },
    { id: 'science', icon: <Sparkles size={32} />, color: "bg-[#FEF3C7]", text: { en: "Science", bn: "বিজ্ঞান" } },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Welcome Banner */}
      <div className="bg-[#1E3A8A] p-6 rounded-2xl shadow-sm text-white flex items-start justify-between gap-2">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1 leading-tight">
            {lang === 'en' ? "Hello," : "হ্যালো,"} {profile.name} {profile.avatar}
          </h2>
          <p className="opacity-90 mb-3">
            {lang === 'en' ? "Ready to learn?" : "পড়াশোনা শুরু করবে?"}
          </p>
          <button 
            onClick={onEditProfile}
            className="text-sm flex items-center gap-1 bg-white/20 px-4 py-1.5 rounded-full active:scale-95 transition-transform hover:bg-white/30 max-w-fit font-bold"
          >
            ✏️ {lang === 'en' ? "Edit Profile" : "প্রোফাইল পরিবর্তন"}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/20 p-3 rounded-xl shrink-0">
          <div className="flex items-center gap-1 font-bold text-xl text-[#F59E0B]">
            <Star fill="#F59E0B" /> {stats.stars}
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#1E3A8A]">
        {lang === 'en' ? "Choose a Subject:" : "বিষয় বেছে নাও:"}
      </h3>

      <div className="flex flex-col gap-4">
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelectSubject(sub.id)}
            className={`flex items-center p-4 rounded-2xl shadow-sm border border-gray-100 ${sub.color} active:scale-95 transition-transform w-full text-left`}
          >
            <div className="p-4 bg-white rounded-xl shadow-sm text-[#1E3A8A] mr-4">
              {sub.icon}
            </div>
            <span className="text-2xl font-bold text-[#1E3A8A]">
              {sub.text[lang]}
            </span>
            <ChevronRight className="ml-auto text-[#1E3A8A] opacity-50" size={28} />
          </button>
        ))}
      </div>
    </div>
  );
};

const ModuleView = ({ subjectId, classId, lang, onBack, onReward }) => {
  const [activeModule, setActiveModule] = useState(null); // module object

  // Safely grab subject data
  const subjectData = MOCK_DB[classId]?.[subjectId];
  
  if (!subjectData || !subjectData.modules || subjectData.modules.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <button onClick={onBack} className="flex items-center gap-2 p-4 text-[#1E3A8A] font-bold active:bg-gray-100 rounded-lg max-w-fit">
          <ChevronLeft /> {lang === 'en' ? "Back" : "পিছনে"}
        </button>
        <FallbackUI lang={lang} />
      </div>
    );
  }

  // Active playing view
  if (activeModule) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <button onClick={() => setActiveModule(null)} className="flex items-center gap-2 text-[#1E3A8A] font-bold active:bg-[#FEF3C7] p-2 rounded-lg max-w-fit">
          <ChevronLeft /> {lang === 'en' ? "Back to Modules" : "মডিউলে ফিরে যাও"}
        </button>
        
        <div className="flex items-start justify-between gap-2 bg-[#FEF3C7] p-4 rounded-xl">
          <p className="text-lg font-bold text-[#1E3A8A]">{activeModule.instruction[lang]}</p>
          <SpeakerIcon text={activeModule.instruction[lang]} lang={lang} />
        </div>

        {activeModule.type === 'video' && (
          <div className="flex flex-col gap-4">
            <VideoPlayer gdriveId={activeModule.gdriveId} lang={lang} onLoad={() => console.log('Video Base Loaded')} />
            <button 
              onClick={() => {
                onReward(activeModule.rewardStars);
                setActiveModule(null);
              }}
              className="mt-4 w-full p-4 bg-[#10B981] text-white font-bold text-xl rounded-full shadow-md active:scale-95"
            >
              {lang === 'en' ? "I finished watching!" : "আমার দেখা শেষ!"}
            </button>
          </div>
        )}

        {activeModule.type === 'quiz' && (
          <QuizCard 
            module={activeModule} 
            lang={lang} 
            onComplete={(stars) => {
              onReward(stars);
              setActiveModule(null);
            }} 
          />
        )}

        {activeModule.type === 'math_game' && (
          <MathGameCard 
            module={activeModule} 
            lang={lang} 
            onComplete={(stars) => {
              onReward(stars);
              setActiveModule(null);
            }} 
          />
        )}
      </div>
    );
  }

  // List of modules view
  return (
    <div className="flex flex-col h-full gap-4 p-4">
      <div className="flex items-center gap-4 border-b pb-4 mb-2">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-[#FEF3C7] text-[#1E3A8A]">
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-2xl font-bold text-[#1E3A8A]">
          {subjectData.title[lang]}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {subjectData.modules.map(mod => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod)}
            className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#1E3A8A] text-white rounded-full">
                {mod.type === 'video' ? <Play fill="currentColor" /> : <Award />}
              </div>
              <div className="text-left">
                <p className="font-bold text-[#1E3A8A] text-lg">
                  {mod.type === 'video' ? (lang === 'en' ? "Watch Video" : "ভিডিও দেখো") : 
                   mod.type === 'math_game' ? (lang === 'en' ? "Play Game" : "গেম খেলো") :
                   (lang === 'en' ? "Play Quiz" : "কুইজ খেলো")}
                </p>
                <div className="flex items-center gap-1 text-[#F59E0B] font-bold text-sm">
                  <Star fill="#F59E0B" size={14} /> +{mod.rewardStars} {lang === 'en' ? "Points" : "পয়েন্ট"}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [profile, setProfile] = useLocalStorage('rhl_profile', null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [lang, setLang] = useLocalStorage('rhl_lang', 'en'); // 'en' or 'bn'
  const [stats, setStats] = useLocalStorage('rhl_stats', { stars: 0, streak: 1, completed: [] });

  // Navigation state: null (dashboard) or subjectId ('math', 'english'...)
  const [activeSubject, setActiveSubject] = useState(null);

  const handleReward = (stars) => {
    setStats(prev => ({
      ...prev,
      stars: prev.stars + stars
    }));
  };

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'bn' : 'en');
  };

  return (
    <div className="bg-[#F9FAFB] min-h-[100dvh] w-full max-w-md mx-auto sm:border-x sm:border-gray-200 sm:shadow-2xl relative flex flex-col font-sans overflow-x-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      
      {/* Global Header */}
      <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 font-bold text-[#1E3A8A]">
          <span className="text-2xl pt-1">👑</span> 
          <span>Royal Heritage</span>
        </div>
        
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 bg-[#FEF3C7] px-4 py-2 rounded-full font-bold text-[#1E3A8A] active:scale-95 shadow-sm min-h-[44px]"
        >
          {lang === 'en' ? 'English' : 'বাংলা'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-[#F9FAFB]">
        {(!profile || isEditingProfile) ? (
          <OnboardingView 
            setProfile={(p) => {
              setProfile(p);
              setIsEditingProfile(false);
            }} 
            initialProfile={profile}
            lang={lang} 
          />
        ) : activeSubject ? (
          <ModuleView 
            subjectId={activeSubject} 
            classId={profile.classId} 
            lang={lang} 
            onBack={() => setActiveSubject(null)}
            onReward={handleReward}
          />
        ) : (
          <DashboardView 
            profile={profile} 
            lang={lang} 
            onSelectSubject={setActiveSubject} 
            stats={stats} 
            onEditProfile={() => setIsEditingProfile(true)}
          />
        )}
      </main>
      
    </div>
  );
}
