<template>
  <div class="params-info" v-if="Object.keys(itemParams).length !== 0">
    <table
      v-for="(table, index) in itemParams.rule.tables"
      :key="index"
      class="table-item"
    >
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>

    <table class="table-item">
      <tr v-for="(tr, index) in itemParams.info.set" :key="index">
        <td v-for="(td, indey) in tr" :key="indey">{{ td }}</td>
      </tr>
    </table>

    <div class="params-img" v-if="itemParams.info.images">
      <img :src="itemParams.info.images[0]" />
    </div>
  </div>
</template>

<script>
export default {
  name: "detailParamInfo",
  props: {
    itemParams: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.params-info {
  .table-item {
    width: 100%;
    padding: 0 15px;
    border-spacing: 0;
    td {
      border-bottom: solid 1px #eee;
      padding: 15px  10px;
    }
  }
  table:nth-child(2),
  table:nth-child(3) {
    tr td:nth-last-child(1) {
      width: 80%;
      color: #eb596e;
    }
    padding-bottom: 15px;
  }
  padding-bottom: 15px;
  border-bottom: solid 5px #eee;
}

.params-img {
  img {
    width: 100%;
  }
}
</style>
