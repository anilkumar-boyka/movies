<template>
  <div class="container-fluid">
    <b-card-group deck class="row" v-if="moviesData.length">
      <b-card
        class="movie-div mt-2 col-md-4"
        v-for="(movie, i) in moviesData"
        :key="i"
        @click="movieDetails(movie.imdbID)"
        bg-variant="dark"
        text-variant="white"
        border-variant="white"
        style="max-width: 20rem"
        header-border-variant="white"
      >
        <template #header>
          <span class="font-weight-bolder">{{ movie.Title }}</span>
        </template>

        <b-card-img style="max-height: 15rem" :src="movie.Poster"> </b-card-img>
      </b-card>
    </b-card-group>
    <b-card v-else class="mt-2">No Movies to show!</b-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["moviesData"],
  data() {
    return { selectedMovies: this.moviesData };
  },
  methods: {
    movieDetails: function (imdbId) {
      this.$router.push({ name: "MovieDetails", params: { imdbId: imdbId } });
    },
  },
};
</script>
<style scoped>
.movie-div {
  margin-left: 15px;
  /*  position: relative; */
  /*  top: 0; */
  /*  transition: top ease 0.5s; */
}
.row {
  display: flex;
  justify-content: center;
}
.movie-div :hover {
  cursor: pointer;
  top: -4px !important;
  box-shadow: 0 0 3px black;
}
</style>