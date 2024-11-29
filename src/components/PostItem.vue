<script setup>
import { computed, reactive } from "vue";
import CommentItem from "../components/CommentItem.vue";
import NewComment from "../components/NewComment.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const localPost = reactive(props.post);

const averageStars = computed(() => {
  const totalStars = localPost.comments.reduce((acc, comment) => {
    return acc += comment.stars;
  }, 0);
  return localPost.comments.length === 0 ? 0 : (totalStars / localPost.comments.length).toFixed(2);
});
</script>

<template>
  <div class="box">
    {{ post.body }}
    <NewComment :postId="post.id" />
    <h4 class="title">
      comments ({{ localPost.comments.length }}) (average: {{ averageStars }})
    </h4>
    <CommentItem
      v-for="comment in localPost.comments"
      :comment="comment"
      :key="comment.id"
    />
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
