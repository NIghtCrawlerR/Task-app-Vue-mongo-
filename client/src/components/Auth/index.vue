<template>
  <div class="container">
    <form @submit.prevent="submit" class="mt-5">
      <h3 v-if="regForm">Registration</h3>
      <h3 v-else>Login</h3>

      <div v-if="authError && authError.length > 0" class="form-group">
        <small class="text-danger">{{authError}}</small>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="username"
          name="username"
          placeholder="username"
          required
        />
      </div>
      <div v-if="regForm" class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="email"
          name="email"
          placeholder="email"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="password"
          name="password"
          placeholder="password"
          required
        />
      </div>
      <div v-if="regForm" class="form-group">
        <input
          type="password"
          class="form-control"
          v-model="confirm_password"
          name="confirm_password"
          placeholder="confirm_password"
          required
        />
      </div>
      <div class="form-group">
        <button class="btn btn-info">Submit</button>
      </div>
      <div class="form-group">
        <router-link v-if="regForm" to="/login">Have an account? Log in.</router-link>
        <router-link v-else to="/register">Dont have an account? Register.</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "Auth",
  props: {
    loginForm: Boolean,
    regForm: Boolean
  },
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      masterError: ''
    }
  },
  computed: {
    ...mapGetters(['authError'])
  },
  methods: {
    ...mapActions(['login', 'register']),
    submit() {
      if (this.loginForm) {
        let user = {
          username: this.username,
          password: this.password
        }
        this.login(user)
          .then(res => {
            if (res.data.success) {
              this.$router.push('/dashboard')
            }
          })
          .catch(err => {
            console.log('login error: ', err)
          })
      } else {
        let userData = {
          username: this.username,
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        }
        this.register(userData)
          .then(res => {
            if (res.data.success) {
              this.$router.push('/login')
            }
          })
          .catch(err => {
            console.log('register error: ', err)
          })
      }
    }
  }
}
</script>