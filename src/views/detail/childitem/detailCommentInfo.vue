<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <div class="header-title">用户评论</div>
      <div class="header-more">更多</div>
    </div>

    <div class="info-user" v-if="commentInfo.user">
      <img :src="commentInfo.user.avatar" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created | parseTime }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-img">
        <img
          v-for="(item, index) in commentInfo.images"
          :key="index"
          :src="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from "common/utils";
export default {
  name: "detailCommentInfo",
  data() {
    return {};
  },
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    parseTime,
  },
};
</script>

<style lang='less' scoped>
.comment-info {
  padding: 15px;
  border-bottom: solid 4px #ddd;
  margin-bottom: 15px;
}
.info-header {
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
  border-bottom: solid 1px #ddd;
  .header-title {
    font-size: 1.2rem;
    font-weight: 500;
  }
}
.info-user {
  display: flex;
  align-items: center;
  padding-top: 15px;
  font-size: 1.1rem;
  img {
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.info-detail {
  padding-bottom: 15px;
  p {
    line-height: 1.6rem;
    color: #333;
  }
  .info-other {
    color: #777;
    padding-bottom: 15px;
  }
  .date {
    padding-right: 15px;
  }
  img {
    width: 80px;
    height: 80px;
    margin-right:5px;
  }
}
</style>
