<script setup>
import CommentItem from "../components/CommentItem.vue"

defineProps({
  post: {
    type: Object,
    required: true,
  }
});
</script>

<template>
  <div class="box">
    {{ post.body }}
    <h4 class="title">comments ({{ post.comments.length }})</h4>
    <CommentItem v-for="comment in post.comments" :comment="comment" :key="comment.id" />
  </div>
</template>

<style scoped>
.box {
  border: 1px solid grey;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
}

.title {
  font-style: italic;
  color: hsla(160, 100%, 37%, 1);
}
</style>
