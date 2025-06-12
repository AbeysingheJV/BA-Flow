<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100"
      >
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800">Generated Scenario</h1>
        </div>
        <p class="text-gray-600 ml-11">
          Review the scenario details before starting your interview
        </p>
      </div>

      <!-- Scenario Card -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100"
      >
        <h2
          class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
        >
          <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
          Your Training Scenario
        </h2>
        <div
          v-if="sessionStore.scenario"
          class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
        >
          <div
            class="text-gray-800 leading-relaxed whitespace-pre-line"
            v-html="formatScenario(sessionStore.scenario)"
          ></div>
        </div>
        <div
          v-else
          class="text-center text-gray-500 py-12 bg-gray-50 rounded-xl border border-gray-200"
        >
          <svg
            class="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p class="font-medium">
            No scenario available. Please go back and generate a new scenario.
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 justify-center">
        <button
          @click="beginConversation"
          :disabled="!sessionStore.scenario"
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
        >
          Begin Conversation
        </button>

        <button
          @click="goBack"
          class="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Generate New Scenario
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSessionStore } from "~/stores/session";

const sessionStore = useSessionStore();

const formatScenario = (text) => {
  if (!text) return "";

  // Convert markdown-style formatting to HTML
  return (
    text
      // Bold text: **text** → <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic text: *text* → <em>text</em>
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Line breaks for better formatting
      .replace(/\n/g, "<br>")
      // Convert bullet points: * text → • text
      .replace(/^\* /gm, "• ")
  );
};

const beginConversation = async () => {
  await navigateTo("/interview");
};

const goBack = async () => {
  await navigateTo("/");
};

// Check if we have a scenario, if not redirect to landing
onMounted(() => {
  if (!sessionStore.scenario) {
    navigateTo("/");
  }
});
</script>
