<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form
        v-if="!loading"
        v-model="valid"
        @submit.prevent="signUp"
        @keydown.prevent.enter>
            <v-text-field
              v-model="user.username"
              :rules="notEmptyRules"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.displayName"
              :rules="notEmptyRules"
              label="Display Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              :rules="notEmptyRules"
              label="Password"
              type= "password"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.imageUrl"
              :rules="notEmptyRules"
              label="Image Url"
              required
            ></v-text-field>
            <v-btn type="submit" :disabled="!valid">SignUp</v-btn>
         </v-form>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary">
        </v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'signUp',
  data: () => ({
    valid: false,
    user: {
      username: '',
      password: '',
      displayName: '',
      imageUrl: '',
    },
    notEmptyRules: [v => !!v || 'E-mail is required'],
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        // eslint-disable-next-line
        console.log(User);
        user.save({})
        // eslint-disable-next-line
          .then((user) => {
            // eslint-disable-next-line
            console.log(user);
            this.$router.push('/login');
          });
      }
    },
  },
};
</script>
