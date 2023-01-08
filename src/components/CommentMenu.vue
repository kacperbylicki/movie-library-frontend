<template>
  <ul
    tabindex="0"
    class="menu menu-compact dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-auto"
  >
    <!-- <li>
      <a class="justify-between">
        <span class="badge w-20">Update</span>
      </a>
    </li> -->
    <li>
      <a class="justify-between hover:bg-base-100" @click="emitDeleteComment(commentId)">
        <span class="badge badge-error w-20">Delete</span>
      </a>
    </li>
  </ul>
</template>
<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  commentId: {
    type: String,
    default: "",
  },
});

const { commentId } = toRefs(props);

const emit = defineEmits(["deleteComment"]);

const emitDeleteComment = (commentId) => {
  emit("deleteComment", commentId);
};
</script>
