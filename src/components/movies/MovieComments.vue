<template>
  <div class="card bg-base-100 shadow-xl p-6 overflow-y-auto">
    <h5 class="card-title">Add Comment</h5>

    <ErrorAlert v-if="errorMessage" class="mx-auto w-full mt-2" :error-message="errorMessage" />

    <ValidatedForm
      v-slot="{ errors }"
      :validation-schema="commentValidationSchema"
      @submit="handleAddComment"
    >
      <Field v-slot="{ field }" name="content">
        <textarea
          class="textarea textarea-secondary mt-4 min-h-[8rem] w-full"
          :class="{ 'textarea-secondary': !errors.content, 'textarea-error': errors.content }"
          :placeholder="isAuthenticated ? `Write a comment` : `Login to write a comment`"
          :disabled="!isAuthenticated"
          v-bind="field"
        ></textarea>
      </Field>

      <label class="label py-0 mb-4">
        <ErrorMessage as="span" name="content" class="label-text-alt text-error" />
      </label>

      <button v-if="isLoading" class="btn btn-secondary gap-2 w-full loading"></button>
      <button v-else class="btn btn-secondary gap-2 w-full" :disabled="!isAuthenticated">
        Add Comment
      </button>
    </ValidatedForm>

    <h2 class="card-title mt-8">
      Comments <span class="badge badge-secondary badge-md">{{ comments.length }}</span>
    </h2>

    <div v-for="(comment, index) in comments" :key="index" class="card w-full bg-neutral p-4 mt-4">
      <div class="card-title justify-between">
        <div class="badge badge-secondary font-normal">
          {{ comment.user.username }}
        </div>
        <div v-if="isCommentOwner(movieId, comment.uuid)" class="dropdown dropdown-end">
          <CommentMenuButton />
          <CommentMenu :comment-id="comment.uuid" @delete-comment="handleDeleteComment" />
        </div>
      </div>
      <div class="card-body px-1 py-4">
        <p>{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CommentMenu from "../CommentMenu.vue";
import CommentMenuButton from "../buttons/CommentMenuButton.vue";
import ErrorAlert from "../ErrorAlert.vue";
import { ErrorMessage, Field, Form as ValidatedForm } from "vee-validate";
import { commentValidationSchema } from "../../validators/comment.validator";
import { computed, ref, toRefs, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const isCommentOwner = computed(() => store.getters.isCommentOwner);

const props = defineProps({
  movie: Object,
});

const { movie } = toRefs(props);

const isLoading = ref(false);
const errorMessage = ref(null);
const movieId = ref(null);
const comments = ref([]);

watch(
  movie,
  () => {
    movieId.value = movie.value.uuid;
    comments.value = movie.value.comments;
  },
  { immediate: true },
);

watch(
  () => store.getters.movies,
  (newMovies) => {
    comments.value = newMovies.find((movie) => movie.uuid === movieId.value).comments;
  },
);

const resetErrorMessage = () => {
  setTimeout(() => {
    errorMessage.value = null;
  }, 3000);
};

const handleAddComment = async (payload, { resetForm }) => {
  isLoading.value = true;

  try {
    const { error } = await store.dispatch("createComment", {
      movieId: movieId.value,
      payload,
    });

    isLoading.value = false;
    errorMessage.value = error?.title;

    resetForm();
    resetErrorMessage();
  } catch (error) {
    isLoading.value = false;
    errorMessage.value = error?.title;

    resetForm();
    resetErrorMessage();
  }
};

const handleDeleteComment = async (commentId) => {
  try {
    const { error } = await store.dispatch("deleteComment", {
      movieId: movieId.value,
      commentId,
    });

    errorMessage.value = error?.title;

    resetErrorMessage();
  } catch (error) {
    errorMessage.value = error.message;

    resetErrorMessage();
  }
};
</script>
