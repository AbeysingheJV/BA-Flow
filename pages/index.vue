<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div
      class="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-blue-100"
    >
      <div class="text-center mb-2">
        <div
          class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-3">BA-Flow Training</h1>
      </div>

      <div class="text-center mb-8">
        <p class="text-gray-600 leading-relaxed">
          Practice your Business Analyst interview skills with AI-powered
          stakeholder simulations
        </p>
      </div>
      <div v-if="isGenerating" class="text-center py-4">
        <div class="relative">
          <div
            class="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-600 mx-auto mb-4"
          ></div>
        </div>
        <p class="text-gray-600 font-medium">Generating scenario...</p>
      </div>

      <button
        v-else
        @click="startNewSession"
        class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Start New Interview Session
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSessionStore } from "~/stores/session";

const sessionStore = useSessionStore();
const { generateScenario } = useGemini();
const isGenerating = ref(false);

const startNewSession = async () => {
  isGenerating.value = true;

  try {
    // Reset any previous session
    sessionStore.resetSession();

    // Generate new scenario
    const scenario = await generateScenario();
    sessionStore.setScenario(scenario); // Navigate to scenario page
    await navigateTo("/scenario");
  } catch (error) {
    // Still navigate even if scenario generation fails
    await navigateTo("/scenario");
  } finally {
    isGenerating.value = false;
  }
};
</script>
