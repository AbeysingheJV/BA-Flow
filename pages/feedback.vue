<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100"
      >
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center"
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800">Interview Feedback</h1>
        </div>
        <p class="text-gray-600 ml-11">
          Here's your performance analysis from the interview session
        </p>
      </div>

      <!-- Scores Section -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100"
      >
        <h2
          class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
        >
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          Performance Scores
        </h2>
        <div v-if="sessionStore.feedback" class="space-y-5">
          <div
            v-for="(score, criterion) in sessionStore.feedback.scores"
            :key="criterion"
            class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold text-gray-800 capitalize text-lg">{{
                criterion
              }}</span>
              <span class="font-bold text-2xl" :class="getScoreColor(score)"
                >{{ score }}/10</span
              >
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div
                class="h-3 rounded-full transition-all duration-500"
                :class="getScoreBarColor(score)"
                :style="{ width: score * 10 + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <div v-if="isGeneratingFeedback" class="text-center text-gray-500 py-8">
          <div class="relative">
            <div
              class="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600 mx-auto mb-4"
            ></div>
          </div>
          <p class="font-medium text-lg">Generating feedback...</p>
        </div>
        <div
          v-else-if="!sessionStore.feedback"
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          <p class="font-medium">No feedback available.</p>
        </div>
      </div>

      <!-- Suggestions Section -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 mb-6 border border-blue-100"
      >
        <h2
          class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
        >
          <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Improvement Suggestions
        </h2>

        <div v-if="sessionStore.feedback?.suggestions" class="space-y-4">
          <div
            v-for="(suggestion, index) in sessionStore.feedback.suggestions"
            :key="index"
            class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200"
          >
            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
              >
                <span class="text-white text-sm font-bold">{{
                  index + 1
                }}</span>
              </div>
              <p class="text-gray-800 leading-relaxed">{{ suggestion }}</p>
            </div>
          </div>
        </div>

        <div
          v-else
          class="text-center text-gray-500 py-8 bg-gray-50 rounded-xl border border-gray-200"
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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          <p class="font-medium">
            Suggestions will be generated based on your interview performance.
          </p>
        </div>
      </div>
      <!-- Missed Question Types -->
      <div
        class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100"
      >
        <h2
          class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
        >
          <span class="w-2 h-2 bg-red-500 rounded-full"></span>
          Missed Question Types
        </h2>

        <div v-if="sessionStore.feedback?.missedTypes" class="space-y-3">
          <div class="flex flex-wrap gap-3">
            <span
              v-for="(type, index) in sessionStore.feedback.missedTypes"
              :key="index"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-4 py-2 rounded-xl text-sm font-medium border border-red-300"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
              {{ type }}
            </span>
          </div>
        </div>

        <div
          v-else
          class="text-center text-gray-500 py-8 bg-gray-50 rounded-xl border border-gray-200"
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
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="font-medium">
            Analysis of missed question types will appear here.
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 justify-center">
        <button
          @click="startNewSession"
          class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start New Session
        </button>

        <button
          @click="goHome"
          class="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSessionStore } from "~/stores/session";

const sessionStore = useSessionStore();
const { generateFeedback } = useGemini();
const isGeneratingFeedback = ref(false);

// Helper functions for score styling
const getScoreColor = (score) => {
  if (score >= 8) return "text-green-600";
  if (score >= 6) return "text-yellow-600";
  return "text-red-600";
};

const getScoreBarColor = (score) => {
  if (score >= 8) return "bg-gradient-to-r from-green-500 to-emerald-600";
  if (score >= 6) return "bg-gradient-to-r from-yellow-500 to-orange-500";
  return "bg-gradient-to-r from-red-500 to-red-600";
};

const startNewSession = async () => {
  sessionStore.resetSession();
  await navigateTo("/");
};

const goHome = async () => {
  await navigateTo("/");
};

// Generate feedback when component mounts
onMounted(async () => {
  if (sessionStore.qaHistory.length === 0) {
    navigateTo("/");
    return;
  }

  // Generate feedback if not already generated
  if (!sessionStore.feedback) {
    isGeneratingFeedback.value = true;
    try {
      const feedback = await generateFeedback(
        sessionStore.scenario,
        sessionStore.qaHistory
      );
      sessionStore.setFeedback(feedback);
    } catch (error) {
      // Silently handle error - fallback feedback will be used
    } finally {
      isGeneratingFeedback.value = false;
    }
  }
});
</script>
