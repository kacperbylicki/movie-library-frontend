<template>
  <section class="grid grid-flow-row w-auto p-2 justify-center">
    <ErrorAlert v-if="errorMessage" class="mx-auto w-full mt-2" :error-message="errorMessage" />
    <SuccessAlert
      v-if="successMessage"
      class="mx-auto w-full mt-2"
      :success-message="successMessage"
    />

    <form class="max-w-lg" @submit="handleCreateMovie">
      <Field v-slot="{ handleChange, handleBlur }" name="image">
        <input
          type="file"
          accept="image/*"
          class="file-input file-input-bordered w-full max-w-lg mt-10"
          :class="{ 'file-input-secondary': !errors.image, 'file-input-error': errors.image }"
          @change="handleChange"
          @blur="handleBlur"
        />
      </Field>
      <label v-if="errors.image" class="label">
        <ErrorMessage as="span" name="image" class="label-text-alt text-error" />
      </label>

      <div class="form-control w-full max-w-lg mt-2">
        <label class="label">
          <span class="label-text">Select video stream key</span>
        </label>
        <select
          v-model="videoStreamKey"
          name="videoStreamKey"
          class="select"
          :class="{
            'select-secondary': !errors.videoStreamKey,
            'select-error': errors.videoStreamKey,
          }"
        >
          <option v-for="(streamKey, index) in videoStreamKeys" :key="index">
            {{ streamKey }}
          </option>
        </select>

        <label v-if="errors.videoStreamKey" class="label">
          <ErrorMessage as="span" name="videoStreamKey" class="label-text-alt text-error" />
        </label>
      </div>

      <input
        v-model="title"
        name="title"
        type="text"
        placeholder="Title"
        class="input input-bordered w-full max-w-lg mt-6"
        :class="{ 'input-secondary': !errors.title, 'input-error': errors.title }"
      />
      <label v-if="errors.title" class="label">
        <ErrorMessage as="span" name="title" class="label-text-alt text-error" />
      </label>

      <input
        v-model="releaseYear"
        name="releaseYear"
        type="number"
        :min="1900"
        :max="2022"
        placeholder="Release Year"
        class="input input-bordered w-full max-w-lg mt-6"
        :class="{ 'input-secondary': !errors.releaseYear, 'input-error': errors.releaseYear }"
      />
      <label v-if="errors.releaseYear" class="label">
        <ErrorMessage as="span" name="releaseYear" class="label-text-alt text-error" />
      </label>

      <div v-for="(gen, idx) in genre" :key="gen.key" class="form-control">
        <div class="input-group">
          <Field
            :name="`genre[${idx}]`"
            type="text"
            placeholder="Genres"
            class="input input-bordered w-full max-w-lg mt-6"
            :class="{
              'input-secondary': !errors[`genre[${idx}]`],
              'input-error': errors[`genre[${idx}]`],
            }"
          />
          <button
            v-if="genre.length > 1"
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="removeGenre(idx)"
          >
            <MinusSignIcon class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="pushGenre('')"
          >
            <PlusSignIcon class="h-4 w-4" />
          </button>
        </div>

        <label v-if="errors[`genre[${idx}]`]" class="label">
          <ErrorMessage as="span" :name="`genre[${idx}]`" class="label-text-alt text-error" />
        </label>
      </div>

      <div v-for="(producer, idx) in producers" :key="producer.key" class="form-control">
        <div class="input-group">
          <Field
            :name="`producers[${idx}]`"
            type="text"
            placeholder="Producers"
            class="input input-bordered w-full max-w-lg mt-6"
            :class="{
              'input-secondary': !errors[`producers[${idx}]`],
              'input-error': errors[`producers[${idx}]`],
            }"
          />
          <button
            v-if="producers.length > 1"
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="removeProducer(idx)"
          >
            <MinusSignIcon class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="pushProducer('')"
          >
            <PlusSignIcon class="h-4 w-4" />
          </button>
        </div>

        <label v-if="errors[`producers[${idx}]`]" class="label">
          <ErrorMessage as="span" :name="`producers[${idx}]`" class="label-text-alt text-error" />
        </label>
      </div>

      <div v-for="(director, idx) in directors" :key="director.key" class="form-control">
        <div class="input-group">
          <Field
            :name="`directors[${idx}]`"
            type="text"
            placeholder="Directors"
            class="input input-bordered w-full max-w-lg mt-6"
            :class="{
              'input-secondary': !errors[`directors[${idx}]`],
              'input-error': errors[`directors[${idx}]`],
            }"
          />
          <button
            v-if="directors.length > 1"
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="removeDirector(idx)"
          >
            <MinusSignIcon class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="pushDirector('')"
          >
            <PlusSignIcon class="h-4 w-4" />
          </button>
        </div>

        <label v-if="errors[`directors[${idx}]`]" class="label">
          <ErrorMessage as="span" :name="`directors[${idx}]`" class="label-text-alt text-error" />
        </label>
      </div>

      <div v-for="(role, idx) in roles" :key="role.key" class="form-control">
        <div class="input-group">
          <Field
            :name="`roles[${idx}].actor`"
            type="text"
            placeholder="Actor"
            class="input input-bordered w-full max-w-xs mt-6"
            :class="{
              'input-secondary': !errors[`roles[${idx}].actor`],
              'input-error': errors[`roles[${idx}].actor`],
            }"
          />
          <Field
            :name="`roles[${idx}].character`"
            type="text"
            placeholder="Character"
            class="input input-bordered w-full max-w-xs mt-6"
            :class="{
              'input-secondary': !errors[`roles[${idx}].character`],
              'input-error': errors[`roles[${idx}].character`],
            }"
          />
          <button
            v-if="roles.length > 1"
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="removeRole(idx)"
          >
            <MinusSignIcon class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="btn btn-square mt-6 fill-neutral-content"
            @click="pushRole({ actor: '', character: '' })"
          >
            <PlusSignIcon class="h-4 w-4" />
          </button>
        </div>

        <label v-if="errors[`roles[${idx}].actor`]" class="label">
          <ErrorMessage as="span" :name="`roles[${idx}].actor`" class="label-text-alt text-error" />
        </label>
        <label v-if="errors[`roles[${idx}].character`]" class="label">
          <ErrorMessage
            as="span"
            :name="`roles[${idx}].character`"
            class="label-text-alt text-error"
          />
        </label>
      </div>

      <button v-if="isLoading" class="btn btn-secondary mt-6 max-w-lg w-full loading"></button>
      <button v-else class="btn btn-secondary mt-6 max-w-lg w-full" @click="handleCreateMovie">
        Add Movie
      </button>
    </form>
  </section>
