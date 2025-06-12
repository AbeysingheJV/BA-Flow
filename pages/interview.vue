<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b p-4 flex-shrink-0">
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-semibold text-gray-800">Interview Session</h1>
          <button
            @click="showScenario = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Check Scenario
          </button>
        </div>
        <button
          @click="endConversation"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          End Conversation
        </button>
      </div>
    </header>
    <!-- Chat Area -->
    <div class="flex-1 overflow-y-auto p-4 min-h-0">
      <div class="max-w-4xl mx-auto space-y-4 pb-4">
        <div
          v-for="(qa, index) in sessionStore.qaHistory"
          :key="index"
          class="space-y-2"
        >
          <!-- User Question -->
          <div class="flex justify-end">
            <div
              class="bg-blue-600 text-white p-3 rounded-lg max-w-xs lg:max-w-md"
            >
              {{ qa.question }}
            </div>
          </div>

          <!-- AI Answer -->
          <div class="flex justify-start">
            <div class="bg-white border p-3 rounded-lg max-w-xs lg:max-w-md">
              {{ qa.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Input Area (Fixed at bottom) -->
    <div class="bg-white border-t p-4 flex-shrink-0">
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="askQuestion" class="flex gap-2">
          <input
            v-model="currentQuestion"
            type="text"
            placeholder="Ask your question..."
            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="isLoading"
          />
          <button
            type="submit"
            :disabled="!currentQuestion.trim() || isLoading"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {{ isLoading ? "Sending..." : "Send" }}
          </button>
        </form>
      </div>
    </div>

    <!-- Scenario Popup Modal -->
    <div
      v-if="showScenario"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showScenario = false"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-800">
              Current Scenario
            </h2>
            <button
              @click="showScenario = false"
              class="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div class="bg-blue-50 rounded-lg p-4">
            <div
              class="text-gray-800 leading-relaxed whitespace-pre-line"
              v-html="formatScenario(sessionStore.scenario)"
            ></div>
          </div>
          <div class="mt-4 flex justify-end">
            <button
              @click="showScenario = false"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sessionStore = useSessionStore();
const { getStakeholderResponse } = useGemini();
const currentQuestion = ref("");
const isLoading = ref(false);
const showScenario = ref(false);

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

const askQuestion = async () => {
  if (!currentQuestion.value.trim()) return;

  isLoading.value = true;
  const question = currentQuestion.value.trim();
  currentQuestion.value = "";

  try {
    // Get AI response
    const answer = await getStakeholderResponse(
      question,
      sessionStore.scenario
    );

    // Add Q&A to history
    sessionStore.addQA(question, answer);
  } catch (error) {
    console.error("Error asking question:", error);
    // Add fallback response
    sessionStore.addQA(
      question,
      "Sorry, I encountered an error. Please try again."
    );
  } finally {
    isLoading.value = false;
  }
};

const endConversation = async () => {
  // Navigate to feedback page
  await navigateTo("/feedback");
};

// Check if we have a scenario, if not redirect to landing
onMounted(() => {
  if (!sessionStore.scenario) {
    navigateTo("/");
  }
});
</script>
