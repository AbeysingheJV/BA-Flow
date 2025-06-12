<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          Generated Scenario
        </h1>
        <p class="text-gray-600">
          Review the scenario details before starting your interview
        </p>
      </div>

      <!-- Scenario Card -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Your Training Scenario
        </h2>
        <div v-if="sessionStore.scenario" class="bg-blue-50 rounded-lg p-6">
          <div
            class="text-gray-800 leading-relaxed whitespace-pre-line"
            v-html="formatScenario(sessionStore.scenario)"
          ></div>
        </div>

        <div v-else class="text-center text-gray-500 py-8">
          <p>
            No scenario available. Please go back and generate a new scenario.
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 justify-center">
        <button
          @click="beginConversation"
          :disabled="!sessionStore.scenario"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          Begin Conversation
        </button>

        <button
          @click="goBack"
          class="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Generate New Scenario
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
