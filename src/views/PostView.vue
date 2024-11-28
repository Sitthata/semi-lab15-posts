<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from "vue-router"
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore"
import db from "../firebase/init.js"
import PostItem from "../components/PostItem.vue"

const user = ref("")
const posts = ref([])
const route = useRoute()

async function getPosts() {
  user.value = route.params.user
  /*  add your code here */
  const postRef = collection(db, 'posts')
  const qry = query(postRef, where('user', '==', user.value))
  const postSnapshot = await getDocs(qry)

  posts.value = await Promise.all(
    postSnapshot.docs.map(async (doc) => {
      const postData = {
        id: doc.id,
        ...doc.data()
      }

      const commentsRef = collection(db, 'posts', doc.id, 'comments')
      const commentsSnapshot = await getDocs(commentsRef)

      postData.comments = commentsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      return postData
    })
  )
  console.log(posts.value)
}

watch(() => route.params.user, getPosts)

onMounted(() => {
  getPosts()
})

</script>

<template>
  <h3>Posts : {{ user }}</h3>
  <PostItem v-for="post in posts" :post="post" :key="post.id" />
</template>

<style scoped></style>
