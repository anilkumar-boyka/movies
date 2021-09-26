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
              ref="movieSearch"
              type="text"
              @focus="isAutofocused = true"
              @blur="removeFocus()"
              @input="enteredTitle($event)"
              autofocus
              v-model="movieName"
              :value="movieName"
              id="input-none"
              placeholder="Enter movie name.."
            ></b-form-input>
            <div
              class="recent-searches-div text-muted"
              v-if="isAutofocused && recentSearches.length"
            >
              <ul class="p-0">
                <div class="recent-serach-heading mt-1 text-info">
                  <i>Recent Searches...</i>
                </div>
                <li
                  v-for="(movie, i) in recentSearches"
                  :key="i"
                  @click="selectedRecentMovie(movie)"
                >
                  {{ movie }}
                </li>
              </ul>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import { debounce } from "debounce";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
export default {
  name: "HomePage",
  components: { NavBar },
  data() {
    return {
      enteredMovieName: "",
      movieName: "",
      recentSearches: [],
      isAutofocused: "",
    };
  },
  methods: {
    enteredTitle: debounce(function (e) {
      this.$emit("movieTitle", e);
    }, 500),
    removeFocus() {
      setTimeout(() => {
        this.isAutofocused = false;
      }, 80);
    },
    selectedRecentMovie: function (name) {
      this.movieName = name;
      this.$emit("movieTitle", name);
    },
    fetchRecentSearches: function () {
      const db = getDatabase();
      let email = this.$store.getters.getEmail;
      email = email.substring(0, email.length - 4);
      const starCountRef = ref(db, `movies-41a20-default-rtdb/${email}`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          this.recentSearches = Object.values(data).map((e) => e.movieName);
        }
        this.recentSearches = [...new Set(this.recentSearches)];
        this.recentSearches = this.recentSearches
          .slice(Math.max(this.recentSearches.length - 5, 0))
          .reverse();
      });
    },
  },
  mounted() {
    this.fetchRecentSearches();
  },
};
</script>
<style scoped>
.recent-searches-div {
  text-align: left !important;
  position: absolute;
  z-index: 1000;
  overflow: revert;
  background: white;
  border: 2px solid lightgray;
  width: -moz-available;
  padding-right: 20px;
  margin-right: 27px;
}
li,
.recent-serach-heading {
  list-style: none;
  padding: 5px 0px 5px 10px;
}
li:hover {
  cursor: pointer;
  background-color: lightgray;
}
</style>