<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="deep-purple accent-2"
            v-bind="attrs"
            v-on="on"
          >slumpGraf</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="deep-purple accent-2"
              dark
            >slumpGraf</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">
                <SlotGraf :slumpGraf="slumpGraf" />
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>

    <v-col cols="auto">
      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="deep-purple accent-2"
            v-bind="attrs"
            v-on="on"
          >BONUS history</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="deep-purple accent-2"
              dark
            >BONUS history</v-toolbar>
            <v-card-text>
              <div  class="text-h4 pa-12">
                <SlotDataTable/>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    props: {
      slumpGraf: Array,
    }
  }
</script>

<style>

</style>