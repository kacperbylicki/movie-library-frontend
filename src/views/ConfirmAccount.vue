<template>
  <section class="grid grid-flow-row w-auto p-2 justify-center">
    <div class="avatar justify-center mt-10">
      <div
        class="w-44 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 bg-neutral-focus"
      >
        <img src="../assets/undraw_two_factor_authentication_namy.svg" alt="confirmation" />
      </div>
    </div>

    <ErrorAlert v-if="errorMessage" class="mx-auto w-80 mt-8" :error-message="errorMessage" />
    <SuccessAlert
      v-if="successMessage"
      class="mx-auto w-80 mt-8"
      :success-message="successMessage"
    />

    <ValidatedForm v-slot="{ values, errors }" :validation-schema="confirmAccountValidationSchema">
      <Field
        name="confirmationCode"
        type="text"
        placeholder="Confirmation Code"
        class="input input-bordered w-full"
        :class="{
          'input-secondary': !errors.confirmationCode,
          'input-error': errors.confirmationCode,
          'mt-12': !errorMessage && !successMessage,
          'mt-4': errorMessage || successMessage,
        }"
        :disabled="isResendingConfirmationCode"
      />
      <label class="label">
        <ErrorMessage as="span" name="confirmationCode" class="label-text-alt text-error" />
      </label>

      <div class="btn-group space-x-4 w-80">
        <div>
          <button v-if="isLoading" class="btn btn-secondary w-64 rounded-r-lg loading"></button>
          <button
            v-else
            class="btn btn-secondary w-64 rounded-r-lg"
            :disabled="isResendingConfirmationCode"
            @click="handleAccountConfirmation(values)"
          >
            Confirm Account
          </button>
        </div>

        <div class="tooltip tooltip-bottom" data-tip="Resend code">
          <button
            v-if="isResendingConfirmationCode"
            class="btn btn-secondary btn-square loading"
          ></button>
          <button v-else class="btn btn-secondary" @click="handleConfirmationCodeResend">
            <RetryIcon class="w-4 h-4 fill-base-300" />
          </button>
        </div>
      </div>
    </ValidatedForm>
  </section>
</template>

<script setup>
import ErrorAlert from "../components/ErrorAlert.vue";
import RetryIcon from "../components/icons/RetryIcon.vue";
import SuccessAlert from "../components/SuccessAlert.vue";
import { ErrorMessage, Field, Form as ValidatedForm } from "vee-validate";
import { computed, ref } from "vue";
import { confirmAccountValidationSchema } from "../validators/confirm-account.validator";
import { resendConfirmationCode } from "../services";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const isResendingConfirmationCode = ref(false);
const successMessage = ref(null);
const errorMessage = ref(null);

const user = computed(() => store.getters.user);

const resetMessages = () => {
  setTimeout(() => {
    errorMessage.value = null;
    successMessage.value = null;
  }, 3000);
};

const handleAccountConfirmation = async (payload) => {
  try {
    isLoading.value = true;

    const { error } = await store.dispatch("confirmAccount", payload);

    if (!error) {
      isLoading.value = false;
      router.push("/login");

      return;
    }

    isLoading.value = false;
    errorMessage.value = error?.title;
    resetMessages();
  } catch (error) {
    isLoading.value = false;
    errorMessage.value = error.message;
    resetMessages();
  }
};

const handleConfirmationCodeResend = async () => {
  try {
    isResendingConfirmationCode.value = true;

    const { destination, error } = await resendConfirmationCode({
      email: user.value.email,
    });

    if (!error) {
      isResendingConfirmationCode.value = false;
      successMessage.value = `Confirmation code has been sent to ${destination}`;
      resetMessages();

      return;
    }

    isResendingConfirmationCode.value = false;
    errorMessage.value = error.title;
    resetMessages();
  } catch (error) {
    isResendingConfirmationCode.value = false;
    errorMessage.value = error.message;
    resetMessages();
  }
};
</script>
