<template>
  <!--if show is true iterate over all post in posts and create a card for all of them-->
  <div class="app" v-if="show">
    <ul v-for="post in postes" :key="post.id">
      <app-card class="card">
        <template #title>{{ post.title }}</template>
        <template #content>{{ post.body }}</template>
        <template #footer>
          {{ post.id }}
          <p>
            <button v-on:click="edit(post.title, post.body, post.id)">
              edit
            </button>
          </p>
        </template>
      </app-card>
    </ul>
    <button v-on:click="goback()">last page</button>
    <button v-on:click="getPost()">next page</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import router from "../router";
export default defineComponent({
  name: "App",
  components: {},
  data() {
    return {
      postes: [],
      show: true,
      x: 1,
    };
  },
  methods: {
    //get the next bundel of post
    getPost: function () {
      if (this.x == 10) {
        return;
      } else {
        this.x++;
      }
      //boolen to rerender the list
      this.show = false;
      // fetch the data, x is a variabel to remeber the "page" nummber
      fetch("https://jsonplaceholder.typicode.com/posts?_page=" + this.x)
        .then((response) => response.json())
        .then((data) => (this.postes = data));
      this.show = true;
    },
    //same as getPost() only backwards
    goback: function () {
      if (this.x == 1) {
        return;
      } else {
        this.x--;
      }
      this.show = false;
      fetch("https://jsonplaceholder.typicode.com/posts?_page=" + this.x)
        .then((response) => response.json())
        .then((data) => (this.postes = data));
      this.show = true;
    },
    edit: function (titel: string, body: string, id: number) {
      router.push({
        path: "/",
        //name: "new_post",
        query: {
          titel: titel,
          body: body,
          id: id,
          edit: 0,
        },
      });
    },
  },
  mounted() {
    //fetch the first "page" of data on load
    fetch("https://jsonplaceholder.typicode.com/posts?_page=1")
      .then((response) => response.json())
      .then((data) => (this.postes = data));
  },
});
</script>
