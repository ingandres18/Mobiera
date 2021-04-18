<template>
  <v-dialog v-model="dialogUser" max-width="1000px" persistent>
    <v-form ref="form1" v-model="valid" :lazy-validation="lazy">
      <v-card>
        <v-card-title class="headline primary" primary-title>
          <font color="white">
            <b>{{message}}</b>
          </font>
          <v-spacer></v-spacer>
          <v-btn text @click="close">
            <v-icon color="red" size="35">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-container fluid>
          <v-card-text>
            <v-row>
              <v-col>
                <v-form horizontal label="Nombre" class="mv-0">
                  <v-text-field
                    :rules="[rules.required]"
                    required
                    outlined
                    dense
                    clearable
                    label="Nombre"
                    v-model="name"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-form horizontal label="Email" class="mv-0">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    outlined
                    required
                    dense
                    clearable
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-form horizontal label="Password" class="mv-0">
                  <v-text-field
                    :rules="[rules.required]"
                    required
                    outlined
                    dense
                    clearable
                    label="Password"
                    v-model="pss"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#00416A" @click="close" text>
              <v-icon color="red" size="35">mdi-close</v-icon>
            </v-btn>
            <v-btn
              :disabled="validFields"
              @click="saveData"
              color="#00416A"
              text
            >
              <v-icon size="35" color="green">mdi-content-save</v-icon>
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
export default {
  components: {},
  props: {
    dialogUser: Boolean,
    typeAction: String,
    user: Object,
  },
  data() {
    return {
      lazy: false,
       message:null,  
      valid: true,
      name: null,
      pss: null,
      email: null,
      rules: {
        required: (value) => !!value || "Valor obligatario",
      },
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+/.test(v) || "E-mail debe ser valido",
      ],
    };
  },
  methods: {
    close() {
      this.$emit("closeDialogUser");
    },
    clearFrom() {
      (this.person = null),
        (this.name = " "),
        (this.pss = " "),
        (this.mail = "");
    },
    saveData() {
      if (this.$refs.form1.validate()) {
        if (this.typeAction === "I") {
          let payload = {
            email: this.email,
            pss: this.pss,
            user: this.name,
          };
          this.clearFrom();
          this.$emit("dataSave", payload);
        } else {
          let payload = {
            id: this.user.id,
            email: this.email,
            pss: this.pss,
            user: this.name,
          };
          this.clearFrom();
          this.$emit("upSave", payload);
        }
      }
    },
  },
  watch: {
    typeAction(type) {
      if (type === "I") {
        this.message = "Agregar Usuario"
        this.name = null,
        this.email = null,
        this.pss = null;
      } else {
         this.message = "Editar Usuario"
        this.name = this.user.name,
        this.email = this.user.email,
        this.pss = this.user.pss;
      }
    },
  },
  computed: {
    validFields() {
      if (this.name !== null && this.email !== null && this.pss !== null) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
