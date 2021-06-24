<template>
  <div class="container">
    <div v-for="post in posts" :key="post._id" class="card my-5">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ post.title }}</p>
          </div>
        </div>

        <div class="content">
          {{ post.content }}
          <p />
          <strong>Creator: {{ post.creator }}</strong>
          <figure class="image is-128x128">
            <img
              class="is-rounded"
              src="https://bulma.io/images/placeholders/128x128.png"
            />
          </figure>
        </div>
      </div>
      <div class="card">
        <footer class="card-footer">
          <button @click="editPost(post._id)" class="card-footer-item button is-warning">
            Edit
          </button>
          <button @click="removePost(post._id)" class="card-footer-item button is-danger">
            Delete
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const posts = ref([]);

    const API_URL = "http://localhost:5000/posts";
 // anasayfa render olduğu anda getpostu çalıştır 
    onMounted(() => {
      getPosts();
    });

    async function getPosts() {
      try {
        const response = await fetch(API_URL);
        const json = await response.json();
        posts.value = json;
      } catch (error) {
        console.log(error);
      }
    }

    async function removePost(_id) {
      const response = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });
      getPosts();
    }

    async function editPost(_id) {
      router.push({
        name: "Update",
        params: {
          id: _id,
        },
      });
    }
    // template tarafında kullanmak istenildiğinde functları rtrn etmek gerekiyor.
    return {
      posts,
      removePost,
      editPost,
    };
  },
};
</script>

<style></style>
