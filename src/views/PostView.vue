<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase/init.js";
import PostItem from "../components/PostItem.vue";

const user = ref("");
const posts = ref([]);
const route = useRoute();

async function getPosts() {
  user.value = route.params.user;
  const postRef = collection(db, "posts");
  const qry = query(postRef, where("user", "==", user.value));
  const postSnapshot = await getDocs(qry);
  posts.value = [];

  for (const doc of postSnapshot.docs) {
    const post = {
      id: doc.id,
      ...doc.data(),
    };

    const commentRef = collection(db, "posts", doc.id, "comments");
    const commentSnapshot = await getDocs(commentRef);
    const comments = commentSnapshot.docs.map((commentDoc) => ({
      id: commentDoc.id,
      ...commentDoc.data(),
    }));

    post.comments = comments;
    posts.value.push(post);
  }

  console.log("Posts after fetching:", posts.value);
}

onMounted(() => {
  getPosts();
});

watch(() => route.params.user, getPosts);
</script>

<template>
  <h3>Posts : {{ user }}</h3>
  <div v-if="posts.length > 0">
    <PostItem v-for="post in posts" :post="post" :key="post.id" />
  </div>
  <div v-else><h2 class="text-3xl">Empty Posts</h2></div>
</template>

<style scoped></style>
