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
        <app-Input
          v-model="pst.id"
          type="text"
          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          placeholder="Enter ID"
        />
      </p>
      <app-button v-on:click="postData($event)">post</app-button>
    </form>
  </div>
</template>
<script lang="ts">
import { post } from "@/types/post";
import { defineComponent } from "vue";
import Toast from "primevue/toast";
export default defineComponent({
  name: "App",
  props: {
    titel: String,
    body: String,
    id: Number,
    edit: Number,
  },
  components: {
    Toast,
  },
  data() {
    return {
      //post data type
      pst: { userId: 1, titel: "", body: "", id: 0 } as post,
    };
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
          id: this.pst.id,
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
  mounted() {
    if (this.edit == 0) {
      this.pst.titel == this.titel;
      this.pst.body == this.body;
      this.pst.id == this.id;
    }
  },
});
</script>
