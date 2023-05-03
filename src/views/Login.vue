<template>
  <section class="grid grid-flow-row w-auto p-2 justify-center">
    <div class="avatar justify-center mt-10">
      <div
        class="w-44 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 bg-neutral-focus"
      >
        <img src="../assets/undraw_home_cinema_l7yl.svg" alt="cinema-viewer" />
      </div>
    </div>

    <ErrorAlert v-if="errorMessage" class="mx-auto w-80 mt-12" :error-message="errorMessage" />

    <ValidatedForm
      v-slot="{ errors }"
      :validation-schema="loginValidationSchema"
      @submit="handleLogin"
    >
      <Field
        name="email"
        type="text"
        placeholder="Email"
        class="input input-bordered w-full max-w-xs mt-10"
        :class="{ 'input-secondary': !errors.email, 'input-error': errors.email }"
      />
      <label class="label">
        <ErrorMessage as="span" name="email" class="label-text-alt text-error" />
      </label>

      <Field
        name="password"
        type="password"
        placeholder="Password"
        class="input input-bordered w-full max-w-xs mt-4"
        :class="{ 'input-secondary': !errors.password, 'input-error': errors.password }"
      />
      <label class="label">
        <ErrorMessage as="span" name="password" class="label-text-alt text-error" />
      </label>

      <p class="text-xs">
        No account yet?
        <a class="link link-hover ml-1" @click="redirectToRegister">Register</a>
      </p>

      <button v-if="isLoading" class="btn btn-secondary mt-4 w-80 loading"></button>
      <button v-else class="btn btn-secondary mt-4 w-80">Login</button>
    </ValidatedForm>
  </section>
</template>

<script setup>
import ErrorAlert from "../components/ErrorAlert.vue";
import { ErrorMessage, Field, Form as ValidatedForm } from "vee-validate";
import { loginValidationSchema } from "../validators/login.validator";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const errorMessage = ref(null);

const login = (payload) => store.dispatch("login", payload);

const handleLogin = async (payload) => {
  isLoading.value = true;

  try {
    const { error } = await login(payload);

    isLoading.value = false;

    if (!error) {
      await router.push("/");
      return;
    }

    if (error?.explanation) {
      await router.push("/confirm-account");
      return;
    }

    errorMessage.value = error?.title;
    resetErrorMessage();
  } catch (error) {
    isLoading.value = false;
    errorMessage.value = error?.title;
    resetErrorMessage();
  }
};

const resetErrorMessage = () => {
  setTimeout(() => {
    errorMessage.value = null;
  }, 3000);
};

const redirectToRegister = () => {
  router.push("/register");
};
</script>