</template>
<script setup>
import ErrorAlert from "../components/ErrorAlert.vue";
import MinusSignIcon from "../components/icons/MinusSignIcon.vue";
import PlusSignIcon from "../components/icons/PlusSignIcon.vue";
import SuccessAlert from "../components/SuccessAlert.vue";
import { ErrorMessage, Field, useField, useFieldArray, useForm } from "vee-validate";
import { createMovie, getVideoStreamKeys } from "../services/index.js";
import { movieValidationSchema } from "../validators/movie.validator.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const errorMessage = ref(null);
const successMessage = ref(null);
const videoStreamKeys = ref([]);

const { handleSubmit, errors } = useForm({
  validationSchema: movieValidationSchema,
  initialValues: {
    producers: [""],
    directors: [""],
    genre: [""],
    roles: [
      {
        actor: "",
        character: "",
      },
    ],
  },
});

useField("image");
const { value: videoStreamKey } = useField("videoStreamKey");
const { value: title } = useField("title");
const { value: releaseYear } = useField("releaseYear");
const { remove: removeGenre, push: pushGenre, fields: genre } = useFieldArray("genre");
const {
  remove: removeProducer,
  push: pushProducer,
  fields: producers,
} = useFieldArray("producers");
const {
  remove: removeDirector,
  push: pushDirector,
  fields: directors,
} = useFieldArray("directors");
const { remove: removeRole, push: pushRole, fields: roles } = useFieldArray("roles");

const resetMessages = () => {
  setTimeout(() => {
    successMessage.value = null;
    errorMessage.value = null;
  }, 3000);
};

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const handleCreateMovie = handleSubmit(async (payload) => {
  try {
    isLoading.value = true;

    const posterBase64 = await convertBase64(payload.image);
    const posterPayload = posterBase64.split(",").pop();

    const { error } = await createMovie({ ...payload, poster: posterPayload });

    if (!error) {
      isLoading.value = false;
      successMessage.value = "Movie successfully created";
      resetMessages();

      return;
    }

    isLoading.value = false;
    errorMessage.value = error?.title === "Conflict" ? "Movie already exists" : error?.title;
    resetMessages();
  } catch (error) {
    isLoading.value = false;
    errorMessage.value = error.message;
    resetMessages();
  }
});

const getVideosStreamKeys = async () => {
  try {
    const { data, error } = await getVideoStreamKeys();

    if (!error) {
      return data;
    }

    errorMessage.value = error?.title;
    resetMessages();
  } catch (error) {
    errorMessage.value = error.message;
    resetMessages();
  }
};

onMounted(async () => {
  videoStreamKeys.value = await getVideosStreamKeys();
});
</script>
