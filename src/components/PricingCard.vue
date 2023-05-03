<template>
  <div class="card card-bordered bg-base-100">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <p class="text-xl font-semibold">{{ price }}</p>
      <p class="text-gray-500">{{ uses }}</p>
      <label class="cursor-pointer">
        <input
          type="radio"
          name="pricing-plan"
          class="radio radio-secondary"
          :value="id"
          :checked="selected"
          @click="emitChangePlan(id)"
        />
        <span class="ml-2">Select Plan</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: { type: Number, default: 0 },
  title: { type: String, default: "Untitled Plan" },
  price: { type: String, default: "$0" },
  uses: { type: String, default: "N/A" },
  selected: Boolean,
});

const emit = defineEmits(["changePlan"]);

const emitChangePlan = (selectedPlan) => {
  emit("changePlan", selectedPlan);
};
</script>
