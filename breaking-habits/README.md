# 🌱 Mindful Space Framework

An AI-powered dynamic lifestyle restoration companion built for the Google for Developers **PromptWars** Hackathon[cite: 436]. This application dynamically aids members in managing routine disruptions, high-friction habits (such as excessive screen time, digital procrastination, or sugar impulses), and structural behavioral cues using an advanced client-server context architecture[cite: 1, 436, 438].

---

## 🚀 1. Live Deployment & Testing Credentials
* **Public GitHub Repository:** [https://github.com/sudo-jeni-sh/h2s-breaking-habits](https://github.com/sudo-jeni-sh/h2s-breaking-habits) [cite: 419]
* **Live Operational Web Application:** https://h2s-breaking-habits.onrender.com [cite: 416]

### 🔑 Zero-Friction Evaluator Flow (No Registration Blockers)
To respect the judges' time and maximize accessibility scores, this application utilizes a zero-friction local onboarding mechanism[cite: 216, 417]:
* **No sign-up forms, external email authentication networks, or active verification walls are forced upon the evaluator[cite: 88, 115].**
* Evaluators can immediately open the live deployment link in an incognito browser window, input any custom lifestyle goal dynamically, and test the full platform interaction flow instantly[cite: 49, 114, 115, 417].

---

## ⚙️ 2. Tech Stack & GenAI Services Used

* **Core Framework:** Next.js (TypeScript) — leveraging Route Segment Configurations, strict schema formatting models, and atomic components[cite: 10, 26, 91, 319].
* **GenAI Infrastructure:** Mistral AI (`@mistralai/mistralai` SDK) using `mistral-large-latest` hosted inside a secure server-side API route handler[cite: 173, 175, 176].
* **Client Memory Layer:** Browser `localStorage` arrays acting as a zero-latency dynamic state layer to maintain log configurations[cite: 77, 78, 104, 128].
* **Styling & Theme:** Tailwind CSS customized with a soft, calming cream palette (`bg-stone-50`) to minimize cognitive load[cite: 245, 246, 248].
* **Visual Metadata:** Inline SVG Favicon embedding the sprout emoji (`🌱`) inside the metadata layer to reduce asset dependencies[cite: 327, 331].

---

## 🔄 3. End-to-End Application Flow Architecture

The platform functions as a closed-loop data pipeline connecting real-time telemetry tracking with adaptive AI dialogue panels[cite: 227]:

1. **Intake Onboarding:** The member registers their name and custom focus habit goal[cite: 67]. The UI framework triggers an automated server-side request payload to seed a personalized introduction from a randomly selected professional persona (e.g., *Dr. Aris Thorne*)[cite: 215, 220, 271].
2. **Telemetry Friction Logging:** When experiencing an impulse, the member notes down immediate environmental triggers and logs the urge intensity using a descriptive semantic text scale[cite: 107, 193, 194, 230].
3. **Programmatic Data Synchronization:** The client packages the complete conversation history array alongside the logged friction variables from browser storage and transmits the aggregate bundle down to `/api/coach`[cite: 110, 231, 232].
4. **Intelligent Action Target Injection:** The backend agent reads the active log timeline[cite: 233]. If a concrete habit adjustment strategy is generated, it appends a structural formatting tag: `[Action: Task Text | Time Slot]`[cite: 293, 294].
5. **Regex Extraction Engine:** The frontend runtime automatically parses out the custom bracket tokens, strips them from the visible chat dialogue bubble to protect layout readability, and pushes the item directly into the **Interval Action Planner** dashboard column[cite: 293, 295, 299].

---

## 🛠️ 4. Advanced Clinical & Contextual Cases Handled

* **Stigma-Free Reframing:** Replaces terms like "patient" and "addict" with supportive language ("Member", "Routine Event", "Impulse Strength") to optimize behavioral psychology outcomes[cite: 303, 304, 452].
* **Time-of-Day Telemetry Context:** Next.js automatically maps the local time window[cite: 267]. If logs are registered during the *Night Vulnerability Window*, the AI automatically shifts strategy to target evening triggers (such as late-night blue-light exposure or revenge bedtime procrastination)[cite: 268, 441].
* **Plain-English Constraint Guardrails:** The system instructions strip out complex clinical jargon or heavy medical vocabulary, returning clear, conversational guidance restricted to 3-4 sentences maximum[cite: 241, 281, 450].
* **Zero Mock Text Compliance:** Every item displayed within the interface terminal is completely dynamic[cite: 77, 78]. There are **zero hardcoded chat histories or static placeholders**[cite: 47, 112, 454].

---

## 📦 5. Code Quality & Folder Layout Checklist

The codebase is organized according to strict atomic structures, avoiding monolithic single-file debt[cite: 313, 315, 442]:

```text
app/
├── api/
│   └── coach/
│       └── route.ts         # Secure server-side Mistral AI API gateway
├── components/
│   ├── ActionPlanner.tsx    # Day planner micro-action column widget
│   ├── FrictionTracker.tsx   # Environmental trigger tracking panel
│   └── Testimonials.tsx     # Dynamic success insight card renderer
├── types/
│   └── index.ts             # Strong TypeScript schema layout definitions
├── layout.tsx               # Shell metadata config (🌱 Icon implementation)
└── page.tsx                 # Core application state orchestration loop
```

---
## 🏃‍♂️ 6. Local Setup & Execution Instructions

Follow these exact steps to clone, configure, build, and execute the repository environment locally on your machine:

# 6.1 Clone the GitHub Repository
Open your local system terminal window and pull down the remote branch source code repository into your active target work directory:

``` Bash
git clone [https://github.com/sudo-jeni-sh/h2s-breaking-habits.git](https://github.com/sudo-jeni-sh/h2s-breaking-habits.git)
cd h2s-breaking-habits
```

# 6.2 Install Project Dependencies
Execute the node package manager installation pipeline to safely fetch and register all production libraries configured within the runtime project structure:

``` Bash
npm install
6.3 Configure Local Secret Environment Tokens
Create a hidden local system environment definition file named exactly .env.local inside the root folder directory of the workspace:

touch .env.local
Open the newly generated .env.local configuration file inside your code editor and supply your live API token value:

MISTRAL_API_KEY=your_actual_mistral_api_key_token_here
```

(Note: This parameters file is explicitly registered inside your system .gitignore array to fully safeguard your private API keys from ever leaking out onto public repository branches).

# 6.4 Execute the Local Development Server
Launch the active local preview container runtime engine directly within your target environment directory:

```Bash 
npm run dev
```

# 6.5 Verify and Test in the Web Browser
Once the active system console logs confirm successful route compilation, open your internet web browser and navigate directly to the following local domain interface:


Local Test Link: http://localhost:3000