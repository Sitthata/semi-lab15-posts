<template>
  <div class="comment-form">
    <h3>New Comment</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" id="name" name="name" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="text" id="email" name="email" />
      </div>
      <div class="form-group">
        <label for="stars">Stars</label>
        <input v-model="star" min="0" max="5" type="number" id="stars" name="stars" />
      </div>
      <div class="form-group">
        <label for="comment">Comment</label>
        <textarea v-model="comment" type="text" id="comment" name="comment" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { addDoc, collection } from 'firebase/firestore';
import { ref } from 'vue';
import db from '../firebase/init';

const props = defineProps({
    postId: {
        type: String,
        required: true,
    },
})

const email = ref('');
const name = ref('');
const comment = ref('');
const star = ref(0);

async function handleSubmit() {
    const commentRef = collection(db, 'posts', props.postId, 'comments');
    await addDoc(commentRef, {
        email: email.value,
        name: name.value,
        comment: comment.value,
        cmtdate: new Date(),
        stars: star.value,
    })
    email.value = '';
    name.value = '';
    comment.value = '';
    star.value = 0;
}
</script>

<style scoped>
.comment-form {
  max-width: 500px;
  margin: 0 auto;
  border-radius: 8px;
}

h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
}

input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2563eb;
}
</style>
