<template>
  <div>
    <nav-bar />
    <b-card>
      <b-container fluid v-if="$route.name === 'MoviesList'">
        <b-row class="my-1">
          <b-col sm="3">
            <label for="input-none" class="pt-1"
              >Search your favourite movies:</label
            >
          </b-col>
          <b-col sm="9">
            <b-form-input
              type="text"
              @input="enteredTitle($event)"
              autocomplete="on"
              autofocus
              v-model="movieName"
              id="input-none"
              placeholder="Enter movie name.."
            ></b-form-input>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import { debounce } from "debounce";

export default {
  name: "HomePage",
  components: { NavBar },
  data() {
    return {
      enteredMovieName: "",
      movieName: "",
    };
  },
  methods: {
    enteredTitle: debounce(function (e) {
      this.$emit("movieTitle", e);
    }, 500),
  },
};
</script>