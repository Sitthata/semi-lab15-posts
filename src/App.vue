<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { query, collection, getDocs, onSnapshot } from 'firebase/firestore'
import db from './firebase/init.js'
import UserList from './components/UserList.vue'

const users = ref([])

async function getUsers() {
  /*  add your code here */
  const userRef = collection(db, 'users')

  const unsubscribed = onSnapshot(query(userRef), (snapshot) => {
    users.value = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
  })
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <div>
    <div>
      <UserList :users="users" />
    </div>
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped></style>
