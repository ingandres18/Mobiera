<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="6" class="box">
        <h2>Iniciar sesión</h2>
        <validation-observer ref="observer">
          <v-form @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Correo"
              rules="required|email"
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Correo"
                required
                outlined
                dark
                filled
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                outlined
                dense
                dark
                filled
                :type="showPass ? 'text' : 'password'"
              ></v-text-field>
            </validation-provider>
            <div class="text-center">
              <v-btn
                @click="login"
                class="signin-btn"
                rounded
                color="white"
                dark
              >
                Ingresar
              </v-btn>
            </div>
          </v-form>
        </validation-observer>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationProvider,
  setInteractionMode,
  ValidationObserver,
} from "vee-validate";
import { mapActions } from "vuex";
import Swal from "sweetalert2";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Campo {_field_} no puede estar vacio",
});

extend("email", {
  ...email,
  message: "Email debe ser valido",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  async created() {
    this.loadSelectLogin()
      .then((response) => {
        this.allEmails = response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data: () => ({
    email: "",
    password: null,
    showPass: false,
    allEmails: null,
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    ...mapActions("login", ["loadSelectLogin"]),

    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.login(this.params);
      }
    },

    clear() {
      this.email = "";
      this.password = null;
      this.$refs.observer.reset();
    },
    login() {
      if (
        JSON.parse(JSON.stringify(this.allEmails)).some(
          (person) =>
            person.email === this.email && person.pss === this.password
        )
      ) {
        this.$router.push({ name: "Home" });
      } else {
        Swal.fire("El Correo o el Password no corresponden!!!");
      }
    },
  },
};
</script>
