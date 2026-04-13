import React, { useState, useEffect } from 'react';
import { Volume2, Play, Star, ChevronLeft, ChevronRight, Award, BookOpen, Brain, Sparkles } from 'lucide-react';

// ==========================================
// 1. MOCK JSON DATA
// ==========================================
const MOCK_DB = {
  nursery: {
    math: {
      title: { en: "Math Magic", bn: "অঙ্কের জাদু" },
      modules: [
        {
          id: "m1",
          type: "video",
          // Note: Please replace with an actual Google Drive Video ID ensuring permissions are set to 'Anyone with the link'
          gdriveId: "1A2B3C4D5E6F7G8H9I0J", 
          rewardStars: 10,
          instruction: { en: "Watch this video to learn numbers!", bn: "সংখ্যা শিখতে এই ভিডিওটি দেখো!" }
        },
        {
          id: "m2",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "Let's play a quiz!", bn: "চলো একটা কুইজ খেলি!" },
          questions: [
            {
              id: "q1",
              questionText: { en: "Which is number 1?", bn: "১ সংখ্যাটি কোনটি?" },
              options: [
                { id: "o1", text: "1", isCorrect: true },
                { id: "o2", text: "2", isCorrect: false },
                { id: "o3", text: "3", isCorrect: false }
              ]
            },
            {
              id: "q2",
              questionText: { en: "Where is number 2?", bn: "২ সংখ্যাটি কোথায়?" },
              options: [
                { id: "o1", text: "3", isCorrect: false },
                { id: "o2", text: "1", isCorrect: false },
                { id: "o3", text: "2", isCorrect: true }
              ]
            }
          ]
        }
      ]
    },
    english: {
      title: { en: "English ABC", bn: "ইংরেজি এবিসি" },
      modules: [
        {
          id: "e1",
          type: "quiz",
          rewardStars: 15,
          instruction: { en: "Letter game!", bn: "অক্ষরের খেলা!" },
          questions: [
            {
              id: "q1",
              questionText: { en: "Which letter is A?", bn: "কোনটি 'A' অক্ষর?" },
              options: [
                { id: "o1", text: "B", isCorrect: false },
                { id: "o2", text: "A", isCorrect: true },
                { id: "o3", text: "C", isCorrect: false }
              ]
            }
          ]
        }
      ]
    },
    science: {
      title: { en: "Science Fun", bn: "বিজ্ঞানের মজা" },
      modules: []
    }
  }
};

const AVATARS = ['🦁', '🐯', '🐼', '🐰', '🚀', '🌟'];
const CLASSES = [
  { id: 'nursery', label: 'Nursery' },
  { id: 'lkg', label: 'LKG' },
  { id: 'ukg', label: 'UKG' },
  { id: 'class1', label: 'Class 1' },
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

// --- Page Level Views ---
const OnboardingView = ({ setProfile, lang }) => {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

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

      {name.trim() && selectedClass && selectedAvatar && (
        <button
          onClick={handleStart}
          className="w-full max-w-sm mt-4 min-h-[60px] bg-[#10B981] text-white font-bold text-2xl rounded-full shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          {lang === 'en' ? "Go Play!" : "খেলতে যাও!"}
          <Play fill="currentColor" size={24} />
        </button>
      )}
    </div>
  );
};

const DashboardView = ({ profile, lang, onSelectSubject, stats }) => {
  const subjects = [
    { id: 'math', icon: <Brain size={32} />, color: "bg-[#FEF3C7]", text: { en: "Math", bn: "অঙ্ক" } },
    { id: 'english', icon: <BookOpen size={32} />, color: "bg-[#F9FAFB]", text: { en: "English", bn: "ইংরেজি" } },
    { id: 'science', icon: <Sparkles size={32} />, color: "bg-[#FEF3C7]", text: { en: "Science", bn: "বিজ্ঞান" } },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Welcome Banner */}
      <div className="bg-[#1E3A8A] p-6 rounded-2xl shadow-sm text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            {lang === 'en' ? "Hello," : "হ্যালো,"} {profile.name} {profile.avatar}
          </h2>
          <p className="opacity-90">
            {lang === 'en' ? "Ready to learn?" : "পড়াশোনা শুরু করবে?"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-white/20 p-3 rounded-xl">
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
                  {mod.type === 'video' ? (lang === 'en' ? "Watch Video" : "ভিডিও দেখো") : (lang === 'en' ? "Play Quiz" : "কুইজ খেলো")}
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
        {!profile ? (
          <OnboardingView setProfile={setProfile} lang={lang} />
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
          />
        )}
      </main>
      
    </div>
  );
}
