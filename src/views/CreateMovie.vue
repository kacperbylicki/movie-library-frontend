<template>
  <form @submit="handleCreateMovie">
    <input
      v-model="title"
      name="title"
      type="text"
      placeholder="Title"
      class="input input-bordered w-full max-w-lg mt-10"
      :class="{ 'input-primary': !errors.title, 'input-error': errors.title }"
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
      :class="{ 'input-primary': !errors.releaseYear, 'input-error': errors.releaseYear }"
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
            'input-primary': !errors[`genre[${idx}]`],
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
            'input-primary': !errors[`producers[${idx}]`],
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
            'input-primary': !errors[`directors[${idx}]`],
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
            'input-primary': !errors[`roles[${idx}].actor`],
            'input-error': errors[`roles[${idx}].actor`],
          }"
        />
        <Field
          :name="`roles[${idx}].character`"
          type="text"
          placeholder="Character"
          class="input input-bordered w-full max-w-xs mt-6"
          :class="{
            'input-primary': !errors[`roles[${idx}].character`],
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

    <button class="btn btn-primary btn-wide mt-6 max-w-lg w-full" @click="handleCreateMovie">
      Add Movie
    </button>
  </form>
</template>
<script setup>
import MinusSignIcon from "../assets/icons/MinusSignIcon.vue";
import PlusSignIcon from "../assets/icons/PlusSignIcon.vue";
import { ErrorMessage, Field, useField, useFieldArray, useForm } from "vee-validate";
import { createMovie } from "../services/index.js";
import { movieValidationSchema } from "../validators/movie.validator.js";

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

const handleCreateMovie = handleSubmit(async (payload) => {
  try {
    const { error } = await createMovie(payload);

    if (!error) {
      alert("success!");
      return;
    }

    alert(error.message);
  } catch (error) {
    alert(error);
  }
});
</script>
