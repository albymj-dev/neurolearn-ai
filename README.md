# 🧠✨ NeuroLearn AI

### An Assistive, Neuro-Inclusive Academic Workspace for Dyslexia, ADHD, and Sensory Processing Differences

**NeuroLearn AI** transforms monolithic, overwhelming academic literature and technical documentation into modular, low-cognitive-load learning formats in real time. Powered by Google Gemini and built on a high-performance React 19 stack, it bridges the gap between traditional learning materials and neurodivergent cognition.

---

## 🎯 The Problem

Standard academic resources present critical cognitive barriers for neurodivergent learners:

- **👁️ Visual Crowding & Glyph Inversion:** Standard serif and sans-serif fonts can contribute to letter confusion and tracking difficulties for some dyslexic readers.
- **🧠 Executive Dysfunction & Cognitive Fatigue:** Monolithic walls of text can cause sensory overload and increase working-memory demands for students with ADHD.
- **🎨 Scotopic Sensitivity (Irlen Syndrome):** High-contrast black text on bright white displays may contribute to visual stress and discomfort for some readers.
- **🌐 Linguistic Barriers:** Complex abstract concepts presented in non-native English can compound cognitive load for regional learners.

## 💡 The Solution

NeuroLearn AI introduces a **real-time, dual-pane cognitive workspace**. Learners input dense study materials and receive personalized, multisensory breakdowns powered by structured AI outputs and customizable visual accommodations.

## 🚀 Key Assistive Features

### 👁️ Visual & Ergonomic Reading Aids

- **OpenDyslexic Typography:** An embedded, weighted-baseline font designed to support glyph differentiation and reading comfort.
- **Bionic Reading Mode:** Dynamically highlights fixation points within words to help guide visual attention while reading.
- **ADHD Focus Ruler:** A cursor-synchronized focus bar that isolates the active line while dimming peripheral distractions.
- **Sensory Tint Overlays:** Five customizable palettes designed to help reduce glare and visual discomfort:
  - Cream Paper
  - Warm Peach
  - Mint Calming
  - Sky Focus
  - Lavender Soft
- **Adaptive Type Controls:** Dynamic text scaling from `14px` to `26px`, paired with three line-spacing options:
  - Compact
  - Relaxed
  - Expanded

### 🧩 Cognitive Decomposition — Powered by Gemini AI

- **Atomic Concept Chunking:** Breaks lengthy explanations into manageable cards with bolded semantic anchors.
- **Hierarchical Concept Trees:** Converts abstract prose into logical, sequential cause-and-effect pathways.
- **Real-World Analogies:** Translates dense theoretical concepts into relatable, everyday examples.
- **Regional Bilingual Bridge:** Generates contextual explanations and terminology bridges in Malayalam and Hindi.
- **Low-Stakes Micro-Quizzes:** Provides two-question knowledge checks to reinforce understanding without unnecessary academic pressure.

### 🎧 Audio & Export

- **Karaoke Text-to-Speech (TTS):** Integrates Web Speech synthesis with synchronized word-by-word visual tracking and variable playback speeds from `0.75×` to `1.5×`.
- **Dyslexia-Friendly PDF Export:** Generates clean, high-contrast, print-ready study sheets from summarized learning materials.

## 🛠️ Architecture & Tech Stack

| Component | Technology |
|---|---|
| Frontend | React 19, TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Motion |
| Icons | Lucide Icons |
| Backend | Express.js (`server.ts`) |
| AI Engine | Google GenAI SDK (`@google/genai`) |
| AI Models | Google Gemini |
| Output Validation | Structured JSON schemas |
| Resilience | Heuristic offline fallback generator |

### 🏗️ Architecture Overview

1. **Input:** The learner submits academic notes, technical documentation, or other dense text.
2. **Processing:** The backend securely proxies AI requests to Google Gemini.
3. **Decomposition:** The AI transforms the source material into structured learning components.
4. **Personalization:** The workspace applies the learner's preferred typography, spacing, focus aids, and sensory tints.
5. **Learning:** The learner explores concept cards, concept trees, analogies, bilingual explanations, and micro-quizzes.
6. **Output:** The learner can listen to the content and export accessible study sheets as PDFs.

## ⚡ Getting Started

### 📋 Prerequisites

Ensure the following tools and credentials are available:

- [Node.js](https://nodejs.org/) — Version `18.0.0` or later, subject to project dependency requirements.
- npm or pnpm
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### 📥 Installation

**1. Clone the repository**

```bash
git clone https://github.com/albymj-dev/neurolearn-ai.git
cd neurolearn-ai
```

**2. Install dependencies**

Using npm:

```bash
npm install
```

Or, using pnpm:

```bash
pnpm install
```

**3. Configure environment variables**

Create a `.env` file in the project root directory and add the following:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

Replace `your_gemini_api_key_here` with your actual API key.

**Important:** Never commit your `.env` file or expose your API key in frontend code. Add `.env` to `.gitignore` and keep API requests on the server.

**4. Launch the development server**

```bash
npm run dev
```

Or, if using pnpm:

```bash
pnpm dev
```

**5. Open the application**

Navigate to:

[http://localhost:3000](http://localhost:3000)

> **Note:** The actual port and startup command depend on the project's Vite and Express configuration. If the server uses a different port, follow the URL printed in the terminal.

## 🛡️ Accessibility & Inclusivity

NeuroLearn AI is designed around inclusive learning and accessibility best practices:

- **Customizable reading experience:** Font selection, text scaling, line spacing, and sensory tint options.
- **Keyboard accessibility:** Keyboard navigation support for interactive components, including the Focus Ruler and audio player.
- **Reduced motion:** Respects the system-level `prefers-reduced-motion` setting.
- **Flexible content presentation:** Converts dense material into smaller, structured learning units.
- **Multilingual scaffolding:** Supports explanations in Malayalam and Hindi to help learners understand complex concepts.

The project aims to align with **WCAG 2.1 accessibility principles**. Full WCAG 2.1 AA or AAA compliance should be confirmed through systematic accessibility testing, including contrast measurements, keyboard testing, and assistive-technology evaluation.

> **Accessibility note:** Features such as specialized fonts, Bionic Reading, and sensory tint overlays can help some learners but do not work equally well for everyone. NeuroLearn AI provides customization rather than assuming a single solution fits all.

## 🔮 Vision

Our vision is to make learning materials more adaptable, accessible, and inclusive by giving learners greater control over how they read, process, understand, and revise information.

**Learn at your pace. Understand in your way.**

## 📄 License

This project is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

---

<p align="center">
  <strong>🧠 NeuroLearn AI — Making Knowledge More Accessible, One Concept at a Time.</strong>
</p>
