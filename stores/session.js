import { defineStore } from "pinia";

export const useSessionStore = defineStore("session", () => {
  const scenario = ref(null);
  const qaHistory = ref([]);
  const feedback = ref(null);

  // Actions for managing session state
  const setScenario = (scenarioData) => {
    scenario.value = scenarioData;
  };

  const addQA = (question, answer) => {
    qaHistory.value.push({
      question,
      answer,
    });
  };

  const setFeedback = (feedbackData) => {
    feedback.value = feedbackData;
  };

  const resetSession = () => {
    scenario.value = null;
    qaHistory.value = [];
    feedback.value = null;
  };
  return {
    // State
    scenario,
    qaHistory,
    feedback,
    // Actions
    setScenario,
    addQA,
    setFeedback,
    resetSession,
  };
});
