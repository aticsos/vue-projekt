<template>
  <div class="app">
    <Toast position="top-right" />
    <form>
      <app-InputText
        v-model="pst.titel"
        type="text"
        placeholder="Enter Titel"
      />
      <p>
        <app-InputText
          v-model="pst.body"
          type="text"
          placeholder="Enter Text"
        />
      </p>
      <p>
        <!--onkeypress prevents any non number to be entert, if you are editing a post you can't change id-->
        <app-Input
          v-if="edit != 0"
          v-model="pst.id"
          type="text"
          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          placeholder="Enter ID"
        />
      </p>
      <!--if edit is not the case call postData(uses post) if edit is activ call editPost(uses put)-->
      <app-button v-if="edit != 0" v-on:click="postData($event)">
        post
      </app-button>
      <app-button v-else v-on:click="editPost($event)">edit</app-button>
    </form>
  </div>
</template>
<script lang="ts">
import { post } from "@/types/post";
import { defineComponent } from "vue";
import Toast from "primevue/toast";
export default defineComponent({
  name: "App",
  components: {
    Toast,
  },
  data() {
    return {
      //post data type
      pst: { userId: 1, titel: "", body: "", id: 0 } as post,
      //variabel to check wether you are makeing a new post or editing a post
      edit: 1,
    };
  },
  created() {
    document.body.style.backgroundColor = "black";
    //get data from url query and check if it is the rigth typ
    if (typeof this.$route.query.titel === "string") {
      this.pst.titel = this.$route.query.titel;
    }
    if (typeof this.$route.query.body === "string") {
      this.pst.body = this.$route.query.body;
    }
    if (typeof this.$route.query.id === "number") {
      this.pst.id = this.$route.query.id;
    }
    //a special case because type of won't work
    this.edit = Number(this.$route.query.edit);
  },
  methods: {
    // send the post to the "server" with a POST request
    postData: function (event: Event) {
      event.preventDefault();
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: this.pst.titel,
          body: this.pst.body,
          userId: this.pst.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) {
          this.$toast.add({
            severity: "success",
            summary: "post erfolgreich",
            life: 3000,
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "fehler beim posten",
            life: 3000,
          });
        }
      });
    },
    //same as postData only put insted of post and the postes id at the end of the url
    editPost: function (event: Event) {
      event.preventDefault();
      fetch("https://jsonplaceholder.typicode.com/posts/" + this.pst.id, {
        method: "PUT",
        body: JSON.stringify({
          title: this.pst.titel,
          body: this.pst.body,
          userId: this.pst.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) {
          this.$toast.add({
            severity: "success",
            summary: "post erfolgreich",
            life: 3000,
          });
        } else {
          this.$toast.add({
            severity: "error",
            summary: "fehler beim posten",
            life: 3000,
          });
        }
      });
    },
  },
});
</script>
