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
      modules: [
        {
          id: "s1",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "Look at the sky!", bn: "আকাশের দিকে তাকাও!" },
          questions: [
            {
              id: "q1",
              questionText: { en: "What color is the sun?", bn: "সূর্যের রঙ কী?" },
              options: [
                { id: "o1", text: "Blue", isCorrect: false },
                { id: "o2", text: "Yellow", isCorrect: true },
                { id: "o3", text: "Green", isCorrect: false }
              ]
            },
            {
              id: "q2",
              questionText: { en: "Which block is Red?", bn: "লাল ব্লক কোনটি?" },
              options: [
                { id: "o1", text: "🟦", isCorrect: false, isPicture: true },
                { id: "o2", text: "🟥", isCorrect: true, isPicture: true },
                { id: "o3", text: "🟩", isCorrect: false, isPicture: true },
                { id: "o4", text: "🟨", isCorrect: false, isPicture: true }
              ]
            }
          ]
        }
      ]
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
            },
            {
              id: "q2",
              questionText: { en: "Pick the wild animal!", bn: "বন্যপ্রাণী বেছে নাও!" },
              options: [
                { id: "o1", text: "🐶", isCorrect: false, isPicture: true },
                { id: "o2", text: "🐱", isCorrect: false, isPicture: true },
                { id: "o3", text: "🦁", isCorrect: true, isPicture: true },
                { id: "o4", text: "🐮", isCorrect: false, isPicture: true }
              ]
            }
          ]
        }
      ]
    }
  },
  ukg: {
    math: {
      title: { en: "UKG Math", bn: "ইউকেজি অঙ্ক" },
      modules: [
        {
          id: "m1",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "UKG Quiz", bn: "ইউকেজি কুইজ" },
          questions: [
            {
              id: "q1",
              questionText: { en: "2 + 2 = ?", bn: "২ + ২ = ?" },
              options: [
                { id: "o1", text: "3", isCorrect: false },
                { id: "o2", text: "4", isCorrect: true }
              ]
            }
          ]
        }
      ]
    },
    english: {
      title: { en: "UKG English", bn: "ইউকেজি ইংরেজি" },
      modules: [
        {
          id: "e1",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "Identify the letter", bn: "অক্ষরটি চেনো" },
          questions: [
            {
              id: "q1",
              questionText: { en: "What comes after B?", bn: "B-এর পরে কী আসে?" },
              options: [
                { id: "o1", text: "C", isCorrect: true },
                { id: "o2", text: "D", isCorrect: false }
              ]
            }
          ]
        }
      ]
    },
    science: {
      title: { en: "UKG Science", bn: "ইউকেজি বিজ্ঞান" },
      modules: [
        {
          id: "s1",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "Nature quiz", bn: "প্রকৃতি নিয়ে কুইজ" },
          questions: [
            {
              id: "q1",
              questionText: { en: "Fish lives in...", bn: "মাছ কোথায় থাকে..." },
              options: [
                { id: "o1", text: "Water", isCorrect: true },
                { id: "o2", text: "Tree", isCorrect: false }
              ]
            }
          ]
        }
      ]
    }
  },
  preparatory: {
    math: {
      title: { en: "Prep Math", bn: "প্রস্তুতিমূলক অঙ্ক" },
      modules: [
        {
          id: "m1",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "Prep Quiz", bn: "প্রস্তুতি কুইজ" },
          questions: [
            {
              id: "q1",
              questionText: { en: "3 + 1 = ?", bn: "৩ + ১ = ?" },
              options: [
                { id: "o1", text: "4", isCorrect: true },
                { id: "o2", text: "5", isCorrect: false }
              ]
            }
          ]
        },
        {
          id: "m_add",
          type: "math_game",
          subType: "addition",
          maxNum: 5,
          rewardStars: 15,
          instruction: { en: "Speed Addition!", bn: "দ্রুত যোগ করো!" }
        },
        {
          id: "m_table",
          type: "math_game",
          subType: "tables",
          maxTable: 5,
          rewardStars: 20,
          instruction: { en: "Times Tables Mini", bn: "ছোট নামতা" }
        }
      ]
    },
    english: {
      title: { en: "Prep English", bn: "প্রস্তুতিমূলক ইংরেজি" },
      modules: [
        {
          id: "e1",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "Basic Words", bn: "সাধারণ শব্দ" },
          questions: [
            {
              id: "q1",
              questionText: { en: "Translate 'Apple'", bn: "'Apple' মানে কী?" },
              options: [
                { id: "o1", text: "আপেল", isCorrect: true },
                { id: "o2", text: "কলা", isCorrect: false }
              ]
            }
          ]
        }
      ]
    },
    science: {
      title: { en: "Prep Science", bn: "প্রস্তুতিমূলক বিজ্ঞান" },
      modules: [
        {
          id: "s1",
          type: "quiz",
          rewardStars: 10,
          instruction: { en: "Basic Science", bn: "সাধারণ বিজ্ঞান" },
          questions: [
            {
              id: "q1",
              questionText: { en: "Cow gives us...", bn: "গরু আমাদের কী দেয়..." },
              options: [
                { id: "o1", text: "Milk", isCorrect: true },
                { id: "o2", text: "Water", isCorrect: false }
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
        },
        {
          id: "m_add",
          type: "math_game",
          subType: "addition",
          maxNum: 10,
          rewardStars: 20,
          instruction: { en: "Quick Addition!", bn: "দ্রুত যোগ!" }
        },
        {
          id: "m_mul",
          type: "math_game",
          subType: "multiplication",
          maxNum: 5,
          rewardStars: 25,
          instruction: { en: "Basic Multiplication!", bn: "প্রাথমিক গুণ!" }
        },
        {
          id: "m_table",
          type: "math_game",
          subType: "tables",
          maxTable: 10,
          rewardStars: 30,
          instruction: { en: "Times Tables (1-10)", bn: "নামতা (১-১০)" }
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
  },
  class8: {
    math: {
      title: { en: "Algebra & Geometry", bn: "বীজগণিত ও জ্যামিতি" },
      modules: [
        {
          id: "m1",
          type: "quiz",
          rewardStars: 30,
          instruction: { en: "Solve the equation!", bn: "সমীকরণটির সমাধান করো!" },
          questions: [
            {
              id: "q1",
              questionText: { en: "If 2x + 4 = 10, what is x?", bn: "যদি 2x + 4 = 10 হয়, তবে x কত?" },
              options: [
                { id: "o1", text: "2", isCorrect: false },
                { id: "o2", text: "3", isCorrect: true },
                { id: "o3", text: "4", isCorrect: false }
              ]
            },
            {
              id: "q2",
              questionText: { en: "What is the area of a square with side 5cm?", bn: "5cm বাহুবিশিষ্ট একটি বর্গক্ষেত্রের ক্ষেত্রফল কত?" },
              options: [
                { id: "o1", text: "10 cm²", isCorrect: false },
                { id: "o2", text: "25 cm²", isCorrect: true },
                { id: "o3", text: "20 cm²", isCorrect: false }
              ]
            }
          ]
        },
        {
          id: "m_add",
          type: "math_game",
          subType: "addition",
          maxNum: 1000,
          rewardStars: 30,
          instruction: { en: "Advanced Addition!", bn: "উচ্চতর যোগ!" }
        },
        {
          id: "m_mul",
          type: "math_game",
          subType: "multiplication",
          maxNum: 100,
          rewardStars: 40,
          instruction: { en: "Heavy Multiplication!", bn: "উচ্চতর গুণ!" }
        },
        {
          id: "m_table",
          type: "math_game",
          subType: "tables",
          maxTable: 25,
          rewardStars: 50,
          instruction: { en: "Master Times Tables", bn: "নামতা মাস্টার (১-২৫)" }
        }
      ]
    },
    english: {
      title: { en: "Advanced Grammar", bn: "উচ্চতর ব্যাকরণ" },
      modules: [
        {
          id: "e1",
          type: "quiz",
          rewardStars: 25,
          instruction: { en: "Identify the tense", bn: "Tense চিহ্নিত করো" },
          questions: [
            {
              id: "q1",
              questionText: { en: "Identify the tense: 'They have been playing since morning.'", bn: "Tense চিহ্নিত করো: 'They have been playing since morning.'" },
              options: [
                { id: "o1", text: "Present Perfect Continuous", isCorrect: true },
                { id: "o2", text: "Past Perfect Continuous", isCorrect: false },
                { id: "o3", text: "Present Perfect", isCorrect: false }
              ]
            }
          ]
        }
      ]
    },
    science: {
      title: { en: "Physics & Chemistry", bn: "পদার্থ ও রসায়ন" },
      modules: [
        {
          id: "s1",
          type: "quiz",
          rewardStars: 30,
          instruction: { en: "Science Principles", bn: "বিজ্ঞানের নীতি" },
          questions: [
            {
              id: "q1",
              questionText: { en: "What is the chemical formula for Water?", bn: "জলের রাসায়নিক সংকেত কী?" },
              options: [
                { id: "o1", text: "H2O", isCorrect: true },
                { id: "o2", text: "CO2", isCorrect: false },
                { id: "o3", text: "O2", isCorrect: false }
              ]
            },
            {
              id: "q2",
              questionText: { en: "Who formulated the laws of motion?", bn: "গতির সূত্র কে আবিষ্কার করেন?" },
              options: [
                { id: "o1", text: "Albert Einstein", isCorrect: false },
                { id: "o2", text: "Isaac Newton", isCorrect: true },
                { id: "o3", text: "Galileo", isCorrect: false }
              ]
            }
          ]
        }
      ]
    }
  },
  class2: {
    math: { title: { en: "Class 2 Math", bn: "দ্বিতীয় শ্রেণীর অঙ্ক" }, modules: [
      { id: "m_add", type: "math_game", subType: "addition", maxNum: 20, rewardStars: 15, instruction: { en: "Addition", bn: "যোগ" } },
      { id: "m_mul", type: "math_game", subType: "multiplication", maxNum: 10, rewardStars: 15, instruction: { en: "Multiplication", bn: "গুণ" } },
      { id: "m_table", type: "math_game", subType: "tables", maxTable: 10, rewardStars: 20, instruction: { en: "Times Tables", bn: "নামতা" } }
    ]},
    english: { title: { en: "English", bn: "ইংরেজি" }, modules: [] },
    science: { title: { en: "Science", bn: "বিজ্ঞান" }, modules: [] }
  },
  class3: {
    math: { title: { en: "Class 3 Math", bn: "তৃতীয় শ্রেণীর অঙ্ক" }, modules: [
      { id: "m_add", type: "math_game", subType: "addition", maxNum: 50, rewardStars: 15, instruction: { en: "Addition", bn: "যোগ" } },
      { id: "m_mul", type: "math_game", subType: "multiplication", maxNum: 12, rewardStars: 15, instruction: { en: "Multiplication", bn: "গুণ" } },
      { id: "m_table", type: "math_game", subType: "tables", maxTable: 12, rewardStars: 20, instruction: { en: "Times Tables", bn: "নামতা" } }
    ]},
    english: { title: { en: "English", bn: "ইংরেজি" }, modules: [] },
    science: { title: { en: "Science", bn: "বিজ্ঞান" }, modules: [] }
  },
  class4: {
    math: { title: { en: "Class 4 Math", bn: "চতুর্থ শ্রেণীর অঙ্ক" }, modules: [
      { id: "m_add", type: "math_game", subType: "addition", maxNum: 100, rewardStars: 20, instruction: { en: "Addition", bn: "যোগ" } },
      { id: "m_mul", type: "math_game", subType: "multiplication", maxNum: 15, rewardStars: 20, instruction: { en: "Multiplication", bn: "গুণ" } },
      { id: "m_table", type: "math_game", subType: "tables", maxTable: 15, rewardStars: 25, instruction: { en: "Times Tables", bn: "নামতা" } }
    ]},
    english: { title: { en: "English", bn: "ইংরেজি" }, modules: [] },
    science: { title: { en: "Science", bn: "বিজ্ঞান" }, modules: [] }
  },
  class5: {
    math: { title: { en: "Class 5 Math", bn: "পঞ্চম শ্রেণীর অঙ্ক" }, modules: [
      { id: "m_add", type: "math_game", subType: "addition", maxNum: 200, rewardStars: 20, instruction: { en: "Addition", bn: "যোগ" } },
      { id: "m_mul", type: "math_game", subType: "multiplication", maxNum: 20, rewardStars: 20, instruction: { en: "Multiplication", bn: "গুণ" } },
      { id: "m_table", type: "math_game", subType: "tables", maxTable: 20, rewardStars: 25, instruction: { en: "Times Tables", bn: "নামতা" } }
    ]},
    english: { title: { en: "English", bn: "ইংরেজি" }, modules: [] },
    science: { title: { en: "Science", bn: "বিজ্ঞান" }, modules: [] }
  },
  class6: {
    math: { title: { en: "Class 6 Math", bn: "ষষ্ঠ শ্রেণীর অঙ্ক" }, modules: [
      { id: "m_add", type: "math_game", subType: "addition", maxNum: 500, rewardStars: 25, instruction: { en: "Addition", bn: "যোগ" } },
      { id: "m_mul", type: "math_game", subType: "multiplication", maxNum: 50, rewardStars: 25, instruction: { en: "Multiplication", bn: "গুণ" } },
      { id: "m_table", type: "math_game", subType: "tables", maxTable: 20, rewardStars: 30, instruction: { en: "Times Tables", bn: "নামতা" } }
    ]},
    english: { title: { en: "English", bn: "ইংরেজি" }, modules: [] },
    science: { title: { en: "Science", bn: "বিজ্ঞান" }, modules: [] }
  },
  class7: {
    math: { title: { en: "Class 7 Math", bn: "সপ্তম শ্রেণীর অঙ্ক" }, modules: [
      { id: "m_add", type: "math_game", subType: "addition", maxNum: 1000, rewardStars: 30, instruction: { en: "Addition", bn: "যোগ" } },
      { id: "m_mul", type: "math_game", subType: "multiplication", maxNum: 100, rewardStars: 30, instruction: { en: "Multiplication", bn: "গুণ" } },
      { id: "m_table", type: "math_game", subType: "tables", maxTable: 25, rewardStars: 40, instruction: { en: "Times Tables", bn: "নামতা" } }
    ]},
    english: { title: { en: "English", bn: "ইংরেজি" }, modules: [] },
    science: { title: { en: "Science", bn: "বিজ্ঞান" }, modules: [] }
  }
};
