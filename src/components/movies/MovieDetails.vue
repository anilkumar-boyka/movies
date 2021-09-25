<template>
  <div v-if="movieDetails.length">
    <b-container fluid>
      <b-card
        no-body
        class="m-5 mt-2 w-75"
        bg-variant="dark"
        text-variant="white"
      >
        <b-row>
          <b-col sm="4" class="font-weight-bolder">
            <b-card-img :src="movieDetails[0].Poster" alt="Image"></b-card-img>
          </b-col>
          <b-col sm="8" class="position-relative vh-50">
            <b-card-body :title="movieDetails[0].Title">
              <b-card-text>
                <div>Released Year : {{ movieDetails[0].Year }}</div>
                <div>IMDB ID : {{ movieDetails[0].imdbID }}</div>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
  <div v-else>Nothing to show! Movie Details doesnt exist!</div>
</template>
<script>
export default {
  props: ["moviesData"],
  data() {
    return {
      movieDetails: [],
    };
  },
  mounted() {
    if (this.moviesData.length) {
      this.movieDetails = this.moviesData.filter(
        (e) => e.imdbID === this.$route.params.imdbId
      );
    }
  },
};
</script>
<style scoped>
.font-weight-bolder {
  text-align: left;
}
@media only screen and (min-width: 700px) {
  .card-body {
    position: relative;
    top: 30%;
    bottom: 5px;
  }
}
</style>