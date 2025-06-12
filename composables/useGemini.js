import { GoogleGenerativeAI } from "@google/generative-ai";

export const useGemini = () => {
  const config = useRuntimeConfig();
  const genAI = new GoogleGenerativeAI(config.public.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  // 1. Scenario Generation
  const generateScenario = async () => {
    console.log("🎯 Starting scenario generation...");
    const prompt = `You are an AI assistant designed to help train junior Business Analysts in tech companies. Generate a business analysis scenario that includes:
    - A stakeholder role (e.g., Marketing Director, Product Manager)
    - A brief company background
    - A clear business goal or problem
    - Key constraints or requirements.
    - Use simple English and not much jargon The output should be under 300 words and written in a professional, business-like tone.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("✅ Scenario generated:", text.substring(0, 100) + "...");
    return text;
  };
  // 2. Stakeholder Roleplay
  const getStakeholderResponse = async (question, scenario) => {
    console.log("💬 Getting stakeholder response for:", question);
    const prompt = `Respond in character as the stakeholder described in the scenario. Give clear, informative answers based on your fictional role, and answer only what the user asks. Keep answers concise and simple to understand unless the question is open-ended.

Scenario: ${scenario}

User question: ${question}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("✅ Stakeholder response:", text.substring(0, 100) + "...");
    return text;
  };
  // 3. Feedback Evaluation
  const generateFeedback = async (scenario, qaHistory) => {
    console.log("📊 Generating feedback for", qaHistory.length, "Q&A pairs...");
    const conversationText = qaHistory
      .map((qa) => `Q: ${qa.question}\nA: ${qa.answer}`)
      .join("\n\n");

    const prompt = `You are a senior Business Analyst mentor. You will review the conversation between a junior BA and a stakeholder. Provide constructive feedback based on the BA's questions.

Scenario: ${scenario}

Conversation:
${conversationText}

Please provide feedback in the following JSON format:
{
  "scores": {
    "clarity": [1-10 score],
    "relevance": [1-10 score], 
    "depth": [1-10 score],
    "coverage": [1-10 score],
    "structure": [1-10 score]
  },
  "suggestions": [
    "suggestion 1",
    "suggestion 2",
    "suggestion 3"
  ],
  "missedTypes": [
    "missed question type 1",
    "missed question type 2"
  ]
}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("📝 Raw feedback response:", text);

    // Clean the response - remove markdown code blocks and extra whitespace
    const cleanedText = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    console.log("🧹 Cleaned text for parsing:", cleanedText);

    // Parse JSON response
    try {
      const feedback = JSON.parse(cleanedText);
      console.log("✅ Feedback parsed successfully:", feedback);
      return feedback;
    } catch (error) {
      console.error("❌ Failed to parse feedback JSON:", error);
      console.log("Raw text that failed to parse:", cleanedText);
      // Return fallback structure
      return {
        scores: {
          clarity: 5,
          relevance: 5,
          depth: 5,
          coverage: 5,
          structure: 5,
        },
        suggestions: ["Unable to generate specific feedback"],
        missedTypes: ["Analysis pending"],
      };
    }
  };

  return {
    generateScenario,
    getStakeholderResponse,
    generateFeedback,
  };
};
