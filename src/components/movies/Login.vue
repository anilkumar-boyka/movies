<template>
  <div class="container my-5">
    <b-card
      title="Login"
      class="login"
      align-center
      bg-variant="dark"
      text-variant="white"
      ><hr />
      <b-card-body>
        <b-form @submit.prevent="login">
          <b-form-group>
            <label>Username</label>
            <b-form-input
              label="Email"
              type="email"
              v-model="credentials.email"
              placeholder="Enter your Email"
              required
              class="mb-3"
            >
            </b-form-input>
            <label>Password</label>
            <b-form-input
              label="Password"
              type="password"
              v-model="credentials.password"
              placeholder="Enter your Password"
              required
              class="mb-3"
            >
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">
            <span v-if="loginButton">Log in</span>
            <span v-else><b-spinner variant="primary"></b-spinner></span>
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      credentials: { email: "", password: "" },
      loginButton: true,
    };
  },
  methods: {
    login: function () {
      this.loginButton = false;
      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        this.credentials.email,
        this.credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          this.$store.dispatch("login", user);
          this.loginButton = false;
          this.$toasted.success(`Welcome ${user.email}`, {
            duration: 1000,
            theme: "bubble",
          });
          this.$router.push({ name: "MoviesList" });
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.$toasted.error(`${errorMessage}`, { duration: 1700 });
        });
    },
  },
};
</script>
<style scoped>
.login {
  max-width: 40rem;
  margin: auto;
}
</style>