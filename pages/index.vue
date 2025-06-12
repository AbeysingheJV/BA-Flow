<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        BA-Flow Training
      </h1>

      <div class="text-center mb-6">
        <p class="text-gray-600 mb-4">
          Practice your Business Analyst interview skills with AI-powered
          stakeholder simulations
        </p>
      </div>

      <div v-if="isGenerating" class="text-center">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Generating scenario...</p>
      </div>

      <button
        v-else
        @click="startNewSession"
        class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Start New Interview Session
      </button>
    </div>
  </div>
</template>

<script setup>
const sessionStore = useSessionStore();
const isGenerating = ref(false);

const startNewSession = async () => {
  isGenerating.value = true;

  try {
    // Reset any previous session
    sessionStore.resetSession();

    // Generate new scenario (we'll implement this in Phase 4)
    // For now, just navigate to interview page
    await $router.push("/interview");
  } catch (error) {
    console.error("Error starting session:", error);
  } finally {
    isGenerating.value = false;
  }
};
</script>
