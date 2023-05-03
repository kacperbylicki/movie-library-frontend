<template>
  <input id="rentModal" ref="rentModal" type="checkbox" class="modal-toggle" />
  <label for="rentModal" class="modal cursor-pointer">
    <label class="modal-box relative max-w-[64rem] bg-base-300">
      <div class="container mx-auto">
        <ErrorAlert v-if="errorMessage" class="mx-auto mb-6" :error-message="errorMessage" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PricingCard
            v-for="plan in pricingPlans"
            :id="plan.id"
            :key="plan.id"
            :title="plan.title"
            :price="plan.price"
            :uses="plan.uses"
            :selected="plan.id === selectedPlan"
            @change-plan="handlePlanChange"
          />
        </div>

        <button v-if="isLoading" class="btn btn-secondary btn-block loading mt-6"></button>
        <button v-else class="btn btn-secondary btn-block mt-4" @click="handleMovieRent">
          {{ `Rent for ${rentPrice ?? 0}` }}
        </button>
      </div>
    </label>
  </label>
</template>
<script setup>
import ErrorAlert from "../ErrorAlert.vue";
import PricingCard from "../../components/PricingCard.vue";
import { ref } from "vue";
import { rentMovie } from "../../services/rent-movie";
import { useRoute } from "vue-router";

const route = useRoute();

const pricingPlans = ref([
  {
    id: 1,
    title: "Basic",
    price: "$4.99",
    uses: "1 movie playback",
  },
  {
    id: 2,
    title: "Standard",
    price: "$12.99",
    uses: "3 movie playbacks",
  },
  {
    id: 3,
    title: "Unlimited",
    price: "$29.99",
    uses: "Unlimited movie playbacks",
  },
]);
const rentModal = ref(null);
const isLoading = ref(false);
const errorMessage = ref(null);
const selectedPlan = ref(1);
const rentPrice = ref(pricingPlans.value[0].price);

const { id: movieId } = route.params;

const resetErrorMessage = () => {
  setTimeout(() => {
    errorMessage.value = null;
  }, 3000);
};

const handleMovieRent = async () => {
  isLoading.value = true;

  try {
    const { error } = await rentMovie(movieId, { planId: selectedPlan.value });

    if (error) {
      isLoading.value = false;
      errorMessage.value = error?.title;

      resetErrorMessage();

      return;
    }

    isLoading.value = false;
    rentModal.value.checked = false;

    resetErrorMessage();
  } catch (error) {
    isLoading.value = false;
    errorMessage.value = error?.title;

    resetErrorMessage();
  }
};

const getRentPrice = (pricePlanId) => {
  return pricingPlans.value.find((plan) => plan.id === pricePlanId)?.price;
};

const handlePlanChange = (pricePlanId) => {
  rentPrice.value = getRentPrice(pricePlanId);
  selectedPlan.value = pricePlanId;
};
</script>
