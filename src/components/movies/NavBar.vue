<template>
  <div>
    <nav class="navbar navbar-light bg-info">
      <a class="navbar-brand m-3 text-white"
        ><span class="me-2">Welcome</span>{{ emailId }}</a
      >
      <div>
        <b-button
          v-if="$route.name !== 'MoviesList'"
          @click="back"
          variant="primary"
          ><b-icon icon="arrow-left"></b-icon>Back</b-button
        >
        <b-button variant="danger" class="m-2 me-4" @click="logOut"
          >Log Out <b-icon icon="power" aria-hidden="true"></b-icon
        ></b-button>
      </div>
      <!--    <div><b-button class="m-2">Log Out</b-button></div> -->
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    emailId() {
      return this.$store.getters.getEmail;
    },
  },
  methods: {
    back: function () {
      this.$router.push({ name: "MoviesList" });
    },
    logOut: function () {
      this.$store.dispatch("logout");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>