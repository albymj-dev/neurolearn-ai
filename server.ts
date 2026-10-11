import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

// Pre-compiled academic topics for instant fallback matching the SIH specifications
const PRELOADED_TOPIC_FALLBACKS = [
  {
    keywords: ['recursion', 'recursive', 'base case', 'call stack', 'stack overflow', 'factorial'],
    data: {
      chunkCards: [
        {
          title: "Self-Referential Execution",
          text: "A recursive function tackles big challenges by calling itself repeatedly with slightly smaller, simpler pieces of the same problem."
        },
        {
          title: "The Critical Base Case",
          text: "Every recursive routine requires an explicit stop condition (the base case) to halt execution before memory runs out and triggers a stack overflow."
        },
        {
          title: "The Call Stack Unwinding",
          text: "Once the simplest base condition is reached, the computer steps backwards through the stack, combining partial solutions into the final answer."
        }
      ],
      conceptTree: [
        "Step 1: The function inspects if the input matches the terminating Base Case.",
        "Step 2: If not, it calls itself with a reduced, smaller input (Recursive Step).",
        "Step 3: When the base case hits, the call stack returns backwards to combine the final result."
      ],
      analogy: "Think of recursion like opening a set of Russian nesting dolls. You open the largest doll only to find an identical smaller doll inside. You keep opening dolls one-by-one until you reach the tiniest solid wooden figure in the center (the base case), at which point you snap them back together in reverse order.",
      malayalam: "ഒരു പ്രശ്നം പരിഹരിക്കാൻ ഒരു ഫംഗ്ഷൻ സ്വയം കോൾ ചെയ്യുന്ന രീതിയാണ് Recursion. Stack Overflow ഒഴിവാക്കാൻ എപ്പോഴും ഒരു Base Case അത്യാവശ്യമാണ്. അവസാന ഘട്ടത്തിൽ നിന്ന് ഉത്തരങ്ങൾ ശേഖരിച്ച് തിരിച്ചുവരുന്നു.",
      hindi: "Recursion में एक फ़ंक्शन खुद को बार-बार कॉल करता है ताकि बड़ी समस्या छोटे भागों में हल हो सके। Stack Overflow से बचने के लिए Base Case होना अनिवार्य है, जहाँ से परिणाम वापस जुड़ते हैं।",
      microQuiz: [
        {
          id: 1,
          question: "What is the primary role of a 'Base Case' in a recursive function?",
          options: [
            "To increase computational speed",
            "To define when recursion stops and prevent a stack overflow",
            "To convert code into machine language",
            "To allocate infinite RAM memory"
          ],
          correctIndex: 1,
          explanation: "The base case acts as the exit door for recursion. Without it, the function would call itself forever until memory runs out.",
          encouragement: "Brilliant! You grasped the foundational safety valve of computer algorithms."
        },
        {
          id: 2,
          question: "What happens if a recursive function is executed without a base case?",
          options: [
            "The program runs instantly with zero delay",
            "The computer triggers a Stack Overflow error",
            "The function returns the number zero automatically",
            "The compiler automatically corrects the logic"
          ],
          correctIndex: 1,
          explanation: "Each self-call consumes stack memory. Without a stop condition, memory is completely exhausted, raising a Stack Overflow.",
          encouragement: "Spot on! You understand how computer memory manages recursive stacks."
        }
      ]
    }
  },
  {
    keywords: ['photosynthesis', 'chloroplast', 'chlorophyll', 'plant', 'light-dependent', 'calvin'],
    data: {
      chunkCards: [
        {
          title: "Solar Energy Capture",
          text: "Chlorophyll pigments inside plant chloroplasts act like solar panels, absorbing light photons from sunlight."
        },
        {
          title: "Water Splitting & Oxygen Release",
          text: "Light energy splits absorbed water molecules into protons, electrons, and breathable oxygen gas released into the air."
        },
        {
          title: "Sugar Synthesis (Calvin Cycle)",
          text: "ATP and NADPH energy carriers combine carbon dioxide from the air to build glucose fuel for the plant."
        }
      ],
      conceptTree: [
        "Step 1: Sunlight, water, and carbon dioxide enter the plant leaf cells.",
        "Step 2: Chloroplasts split water and generate chemical energy (ATP/NADPH).",
        "Step 3: Calvin Cycle fixes CO2 into Glucose sugars and releases Oxygen."
      ],
      analogy: "Think of a plant leaf as a clean solar kitchen. The chlorophyll acts as rooftop solar panels generating electricity to run an oven that bakes raw air and water into sweet energy bars (glucose), puffing out fresh oxygen through the chimney.",
      malayalam: "സസ്യങ്ങൾ sunlight ഉപയോഗിച്ച് Chloroplast വഴി ഭക്ഷണം ഉണ്ടാക്കുന്ന പ്രക്രിയയാണ് Photosynthesis. Water വിഘടിച്ച് Oxygen പുറത്തുവിടുകയും Calvin Cycle വഴി Glucose നിർമ്മിക്കുകയും ചെയ്യുന്നു.",
      hindi: "पौधे sunlight और Chloroplast की मदद से अपना भोजन तैयार करते हैं, जिसे Photosynthesis कहते हैं। इस दौरान Water के टूटने से Oxygen निकलती है और अंत में Glucose का निर्माण होता है।",
      microQuiz: [
        {
          id: 1,
          question: "Which organelle inside plant cells acts as the solar engine for photosynthesis?",
          options: [
            "Mitochondria",
            "Chloroplast containing chlorophyll",
            "Ribosome",
            "Golgi Apparatus"
          ],
          correctIndex: 1,
          explanation: "Chloroplasts contain chlorophyll pigments that absorb sunlight photons to drive photosynthesis.",
          encouragement: "Excellent job! You correctly identified the solar powerhouse of plant biology."
        },
        {
          id: 2,
          question: "What essential gas is released into the atmosphere as a byproduct when water molecules split?",
          options: [
            "Carbon Monoxide",
            "Oxygen (O2)",
            "Nitrogen",
            "Helium"
          ],
          correctIndex: 1,
          explanation: "When water (H2O) is split in the light-dependent phase, breathable oxygen gas (O2) is released.",
          encouragement: "Wonderful! You recognized where Earth's breathable atmosphere comes from."
        }
      ]
    }
  },
  {
    keywords: ['calculus', 'derivative', 'integral', 'rate of change', 'slope', 'differentiation', 'leibniz'],
    data: {
      chunkCards: [
        {
          title: "Derivatives as Instantaneous Speed",
          text: "A derivative tells you exactly how fast something is changing at one exact frozen instant in time, just like a car speedometer."
        },
        {
          title: "Integrals as Cumulative Area",
          text: "Integration adds up countless microscopic slices to calculate the total accumulated quantity, distance traveled, or area under a curve."
        },
        {
          title: "The Fundamental Theorem Bridge",
          text: "Derivatives and Integrals are exact mathematical inverses of one another, like multiplication and division reversing each other."
        }
      ],
      conceptTree: [
        "Step 1: Identify a curved relationship between changing quantities (e.g., Position over Time).",
        "Step 2: Differentiate to find the instantaneous slope or rate of change (Derivative / Velocity).",
        "Step 3: Integrate over an interval to find total accumulated area or displacement."
      ],
      analogy: "Imagine driving a car down the highway. The odometer records the total distance you have accumulated (Integration), while your live digital speedometer tells you your exact speed at that one split-second moment (Differentiation).",
      malayalam: "തുടർച്ചയായ മാറ്റങ്ങളെ പഠിക്കുന്ന ശാഖയാണ് Calculus. ഒരു നിശ്ചിത നിമിഷത്തിലെ മാറ്റത്തിന്റെ നിരക്കാണ് Derivative (Speedometer പോലെ). ആകെ അളവുകൾ കൂട്ടിച്ചേർക്കുന്നതാണ് Integration (Odometer പോലെ).",
      hindi: "Calculus निरंतर परिवर्तन का गणित है। किसी विशेष क्षण पर परिवर्तन की दर को Derivative कहते हैं (जैसे स्पीडोमीटर), जबकि कुल योग निकालने को Integration कहते हैं (जैसे ओडोमीटर)।",
      microQuiz: [
        {
          id: 1,
          question: "What physical measurement does a derivative represent on a graph?",
          options: [
            "The total area enclosed by the graph",
            "The instantaneous slope or rate of change at a single point",
            "The absolute highest peak on the y-axis",
            "The distance from the origin point"
          ],
          correctIndex: 1,
          explanation: "The derivative calculates the slope of the tangent line at any single instant.",
          encouragement: "Spot on! You understand the heart of differential calculus."
        },
        {
          id: 2,
          question: "How are Differentiation and Integration connected according to the Fundamental Theorem of Calculus?",
          options: [
            "They are completely unrelated and compute opposite dimensions",
            "They are inverse mathematical operations of each other",
            "They only apply to straight line graphs",
            "Integration is twice the numerical value of differentiation"
          ],
          correctIndex: 1,
          explanation: "Like multiplication reverses division, integration reverses differentiation according to the Fundamental Theorem.",
          encouragement: "Fantastic mathematical insight! You grasped the Fundamental Theorem of Calculus."
        }
      ]
    }
  },
  {
    keywords: ['newton', 'motion', 'inertia', 'force', 'acceleration', 'action-reaction', 'momentum'],
    data: {
      chunkCards: [
        {
          title: "Law of Inertia (1st Law)",
          text: "Objects keep doing what they are already doing unless an outside unbalanced push or pull stops or turns them."
        },
        {
          title: "Force & Mass Formula (2nd Law: F = ma)",
          text: "Heavier objects require greater net force to accelerate; pushing twice as hard creates twice the acceleration."
        },
        {
          title: "Equal & Opposite Reaction (3rd Law)",
          text: "Every action force triggers an identical push back in the opposite direction, like air rushing out of an untied balloon."
        }
      ],
      conceptTree: [
        "Step 1: An object maintains its resting or steady moving state (Inertia).",
        "Step 2: A net external force is applied, creating acceleration proportional to mass (F = ma).",
        "Step 3: An equal and opposite reaction force pushes back instantaneously (Action-Reaction)."
      ],
      analogy: "Imagine skateboarding on a friction-free rink. You glide forever until a wall touches you (1st Law), you need to kick twice as hard if carrying a heavy backpack (2nd Law), and every time your foot pushes the ground backwards, the board rockets forward (3rd Law).",
      malayalam: "Newton-ന്റെ മൂന്ന് നിയമങ്ങൾ വസ്തുക്കളുടെ ചലനത്തെ വിശദീകരിക്കുന്നു: ഒന്നാമത്തെ നിയമം Inertia-യെക്കുറിച്ചും, രണ്ടാമത്തെ നിയമം F = ma സൂത്രവാക്യത്തെക്കുറിച്ചും, മൂന്നാമത്തെ നിയമം Action & Reaction തുല്യമാണെന്നും വ്യക്തമാക്കുന്നു.",
      hindi: "Newton के गति के नियम बताते हैं कि कोई वस्तु बिना बाहरी Force के अपनी अवस्था नहीं बदलती (Inertia), बल द्रव्यमान और त्वरण का गुणनफल है (F = ma), और हर Action की समान और विपरीत Reaction होती है।",
      microQuiz: [
        {
          id: 1,
          question: "Which of Newton's laws explains why passengers lurch forward when a bus suddenly brakes?",
          options: [
            "The 1st Law (Law of Inertia)",
            "The 2nd Law (F = ma)",
            "The 3rd Law (Action-Reaction)",
            "The Law of Universal Gravitation"
          ],
          correctIndex: 0,
          explanation: "Due to inertia, the passengers' bodies want to continue moving at the bus's previous forward speed.",
          encouragement: "Great job! That's the real-world application of inertia in everyday life."
        }
      ]
    }
  },
  {
    keywords: ['dna', 'replication', 'helicase', 'polymerase', 'ligase', 'nucleotide', 'helix', 'okazaki'],
    data: {
      chunkCards: [
        {
          title: "Unzipping the Double Helix",
          text: "The enzyme Helicase unzips the coiled double helix like a zipper, separating base pairs into two single template strands."
        },
        {
          title: "Complementary Base Matching",
          text: "DNA Polymerase glides along each strand, strictly bonding Adenine with Thymine (A-T) and Cytosine with Guanine (C-G)."
        },
        {
          title: "Semi-Conservative Final Copies",
          text: "DNA Ligase seals the fragments, producing two identical DNA helices, each holding one original strand and one brand-new strand."
        }
      ],
      conceptTree: [
        "Step 1: Helicase unwinds and unzips the DNA double-helix at the replication fork.",
        "Step 2: DNA Polymerase adds matching complementary nucleotides (A-T and C-G).",
        "Step 3: DNA Ligase joins Okazaki fragments, producing two identical genetic blueprints."
      ],
      analogy: "Imagine a double-sided master architectural blueprint locked with a zipper. An assistant unzips it down the middle, and two master draftsmen simultaneously trace matching halves on new paper, giving you two identical blueprints with zero missing pages.",
      malayalam: "Cell division-ന് മുൻപായി ജീനുകൾ പകർത്തുന്ന പ്രക്രിയയാണ് DNA Replication. Helicase ഇരട്ട പിരിവുകളെ വേർതിരിക്കുകയും, DNA Polymerase കൃത്യമായ Base pairing (A-T, G-C) വഴി പുതിയ സ്ട്രാൻഡ് നിർമ്മിക്കുകയും ചെയ്യുന്നു.",
      hindi: "DNA Replication में कोशिका विभाजन से पहले जीनोम की कॉपी बनती है। Helicase एंजाइम दोनों स्ट्रैंड्स को अलग करता है और DNA Polymerase बेस पेयरिंग (A-T, G-C) के साथ नई स्ट्रैंड का निर्माण करता है।",
      microQuiz: [
        {
          id: 1,
          question: "Which enzyme acts as the molecular zipper that unzips the DNA double helix?",
          options: [
            "DNA Helicase",
            "DNA Polymerase",
            "Amylase",
            "DNA Ligase"
          ],
          correctIndex: 0,
          explanation: "DNA Helicase breaks the hydrogen bonds between base pairs, unwinding and unzipping the double helix.",
          encouragement: "Spot on! You understand the key unzipping enzyme of molecular genetics."
        }
      ]
    }
  }
];

