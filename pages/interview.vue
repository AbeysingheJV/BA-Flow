<template>
  <div
    class="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col"
  >
    <!-- Header -->
    <header
      class="bg-white shadow-lg border-b border-blue-100 p-4 flex-shrink-0"
    >
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </div>
            <h1 class="text-xl font-semibold text-gray-800">
              Interview Session
            </h1>
          </div>
          <button
            @click="showScenario = true"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm shadow-md"
          >
            Check Scenario
          </button>
        </div>
        <button
          @click="endConversation"
          class="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md"
        >
          End Conversation
        </button>
      </div>
    </header>
    <!-- Chat Area -->
    <div class="flex-1 overflow-y-auto p-4 min-h-0">
      <div class="max-w-4xl mx-auto space-y-3 pb-4">
        <div
          v-for="(qa, index) in sessionStore.qaHistory"
          :key="index"
          class="space-y-3"
        >
          <!-- User Question -->
          <div class="flex justify-end">
            <div
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-2xl rounded-tr-md max-w-xs lg:max-w-md shadow-md"
            >
              {{ qa.question }}
            </div>
          </div>

          <!-- AI Answer -->
          <div class="flex justify-start">
            <div
              class="bg-white border border-blue-100 p-4 rounded-2xl rounded-tl-md max-w-xs lg:max-w-md shadow-md"
            >
              <div class="flex items-start gap-3">
                <div
                  class="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <div class="text-gray-800">{{ qa.answer }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Input Area (Fixed at bottom) -->
    <div class="bg-white border-t border-blue-100 p-4 flex-shrink-0 shadow-lg">
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="askQuestion" class="flex gap-3">
          <input
            v-model="currentQuestion"
            type="text"
            placeholder="Ask your question..."
            class="flex-1 border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50/50"
            :disabled="isLoading"
          />
          <button
            type="submit"
            :disabled="!currentQuestion.trim() || isLoading"
            class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
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
import { useSessionStore } from "~/stores/session";

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
