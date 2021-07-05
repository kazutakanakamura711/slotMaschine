<template>
  <v-simple-table height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            
          </th>
          <th class="text-left">
            Game
          </th>
          <th class="text-left">
            BonusType
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,i in $store.state.history" :key="i"
        >
          <td>{{ i + 1 }}time ago</td>
          <td>{{ item.game }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
  },

}
</script>

<style>

</style>