<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">
          Interview Feedback
        </h1>
        <p class="text-gray-600">
          Here's your performance analysis from the interview session
        </p>
      </div>

      <!-- Scores Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Performance Scores
        </h2>

        <div v-if="sessionStore.feedback" class="space-y-4">
          <div
            v-for="(score, criterion) in sessionStore.feedback.scores"
            :key="criterion"
            class="flex items-center justify-between"
          >
            <span class="font-medium text-gray-700 capitalize"
              >{{ criterion }}:</span
            >
            <div class="flex items-center">
              <div class="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div
                  class="bg-blue-600 h-2 rounded-full"
                  :style="{ width: score * 10 + '%' }"
                ></div>
              </div>
              <span class="font-semibold text-gray-800">{{ score }}/10</span>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500">
          No feedback available. Feedback will be generated in Phase 4.
        </div>
      </div>

      <!-- Suggestions Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Improvement Suggestions
        </h2>

        <div v-if="sessionStore.feedback?.suggestions" class="space-y-3">
          <div
            v-for="(suggestion, index) in sessionStore.feedback.suggestions"
            :key="index"
            class="flex items-start"
          >
            <div
              class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"
            ></div>
            <p class="text-gray-700">{{ suggestion }}</p>
          </div>
        </div>

        <div v-else class="text-gray-500">
          Suggestions will be generated based on your interview performance.
        </div>
      </div>

      <!-- Missed Question Types -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Missed Question Types
        </h2>

        <div v-if="sessionStore.feedback?.missedTypes" class="space-y-2">
          <span
            v-for="(type, index) in sessionStore.feedback.missedTypes"
            :key="index"
            class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
          >
            {{ type }}
          </span>
        </div>

        <div v-else class="text-gray-500">
          Analysis of missed question types will appear here.
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 justify-center">
        <button
          @click="startNewSession"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Start New Session
        </button>

        <button
          @click="goHome"
          class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const sessionStore = useSessionStore();

const startNewSession = async () => {
  sessionStore.resetSession();
  await $router.push("/");
};

const goHome = async () => {
  await $router.push("/");
};

// Check if we have QA history, if not redirect to landing
onMounted(() => {
  if (sessionStore.qaHistory.length === 0) {
    $router.push("/");
  }
});
</script>
