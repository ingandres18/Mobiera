<template>
  <div>
    <v-app-bar app color="black" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Mobiera Logo"
          class="shrink mr-2"
          contain
          src="@/assets/mobi2.jpg"
          transition="scale-transition"
          width="130"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="addUser" text>Agregar Usuario</v-btn>
      <v-btn text @click="logout">Log out</v-btn>
    </v-app-bar>
   <v-container>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="4">
          <h1 class="display-1 font-weight-thin mb-4"><strong>Bienvenido!!</strong></h1>
          <h4 class="subheading">Prueba de desarrollo para cargo Front-End</h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="170px"
              src="@/assets/vue+vuetify.jpg"
            >
            </v-img>
            <v-card-subtitle class="pb-0"
              ><strong>VUEJS + VUETIFY</strong></v-card-subtitle
            >
            <v-card-text class="text--primary mt-2">
              <div>
                Vue is a progressive framework for building user interfaces.
                Unlike other monolithic frameworks, Vue is designed from the
                ground up to be incrementally adoptable. The core library is
                focused on the view layer only, and is easy to pick up and
                integrate with other libraries or existing projects.
              </div>
            </v-card-text>
            <v-card> </v-card>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="800">
            <v-card-subtitle class="pb-0"></v-card-subtitle>
            <v-card-actions>
              <v-btn color="success" @click="addUser" text>
                Agregar Usuario</v-btn
              >
            </v-card-actions>
            <v-data-table
              :headers="fieldsUsers"
              :items="getselectLogin"
              :items-per-page="5"
              loading-text="Cargando datos"
              no-data-text="Datos no disponibles"
              :footer-props="{
                itemsPerPageText: textPagination,
                itemsPerPageAllText: 'Todos',
                pageText: '{0}-{1} de {2} Registros',
              }"
            >
              <template v-slot:item.id="{ item }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  @click="edit(item)"
                  color="primary"
                >
                  <v-icon dark> mdi-format-list-bulleted-square </v-icon>
                </v-btn>
              </template>
              <template v-slot:item.delete="{ item }">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  @click="rest(item.id)"
                  color="error"
                >
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="100px"
              src="@/assets/mobi2.jpg"
            >
            </v-img>
            <v-card-subtitle class="pb-0"
              ><strong>MOBIERA</strong></v-card-subtitle
            >
            <v-card-text class="text--primary mt-2">
              <div>
                MOBIERA is a Technology Driven and Innovation Company focused on
                developing premium software and cutting-edge Solutions for
                Mobile Operators around the world. MOBIERA helps MNOs to
                increase revenues by integrating content management, advertising
                strategies, and big data solutions.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
</v-container>
    <upSertUser
      :dialogUser="dialogUser"
      :typeAction="typeAction"
      :user="user"
      @closeDialogUser="dialogUser = false"
      @dataSave="dataSave"
      @upSave="upSave"
    ></upSertUser>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import upSertUser from "@/components/users/upsertUser";
import { userService } from "@/services/user/user";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    upSertUser,
  },
  data() {
    return {
      fieldsUsers: [
        { text: "Usuario", value: "user" },
        { text: "Email", value: "email" },
        { text: "Password", value: "pss" },
        { text: "", value: "id" },
        { text: "", value: "delete" },
      ],
      all: null,
      textPagination: "Filas por página",
      dialogUser: false,
      typeAction: null,
      user: null,
      welcome: null
    };
  },
  methods: {
    ...mapActions("login", ["loadSelectLogin"]),

    logout() {
      this.$router.push({ name: "Login" });
    },
    addUser() {
      this.dialogUser = true;
      this.typeAction = "I";
    },
    rest(id) {
      Swal.fire({
        title: "",
        text: "Esta seguro de eliminar los datos?",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#669999",
        confirmButtonColor: "#EC1C23",
      }).then((s) => {
        if (s.value == true) {
          userService
            .DelUser(id)
            .then((s) => {
              if (s === "ok") {
                this.loadSelectLogin();
                Swal.fire("Usuario Eliminado correctamente!");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    },
    edit(item) {
      this.user = {
        id: item.id,
        name: item.user,
        email: item.email,
        pss: item.pss,
      };
      this.typeAction = item.user;
      this.dialogUser = true;
    },
    dataSave(data) {
      this.dialogUser = false;

      userService
        .addUser(data)
        .then((s) => {
          if (s === "ok") {
            this.loadSelectLogin();
            Swal.fire("Usuario Agregado correctamente!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    upSave(data) {
      this.dialogUser = false;

      userService
        .UpUser(data)
        .then((s) => {
          if (s === "ok") {
            this.loadSelectLogin();
            Swal.fire("Usuario Actualizado correctamente!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters("login", ["getselectLogin"]),

  },
  async created() {
    await this.loadSelectLogin()
      .then((response) => {
        this.all = response;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>
