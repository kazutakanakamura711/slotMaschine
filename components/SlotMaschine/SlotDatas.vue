<template>
  <div>
    <table class="datasTitle">
      <thead>
        <tr>
          <td
            v-for="(counter, index) in $store.state.datasCounter"
            :key="index"
          >
            <v-alert
      color="green accent-3"
      dark
      dense
    >
      {{ counter.title }}
    </v-alert>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            class="datasCounter" v-for="(counter, index) in $store.state.datasCounter"
            :key="index"
          >
            <v-alert
      color="green accent-3"
      dark
      dense
      outlined
    >{{ counter.count }}
    </v-alert>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.datasCounter {
  text-align: right;
}
</style>