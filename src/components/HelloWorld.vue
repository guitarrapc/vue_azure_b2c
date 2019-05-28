<template>
  <div>
    <div id="label">Sign-in with Microsoft Azure AD B2C</div>

    <button @click="login" v-if="!user">Login</button>
    <button @click="logout" v-if="user">Logout</button>
    <button @click="accessToken" v-if="accessToken">AccessToken</button>

    <div v-if="user">Hello from Vue.js. User is {{user.name}}</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    login() {
      this.$AuthService.login();
    },
    logout() {
      this.$AuthService.logout();
    },
    accessToken() {
      let user = this.$AuthService.getUser();
      this.$AuthService.getToken(user);
    }
  },
  computed: {
    user: function() {
      return this.$AuthService.getUser();
    }
  }
};
</script>