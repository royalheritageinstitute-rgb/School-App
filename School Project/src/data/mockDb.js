export const MOCK_DB = {
  nursery: {
    math: {
      title: { en: "Math Magic", bn: "অঙ্কের জাদু" },
      modules: [
        {
          id: "m1",
          type: "video",
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
  },
  lkg: {
    math: {
      title: { en: "Math Explorers", bn: "অঙ্কের অভিযাত্রী" },
      modules: [
        {
          id: "m1",
          type: "quiz",
          rewardStars: 15,
          instruction: { en: "Let's count together!", bn: "চলো একসাথে গুনি!" },
          questions: [
            {
              id: "q1",
              questionText: { en: "What comes after 4?", bn: "৪ এর পরে কী আসে?" },
              options: [
                { id: "o1", text: "3", isCorrect: false },
                { id: "o2", text: "5", isCorrect: true },
                { id: "o3", text: "6", isCorrect: false }
              ]
            },
            {
              id: "q2",
              questionText: { en: "Count the stars: ⭐ ⭐ ⭐", bn: "তারাগুলি গোন: ⭐ ⭐ ⭐" },
              options: [
                { id: "o1", text: "2", isCorrect: false },
                { id: "o2", text: "3", isCorrect: true },
                { id: "o3", text: "4", isCorrect: false }
              ]
            }
          ]
        }
      ]
    },
    english: {
      title: { en: "Words & Letters", bn: "শব্দ ও অক্ষর" },
      modules: [
        {
          id: "e1",
          type: "quiz",
          rewardStars: 20,
          instruction: { en: "Find the missing letter", bn: "হারিয়ে যাওয়া অক্ষরটি খোঁজো" },
          questions: [
            {
              id: "q1",
              questionText: { en: "A, B, _, D", bn: "A, B, _, D" },
              options: [
                { id: "o1", text: "E", isCorrect: false },
                { id: "o2", text: "C", isCorrect: true }
              ]
            }
          ]
        }
      ]
    },
    science: {
      title: { en: "Animals", bn: "পশুপাখি" },
      modules: [
        {
          id: "s1",
          type: "quiz",
          rewardStars: 15,
          instruction: { en: "Identify the animals", bn: "প্রাণীগুলোকে চিনে নাও" },
          questions: [
            {
              id: "q1",
              questionText: { en: "Which one is a domestic animal?", bn: "কোনটি গৃহপালিত প্রাণী?" },
              options: [
                { id: "o1", text: "Lion", isCorrect: false },
                { id: "o2", text: "Dog", isCorrect: true },
                { id: "o3", text: "Tiger", isCorrect: false }
              ]
            }
          ]
        }
      ]
    }
  },
  class1: {
    math: {
      title: { en: "Numbers up to 50", bn: "৫০ পর্যন্ত সংখ্যা" },
      modules: [
        {
          id: "m1",
          type: "quiz",
          rewardStars: 20,
          instruction: { en: "Addition time!", bn: "যোগের সময়!" },
          questions: [
            {
              id: "q1",
              questionText: { en: "What is 5 + 3?", bn: "৫ + ৩ কত?" },
              options: [
                { id: "o1", text: "7", isCorrect: false },
                { id: "o2", text: "8", isCorrect: true },
                { id: "o3", text: "9", isCorrect: false }
              ]
            },
            {
              id: "q2",
              questionText: { en: "Which number is larger: 15 or 20?", bn: "কোন সংখ্যাটি বড়: ১৫ নাকি ২০?" },
              options: [
                { id: "o1", text: "15", isCorrect: false },
                { id: "o2", text: "20", isCorrect: true }
              ]
            }
          ]
        }
      ]
    },
    english: {
      title: { en: "Vocabulary", bn: "শব্দভাণ্ডার" },
      modules: [
        {
          id: "e1",
          type: "quiz",
          rewardStars: 15,
          instruction: { en: "Identify the object", bn: "জিনিসটি চিহ্নিত করো" },
          questions: [
            {
              id: "q1",
              questionText: { en: "What do we use to read?", bn: "আমরা পড়ার জন্য কী ধরি?" },
              options: [
                { id: "o1", text: "Ball", isCorrect: false },
                { id: "o2", text: "Book", isCorrect: true },
                { id: "o3", text: "Bat", isCorrect: false }
              ]
            }
          ]
        }
      ]
    },
    science: {
      title: { en: "Our Body", bn: "আমাদের শরীর" },
      modules: [
        {
          id: "s1",
          type: "quiz",
          rewardStars: 15,
          instruction: { en: "Body parts quiz", bn: "শরীরের অঙ্গ নিয়ে কুইজ" },
          questions: [
            {
              id: "q1",
              questionText: { en: "How many eyes do we have?", bn: "আমাদের কয়টি চোখ আছে?" },
              options: [
                { id: "o1", text: "1", isCorrect: false },
                { id: "o2", text: "2", isCorrect: true },
                { id: "o3", text: "3", isCorrect: false }
              ]
            }
          ]
        }
      ]
    }
  }
};
