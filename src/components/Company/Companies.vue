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
        <v-layout row v-if="!loading">
            <v-flex xs12 sm10 offset-sm1>
                <v-card class="rounded-card">
                    <v-container fluid grid-list-sm>
                        <v-layout row wrap>
                            <v-flex xs12 v-for="company in companies" :key="company.id" class="rounded-card elevation-6 ma-2"> 
                                <v-card-media
                                    class="rounded-image white--text"
                                    height="200px"
                                    src="https://ps.w.org/multiple-location-google-map/assets/banner-772x250.png?rev=1451222"
                                    >
                                      <v-container fill-height fluid>
                                        <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span > <h3 class="black--text"> DEMO APP - FAKE GOOGLE MAP</h3></span>
                                            <span > <h3 class="black--text"> REAL APP - REAL GOOGLE MAP</h3></span>
                                        </v-flex>
                                        </v-layout>
                                    </v-container> 
                                </v-card-media>
                                <v-card-title>
                                    <div>
                                       
                                        <span class="grey--text">Name: {{company.name}}</span><br>
                                        <span class="grey--text">Address: {{company.address}}</span><br>
                                        <span class="grey--text">Phone: {{company.phone}}</span>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn :to="`/companies/${company.id}/cars`" class="blue-grey--text" color="orange accent-1">Cars ({{company.numberOfCars}})</v-btn>
                                    <span><edit-company-dialog v-if="canUserEdit" :company="company"></edit-company-dialog></span>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
    </v-layout>
</v-container>
</template>

<script>
import { companyService } from '../../services/companyService';
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
    computed: {
        companies: function () {
            return this.$store.getters.getCompanies;
        },
        loading () {
            return this.$store.getters.loading
        },
        isUserauthenticated() {
            return  this.$store.getters.currentUser !== null && this.$store.getters.currentUser !== undefined;
        },
        canUserEdit() {
            if (!this.isUserauthenticated) {
                return
            }
            return this.$store.getters.currentUser[0].role_id !== 1
        },
        error() {
            if(this.$store.getters.error){
                this.snackbar = true;
                return this.$store.getters.error;
            }
        },
    },
    methods: {
        onDismissed() {
            this.snackbar = false;
            this.$store.dispatch('clearError');
        },
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

