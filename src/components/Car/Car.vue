<template>
    <v-container>
        <v-layout row v-if="loading">
          <v-flex xs12 >
             <div class="text-xs-center">
                <v-progress-circular
                  :width="10"
                  :size="80"
                  color="grey darken-1"
                  indeterminate
                  v-if="loading"
                ></v-progress-circular>
             </div>
          </v-flex>
        </v-layout>

        <!-- <v-layout row v-if= "error">
          <v-flex xs12 sm10 offset-sm1>
            <alert-component @dismissed="onDismissed" :text="error"></alert-component>
          </v-flex>
        </v-layout> -->
         <v-snackbar class="mb-5" v-if= "error"
            v-model="snackbar"
            auto-height
            color="red"
            :multi-line="mode === 'multi-line'"
            :timeout = 0
            top
            absolute
            :vertical="mode === 'vertical'"
            >
            <alert-component @dismissed="onDismissed" :text="error"></alert-component>
            <v-btn
                color="black"
                flat
                @click="onDismissed"
            >
                Close
            </v-btn>
        </v-snackbar>

        <v-layout row wrap v-if="!loading">
            <v-flex xs12 sm10 offset-sm1>
                <v-card class="rounded-card mt-3 elevation-6">
                    <v-card-media
                    class="rounded-image white--text"
                    height="400px"
                    :src="'http://localhost:8000/storage/images/' + car.image"
                    >
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex xs12 align-end flexbox>
                                <span class="headline"> 
                                    <v-btn color="blue-grey" class="white--text" large 
                                        @click="rent(car.id)"
                                        >
                                        <v-icon left>directions</v-icon>
                                        Rent
                                    </v-btn>
                                </span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-media>
                    <v-card-title class="ma-0">
                        <div>
                            <span class="grey--text"> <h3>Model: {{car.model}} /  {{car.year}}</h3></span>
                            <span class="grey--text">Price: {{car.price}} euros/day</span><br>
                            <span class="grey--text">Location: {{car.location}}</span><br>
                            <span class="grey--text">Fuel consumption: {{car.consuming}}l per 100km</span><br>
                            <span class="grey--text">Description: {{car.description}}</span><br>
                        </div>
                    </v-card-title>
                    <v-card-actions v-if="canUserEdit">
                            <span>
                                <v-btn large flat @click="deleteCar(car.id)">
                                    <v-icon left>delete</v-icon>
                                    Delete
                                </v-btn>
                            </span>
                            <span><edit-car-dialog :car="car"></edit-car-dialog></span>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { carService } from '../../services/carService';
export default {
     data () {
      return {
        snackbar: false,
        y: '500',
        x: null,
        mode: '',
        timeout: 6000
      }
    },
    methods: {
        deleteCar(id){
            carService.deleteCar(id);
        },
        onDismissed() {
            this.snackbar = false;
            this.$store.dispatch('clearError');
        },
        rent(id) {
            if (!this.isUserauthenticated) {
             this.$router.push('/login')
            } else {
                // ovde treba dodati logiku za rentiranje
              this.$router.push(`/rent-car/${id}`)
            }
        }
    },
    
    computed: {
       car () {
        var id = this.$route.params.id;
        return this.$store.getters.getCarById(id);
      },
      loading () {
        return this.$store.getters.loading
      },
      error() {
          if(this.$store.getters.error){
            this.snackbar = true;
            return this.$store.getters.error;
          }
      },

    isUserauthenticated() {
       return this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;
    },
    canUserEdit() {
        if (!this.isUserauthenticated) {
            return
        }
        return this.$store.getters.currentUser[0].company_id == this.car.company_id
    }
    }
}
</script>

<style scoped>
.rounded-card{
    border-radius:10px;
}

.rounded-image{
    border-radius:10px 10px 0px 0px;
    margin: 0px;
}

</style>