// Heuristic fallback for arbitrary custom user text if all AI models are unavailable
function generateHeuristicFallback(text: string) {
  const cleanLower = text.toLowerCase();
  
  // 1. Check if it matches any preloaded topic keywords
  for (const topic of PRELOADED_TOPIC_FALLBACKS) {
    if (topic.keywords.some(k => cleanLower.includes(k))) {
      return topic.data;
    }
  }

  // 2. Otherwise, dynamically extract key sentences from the custom text
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);

  const chunk1 = sentences.slice(0, Math.ceil(sentences.length / 3)).join(' ') || sentences[0] || text.slice(0, 120);
  const chunk2 = sentences.slice(Math.ceil(sentences.length / 3), Math.ceil((2 * sentences.length) / 3)).join(' ') || sentences[1] || text.slice(120, 240);
  const chunk3 = sentences.slice(Math.ceil((2 * sentences.length) / 3)).join(' ') || sentences[2] || text.slice(240, 360);

  return {
    chunkCards: [
      {
        title: "Core Foundation & Context",
        text: chunk1.slice(0, 200) + (chunk1.length > 200 ? '...' : '')
      },
      {
        title: "Mechanism & Process",
        text: chunk2.slice(0, 200) + (chunk2.length > 200 ? '...' : '')
      },
      {
        title: "Outcome & Impact",
        text: chunk3.slice(0, 200) + (chunk3.length > 200 ? '...' : '')
      }
    ],
    conceptTree: [
      `Step 1: ${sentences[0] || 'Initial state and foundational principles.'}`,
      `Step 2: ${sentences[Math.floor(sentences.length / 2)] || 'Core transformation and interactions take place.'}`,
      `Step 3: ${sentences[sentences.length - 1] || 'Final outcome and observable results.'}`
    ],
    analogy: `Think of this process like an assembly line: each individual component performs its dedicated role sequentially to produce the final outcome smoothly and efficiently.`,
    malayalam: `ഈ വിഷയത്തിന്റെ പ്രധാന ഭാഗങ്ങൾ (Key Concepts): ആദ്യ ഘട്ടത്തിൽ ഇൻപുട്ട് സ്വീകരിക്കുകയും, തുടർന്ന് പ്രധാന മാറ്റങ്ങൾ നടക്കുകയും, ഒടുവിൽ റിസൾട്ട് ഉണ്ടാകുകയും ചെയ്യുന്നു.`,
    hindi: `इस विषय के मुख्य बिंदु (Key Concepts): पहले चरण में इनपुट लिया जाता है, फिर मुख्य प्रक्रिया (Core Process) होती है, और अंत में परिणाम (Result) प्राप्त होता है।`,
    microQuiz: [
      {
        id: 1,
        tag: "Core Mechanism",
        question: "What is the primary foundation of this topic?",
        options: [
          sentences[0]?.slice(0, 70) || "The starting principle and core concept",
          "An unrelated theoretical conjecture",
          "A random physical reaction",
          "A temporary mathematical coincidence"
        ],
        correctIndex: 0,
        explanation: "The core foundation outlines the fundamental principle that drives the subsequent mechanism.",
        encouragement: "Wonderful intuition! You identified the primary premise correctly."
      },
      {
        id: 2,
        tag: "Process Flow",
        question: "How do the stages progress to achieve the final outcome?",
        options: [
          "In reverse order with random disjointed steps",
          "Sequentially through dedicated sub-processes",
          "Without any measurable change or energy transfer",
          "By skipping the intermediate mechanism entirely"
        ],
        correctIndex: 1,
        explanation: "Each stage systematically builds on the previous one to reach the final state.",
        encouragement: "Great job! You recognize sequential flow and process progression."
      },
      {
        id: 3,
        tag: "Core Impact",
        question: "What is the overarching significance or result described?",
        options: [
          sentences[sentences.length - 1]?.slice(0, 70) || "The primary output and resulting application",
          "A complete disruption of all system components",
          "A minor decorative nuance with no real effect",
          "A completely unmeasured anomaly"
        ],
        correctIndex: 0,
        explanation: "The conclusion crystallizes how the system produces its ultimate impact.",
        encouragement: "Fantastic synthesis! You captured the full picture effortlessly."
      }
    ]
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // In-memory cache for instant sub-millisecond responses
  const cache = new Map<string, any>();

  // Resilient multi-tier model fallback list
  const AVAILABLE_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-3.7-flash'];

  app.post('/api/transform', async (req, res) => {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const trimmedText = text.trim();
    const cacheKey = trimmedText.toLowerCase();

    // Check cache first
    if (cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    if (!ai) {
      console.warn("GEMINI_API_KEY not found; using calibrated fallback engine.");
      const fallback = generateHeuristicFallback(trimmedText);
      cache.set(cacheKey, fallback);
      return res.json(fallback);
    }

    let parsedResult: any = null;
    let lastError: any = null;

    for (const modelName of AVAILABLE_MODELS) {
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error(`Timeout on model ${modelName}`)), 4500)
        );

        const apiCallPromise = ai.models.generateContent({
          model: modelName,
          contents: `Transform this academic text into accessible structured learning components with a low-anxiety micro-quiz:\n\n${trimmedText}`,
          config: {
            temperature: 0.1,
            systemInstruction: "You are the high-speed transformation engine for NeuroLearn AI (Smart India Hackathon 2026), an assistive learning workspace for students with Dyslexia, ADHD, and visual stress.\n\nTake the input text and quickly distill it into concise, low-cognitive-load JSON.\n\nStrict JSON Schema:\n{\n  \"chunkCards\": [\n    { \"title\": \"Short concept title\", \"text\": \"1-2 clear, digestible sentences.\" },\n    { \"title\": \"Short concept title\", \"text\": \"1-2 clear, digestible sentences.\" },\n    { \"title\": \"Short concept title\", \"text\": \"1-2 clear, digestible sentences.\" }\n  ],\n  \"conceptTree\": [\n    \"Step 1: Input / Origin\",\n    \"Step 2: Core Mechanism\",\n    \"Step 3: Outcome / Result\"\n  ],\n  \"analogy\": \"A vivid, 1-2 sentence everyday real-world metaphor explaining the core principle.\",\n  \"malayalam\": \"A bilingual summary: conversational grammar in Malayalam, but core STEM technical terms (e.g., Photosynthesis, Recursion, Derivative) remain in English.\",\n  \"hindi\": \"A bilingual summary: conversational grammar in Hindi, but core STEM technical terms remain in English.\",\n  \"microQuiz\": [\n    {\n      \"id\": 1,\n      \"question\": \"Gentle, straightforward comprehension question\",\n      \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"],\n      \"correctIndex\": 0,\n      \"explanation\": \"Clear, friendly explanation in 1 sentence\",\n      \"encouragement\": \"Supportive, positive sentence celebrating their learning\"\n    }\n  ]\n}\n\nReturn strictly raw JSON conforming to the schema.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                chunkCards: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      text: { type: Type.STRING }
                    },
                    required: ["title", "text"]
                  }
                },
                conceptTree: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                analogy: { type: Type.STRING },
                malayalam: { type: Type.STRING },
                hindi: { type: Type.STRING },
                microQuiz: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.INTEGER },
                      question: { type: Type.STRING },
                      options: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      },
                      correctIndex: { type: Type.INTEGER },
                      explanation: { type: Type.STRING },
                      encouragement: { type: Type.STRING }
                    },
                    required: ["id", "question", "options", "correctIndex", "explanation", "encouragement"]
                  }
                }
              },
              required: ["chunkCards", "conceptTree", "analogy", "malayalam", "hindi", "microQuiz"]
            }
          }
        });

        const response: any = await Promise.race([apiCallPromise, timeoutPromise]);

        if (response.text) {
          try {
            parsedResult = JSON.parse(response.text);
          } catch {
            const jsonMatch = response.text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
              parsedResult = JSON.parse(jsonMatch[1]);
            }
          }

          if (parsedResult && Array.isArray(parsedResult.chunkCards) && parsedResult.chunkCards.length > 0) {
            // Ensure microQuiz exists
            if (!parsedResult.microQuiz || !Array.isArray(parsedResult.microQuiz) || parsedResult.microQuiz.length === 0) {
              const fallback = generateHeuristicFallback(trimmedText);
              parsedResult.microQuiz = fallback.microQuiz;
            }
            cache.set(cacheKey, parsedResult);
            return res.json(parsedResult);
          }
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} encountered an issue (${err.message || '503/429'}), falling back to next available model...`);
      }
    }

    // Failover to calibrated preloaded/heuristic structure
    console.warn("All Gemini API models unavailable or rate-limited. Serving seamless fallback structure.", lastError?.message || lastError);
    const resilientFallback = generateHeuristicFallback(trimmedText);
    cache.set(cacheKey, resilientFallback);
    return res.json(resilientFallback);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
