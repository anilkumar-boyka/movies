<template>
  <div>
    <home-page v-on:movieTitle="searchedMovieTitle"></home-page>
    <transition name="bounce">
      <router-view :moviesData="moviesData" />
    </transition>
  </div>
</template>

<script>
import HomePage from "./HomePage";
import axios from "axios";

export default {
  name: "Movies",
  components: { HomePage },
  data() {
    return {
      moviesData: [],
      movieName: "",
    };
  },
  watch: {
    movieName() {
      this.fetchMovies;
    },
  },
  methods: {
    searchedMovieTitle: function (name) {
      this.movieName = name;
    },
  },
  computed: {
    fetchMovies: function () {
      let movieName = this.movieName;
      if (movieName) {
        axios
          .get(`http://www.omdbapi.com/?s=${movieName}&apikey=db332a01`)
          .then((res) => {
            if (res.data.Response !== "False")
              this.moviesData = res.data.Search;
            else {
              this.moviesData = "";
              this.$toasted.error(`${res.data.Error}`, {
                duration: 2000,
                theme: "bubble",
              });
            }
          })
          .catch((err) => {
            this.$toasted.error(`${err}`, { duration: 1500 });
          });
      } else this.moviesData = "";
    },
  },
  created() {
    this.fetchMovies;
  },
};
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>