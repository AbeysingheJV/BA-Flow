# BA-Flow

A Nuxt 3 application that allows junior Business Analysts to simulate stakeholder interviews by asking questions to an AI-powered client and receive feedback on the quality and structure of their questioning.

## Features

- **Scenario Generation**: AI generates realistic business analysis scenarios
- **Interview Simulation**: Interactive chat interface with AI stakeholder responses
- **Feedback Report**: Post-interview evaluation with scores and improvement suggestions
- **Session Management**: In-memory session persistence using Pinia

## Tech Stack

- **Nuxt 3** - Full-stack Vue.js framework
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management for Vue
- **Gemini API** - AI-powered interactions

## Setup

### Prerequisites

- Node.js 18+
- Google Gemini API key

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory and add your Gemini API key:

```bash
GEMINI_API_KEY=your-google-api-key
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. **Landing Page**: Click "Start New Interview Session" to begin
2. **Scenario Page**: Review the AI-generated business scenario
3. **Interview Page**: Ask questions to the AI stakeholder and build conversation
4. **Feedback Page**: View performance analysis with scores and suggestions

## Project Structure

```
├── pages/
│   ├── index.vue          # Landing page
│   ├── scenario.vue       # Generated scenario display
│   ├── interview.vue      # Chat interface
│   └── feedback.vue       # Performance feedback
├── stores/
│   └── session.js         # Pinia session store
├── composables/
│   └── useGemini.js       # Gemini API integration
└── nuxt.config.ts         # Nuxt configuration
```

## Development Notes

- Development only - not intended for production deployment
- Uses Gemini 2.0 Flash model (free tier)
- All session data is stored in-memory only
