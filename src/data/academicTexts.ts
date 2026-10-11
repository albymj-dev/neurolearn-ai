export interface ChunkCard {
  title: string;
  text: string;
  hindiTitle?: string;
  hindiText?: string;
  malayalamTitle?: string;
  malayalamText?: string;
}

export interface QuizQuestion {
  id: number;
  tag: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  encouragement: string;
  hindi?: {
    question: string;
    options: string[];
    explanation: string;
    encouragement?: string;
  };
  malayalam?: {
    question: string;
    options: string[];
    explanation: string;
    encouragement?: string;
  };
}

export interface TransformedLearningData {
  chunkCards: ChunkCard[];
  conceptTree: string[];
  hindiConceptTree?: string[];
  malayalamConceptTree?: string[];
  analogy: string;
  hindiAnalogy?: string;
  malayalamAnalogy?: string;
  malayalam: string;
  hindi: string;
  microQuiz: QuizQuestion[];
}

export interface AcademicTopic {
  id: string;
  title: string;
  hindiTitle?: string;
  malayalamTitle?: string;
  subject: string;
  emoji: string;
  sourceText: string;
  hindiSourceText?: string;
  malayalamSourceText?: string;
  fallbackData: TransformedLearningData;
}

export const PRELOADED_ACADEMIC_TOPICS: AcademicTopic[] = [
  {
    id: 'recursion',
    title: 'Recursion & Base Cases',
    hindiTitle: 'रिकर्सन और बेस केस (Recursion & Base Cases)',
    malayalamTitle: 'റിക്വർഷനും ബേസ് കേസും (Recursion & Base Cases)',
    subject: 'Computer Science & Algorithms',
    emoji: '🔁',
    sourceText: "Recursion is a foundational computer science technique in which a function solves a problem by calling a smaller instance of itself. Every recursive function requires two critical parts: a base case that defines when the algorithm terminates, and a recursive step that moves the input closer toward that base case. Without a base case, the computer repeatedly pushes frames onto the call stack until memory is exhausted, resulting in a stack overflow error. Classic algorithmic applications include traversing binary trees, computing factorials, and divide-and-conquer algorithms like Merge Sort.",
    hindiSourceText: "Recursion कंप्यूटर साइंस की एक आधारभूत तकनीक है जिसमें कोई फ़ंक्शन किसी समस्या को हल करने के लिए स्वयं के छोटे संस्करण को कॉल करता है। प्रत्येक रिकर्सिव फ़ंक्शन के दो महत्वपूर्ण भाग होते हैं: एक Base Case जो बताता है कि प्रक्रिया कब रुकनी चाहिए, और एक Recursive Step जो इनपुट को बेस केस की ओर ले जाता है। बेस केस के बिना, कंप्यूटर कॉल स्टैक में फ़्रेम जोड़ता रहता है जब तक कि मेमोरी समाप्त न हो जाए, जिससे Stack Overflow एरर आता है। इसके अनुप्रयोगों में बाइनरी ट्री ट्रैवर्सल, फ़ैक्टोरियल और मर्च सॉर्ट शामिल हैं।",
    malayalamSourceText: "ഒരു കമ്പ്യൂട്ടർ പ്രോഗ്രാമിംഗ് ഫംഗ്ഷൻ സങ്കീർണ്ണമായ ഒരു പ്രശ്നം പരിഹരിക്കുന്നതിനായി സ്വന്തം ചെറിയ പതിപ്പുകളെ വീണ്ടും വീണ്ടും കോൾ ചെയ്യുന്ന രീതിയാണ് Recursion. ഓരോ റിക്വർസീവ് ഫംഗ്ഷനും രണ്ട് പ്രധാന ഘടകങ്ങളുണ്ട്: പ്രവർത്തനം അവസാനിപ്പിക്കുന്നതിനുള്ള Base Case, ഇൻപുട്ടിനെ ഈ ഘട്ടത്തിലേക്ക് അടുപ്പിക്കുന്ന Recursive Step. Base Case ഇല്ലെങ്കിൽ, മെമ്മറി തീരുന്നതുവരെ കോൾ സ്റ്റാക്കിൽ ഡാറ്റ നിറയുകയും Stack Overflow എറർ ഉണ്ടാവുകയും ചെയ്യും. ട്രീ ട്രാവേഴ്സൽ, ഫാക്ടോറിയൽ, മെർജ് സോർട്ട് എന്നിവ ഇതിന് ഉദാഹരണങ്ങളാണ്.",
    fallbackData: {
      chunkCards: [
        {
          title: "Self-Referential Execution",
          text: "A recursive function tackles big challenges by calling itself repeatedly with slightly smaller, simpler pieces of the same problem.",
          hindiTitle: "स्वयं-संदर्भित निष्पादन (Self-Calling)",
          hindiText: "एक रिकर्सिव फ़ंक्शन बड़ी समस्या को हल करने के लिए उसी समस्या के छोटे हिस्सों के साथ खुद को बार-बार कॉल करता है।",
          malayalamTitle: "സ്വയം ആവർത്തിക്കുന്ന പ്രവർത്തനം",
          malayalamText: "വലിയ പ്രശ്നങ്ങളെ ലഘൂകരിക്കുന്നതിനായി ഒരു ഫംഗ്ഷൻ ചെറിയ ഇൻപുട്ടുകളുമായി സ്വയം ആവർത്തിച്ച് പ്രവർത്തിക്കുന്നു."
        },
        {
          title: "The Critical Base Case",
          text: "Every recursive routine requires an explicit stop condition (the base case) to halt execution before memory runs out and triggers a stack overflow.",
          hindiTitle: "महत्वपूर्ण बेस केस (Base Case)",
          hindiText: "रिकर्सन को समय पर रोकने के लिए एक स्पष्ट स्टॉप कंडीशन (बेस केस) आवश्यक है, ताकि मेमोरी समाप्त होकर स्टैक ओवरफ्लो न हो।",
          malayalamTitle: "നിർണ്ണായകമായ ബേസ് കേസ് (Base Case)",
          malayalamText: "പ്രോഗ്രാം അനന്തമായി നീളാതെ അവസാനിപ്പിക്കുന്നതിനും മെമ്മറി സംരക്ഷിക്കുന്നതിനും ഒരു സ്റ്റോപ്പ് കണ്ടീഷൻ നിർബന്ധമാണ്."
        },
        {
          title: "The Call Stack Unwinding",
          text: "Once the simplest base condition is reached, the computer steps backwards through the stack, combining partial solutions into the final answer.",
          hindiTitle: "कॉल स्टैक अनवाइंडिंग (Unwinding)",
          hindiText: "जैसे ही बेस केस मिलता है, कंप्यूटर स्टैक से पीछे हटते हुए छोटे-छोटे परिणामों को जोड़कर अंतिम उत्तर तैयार करता है।",
          malayalamTitle: "റിസൾട്ടുകൾ ശേഖരിക്കൽ (Unwinding)",
          malayalamText: "ബേസ് കേസ് ലഭിച്ചുകഴിഞ്ഞാൽ, സ്റ്റാക്കിൽ നിന്ന് പിന്നോട്ട് സഞ്ചരിച്ച് ഭാഗിക ഉത്തരങ്ങൾ ഒന്നിച്ച് ചേർത്ത് അന്തിമ ഫലം നൽകുന്നു."
        }
      ],
      conceptTree: [
        "Step 1: The function inspects if the input matches the terminating Base Case.",
        "Step 2: If not, it calls itself with a reduced, smaller input (Recursive Step).",
        "Step 3: When the base case hits, the call stack returns backwards to combine the final result."
      ],
      hindiConceptTree: [
        "चरण 1: फ़ंक्शन जांचता है कि क्या इनपुट समाप्त करने वाले Base Case से मेल खाता है।",
        "चरण 2: यदि नहीं, तो यह छोटे इनपुट के साथ खुद को कॉल करता है (Recursive Step)।",
        "चरण 3: बेस केस मिलने पर, कॉल स्टैक पीछे हटकर अंतिम उत्तर को जोड़ता है।"
      ],
      malayalamConceptTree: [
        "ഘട്ടം 1: ഇൻപുട്ട് അവസാനിക്കേണ്ട Base Case-ൽ എത്തിയിട്ടുണ്ടോ എന്ന് ഫംഗ്ഷൻ പരിശോധിക്കുന്നു.",
        "ഘട്ടം 2: ഇല്ലെങ്കിൽ, ചെറിയൊരു ഇൻപുട്ടുമായി ഫംഗ്ഷൻ വീണ്ടും സ്വയം കോൾ ചെയ്യുന്നു (Recursive Step).",
        "ഘട്ടം 3: Base Case എത്തുമ്പോൾ, സ്റ്റാക്കിൽ നിന്ന് പിന്നിലേക്ക് ഓരോ ഉത്തരങ്ങളും കൂട്ടിച്ചേർത്ത് നൽകുന്നു."
      ],
      analogy: "Think of recursion like opening a set of Russian nesting dolls. You open the largest doll only to find an identical smaller doll inside. You keep opening dolls one-by-one until you reach the tiniest solid wooden figure in the center (the base case), at which point you snap them back together in reverse order.",
      hindiAnalogy: "रिकर्सन को रूसी गुड़िया (Russian Nesting Dolls) की तरह समझें। आप सबसे बड़ी गुड़िया खोलते हैं तो अंदर वैसी ही छोटी गुड़िया मिलती है। आप तब तक गुड़िया खोलते रहते हैं जब तक सबसे छोटी ठोस गुड़िया (बेस केस) नहीं मिल जाती, फिर आप उन्हें उल्टे क्रम में वापस बंद करते हैं।",
      malayalamAnalogy: "ഒന്നിനുള്ളിൽ മറ്റൊന്നായി വെച്ചിരിക്കുന്ന റഷ്യൻ പാവകൾ (Russian Dolls) പോലെയാണ് Recursion. ഏറ്റവും വലിയ പാവ തുറക്കുമ്പോൾ ഉള്ളിൽ ചെറിയൊരു പാവ കാണുന്നു. ഏറ്റവും ഒടുവിലത്തെ ഖരരൂപത്തിലുള്ള ചെറിയ പാവ (Base Case) എത്തുന്നതുവരെ ഇത് തുറന്നുകൊണ്ടേയിരിക്കുന്നു, ശേഷം അവ ഒന്നിനുപുറമെ ഒന്നായി തിരിച്ച് അടയ്ക്കുന്നു.",
      malayalam: "ഒരു പ്രശ്നം പരിഹരിക്കാൻ ഒരു ഫംഗ്ഷൻ സ്വയം കോൾ ചെയ്യുന്ന രീതിയാണ് Recursion. Stack Overflow ഒഴിവാക്കാൻ എപ്പോഴും ഒരു Base Case അത്യാവശ്യമാണ്. അവസാന ഘട്ടത്തിൽ നിന്ന് ഉത്തരങ്ങൾ ശേഖരിച്ച് തിരിച്ചുവരുന്നു.",
      hindi: "Recursion में एक फ़ंक्शन खुद को बार-बार कॉल करता है ताकि बड़ी समस्या छोटे भागों में हल हो सके। Stack Overflow से बचने के लिए Base Case होना अनिवार्य है, जहाँ से परिणाम वापस जुड़ते हैं।",
      microQuiz: [
        {
          id: 1,
          tag: "Core Mechanism",
          question: "What is the primary role of a 'Base Case' in a recursive function?",
          options: [
            "To increase computational speed",
            "To define when recursion stops and prevent a stack overflow",
            "To convert code into machine language",
            "To allocate infinite RAM memory"
          ],
          correctIndex: 1,
          explanation: "The base case acts as the safety exit door for recursion. Without it, the function would call itself forever until memory runs out.",
          encouragement: "Brilliant! You grasped the foundational safety valve of computer algorithms.",
          hindi: {
            question: "रिकर्सिव फंक्शन में 'Base Case' की प्राथमिक भूमिका क्या है?",
            options: [
              "कंप्यूटेशनल स्पीड बढ़ाना",
              "रिकर्सन को रोकना और स्टैक ओवरफ्लो (Stack Overflow) से बचाना",
              "कोड को मशीन लैंग्वेज में बदलना",
              "असीमित रैम मेमोरी आवंटित करना"
            ],
            explanation: "बेस केस रिकर्सन का एग्जिट गेट है जो फंक्शन को रुकने का संकेत देकर मेमोरी क्रैश से बचाता है।"
          },
          malayalam: {
            question: "ഒരു റിക്വർസീവ് ഫംഗ്ഷനിൽ 'Base Case'-ന്റെ പ്രധാന ചുമതല എന്താണ്?",
            options: [
              "പ്രോഗ്രാമിന്റെ വേഗത കൂട്ടുക",
              "ഫംഗ്ഷൻ എപ്പോൾ നിൽക്കണമെന്ന് നിർണ്ണയിച്ച് Stack Overflow ഒഴിവാക്കുക",
              "കോഡിനെ മെഷീൻ ലാംഗ്വേജ് ആക്കി മാറ്റുക",
              "കൂടുതൽ മെമ്മറി ഉപയോഗിക്കുക"
            ],
            explanation: "പ്രവർത്തനം അനന്തമായി നീണ്ടുപോകാതിരിക്കാനും മെമ്മറി നഷ്ടപ്പെടാതിരിക്കാനും Base Case അത്യാവശ്യമാണ്."
          }
        },
        {
          id: 2,
          tag: "Failure Mode",
          question: "What specific system error occurs if a recursive function executes without a valid base case?",
          options: [
            "A Stack Overflow error due to call stack memory exhaustion",
            "A syntax parsing error during compile time",
            "A silent infinite loop that uses zero CPU resources",
            "The program automatically outputs zero and finishes safely"
          ],
          correctIndex: 0,
          explanation: "Each recursive call allocates a stack frame in memory. Without a stop condition, memory runs out completely, triggering a Stack Overflow.",
          encouragement: "Spot on! You understand the precise mechanics of memory call stacks.",
          hindi: {
            question: "यदि कोई रिकर्सिव फ़ंक्शन बिना मान्य बेस केस के चले तो कौन सी सिस्टम त्रुटि होती है?",
            options: [
              "कॉल स्टैक मेमोरी समाप्त होने से स्टैक ओवरफ्लो (Stack Overflow) एरर",
              "कंपाइल समय पर सिंटैक्स पार्सिंग एरर",
              "बिना किसी सीपीयू लोड के एक शांत अनंत लूप",
              "प्रोग्राम सुरक्षित रूप से शून्य लौटाकर समाप्त हो जाता है"
            ],
            explanation: "प्रत्येक कॉल स्टैक में मेमोरी लेती है। बेस केस न होने पर पूरी मेमोरी भर जाती है और स्टैक ओवरफ्लो होता है।"
          },
          malayalam: {
            question: "സാധുവായ Base Case ഇല്ലാതെ ഒരു റിക്വർസീവ് ഫംഗ്ഷൻ പ്രവർത്തിച്ചാൽ ഉണ്ടാകുന്ന എറർ ഏതാണ്?",
            options: [
              "കോൾ സ്റ്റാക്ക് മെമ്മറി നിറഞ്ഞ് ഉണ്ടാകുന്ന Stack Overflow എറർ",
              "കംപൈൽ സമയത്തെ സിന്റാക്സ് എറർ",
              "സിപിയു ഉപയോഗിക്കാതെ അനന്തമായി നിൽക്കുന്ന അവസ്ഥ",
              "പ്രോഗ്രാം സ്വയം പൂജ്യം നൽകി അവസാനിക്കുന്നു"
            ],
            explanation: "ഓരോ ഫംഗ്ഷൻ കോളും മെമ്മറി എടുക്കുന്നു. Base Case ഇല്ലെങ്കിൽ മെമ്മറി മുഴുവൻ തീരുമ്പോൾ Stack Overflow ഉണ്ടാകും."
          }
        },
        {
          id: 3,
          tag: "Analogy Anchor",
          question: "In the Russian Nesting Dolls metaphor for recursion, what directly represents the Base Case?",
          options: [
            "The largest, outermost decorated doll",
            "The act of opening each outer doll",
            "The tiniest, solid wooden doll in the center that cannot open",
            "The wooden paint and lacquer on the shell"
          ],
          correctIndex: 2,
          explanation: "The innermost solid doll cannot be split any further—it terminates the opening process, just as a base case terminates recursion.",
          encouragement: "Fantastic mental model connection! Visual metaphors anchor deep computer science ideas.",
          hindi: {
            question: "रूसी गुड़ियों (Nesting Dolls) के उदाहरण में, कौन सा तत्व बेस केस का सटीक प्रतिनिधित्व करता है?",
            options: [
              "सबसे बड़ी, सबसे बाहरी सजावटी गुड़िया",
              "हर बाहरी गुड़िया को खोलने की क्रिया",
              "केंद्र में स्थित सबसे छोटी ठोस लकड़ी की गुड़िया जिसे खोला नहीं जा सकता",
              "गुड़िया पर लगा हुआ पेंट और वार्निश"
            ],
            explanation: "सबसे छोटी ठोस गुड़िया आगे नहीं खुलती, यानी यह प्रक्रिया का अंतिम छोर है, ठीक बेस केस की तरह।"
          },
          malayalam: {
            question: "റഷ്യൻ പാവകളുടെ (Nesting Dolls) ഉപമയിൽ, Base Case-നെ നേരിട്ട് പ്രതിനിധീകരിക്കുന്നത് ഏതാണ്?",
            options: [
              "ഏറ്റവും പുറത്തുള്ള വലിയ പാവ",
              "ഓരോ പാവയും തുറക്കുന്ന പ്രവർത്തനം",
              "ഇനി തുറക്കാൻ കഴിയാത്ത, ഉള്ളിലെ ഏറ്റവും ചെറിയ ഖരരൂപത്തിലുള്ള പാവ",
              "പാവയിലെ പെയിന്റും നിറങ്ങളും"
            ],
            explanation: "ഉള്ളിലെ ഏറ്റവും ചെറിയ പാവ ഇനി വിഭജിക്കാൻ കഴിയില്ല; അത് പ്രക്രിയ അവസാനിപ്പിക്കുന്നു (Base Case)."
          }
        },
        {
          id: 4,
          tag: "Real-World Impact",
          question: "Which of these classic algorithmic procedures inherently uses recursion to solve problems?",
          options: [
            "Merge Sort (Divide-and-Conquer sorting)",
            "Simple single-iteration linear search",
            "Printing a single text string to console",
            "Adding two static numbers together"
          ],
          correctIndex: 0,
          explanation: "Merge Sort recursively splits an array into halves until base case single-element lists are reached, then merges them in sorted order.",
          encouragement: "High-level algorithmic thinking! You see how recursion powers real-world software.",
          hindi: {
            question: "इनमें से कौन सी क्लासिक एल्गोरिथम समस्या हल करने के लिए स्वाभाविक रूप से रिकर्सन का उपयोग करती है?",
            options: [
              "मर्ज सॉर्ट (Merge Sort - डिवाइड एंड कॉन्कर सॉर्टिंग)",
              "एक साधारण लीनियर सर्च (Linear Search)",
              "कंसोल पर एक साधारण टेक्स्ट प्रिंट करना",
              "दो स्थिर संख्याओं को जोड़ना"
            ],
            explanation: "मर्ज सॉर्ट ऐरे को तब तक छोटे भागों में बांटता है जब तक कि सिंगल एलिमेंट न बचे, फिर उन्हें सॉर्ट करके जोड़ता है।"
          },
          malayalam: {
            question: "പ്രശ്നങ്ങൾ പരിഹരിക്കുന്നതിനായി താഴെ പറയുന്നവയിൽ ഏത് അൽഗോരിതമാണ് Recursion ഉപയോഗിക്കുന്നത്?",
            options: [
              "മെർജ് സോർട്ട് (Merge Sort - Divide and Conquer)",
              "സാധാരണ ലീനിയർ സെർച്ച് (Linear Search)",
              "ഒരു ടെക്സ്റ്റ് പ്രിന്റ് ചെയ്യുന്ന ലളിതമായ കോഡ്",
              "രണ്ട് സംഖ്യകൾ തമ്മിൽ കൂട്ടുന്നത്"
            ],
            explanation: "Merge Sort അറേകളെ ചെറുതാക്കി വിഭജിച്ച് സോർട്ട് ചെയ്യുന്നതിനായി ആവർത്തിച്ച് Recursion പ്രയോജനപ്പെടുത്തുന്നു."
          }
        }
      ]
    }
  },
  {
    id: 'photosynthesis',
    title: 'Photosynthesis & Chloroplasts',
    hindiTitle: 'प्रकाश संश्लेषण और क्लोरोप्लास्ट (Photosynthesis)',
    malayalamTitle: 'പ്രകാശസംശ്ലേഷണവും ക്ലോറോപ്ലാസ്റ്റും (Photosynthesis)',
    subject: 'Botany & Cell Biology',
    emoji: '🌿',
    sourceText: "Photosynthesis is the fundamental biological process by which green plants, algae, and some bacteria convert light energy, typically from the Sun, into chemical energy in the form of glucose. This complex transformation occurs primarily in the chloroplasts. During the light-dependent reactions, chlorophyll absorbs photons, splitting water molecules into oxygen, protons, and electrons. The oxygen is released as a byproduct, while ATP and NADPH are generated to fuel the subsequent Calvin Cycle. In this second stage, carbon dioxide from the atmosphere is 'fixed' into sugar molecules, providing the basic energy source for almost all life on Earth.",
    hindiSourceText: "प्रकाश संश्लेषण वह मूलभूत जैविक प्रक्रिया है जिसके द्वारा हरे पौधे, शैवाल और कुछ जीवाणु सूर्य के प्रकाश की ऊर्जा को रासायनिक ऊर्जा (ग्लूकोज) में बदलते हैं। यह परिवर्तन मुख्य रूप से क्लोरोप्लास्ट में होता है। प्रकाश-निर्भर प्रतिक्रियाओं के दौरान, क्लोरोफिल सूर्य के फोटॉन अवशोषित करता है और पानी के अणुओं को ऑक्सीजन, प्रोटॉन और इलेक्ट्रॉनों में तोड़ता है। ऑक्सीजन उप-उत्पाद के रूप में निकलती है, जबकि एटीपी और एनएडीपीएच केल्विन चक्र को संचालित करते हैं जो कार्बन डाइऑक्साइड को शर्करा में बदलता है।",
    malayalamSourceText: "സൂര്യപ്രകാശത്തിലെ ഊർജ്ജത്തെ ഉപയോഗിച്ച് സസ്യങ്ങൾ ഗ്ലൂക്കോസ് എന്ന രാസോർജ്ജമാക്കി മാറ്റുന്ന പ്രക്രിയയാണ് പ്രകാശസംശ്ലേഷണം (Photosynthesis). ഇത് പ്രധാനമായും നടക്കുന്നത് സസ്യകോശങ്ങളിലെ ക്ലോറോപ്ലാസ്റ്റിലാണ്. ആദ്യ ഘട്ടത്തിൽ ക്ലോറോഫിൽ പ്രകാശത്തെ ആഗിരണം ചെയ്യുകയും ജലത്തെ ഓക്സിജനും പ്രോട്ടോണുകളുമായി വിഘടിപ്പിക്കുകയും ചെയ്യുന്നു. ഈ ഓക്സിജൻ അന്തരീക്ഷത്തിലേക്ക് പുറന്തള്ളപ്പെടുന്നു. തുടർന്ന് കാൽവിൻ സൈക്കിൾ (Calvin Cycle) വഴി കാർബൺ ഡയോക്സൈഡ് പഞ്ചസാര തന്മാത്രകളായി മാറുന്നു.",
    fallbackData: {
      chunkCards: [
        {
          title: "Solar Energy Capture",
          text: "Chlorophyll pigments inside plant chloroplasts act like solar panels, absorbing light photons from sunlight.",
          hindiTitle: "सौर ऊर्जा अवशोषण (Solar Absorption)",
          hindiText: "पौधों के क्लोरोप्लास्ट में मौजूद क्लोरोफिल सौर पैनलों की तरह काम करता है और सूर्य के प्रकाश को सोखता है।",
          malayalamTitle: "സൗരോർജ്ജം ആഗിരണം ചെയ്യൽ",
          malayalamText: "സസ്യകോശങ്ങളിലെ ക്ലോറോഫിൽ സോളാർ പാനലുകൾ പോലെ പ്രവർത്തിച്ച് സൂര്യപ്രകാശത്തെ ആഗിരണം ചെയ്യുന്നു."
        },
        {
          title: "Water Splitting & Oxygen Release",
          text: "Light energy splits absorbed water molecules into protons, electrons, and breathable oxygen gas released into the air.",
          hindiTitle: "जल अपघटन और ऑक्सीजन उत्सर्जन",
          hindiText: "प्रकाश ऊर्जा पानी के अणुओं को तोड़ती है, जिससे हवा में सांस लेने योग्य ऑक्सीजन गैस मुक्त होती है।",
          malayalamTitle: "ജലം വിഘടിക്കലും ഓക്സിജൻ റിലീസും",
          malayalamText: "പ്രകാശോർജ്ജം ജലത്തെ വിഘടിപ്പിക്കുകയും അന്തരീക്ഷത്തിലേക്ക് ശ്വസിക്കാനാവശ്യമായ ജീവവായു (ഓക്സിജൻ) നൽകുകയും ചെയ്യുന്നു."
        },
        {
          title: "Sugar Synthesis (Calvin Cycle)",
          text: "ATP and NADPH energy carriers combine carbon dioxide from the air to build glucose fuel for the plant.",
          hindiTitle: "शर्करा संश्लेषण (Calvin Cycle)",
          hindiText: "एटीपी और एनएडीपीएच ऊर्जा वाहक हवा से कार्बन डाइऑक्साइड को मिलाकर पौधे के लिए ग्लूकोज बनाते हैं।",
          malayalamTitle: "ഭക്ഷണ നിർമ്മാണം (Calvin Cycle)",
          malayalamText: "ATP, NADPH എന്നിവയുടെ സഹായത്തോടെ കാർബൺ ഡയോക്സൈഡ് സംയോജിപ്പിച്ച് സസ്യങ്ങൾ ഗ്ലൂക്കോസ് നിർമ്മിക്കുന്നു."
        }
      ],
      conceptTree: [
        "Step 1: Sunlight, water, and carbon dioxide enter the plant leaf cells.",
        "Step 2: Chloroplasts split water and generate chemical energy (ATP/NADPH).",
        "Step 3: Calvin Cycle fixes CO2 into Glucose sugars and releases Oxygen."
      ],
      hindiConceptTree: [
        "चरण 1: सूर्य का प्रकाश, जल और कार्बन डाइऑक्साइड पौधे की पत्तियों में प्रवेश करते हैं।",
        "चरण 2: क्लोरोप्लास्ट जल को तोड़कर रासायनिक ऊर्जा (ATP/NADPH) बनाते हैं।",
        "चरण 3: केल्विन चक्र CO2 को ग्लूकोज में बदलता है और ऑक्सीजन छोड़ता है।"
      ],
      malayalamConceptTree: [
        "ഘട്ടം 1: സൂര്യപ്രകാശം, ജലം, കാർബൺ ഡയോക്സൈഡ് എന്നിവ ഇലകളിലേക്ക് എത്തുന്നു.",
        "ഘട്ടം 2: ക്ലോറോപ്ലാസ്റ്റുകൾ ജലത്തെ വിഘടിപ്പിച്ച് രാസോർജ്ജം (ATP/NADPH) നിർമ്മിക്കുന്നു.",
        "ഘട്ടം 3: കാൽവിൻ സൈക്കിളിലൂടെ CO2 ഗ്ലൂക്കോസ് ആയി മാറുകയും ഓക്സിജൻ പുറത്തുവിടുകയും ചെയ്യുന്നു."
      ],
      analogy: "Think of a plant leaf as a clean solar kitchen. The chlorophyll acts as rooftop solar panels generating electricity to run an oven that bakes raw air and water into sweet energy bars (glucose), puffing out fresh oxygen through the chimney.",
      hindiAnalogy: "पौधे की पत्ती को एक पर्यावरण-अनुकूल सौर रसोई समझें। क्लोरोफिल छत पर लगे सोलर पैनल जैसा है जो बिजली बनाता है, और ओवन हवा (CO2) व पानी को स्वादिष्ट ऊर्जा बार (ग्लूकोज) में बेक करता है, जबकि चिमनी से ताज़ा ऑक्सीजन बाहर निकलती है।",
      malayalamAnalogy: "സസ്യത്തിന്റെ ഇലയെ ഒരു അത്യാധുനിക സോളാർ അടുക്കളയായി സങ്കൽപ്പിക്കുക. മേൽക്കൂരയിലെ സോളാർ പാനലുകൾ പോലെ പ്രവർത്തിക്കുന്ന ക്ലോറോഫിൽ ഉണ്ടാക്കുന്ന ഊർജ്ജം ഉപയോഗിച്ച് വായുവിനെയും ജലത്തെയും മധുരമുള്ള ഭക്ഷണമാക്കി (ഗ്ലൂക്കോസ്) മാറ്റുന്നു, ശുദ്ധവായു ചിമ്മിനി വഴി പുറത്തേക്ക് വിടുന്നു.",
      malayalam: "സസ്യങ്ങൾ sunlight ഉപയോഗിച്ച് Chloroplast വഴി ഭക്ഷണം ഉണ്ടാക്കുന്ന പ്രക്രിയയാണ് Photosynthesis. Water വിഘടിച്ച് Oxygen പുറത്തുവിടുകയും Calvin Cycle വഴി Glucose നിർമ്മിക്കുകയും ചെയ്യുന്നു.",
      hindi: "पौधे sunlight और Chloroplast की मदद से अपना भोजन तैयार करते हैं, जिसे Photosynthesis कहते हैं। इस दौरान Water के टूटने से Oxygen निकलती है और अंत में Glucose का निर्माण होता है।",
      microQuiz: [
        {
          id: 1,
          tag: "Core Mechanism",
          question: "Which organelle inside plant cells contains the chlorophyll required to absorb solar photons?",
          options: [
            "Mitochondria",
            "Chloroplast",
            "Ribosome",
            "Golgi Apparatus"
          ],
          correctIndex: 1,
          explanation: "Chloroplasts house chlorophyll pigments that capture sunlight to initiate photosynthesis.",
          encouragement: "Excellent job! You correctly identified the cellular solar engine of plant life.",
          hindi: {
            question: "पौधों की कोशिकाओं के भीतर किस अंगक (Organelle) में सौर ऊर्जा सोखने वाला क्लोरोफिल होता है?",
            options: [
              "माइटोकॉन्ड्रिया",
              "क्लोरोप्लास्ट (Chloroplast)",
              "राइबोसोम",
              "गॉल्जी काय"
            ],
            explanation: "क्लोरोप्लास्ट में क्लोरोफिल होता है जो प्रकाश संश्लेषण शुरू करने के लिए सूर्य का प्रकाश सोखता है।"
          },
          malayalam: {
            question: "സസ്യകോശങ്ങളിൽ സൂര്യപ്രകാശം ആഗിരണം ചെയ്യാനുള്ള ക്ലോറോഫിൽ അടങ്ങിയിരിക്കുന്നത് എവിടെയാണ്?",
            options: [
              "മൈറ്റോകോൺഡ്രിയ",
              "ക്ലോറോപ്ലാസ്റ്റ് (Chloroplast)",
              "റൈബോസോം",
              "ന്യൂക്ലിയസ്"
            ],
            explanation: "ക്ലോറോഫിൽ അടങ്ങിയിരിക്കുന്നത് ക്ലോറോപ്ലാസ്റ്റിലാണ്, ഇതാണ് പ്രകാശസംശ്ലേഷണം സാധ്യമാക്കുന്നത്."
          }
        },
        {
          id: 2,
          tag: "Reaction Byproduct",
          question: "What essential gas is released into the atmosphere when water (H2O) molecules are split by light?",
          options: [
            "Carbon Monoxide (CO)",
            "Oxygen Gas (O2)",
            "Pure Nitrogen (N2)",
            "Helium Gas (He)"
          ],
          correctIndex: 1,
          explanation: "Photolysis splits water molecules into protons and electrons, releasing breathable Oxygen gas as a byproduct.",
          encouragement: "Wonderful! You recognized where Earth's life-giving breathable atmosphere originates.",
          hindi: {
            question: "प्रकाश द्वारा जल (H2O) के अणुओं के विखंडन पर वातावरण में कौन सी आवश्यक गैस मुक्त होती है?",
            options: [
              "कार्बन मोनोऑक्साइड (CO)",
              "ऑक्सीजन गैस (O2)",
              "नाइट्रोजन गैस (N2)",
              "हीलियम गैस (He)"
            ],
            explanation: "जल के टूटने से पौधों से जीवनदायी ऑक्सीजन (O2) गैस वातावरण में मुक्त होती है।"
          },
          malayalam: {
            question: "ജലതന്മാത്രകൾ പ്രകാശത്താൽ വിഘടിക്കുമ്പോൾ അന്തരീക്ഷത്തിലേക്ക് പുറന്തള്ളപ്പെടുന്ന ജീവവായു ഏതാണ്?",
            options: [
              "കാർബൺ മോണോക്സൈഡ്",
              "ഓക്സിജൻ വാതകം (O2)",
              "നൈട്രജൻ വാതകം",
              "മീഥെയ്ൻ വാതകം"
            ],
            explanation: "ജലം വിഘടിക്കുമ്പോൾ പുറത്തുവരുന്ന ഓക്സിജൻ അന്തരീക്ഷത്തിലെ ജീവൻ നിലനിർത്താൻ സഹായിക്കുന്നു."
          }
        },
        {
          id: 3,
          tag: "Chemical Synthesis",
          question: "What primary chemical product is assembled during the Calvin Cycle from carbon dioxide?",
          options: [
            "Glucose (C6H12O6) sugar fuel",
            "Liquid water molecules",
            "Dense metallic salts",
            "Methane gas"
          ],
          correctIndex: 0,
          explanation: "The Calvin Cycle fixes atmospheric CO2 using ATP and NADPH energy to construct high-energy glucose sugar molecules.",
          encouragement: "Superb biochemical understanding! You know how plants store solar energy in sugar.",
          hindi: {
            question: "केल्विन चक्र (Calvin Cycle) के दौरान कार्बन डाइऑक्साइड से कौन सा प्राथमिक उत्पाद बनता है?",
            options: [
              "ग्लूकोज (Glucose - C6H12O6) शर्करा ऊर्जा",
              "तरल पानी के अणु",
              "खनिज लवण",
              "मीथेन गैस"
            ],
            explanation: "केल्विन चक्र कार्बन डाइऑक्साइड को एटीपी ऊर्जा की मदद से ग्लूकोज शर्करा में परिवर्तित करता है।"
          },
          malayalam: {
            question: "കാൽവിൻ സൈക്കിൾ (Calvin Cycle) വഴി കാർബൺ ഡയോക്സൈഡിൽ നിന്ന് ഉണ്ടാകുന്ന പ്രധാന ഉൽപ്പന്നം ഏതാണ്?",
            options: [
              "ഗ്ലൂക്കോസ് (Glucose - C6H12O6) പഞ്ചസാര",
              "ജല തന്മാത്രകൾ",
              "ധാതു ലവണങ്ങൾ",
              "കാർബൺ പൗഡർ"
            ],
            explanation: "സസ്യങ്ങൾക്ക് ഊർജ്ജം നൽകുന്ന പ്രധാന അന്നജമായ ഗ്ലൂക്കോസാണ് കാൽവിൻ സൈക്കിളിലൂടെ നിർമ്മിക്കപ്പെടുന്നത്."
          }
        },
        {
          id: 4,
          tag: "Analogy Anchor",
          question: "In the 'Solar Kitchen' metaphor, what component corresponds to the leaf's chlorophyll pigment?",
          options: [
            "Rooftop photovoltaic solar panels absorbing energy",
            "The kitchen dining table and chairs",
            "The waste water drain pipe",
            "The refrigerator cooling fan"
          ],
          correctIndex: 0,
          explanation: "Just as solar panels absorb sunlight photons to energize appliances, chlorophyll absorbs light to drive chemical synthesis.",
          encouragement: "Great job connecting biological structures to technological concepts!",
          hindi: {
            question: "'सौर रसोई' के रूपक में, पत्ती के क्लोरोफिल वर्णक से किस वस्तु की तुलना की गई है?",
            options: [
              "ऊर्जा सोखने वाले छत के सौर पैनल (Solar Panels)",
              "रसोई की खाने की मेज और कुर्सियाँ",
              "अपशिष्ट जल की नाली",
              "फ्रिज का पंखा"
            ],
            explanation: "जैसे सोलर पैनल धूप सोखकर बिजली देते हैं, वैसे ही क्लोरोफिल प्रकाश सोखकर भोजन पकाने की ऊर्जा देता है।"
          },
          malayalam: {
            question: "'സോളാർ അടുക്കള' എന്ന ഉപമയിൽ, സസ്യത്തിലെ ക്ലോറോഫിലിന് തുല്യമായി പറഞ്ഞിരിക്കുന്നത് ഏതാണ്?",
            options: [
              "ഊർജ്ജം സ്വീകരിക്കുന്ന മേൽക്കൂരയിലെ സോളാർ പാനലുകൾ",
              "അടുക്കളയിലെ ഡൈനിംഗ് ടേബിൾ",
              "വെള്ളം പുറത്തേക്ക് കളയുന്ന പൈപ്പ്",
              "ഫ്രിഡ്ജിന്റെ ഡോർ"
            ],
            explanation: "സോളാർ പാനലുകൾ സൂര്യപ്രകാശം സ്വീകരിക്കുന്നതുപോലെയാണ് ക്ലോറോഫിൽ പ്രകാശത്തെ ആഗിരണം ചെയ്യുന്നത്."
          }
        }
      ]
    }
  },
  {
    id: 'calculus',
    title: 'Calculus: Derivatives & Rates of Change',
    hindiTitle: 'कैलकुलस: अवकलन और परिवर्तन की दर (Calculus)',
    malayalamTitle: 'കാൽക്കുലസ്: ഡെറിവേറ്റീവുകളും മാറ്റത്തിന്റെ നിരക്കും',
    subject: 'Mathematics & Analysis',
    emoji: '📐',
    sourceText: "Calculus is the mathematical study of continuous change, developed independently by Isaac Newton and Gottfried Wilhelm Leibniz. Its two foundational branches are differential calculus and integral calculus. Differential calculus concerns derivatives, which measure the instantaneous rate of change of a quantity and correspond to the slope of a curve at an exact point. In contrast, integral calculus focuses on accumulation and the area under a curve. Connected by the Fundamental Theorem of Calculus, these concepts allow engineers and scientists to calculate planetary orbits, model fluid dynamics, optimize neural networks, and analyze economic velocity.",
    hindiSourceText: "कैलकुलस निरंतर परिवर्तन का गणितीय अध्ययन है, जिसे आइजैक न्यूटन और गॉटफ्राइड विल्हेम लीबनिज ने स्वतंत्र रूप से विकसित किया था। इसकी दो प्रमुख शाखाएं हैं: डिफरेंशियल कैलकुलस और इंटीग्रल कैलकुलस। डिफरेंशियल कैलकुलस का संबंध डेरिवेटिव (अवकलन) से है, जो किसी क्षणिक बिंदु पर परिवर्तन की दर और वक्र के ढलान को मापता है। इसके विपरीत, इंटीग्रल कैलकुलस (समाकलन) कुल संचय और वक्र के नीचे के क्षेत्रफल पर केंद्रित है। कैलकुलस का मौलिक प्रमेय इन दोनों को एक दूसरे का विपरीत बताता है।",
    malayalamSourceText: "തുടർച്ചയായ മാറ്റങ്ങളെ ഗണിതപരമായി പഠിക്കുന്ന ശാഖയാണ് Calculus. ഐസക് ന്യൂട്ടണും ലെബ്നിസും ചേർന്നാണ് ഇത് വികസിപ്പിച്ചത്. ഇതിൽ പ്രധാനമായും രണ്ട് ഭാഗങ്ങളുണ്ട്: Differential Calculus-ഉം Integral Calculus-ഉം. ഒരു നിശ്ചിത നിമിഷത്തിലെ മാറ്റത്തിന്റെ നിരക്ക് (Instantaneous Rate of Change) അല്ലെങ്കിൽ ചരിവ് (Slope) കണ്ടെത്താൻ Derivative സഹായിക്കുന്നു. നേരെമറിച്ച്, ഒരു പ്രത്യേക പരിധിയിലെ ആകെ കൂട്ടിച്ചേർക്കലുകളും വിസ്തീർണ്ണവും കണ്ടെത്താനാണ് Integration ഉപയോഗിക്കുന്നത്. ഇവ രണ്ടും പരസ്പരം വിപരീതമായ പ്രക്രിയകളാണ്.",
    fallbackData: {
      chunkCards: [
        {
          title: "Derivatives as Instantaneous Speed",
          text: "A derivative tells you exactly how fast something is changing at one exact frozen instant in time, just like a car speedometer.",
          hindiTitle: "क्षणिक गति के रूप में अवकलन (Derivative)",
          hindiText: "डेरिवेटिव आपको बताता है कि किसी निश्चित क्षण में कोई चीज़ कितनी तेजी से बदल रही है, जैसे कार का स्पीडोमीटर।",
          malayalamTitle: "മാറ്റത്തിന്റെ നിരക്ക് (Derivative)",
          malayalamText: "ഒരു പ്രത്യേക നിമിഷത്തിൽ എന്തെങ്കിലും എത്ര വേഗത്തിൽ മാറുന്നുവെന്ന് കൃത്യമായി കണക്കാക്കുന്നതാണ് Derivative (കാറിലെ സ്പീഡോമീറ്റർ പോലെ)."
        },
        {
          title: "Integrals as Cumulative Area",
          text: "Integration adds up countless microscopic slices to calculate the total accumulated quantity, distance traveled, or area under a curve.",
          hindiTitle: "कुल संचय के रूप में समाकलन (Integral)",
          hindiText: "इंटीग्रेशन अनगिनत छोटे हिस्सों को जोड़कर कुल तय की गई दूरी या ग्राफ के नीचे का कुल क्षेत्रफल निकालता है।",
          malayalamTitle: "ആകെ തുക കണ്ടെത്തൽ (Integration)",
          malayalamText: "ചെറിയ ഭാഗങ്ങൾ ഒന്നിച്ച് ചേർത്തുവെച്ച് ആകെ സഞ്ചരിച്ച ദൂരമോ വിസ്തീർണ്ണമോ അളക്കുന്നതാണ് Integration (ഓഡോമീറ്റർ പോലെ)."
        },
        {
          title: "The Fundamental Theorem Bridge",
          text: "Derivatives and Integrals are exact mathematical inverses of one another, like multiplication and division reversing each other.",
          hindiTitle: "मौलिक प्रमेय का सेतु (Fundamental Theorem)",
          hindiText: "अवकलन और समाकलन एक दूसरे के सटीक विपरीत हैं, जैसे गुणा और भाग एक दूसरे की क्रिया को उलट देते हैं।",
          malayalamTitle: "ഫണ്ടമെന്റൽ തിയറം (Fundamental Theorem)",
          malayalamText: "ഗുണനവും ഹരണവും പോലെ Derivative-ഉം Integral-ഉം പരസ്പരം വിപരീതമായ ഗണിത പ്രക്രിയകളാണ്."
        }
      ],
      conceptTree: [
        "Step 1: Identify a curved relationship between changing quantities (e.g., Position over Time).",
        "Step 2: Differentiate to find the instantaneous slope or rate of change (Derivative / Velocity).",
        "Step 3: Integrate over an interval to find total accumulated area or displacement."
      ],
      hindiConceptTree: [
        "चरण 1: बदलते चरों के बीच एक संबंध पहचानें (जैसे समय के साथ स्थिति)।",
        "चरण 2: किसी बिंदु पर क्षणिक ढलान या वेग निकालने के लिए अवकलन (Derivative) करें।",
        "चरण 3: कुल संचित दूरी या क्षेत्रफल निकालने के लिए समाकलन (Integration) करें।"
      ],
      malayalamConceptTree: [
        "ഘട്ടം 1: പരസ്പരം മാറിക്കൊണ്ടിരിക്കുന്ന രണ്ട് കാര്യങ്ങൾ തിരിച്ചറിയുക (ഉദാ: സമയത്തിനനുസരിച്ചുള്ള സ്ഥാനം).",
        "ഘട്ടം 2: ഒരു നിമിഷത്തിലെ വേഗതയോ ചരിവോ അറിയാൻ Differentiate ചെയ്യുക (Derivative / പ്രവേഗം).",
        "ഘട്ടം 3: ആകെ സഞ്ചരിച്ച ദൂരമോ വിസ്തീർണ്ണമോ കണ്ടെത്താൻ Integrate ചെയ്യുക."
      ],
      analogy: "Imagine driving a car down the highway. The odometer records the total distance you have accumulated (Integration), while your live digital speedometer tells you your exact speed at that one split-second moment (Differentiation).",
      hindiAnalogy: "हाईवे पर कार चलाने की कल्पना करें। ओडोमीटर आपके द्वारा तय की गई कुल संचित दूरी दिखाता है (Integration), जबकि लाइव डिजिटल स्पीडोमीटर आपको ठीक उसी एक सेकंड में आपकी सटीक गति बताता है (Differentiation)।",
      malayalamAnalogy: "ഹൈവേയിലൂടെ ഒരു കാർ ഓടിക്കുന്നത് സങ്കൽപ്പിക്കുക. നിങ്ങൾ ആകെ സഞ്ചരിച്ച ദൂരം കാണിക്കുന്ന ഓഡോമീറ്ററാണ് Integration, എന്നാൽ ആ നിമിഷത്തിലെ കൃത്യമായ വേഗത കാണിക്കുന്ന സ്പീഡോമീറ്ററാണ് Differentiation.",
      malayalam: "തുടർച്ചയായ മാറ്റങ്ങളെ പഠിക്കുന്ന ശാഖയാണ് Calculus. ഒരു നിശ്ചിത നിമിഷത്തിലെ മാറ്റത്തിന്റെ നിരക്കാണ് Derivative (Speedometer പോലെ). ആകെ അളവുകൾ കൂട്ടിച്ചേർക്കുന്നതാണ് Integration (Odometer പോലെ).",
      hindi: "Calculus निरंतर परिवर्तन का गणित है। किसी विशेष क्षण पर परिवर्तन की दर को Derivative कहते हैं (जैसे स्पीडोमीटर), जबकि कुल योग निकालने को Integration कहते हैं (जैसे ओडोमीटर)।",
      microQuiz: [
        {
          id: 1,
          tag: "Core Concept",
          question: "What physical geometric measurement does a derivative represent on a curved graph?",
          options: [
            "The total area enclosed underneath the entire curve",
            "The slope of the tangent line at one exact instantaneous point",
            "The absolute height of the highest peak on the y-axis",
            "The straight-line distance back to the coordinate origin"
          ],
          correctIndex: 1,
          explanation: "The derivative measures the instantaneous rate of change, which corresponds geometrically to the slope of the tangent line at that point.",
          encouragement: "Spot on! You understand the foundational geometry of differential calculus.",
          hindi: {
            question: "किसी वक्र (Curve) के ग्राफ पर डेरिवेटिव किस ज्यामितीय माप को दर्शाता है?",
            options: [
              "पूरे वक्र के नीचे का कुल क्षेत्रफल",
              "किसी निश्चित बिंदु पर स्पर्शरेखा (Tangent) का ढलान (Slope)",
              "Y-अक्ष पर सबसे ऊंचे शिखर की ऊंचाई",
              "मूल बिंदु (Origin) से सीधी दूरी"
            ],
            explanation: "डेरिवेटिव किसी क्षणिक बिंदु पर परिवर्तन की दर या स्पर्शरेखा के ढलान को दर्शाता है।"
          },
          malayalam: {
            question: "ഒരു ഗ്രാഫിൽ Derivative എന്തിനെയാണ് ജ്യാമിതീയമായി പ്രതിനിധീകരിക്കുന്നത്?",
            options: [
              "ഗ്രാഫിന്റെ അടിയിലുള്ള ആകെ വിസ്തീർണ്ണം",
              "ഒരു പ്രത്യേക ബിന്ദുവിലെ സ്പർശരേഖയുടെ ചരിവ് (Slope of the tangent line)",
              "ഏറ്റവും ഉയർന്ന പോയിന്റിന്റെ ഉയരം",
              "തുടക്ക സ്ഥാനത്തുനിന്നുള്ള ദൂരം"
            ],
            explanation: "ഒരു നിശ്ചിത ബിന്ദുവിലെ ചരിവോ മാറ്റത്തിന്റെ നിരക്കോ ആണ് Derivative അളക്കുന്നത്."
          }
        },
        {
          id: 2,
          tag: "Analogy Anchor",
          question: "In the car dashboard analogy, which instrument illustrates Integration rather than Differentiation?",
          options: [
            "The live speedometer showing instantaneous velocity",
            "The odometer tallying total accumulated distance traveled",
            "The engine temperature gauge",
            "The fuel tank indicator needle"
          ],
          correctIndex: 1,
          explanation: "An odometer continuously sums up infinitesimal distance increments over time to provide total accumulated mileage (Integration).",
          encouragement: "Brilliant analogy recall! You clearly differentiate accumulation from rate of change.",
          hindi: {
            question: "कार के डैशबोर्ड के उदाहरण में, कौन सा मीटर अवकलन (Differentiation) के बजाय समाकलन (Integration) को दर्शाता है?",
            options: [
              "लाइव स्पीडोमीटर जो उस क्षण की गति दिखाता है",
              "ओडोमीटर (Odometer) जो तय की गई कुल संचित दूरी को जोड़ता है",
              "इंजन का तापमान गेज",
              "ईंधन टैंक की सुई"
            ],
            explanation: "ओडोमीटर समय के साथ तय की गई छोटी-छोटी दूरियों को जोड़कर कुल दूरी बताता है, जो इंटीग्रेशन है।"
          },
          malayalam: {
            question: "കാറിന്റെ ഡാഷ്‌ബോർഡിലെ ഉപമയിൽ, Integration-നെ കാണിക്കുന്നത് ഏത് മീറ്ററാണ്?",
            options: [
              "ആ നിമിഷത്തിലെ വേഗത കാണിക്കുന്ന സ്പീഡോമീറ്റർ",
              "ആകെ സഞ്ചരിച്ച ദൂരം കൂട്ടിച്ചേർത്ത് കാണിക്കുന്ന ഓഡോമീറ്റർ (Odometer)",
              "എഞ്ചിൻ താപനില കാണി",
              "പെട്രോൾ അളവ് സൂചി"
            ],
            explanation: "ഓരോ നിമിഷവും സഞ്ചരിച്ച ദൂരങ്ങൾ ഒന്നിച്ച് കൂട്ടി ആകെ അളവ് നൽകുന്ന ഓഡോമീറ്ററാണ് Integration."
          }
        },
        {
          id: 3,
          tag: "Theoretical Bridge",
          question: "How are Differentiation and Integration connected according to the Fundamental Theorem of Calculus?",
          options: [
            "They are completely unrelated and compute unrelated dimensions",
            "They are exact inverse mathematical operations of each other",
            "Integration can only be computed if differentiation fails",
            "Integration always produces a value exactly double differentiation"
          ],
          correctIndex: 1,
          explanation: "Like multiplication reverses division, integration reverses differentiation according to the Fundamental Theorem.",
          encouragement: "Exceptional mathematical depth! You've grasped calculus's unifying theorem.",
          hindi: {
            question: "कैलकुलस के मौलिक प्रमेय के अनुसार अवकलन और समाकलन कैसे संबंधित हैं?",
            options: [
              "वे पूरी तरह से असंबद्ध हैं और अलग आयाम मापते हैं",
              "वे एक दूसरे की सटीक विपरीत (Inverse) गणितीय संक्रियाएं हैं",
              "इंटीग्रेशन केवल तभी निकाला जा सकता है जब डिफरेंशियल फेल हो जाए",
              "इंटीग्रेशन का मान हमेशा अवकलन से दोगुना होता है"
            ],
            explanation: "जैसे गुणा और भाग एक दूसरे के उल्टे हैं, वैसे ही अवकलन और समाकलन एक दूसरे के विपरीत हैं।"
          },
          malayalam: {
            question: "ഫണ്ടമെന്റൽ തിയറം അനുസരിച്ച് Differentiation-ഉം Integration-ഉം തമ്മിലുള്ള ബന്ധം എന്താണ്?",
            options: [
              "അവ തമ്മിൽ യാതൊരു ബന്ധവുമില്ല",
              "അവ പരസ്പരം വിപരീതമായ (Inverse) ഗണിത പ്രക്രിയകളാണ്",
              "Differentiation പരാജയപ്പെടുമ്പോൾ മാത്രമേ Integration ചെയ്യാനാകൂ",
              "Integration എപ്പോഴും ഇരട്ടി മൂല്യം നൽകുന്നു"
            ],
            explanation: "ഗുണനവും ഹരണവും പോലെ അവ പരസ്പരം തിരിച്ചിടാവുന്ന വിപരീത പ്രക്രിയകളാണ്."
          }
        },
        {
          id: 4,
          tag: "Practical Kinematics",
          question: "If velocity is the first derivative of position with respect to time, what is the derivative of velocity?",
          options: [
            "Acceleration (the rate of change of velocity)",
            "Total mass of the vehicle",
            "Frictional resistance force",
            "Initial starting coordinate"
          ],
          correctIndex: 0,
          explanation: "Taking the derivative of velocity yields acceleration: how quickly your speed itself is changing per unit time.",
          encouragement: "Outstanding physics and calculus connection! You see how rates of change compound.",
          hindi: {
            question: "यदि वेग (Velocity) समय के संबंध में स्थिति का पहला अवकलन है, तो वेग का अवकलन क्या कहलाता है?",
            options: [
              "त्वरण (Acceleration - वेग परिवर्तन की दर)",
              "वाहन का कुल द्रव्यमान",
              "घर्षण बल",
              "प्रारंभिक निर्देशांक"
            ],
            explanation: "वेग का अवकलन करने पर त्वरण मिलता है, जो यह मापता है कि गति कितनी तेजी से बदल रही है।"
          },
          malayalam: {
            question: "പ്രവേഗം (Velocity) സ്ഥാനത്തിന്റെ മാറ്റത്തിന്റെ നിരക്കാണെങ്കിൽ, പ്രവേഗത്തിന്റെ മാറ്റത്തിന്റെ നിരക്ക് (Derivative) എന്താണ്?",
            options: [
              "ത്വരണ൦ (Acceleration)",
              "വാഹനത്തിന്റെ ഭാരം",
              "ഘർഷണം",
              "തുടക്ക സ്ഥാനം"
            ],
            explanation: "പ്രവേഗത്തിന്റെ മാറ്റത്തിന്റെ നിരക്കാണ് ത്വരണം (Acceleration = dv/dt)."
          }
        }
      ]
    }
  },
  {
    id: 'newtons_laws',
    title: "Newton's Laws of Motion",
    hindiTitle: "न्यूटन के गति के नियम (Newton's Laws)",
    malayalamTitle: "ന്യൂട്ടന്റെ ചലന നിയമങ്ങൾ (Newton's Laws)",
    subject: 'Classical Physics & Mechanics',
    emoji: '🚀',
    sourceText: "Sir Isaac Newton's three laws of motion formulate the relationship between the forces acting on a body and its motion. The First Law (Law of Inertia) states that an object will remain at rest or move at a constant velocity unless acted upon by a net external force. The Second Law mathematically establishes that the acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass (F = ma). The Third Law dictates that whenever one body exerts a force on a second body, the second body exerts an equal and opposite force back (Action-Reaction), ensuring momentum conservation across closed physical systems.",
    hindiSourceText: "सर आइजैक न्यूटन के गति के तीन नियम किसी पिंड पर लगने वाले बलों और उसकी गति के बीच के संबंध को स्पष्ट करते हैं। पहला नियम (जड़त्व का नियम) बताता है कि कोई वस्तु तब तक स्थिर या एकसमान गति में रहती है जब तक कि उस पर कोई बाहरी बल न लगे। दूसरा नियम गणितीय रूप से स्थापित करता है कि बल द्रव्यमान और त्वरण का गुणनफल है (F = ma)। तीसरा नियम कहता है कि प्रत्येक क्रिया की एक समान और विपरीत प्रतिक्रिया होती है (Action-Reaction), जो संवेग संरक्षण सुनिश्चित करती है।",
    malayalamSourceText: "ഒരു വസ്തുവിൽ അനുഭവപ്പെടുന്ന ബലങ്ങളും അതിന്റെ ചലനവും തമ്മിലുള്ള ബന്ധമാണ് സർ ഐസക് ന്യൂട്ടന്റെ മൂന്ന് ചലന നിയമങ്ങൾ വിശദീകരിക്കുന്നത്. ഒന്നാം നിയമം (ജഡത്വ നിയമം - Inertia) അനുസരിച്ച്, പുറത്തുനിന്ന് ഒരു ബാഹ്യബലം പ്രയോഗിക്കാത്ത പക്ഷം ഏതൊരു വസ്തുവും അതിന്റെ നിശ്ചലാവസ്ഥയിലോ നേർരേഖയിലുള്ള സമചലനത്തിലോ തുടരുന്നു. രണ്ടാം നിയമം ബലവും പിണ്ഡവും ത്വരണവും തമ്മിലുള്ള ബന്ധം വ്യക്തമാക്കുന്നു (F = ma). മൂന്നാം നിയമം അനുസരിച്ച്, ഓരോ പ്രവർത്തനത്തിനും തുല്യവും വിപരീതവുമായ ഒരു പ്രതിപ്രവർത്തനം (Action - Reaction) ഉണ്ടായിരിക്കും.",
    fallbackData: {
      chunkCards: [
        {
          title: "Law of Inertia (1st Law)",
          text: "Objects keep doing what they are already doing unless an outside unbalanced push or pull stops or turns them.",
          hindiTitle: "जड़त्व का नियम (पहला नियम)",
          hindiText: "वस्तुएं अपनी वर्तमान स्थिति (विराम या गति) में तब तक बनी रहती हैं जब तक कि कोई बाहरी बल उन्हें बदलने के लिए मजबूर न करे।",
          malayalamTitle: "ജഡത്വ നിയമം (ഒന്നാം നിയമം)",
          malayalamText: "ബാഹ്യബലം പ്രയോഗിക്കാത്ത പക്ഷം വസ്തുക്കൾ അവയുടെ നിലവിലുള്ള നിശ്ചലാവസ്ഥയിലോ സമചലനത്തിലോ മാറ്റമില്ലാതെ തുടരുന്നു."
        },
        {
          title: "Force & Mass Formula (2nd Law: F = ma)",
          text: "Heavier objects require greater net force to accelerate; pushing twice as hard creates twice the acceleration.",
          hindiTitle: "बल और द्रव्यमान (F = ma)",
          hindiText: "भारी वस्तुओं को गति देने के लिए अधिक बल की आवश्यकता होती है; दोगुना बल लगाने पर त्वरण भी दोगुना हो जाता है।",
          malayalamTitle: "ബലവും പിണ്ഡവും (F = ma)",
          malayalamText: "ഭാരമുള്ള വസ്തുക്കളെ വേഗത്തിലാക്കാൻ കൂടുതൽ ബലം വേണം; ബലം ഇരട്ടിയാക്കുമ്പോൾ ത്വരണവും ഇരട്ടിയാകും."
        },
        {
          title: "Equal & Opposite Reaction (3rd Law)",
          text: "Every action force triggers an identical push back in the opposite direction, like air rushing out of an untied balloon.",
          hindiTitle: "क्रिया और प्रतिक्रिया (तीसरा नियम)",
          hindiText: "प्रत्येक क्रिया बल की विपरीत दिशा में उतनी ही तीव्रता की प्रतिक्रिया होती है, जैसे गुब्बारे से हवा निकलने पर उसका उड़ना।",
          malayalamTitle: "പ്രവർത്തനവും പ്രതിപ്രവർത്തനവും",
          malayalamText: "ഓരോ പ്രവർത്തനത്തിനും തുല്യവും വിപരീതവുമായ പ്രതിപ്രവർത്തനം ഉണ്ടായിരിക്കും (ഉദാ: റോക്കറ്റിന്റെ വിക്ഷേപണം)."
        }
      ],
      conceptTree: [
        "Step 1: An object maintains its resting or steady moving state (Inertia).",
        "Step 2: A net external force is applied, creating acceleration proportional to mass (F = ma).",
        "Step 3: An equal and opposite reaction force pushes back instantaneously (Action-Reaction)."
      ],
      hindiConceptTree: [
        "चरण 1: वस्तु अपनी स्थिर या गतिशील अवस्था बनाए रखती है (जड़त्व - Inertia)।",
        "चरण 2: बाहरी बल लगने पर द्रव्यमान के अनुपात में त्वरण उत्पन्न होता है (F = ma)।",
        "चरण 3: वस्तु पर ठीक उतनी ही तीव्रता का विपरीत बल तुरंत लगता है (Action-Reaction)।"
      ],
      malayalamConceptTree: [
        "ഘട്ടം 1: വസ്തുക്കൾ സ്വാഭാവികമായി നിശ്ചലാവസ്ഥയിലോ ചലനത്തിലോ തുടരുന്നു (ജഡത്വം).",
        "ഘട്ടം 2: ഒരു ബാഹ്യബലം പ്രയോഗിക്കുമ്പോൾ പിണ്ഡത്തിന് ആനുപാതികമായി ത്വരണം ഉണ്ടാകുന്നു (F = ma).",
        "ഘട്ടം 3: അതെ സമയം തന്നെ തുല്യവും വിപരീതവുമായ പ്രതിപ്രവർത്തന ബലം തിരികെ അനുഭവപ്പെടുന്നു."
      ],
      analogy: "Imagine skateboarding on a friction-free rink. You glide forever until a wall touches you (1st Law), you need to kick twice as hard if carrying a heavy backpack (2nd Law), and every time your foot pushes the ground backwards, the board rockets forward (3rd Law).",
      hindiAnalogy: "बिना घर्षण वाले स्केटिंग रिंक पर स्केटबोर्ड चलाने की कल्पना करें। आप तब तक फिसलते रहेंगे जब तक कोई दीवार न रोक दे (पहला नियम), भारी बैग होने पर दोगुनी ताकत लगानी होगी (दूसरा नियम), और जब आपका पैर जमीन को पीछे धकेलता है तो बोर्ड आगे भागता है (तीसरा नियम)।",
      malayalamAnalogy: "ഘർഷണമില്ലാത്ത ഒരു ഐസ് പ്രതലത്തിൽ സ്കേറ്റ്ബോർഡ് ഓടിക്കുന്നത് സങ്കൽപ്പിക്കുക. ഭിത്തിയിൽ തട്ടുന്നതുവരെ നിങ്ങൾ മുന്നോട്ട് നീങ്ങിക്കൊണ്ടേയിരിക്കും (ഒന്നാം നിയമം), കനമുള്ള ബാഗുണ്ടെങ്കിൽ മുന്നോട്ട് പോകാൻ ഇരട്ടി ശക്തി വേണം (രണ്ടാം നിയമം), നിങ്ങളുടെ കാൽ തറയിൽ പിന്നോട്ട് തള്ളുമ്പോൾ ബോർഡ് മുന്നോട്ട് കുതിക്കുന്നു (മൂന്നാം നിയമം).",
      malayalam: "Newton-ന്റെ മൂന്ന് നിയമങ്ങൾ വസ്തുക്കളുടെ ചലനത്തെ വിശദീകരിക്കുന്നു: ഒന്നാമത്തെ നിയമം Inertia-യെക്കുറിച്ചും, രണ്ടാമത്തെ നിയമം F = ma സൂത്രവാക്യത്തെക്കുറിച്ചും, മൂന്നാമത്തെ നിയമം Action & Reaction തുല്യമാണെന്നും വ്യക്തമാക്കുന്നു.",
      hindi: "Newton के गति के नियम बताते हैं कि कोई वस्तु बिना बाहरी Force के अपनी अवस्था नहीं बदलती (Inertia), बल द्रव्यमान और त्वरण का गुणनफल है (F = ma), और हर Action की समान और विपरीत Reaction होती है।",
      microQuiz: [
        {
          id: 1,
          tag: "1st Law: Inertia",
          question: "Which of Newton's laws explains why passengers lurch forward when a moving bus suddenly brakes?",
          options: [
            "The 1st Law (Law of Inertia)",
            "The 2nd Law (F = ma)",
            "The 3rd Law (Action-Reaction)",
            "The Law of Universal Gravitation"
          ],
          correctIndex: 0,
          explanation: "Due to inertia, the passengers' bodies want to continue moving forward at the original speed until an external seatbelt or grab-bar applies a stopping force.",
          encouragement: "Great job! That's the real-world application of inertia in everyday travel.",
          hindi: {
            question: "बस के अचानक ब्रेक लगाने पर यात्री आगे की ओर क्यों झुकते हैं?",
            options: [
              "पहला नियम (जड़त्व का नियम - Law of Inertia)",
              "दूसरा नियम (F = ma)",
              "तीसरा नियम (क्रिया-प्रतिक्रिया)",
              "सार्वत्रिक गुरुत्वाकर्षण का नियम"
            ],
            explanation: "जड़त्व के कारण यात्रियों का शरीर अपनी पूर्व गति को बनाए रखने का प्रयास करता है।"
          },
          malayalam: {
            question: "ബസ് പെട്ടെന്ന് ബ്രേക്ക് ചെയ്യുമ്പോൾ യാത്രക്കാർ മുന്നോട്ട് ആഞ്ഞ് വീഴാൻ കാരണം ഏത് നിയമമാണ്?",
            options: [
              "ഒന്നാം ചലന നിയമം (Inertia / ജഡത്വ നിയമം)",
              "രണ്ടാം ചലന നിയമം (F = ma)",
              "മൂന്നാം ചലന നിയമം (Action - Reaction)",
              "ഗുരുത്വാകർഷണ നിയമം"
            ],
            explanation: "ശരീരത്തിന്റെ ജഡത്വം കാരണം മുൻപോട്ട് ചലിക്കുന്നത് തുടരാൻ ശരീരം ശ്രമിക്കുന്നതാണ് ഇതിന് കാരണം."
          }
        },
        {
          id: 2,
          tag: "2nd Law: Dynamics",
          question: "According to Newton's Second Law (F = ma), if you double the net force applied to an object of fixed mass, what happens to its acceleration?",
          options: [
            "The acceleration doubles",
            "The acceleration is cut in half",
            "The acceleration drops to zero",
            "The acceleration quadruples exponentially"
          ],
          correctIndex: 0,
          explanation: "Because acceleration is directly proportional to net force (a = F/m), doubling the force doubles the acceleration.",
          encouragement: "Sharp mathematical reasoning! You mastered Newton's core equation.",
          hindi: {
            question: "न्यूटन के दूसरे नियम (F = ma) के अनुसार, यदि स्थिर द्रव्यमान वाली वस्तु पर बल दोगुना कर दिया जाए, तो उसके त्वरण पर क्या प्रभाव पड़ेगा?",
            options: [
              "त्वरण दोगुना हो जाएगा",
              "त्वरण घटकर आधा रह जाएगा",
              "त्वरण शून्य हो जाएगा",
              "त्वरण चार गुना हो जाएगा"
            ],
            explanation: "त्वरण बल के सीधे आनुपातिक (a = F/m) होता है, इसलिए बल दोगुना करने पर त्वरण भी दोगुना होगा।"
          },
          malayalam: {
            question: "രണ്ടാം ചലന നിയമം (F = ma) അനുസരിച്ച്, ഒരു വസ്തുവിൽ പ്രയോഗിക്കുന്ന ബലം ഇരട്ടിയാക്കിയാൽ അതിന്റെ ത്വരണത്തിന് എന്ത് സംഭവിക്കും?",
            options: [
              "ത്വരണം ഇരട്ടിയാകും",
              "ത്വരണം പകുതിയായി കുറയും",
              "ത്വരണം പൂജ്യമാകും",
              "ത്വരണം നാല് മടങ്ങായി വർദ്ധിക്കും"
            ],
            explanation: "ബലവും ത്വരണവും നേർ അനുപാതത്തിലായതിനാൽ (a = F/m) ബലം ഇരട്ടിയാകുമ്പോൾ ത്വരണവും ഇരട്ടിയാകും."
          }
        },
        {
          id: 3,
          tag: "3rd Law: Propulsion",
          question: "When a space rocket launches by firing high-velocity exhaust gas downward, which law explains why the rocket shoots upward?",
          options: [
            "The 3rd Law (Equal and opposite action-reaction)",
            "The 1st Law of Inertia alone",
            "Ohm's Electrical Law",
            "Archimedes' Buoyancy Principle"
          ],
          correctIndex: 0,
          explanation: "The rocket exerts a downward force on the hot expanding exhaust gas, which simultaneously exerts an equal and opposite upward thrust on the rocket.",
          encouragement: "Rocket-scientist level insight! Action and reaction propel exploration.",
          hindi: {
            question: "जब एक अंतरिक्ष रॉकेट गैसों को नीचे की ओर फेंककर ऊपर की ओर उड़ता है, तो यह किस नियम का उदाहरण है?",
            options: [
              "तीसरा नियम (समान और विपरीत क्रिया-प्रतिक्रिया)",
              "केवल जड़त्व का पहला नियम",
              "ओम का नियम",
              "आर्कमिडीज का सिद्धांत"
            ],
            explanation: "रॉकेट गैस पर नीचे की ओर बल लगाता है, और गैस रॉकेट पर ऊपर की ओर समान थ्रस्ट लगाती है।"
          },
          malayalam: {
            question: "റോക്കറ്റ് വിക്ഷേപിക്കുമ്പോൾ വാതകങ്ങൾ താഴേക്ക് ശക്തിയായി പുറന്തള്ളി മുകളിലേക്ക് കുതിക്കുന്നത് ഏത് നിയമത്തിന് ഉദാഹരണമാണ്?",
            options: [
              "മൂന്നാം ചലന നിയമം (തുല്യവും വിപരീതവുമായ പ്രതിപ്രവർത്തനം)",
              "ഒന്നാം ചലന നിയമം മാത്രം",
              "ഓമിന്റെ നിയമം",
              "ആർക്കിമിഡീസ് തത്വം"
            ],
            explanation: "വാതകം താഴേക്ക് തള്ളുന്ന അതേ ശക്തിയോടെ വാതകങ്ങൾ റോക്കറ്റിനെ മുകളിലേക്ക് തള്ളുന്നു (Action-Reaction)."
          }
        },
        {
          id: 4,
          tag: "Zero-Friction Thought Experiment",
          question: "In deep space, completely away from gravity and friction, what happens if you gently toss a wrench?",
          options: [
            "It will coast forward at constant velocity in a straight line forever until another force touches it",
            "It will immediately halt after traveling 10 meters due to lack of air",
            "It will accelerate faster and faster spontaneously",
            "It will curve back toward your hand automatically"
          ],
          correctIndex: 0,
          explanation: "In the absence of external forces like gravity or friction, Newton's First Law ensures an object maintains its velocity indefinitely.",
          encouragement: "Flawless physics deduction! You see how natural laws behave in pure environments.",
          hindi: {
            question: "गहरे अंतरिक्ष में, जहां कोई घर्षण या गुरुत्वाकर्षण नहीं है, यदि आप किसी रिंच को फेंकते हैं तो क्या होगा?",
            options: [
              "यह किसी अन्य बल के संपर्क में आने तक हमेशा एक सीधी रेखा में समान गति से चलता रहेगा",
              "हवा की कमी के कारण 10 मीटर जाकर तुरंत रुक जाएगा",
              "यह अपने आप लगातार तेज होता जाएगा",
              "यह अपने आप आपके हाथ में वापस आ जाएगा"
            ],
            explanation: "बाहरी बल न होने पर जड़त्व के प्रथम नियम के कारण वस्तु अपनी गति हमेशा बनाए रखती है।"
          },
          malayalam: {
            question: "ഗുരുത്വാകർഷണമോ ഘർഷണമോ ഇല്ലാത്ത ബഹിരാകാശത്ത് വെച്ച് ഒരു വസ്തു എറിഞ്ഞാൽ എന്ത് സംഭവിക്കും?",
            options: [
              "മറ്റൊരു ബലം തടസ്സപ്പെടുത്തുന്നത് വരെ അത് ഒരേ വേഗതയിൽ നേർരേഖയിൽ സഞ്ചരിച്ചുകൊണ്ടേയിരിക്കും",
              "വായുവില്ലാത്തതിനാൽ കുറച്ചുദൂരം ചെന്ന് പെട്ടെന്ന് നിൽക്കും",
              "അതിന്റെ വേഗത തനിയെ കൂടിക്കൊണ്ടേയിരിക്കും",
              "അത് തനിയെ വളഞ്ഞ് തിരികെ വരും"
            ],
            explanation: "ബാഹ്യബലങ്ങൾ ഇല്ലാത്തതിനാൽ ഒന്നാം ചലന നിയമപ്രകാരം വസ്തുക്കൾ സ്ഥിരവേഗതയിൽ എന്നേക്കുമായി സഞ്ചരിക്കുന്നു."
          }
        }
      ]
    }
  },
  {
    id: 'dna_replication',
    title: 'DNA Replication & Synthesis',
    hindiTitle: 'डीएनए प्रतिकृति और संश्लेषण (DNA Replication)',
    malayalamTitle: 'ഡിഎൻഎ തനിപ്പകർപ്പ് നിർമ്മാണം (DNA Replication)',
    subject: 'Molecular Biology & Genetics',
    emoji: '🧬',
    sourceText: "DNA replication is the biological mechanism by which a cell duplicates its genome prior to cellular division. The double-helix structure is initially unwound and separated into single template strands by the enzyme DNA Helicase, creating a replication fork. DNA Polymerase then synthesizes complementary daughter strands by matching adenine with thymine and guanine with cytosine according to Chargaff's base-pairing rules. Because one strand (the leading strand) is formed continuously while the lagging strand is assembled in fragmented Okazaki pieces before being joined by DNA Ligase, the overall process is semi-conservative.",
    hindiSourceText: "डीएनए प्रतिकृति (Replication) वह जैविक प्रक्रिया है जिसके द्वारा एक कोशिका विभाजन से पहले अपने जीनोम की प्रतिलिपि बनाती है। डीएनए हेलीकेस (Helicase) एंजाइम द्वारा डबल-हेलिक्स को खोला और अलग किया जाता है। इसके बाद डीएनए पॉलीमरेज़ (Polymerase) चार्गाफ के बेस-पेयरिंग नियमों के अनुसार एडेनिन को थायमिन (A-T) और ग्वानिन को साइटोसिन (G-C) के साथ जोड़कर नई स्ट्रैंड्स बनाता है। चूंकि एक स्ट्रैंड लगातार बनती है और दूसरी स्ट्रैंड ओकाज़ाकी टुकड़ों में बनती है जिन्हें डीएनए लिगेज जोड़ता है, इसलिए इस प्रक्रिया को सेमी-कंजर्वेटिव कहा जाता है।",
    malayalamSourceText: "കോശവിഭജനത്തിന് മുൻപായി ജീനുകളുടെ തനിപ്പകർപ്പ് ഉണ്ടാക്കുന്ന പ്രക്രിയയാണ് DNA Replication. DNA Helicase എന്ന എൻസൈം ഇരട്ടപ്പിരിവുള്ള ഡിഎൻഎയെ ഒരു സിപ്പ് പോലെ തുറക്കുന്നു. തുടർന്ന് DNA Polymerase എന്ന എൻസൈം Adenine-നെ Thymine-നുമായും (A-T), Guanine-നെ Cytosine-നുമായും (G-C) കൃത്യമായി സംയോജിപ്പിച്ച് പുതിയ സ്ട്രാൻഡുകൾ നിർമ്മിക്കുന്നു. ഒകാസാക്കി ശകലങ്ങളെ DNA Ligase എന്ന എൻസൈം ഒട്ടിച്ചുചേർക്കുന്നു. പുതിയ ഡിഎൻഎയിൽ ഒരു പഴയ ഇഴയും ഒരു പുതിയ ഇഴയും അടങ്ങിയിരിക്കുന്നതിനാൽ ഇതിനെ Semi-Conservative എന്ന് വിളിക്കുന്നു.",
    fallbackData: {
      chunkCards: [
        {
          title: "Unzipping the Double Helix",
          text: "The enzyme Helicase unzips the coiled double helix like a zipper, separating base pairs into two single template strands.",
          hindiTitle: "डबल हेलिक्स को खोलना (Helicase)",
          hindiText: "हेलीकेस एंजाइम एक ज़िप की तरह घुमावदार डीएनए को खोलता है, जिससे दो सिंगल टेम्पलेट स्ट्रैंड अलग हो जाती हैं।",
          malayalamTitle: "ഇരട്ടപ്പിരിവ് തുറക്കൽ (Helicase)",
          malayalamText: "ഹെലികേസ് എൻസൈം ഒരു സിപ്പ് പോലെ പ്രവർത്തിച്ച് ഡിഎൻഎയുടെ ഇരട്ടപ്പിരിവിനെ വേർതിരിക്കുന്നു."
        },
        {
          title: "Complementary Base Matching",
          text: "DNA Polymerase glides along each strand, strictly bonding Adenine with Thymine (A-T) and Cytosine with Guanine (C-G).",
          hindiTitle: "पूरक बेस जोड़ना (A-T और G-C)",
          hindiText: "डीएनए पॉलीमरेज़ प्रत्येक स्ट्रैंड पर आगे बढ़ता है और एडेनिन को थायमिन (A-T) तथा साइटोसिन को ग्वानिन (G-C) से जोड़ता है।",
          malayalamTitle: "കൃത്യമായ ജോടികൾ ചേർക്കൽ",
          malayalamText: "DNA Polymerase എൻസൈം ഓരോ ഇഴയിലൂടെയും സഞ്ചരിച്ച് A-T, G-C എന്നീ ക്രമത്തിൽ പുതിയ ജോടികളെ നിർമ്മിക്കുന്നു."
        },
        {
          title: "Semi-Conservative Final Copies",
          text: "DNA Ligase seals the fragments, producing two identical DNA helices, each holding one original strand and one brand-new strand.",
          hindiTitle: "सेमी-कंजर्वेटिव प्रतियां (DNA Ligase)",
          hindiText: "डीएनए लिगेज टुकड़ों को सील करता है, जिससे दो समान डीएनए बनते हैं, जिनमें से प्रत्येक में एक मूल स्ट्रैंड और एक नई स्ट्रैंड होती है।",
          malayalamTitle: "സെമി-കൺസർവേറ്റീവ് പകർപ്പുകൾ",
          malayalamText: "ലിഗേസ് എൻസൈം കഷ്ണങ്ങളെ യോജിപ്പിച്ച് രണ്ട് സമാന ഡിഎൻഎ ഉണ്ടാക്കുന്നു; ഇതിൽ ഓരോന്നിലും ഒരു പഴയ ഇഴയും ഒരു പുതിയ ഇഴയും ഉണ്ടായിരിക്കും."
        }
      ],
      conceptTree: [
        "Step 1: Helicase unwinds and unzips the DNA double-helix at the replication fork.",
        "Step 2: DNA Polymerase adds matching complementary nucleotides (A-T and C-G).",
        "Step 3: DNA Ligase joins Okazaki fragments, producing two identical genetic blueprints."
      ],
      hindiConceptTree: [
        "चरण 1: हेलीकेस (Helicase) रेप्लिकेशन फोर्क पर डीएनए डबल-हेलिक्स को खोलता है।",
        "चरण 2: डीएनए पॉलीमरेज़ (Polymerase) पूरक न्यूक्लियोटाइड (A-T और G-C) जोड़ता है।",
        "चरण 3: डीएनए लिगेज (Ligase) टुकड़ों को जोड़कर दो समान आनुवंशिक प्रतियां बनाता है।"
      ],
      malayalamConceptTree: [
        "ഘട്ടം 1: ഹെലികേസ് എൻസൈം ഡിഎൻഎയുടെ ഇരട്ടപ്പിരിവുകളെ തുറക്കുന്നു.",
        "ഘട്ടം 2: ഡിഎൻഎ പോളിമറൈസ് കൃത്യമായ complementary bases (A-T, G-C) ചേർക്കുന്നു.",
        "ഘട്ടം 3: ലിഗേസ് എൻസൈം കഷ്ണങ്ങൾ യോജിപ്പിച്ച് രണ്ട് ഡിഎൻഎ തന്മാത്രകൾ പൂർത്തിയാക്കുന്നു."
      ],
      analogy: "Imagine a double-sided master architectural blueprint locked with a zipper. An assistant unzips it down the middle, and two master draftsmen simultaneously trace matching halves on new paper, giving you two identical blueprints with zero missing pages.",
      hindiAnalogy: "ज़िप से जुड़े दो तरफा मास्टर ब्लूप्रिंट की कल्पना करें। एक सहायक ज़िप को बीच से खोलता है, और दो ड्राफ्ट्समैन दोनों अलग-अलग हिस्सों को देखकर नए कागज़ पर उनका पूरक भाग बनाते हैं। अंत में आपके पास बिल्कुल सटीक दो ब्लूप्रिंट तैयार हो जाते हैं।",
      malayalamAnalogy: "സിപ്പുകൊണ്ട് കൂട്ടിച്ചേർത്ത ഒരു വലിയ പ്ലാൻ സങ്കൽപ്പിക്കുക. ഒരാൾ നടുവിലെ സിപ്പ് തുറക്കുമ്പോൾ, രണ്ട് വിദഗ്ദ്ധർ ഒരേസമയം ഓരോ പകുതി നോക്കി അതേപോലെ പുതിയ പേപ്പറിൽ വരച്ച് ചേർക്കുന്നു. ഒടുവിൽ തെറ്റുകളൊന്നുമില്ലാത്ത രണ്ട് സമാന പ്ലാനുകൾ ലഭിക്കുന്നു.",
      malayalam: "Cell division-ന് മുൻപായി ജീനുകൾ പകർത്തുന്ന പ്രക്രിയയാണ് DNA Replication. Helicase ഇരട്ട പിരിവുകളെ വേർതിരിക്കുകയും, DNA Polymerase കൃത്യമായ Base pairing (A-T, G-C) വഴി പുതിയ സ്ട്രാൻഡ് നിർമ്മിക്കുകയും ചെയ്യുന്നു.",
      hindi: "DNA Replication में कोशिका विभाजन से पहले जीनोम की कॉपी बनती है। Helicase एंजाइम दोनों स्ट्रैंड्स को अलग करता है और DNA Polymerase बेस पेयरिंग (A-T, G-C) के साथ नई स्ट्रैंड का निर्माण करता है।",
      microQuiz: [
        {
          id: 1,
          tag: "Unzipping Enzyme",
          question: "Which enzyme acts as the molecular wedge that unwinds and separates the DNA double helix strands?",
          options: [
            "DNA Helicase",
            "DNA Polymerase",
            "Salivary Amylase",
            "RNA Primase"
          ],
          correctIndex: 0,
          explanation: "DNA Helicase breaks the hydrogen bonds between complementary base pairs, unzipping the double helix into single strands.",
          encouragement: "Spot on! You nailed the master unzipping enzyme of molecular genetics.",
          hindi: {
            question: "डीएनए डबल हेलिक्स के स्ट्रैंड्स को खोलने और अलग करने वाले एंजाइम का क्या नाम है?",
            options: [
              "डीएनए हेलीकेस (DNA Helicase)",
              "डीएनए पॉलीमरेज़ (DNA Polymerase)",
              "एमाइलेज (Amylase)",
              "आरएनए प्राइमेज़"
            ],
            explanation: "हेलीकेस एंजाइम हाइड्रोजन बॉन्ड को तोड़कर डीएनए की दोनों लड़ियों को अलग करता है।"
          },
          malayalam: {
            question: "DNA-യുടെ ഇരട്ടപ്പിരിവുകളെ വേർതിരിക്കുന്ന പ്രധാന എൻസൈം ഏതാണ്?",
            options: [
              "DNA Helicase",
              "DNA Polymerase",
              "Amylase",
              "Lipase"
            ],
            explanation: "ഹെലികേസ് എൻസൈം ബേസ് ജോഡികൾക്കിടയിലുള്ള ഹൈഡ്രജൻ ബോണ്ടുകൾ തകർത്ത് ഇരട്ടപ്പിരിവ് തുറക്കുന്നു."
          }
        },
        {
          id: 2,
          tag: "Base-Pairing Rules",
          question: "According to Chargaff's strict base-pairing rules, which nitrogenous base pairs with Adenine (A)?",
          options: [
            "Thymine (T)",
            "Cytosine (C)",
            "Guanine (G)",
            "Uracil (U in standard DNA)"
          ],
          correctIndex: 0,
          explanation: "Adenine always forms two hydrogen bonds with Thymine (A-T) in DNA, while Guanine pairs with Cytosine (G-C).",
          encouragement: "Perfect memory! Chargaff's rules form the chemical code of genetic inheritance.",
          hindi: {
            question: "चार्गाफ के बेस-पेयरिंग नियमों के अनुसार, एडेनिन (A) हमेशा किसके साथ जुड़ता है?",
            options: [
              "थायमिन (Thymine - T)",
              "साइटोसिन (Cytosine - C)",
              "ग्वानिन (Guanine - G)",
              "यूरासिल (Uracil)"
            ],
            explanation: "डीएनए में एडेनिन हमेशा थायमिन (A-T) के साथ दो हाइड्रोजन बंध बनाता है।"
          },
          malayalam: {
            question: "ചാർഗാഫിന്റെ നിയമപ്രകാരം Adenine (A) ഏത് നൈട്രജൻ ബേസുമായാണ് സംയോജിക്കുന്നത്?",
            options: [
              "Thymine (T)",
              "Cytosine (C)",
              "Guanine (G)",
              "Uracil (U)"
            ],
            explanation: "ഡിഎൻഎയിൽ എപ്പോഴും Adenine, Thymine-മായിട്ടാണ് (A-T) രണ്ട് ഹൈഡ്രജൻ ബോണ്ടുകൾ വഴി ചേരുന്നത്."
          }
        },
        {
          id: 3,
          tag: "Semi-Conservative Nature",
          question: "Why is DNA replication scientifically classified as a 'Semi-Conservative' process?",
          options: [
            "Each new double helix retains one original parent strand and one newly synthesized daughter strand",
            "Half of the genetic sequence is permanently discarded during replication",
            "It requires only 50% of the cell's standard ATP energy",
            "Only half of the organism's chromosomes ever duplicate"
          ],
          correctIndex: 0,
          explanation: "Semi-conservative means each newly created DNA helix conserves exactly one intact original parent template strand alongside one brand new strand.",
          encouragement: "Stellar conceptual mastery! You grasp the elegance of genetic conservation.",
          hindi: {
            question: "डीएनए प्रतिकृति को 'सेमी-कंजर्वेटिव' (Semi-Conservative) क्यों कहा जाता है?",
            options: [
              "प्रत्येक नए डीएनए में एक मूल (पुरानी) स्ट्रैंड और एक नई बनी स्ट्रैंड होती है",
              "प्रतिकृति के दौरान आधा जेनेटिक डेटा हमेशा नष्ट हो जाता है",
              "इसमें केवल 50% एटीपी ऊर्जा खर्च होती है",
              "कोशिका के केवल आधे गुणसूत्र ही कॉपी होते हैं"
            ],
            explanation: "प्रत्येक नए हेलिक्स में एक पुरानी मूल टेम्पलेट लड़ी और एक नई लड़ी होती है, इसलिए इसे सेमी-कंजर्वेटिव कहते हैं।"
          },
          malayalam: {
            question: "ഡിഎൻഎ നിർമ്മാണത്തെ 'Semi-Conservative' എന്ന് വിളിക്കുന്നത് എന്തുകൊണ്ട്?",
            options: [
              "ഓരോ പുതിയ ഡിഎൻഎ തന്മാത്രയിലും ഒരു പഴയ ഇഴയും ഒരു പുതിയ ഇഴയും അടങ്ങിയിരിക്കുന്നു",
              "പകുതി ജീനുകൾ നഷ്ടപ്പെടുന്നതുകൊണ്ട്",
              "പകുതി എനർജി മാത്രമേ ഇതിന് ആവശ്യമുള്ളൂ എന്നതുകൊണ്ട്",
              "പകുതി ക്രോമസോമുകൾ മാത്രമേ പകർക്കപ്പെടൂ എന്നതുകൊണ്ട്"
            ],
            explanation: "ഒരു പഴയ ഇഴ സംരക്ഷിക്കപ്പെടുകയും അതിനൊപ്പം ഒരു പുതിയ ഇഴ ഉണ്ടാകുകയും ചെയ്യുന്നതിനാലാണ് Semi-Conservative എന്ന് പറയുന്നത്."
          }
        },
        {
          id: 4,
          tag: "Molecular Glue",
          question: "Which essential enzyme seals and glues together the Okazaki fragments on the discontinuous lagging strand?",
          options: [
            "DNA Ligase",
            "DNA Polymerase I",
            "Topoisomerase",
            "Amylase"
          ],
          correctIndex: 0,
          explanation: "DNA Ligase functions as the molecular glue, synthesizing phosphodiester bonds to join disjointed Okazaki fragments into a continuous strand.",
          encouragement: "Incredible genetic biochemist thinking! You know how DNA reaches structural perfection.",
          hindi: {
            question: "लैगिंग स्ट्रैंड पर ओकाज़ाकी टुकड़ों को जोड़ने वाले 'मॉलिक्यूलर गोंद' एंजाइम का नाम क्या है?",
            options: [
              "डीएनए लिगेज (DNA Ligase)",
              "डीएनए पॉलीमरेज़ (Polymerase)",
              "टोपोइज़ोमेरेज़",
              "पेप्सिन"
            ],
            explanation: "डीएनए लिगेज एंजाइम रासायनिक बंध बनाकर ओकाज़ाकी टुकड़ों को एक पूर्ण लड़ी में जोड़ता है।"
          },
          malayalam: {
            question: "ലാഗിംഗ് സ്ട്രാൻഡിലെ ഒകാസാക്കി കഷ്ണങ്ങളെ ഒന്നിച്ച് ഒട്ടിച്ചുചേർക്കുന്ന 'മോളിക്യുലാർ ഗ്ലൂ' ഏത് എൻസൈമാണ്?",
            options: [
              "DNA Ligase",
              "DNA Polymerase",
              "Topoisomerase",
              "Amylase"
            ],
            explanation: "ലിഗേസ് എൻസൈം കഷ്ണങ്ങൾക്കിടയിൽ ബോണ്ടുകൾ ഉണ്ടാക്കി അവയെ ഒറ്റ സ്ട്രാൻഡ് ആയി ഒട്ടിക്കുന്നു."
          }
        }
      ]
    }
  }
];
