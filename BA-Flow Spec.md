**Technical Specification Document**

**Project Name:** BA-Flow

**Objective:**\
Develop a Nuxt 3 application that allows junior Business Analysts to simulate stakeholder interviews by asking questions to an AI-powered client (powered by Gemini API) and receive feedback on the quality and structure of their questioning.

---

**1. Features (MVP Scope)**

### **1.1 Scenario Generation**

- When the user starts a new session, the AI dynamically generates a scenario prompt

- Generated scenario includes:

  - Title or project theme
  - Stakeholder role (e.g., Product Owner, Operations Manager)
  - Business background

- The scenario is presented at the beginning of the interview and stored in session state

- Prompt Example - “You are an AI assistant designed to help train junior Business Analysts in tech companies. Generate a business analysis scenario that includes:

  - A stakeholder role (e.g., Marketing Director, Product Manager)
  - A brief company background
  - A clear business goal or problem
  - Key constraints or requirements.
  - Use simple English and not much jargon The output should be under 300 words and written in a professional, business-like tone.”

### **1.2 Interview Simulation**

- Text input for users to ask questions fixed to the bottom of the screen
- AI client (Gemini API) responds in role
- Display a chat log with Q&A between user and AI
- Store each Q&A pair in session state
- Prompt Example - “Respond in character as the stakeholder described in the scenario. Give clear, informative answers based on your fictional role, and answer only what the user asks. Keep answers concise and simple to understand unless the question is open-ended.”

### **1.3 Feedback Report (Post-interview)**

- On "End Conversation", generate a feedback report:
  - Score for clarity, relevance, depth, coverage, and structure
  - Suggestions for improvement
  - Highlight missed question types (e.g., non-functional, constraints)
  - Prompt Example - “You are a senior Business Analyst mentor. You will review the conversation between a junior BA and a stakeholder. Provide constructive feedback based on the BA's questions.”

### **1.4 Session Persistence (In-Memory)**

- Use Pinia to store:
  - Generated scenario
  - Q&A history
  - Evaluation results

---

**2. Tech Stack**

### **2.1 Frontend**

- Nuxt 3
- Tailwind CSS
- Pinia (state management)

### **2.2 AI Integration**

- Gemini API via `@google/generative-ai`
- Chat-style interaction using **free-tier model only**
- Configurable temperature and prompt style

### **2.3 Documentation links**

- Nuxt 3 - https://nuxt.com/docs/getting-started/introduction
- TailwindCSS - https://tailwindcss.com/docs/installation/using-vite
- Pinia - https://pinia.vuejs.org/core-concepts/
- Gemini API - https://ai.google.dev/gemini-api/docs

---

**3. Environment Configuration**

- `.env` file with:

```
GEMINI_API_KEY=your-google-api-key
```

- `nuxt.config.ts` includes:

```ts
runtimeConfig: {
  public: {
    geminiApiKey: process.env.GEMINI_API_KEY;
  }
}
```

---

**4. Development Only**

- The application will only run locally in a development environment.
- No deployment to production or external hosting is planned.
- Intended for personal use, demonstration, or local training only.

---

**5. Evaluation Logic (Basic Example)**

- Analyze each user question for:

  - Open-endedness
  - Business/functional coverage
  - Use of probing/follow-ups

- Score each criterion from 1–10

- Return improvement suggestions based on patterns

---

**6. Mock UI**
![alt text](<landing page.jpg>) ![alt text](<Interview page.jpg>)

---
