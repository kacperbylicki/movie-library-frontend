<template>
  <section class="grid grid-flow-row w-auto p-2 justify-center">
    <div class="avatar justify-center mt-10">
      <div
        class="w-44 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 bg-neutral-focus"
      >
        <img src="../assets/undraw_horror_movie_3988.svg" alt="horror-movie-viewers" />
      </div>
    </div>

    <ErrorAlert v-if="errorMessage" class="mx-auto w-80 mt-12" :error-message="errorMessage" />

    <ValidatedForm
      v-slot="{ errors }"
      :validation-schema="registerValidationSchema"
      @submit="handleRegister"
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
        name="username"
        type="text"
        placeholder="Username"
        class="input input-bordered w-full max-w-xs mt-4"
        :class="{ 'input-secondary': !errors.username, 'input-error': errors.username }"
      />
      <label class="label">
        <ErrorMessage as="span" name="username" class="label-text-alt text-error" />
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

      <Field
        name="passwordConfirmation"
        type="password"
        placeholder="Confirm Password"
        class="input input-bordered w-full max-w-xs mt-4"
        :class="{
          'input-secondary': !errors.passwordConfirmation,
          'input-error': errors.passwordConfirmation,
        }"
      />
      <label class="label">
        <ErrorMessage as="span" name="passwordConfirmation" class="label-text-alt text-error" />
      </label>

      <p class="text-xs">
        Already registered?
        <a class="link link-hover ml-1" @click="redirectToLogin">Login</a>
      </p>

      <button v-if="isLoading" class="btn btn-secondary btn-wide mt-4 w-80 loading"></button>
      <button v-else class="btn btn-secondary btn-wide mt-4 w-80">Register</button>
    </ValidatedForm>
  </section>
</template>
<script>
import ErrorAlert from "../components/ErrorAlert.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { mapActions } from "vuex";
import { registerValidationSchema } from "../validators/register.validator";

export default {
  components: {
    ErrorAlert,
    ValidatedForm: Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      registerValidationSchema,
    };
  },
  methods: {
    ...mapActions(["register"]),
    async handleRegister(payload) {
      this.isLoading = true;

      try {
        const { error } = await this.register(payload);
        this.isLoading = false;

        if (!error) {
          this.isLoading = false;
          await this.$router.push("/login");
        } else {
          this.errorMessage = error?.title;
          this.resetErrorMessage();
        }
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.title;
        this.resetErrorMessage();
      }
    },
    resetErrorMessage() {
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    },
    redirectToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
