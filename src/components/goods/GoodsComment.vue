<template>
  <div class="layout">
    <better-scroll :data="commentList">
      <div class="content">
        <comment :listId="goodsId" @getlist="cmtArray"></comment>
      </div>
    </better-scroll>
  </div>
</template>

<script>
import desComments from '../subComponents/Comment.vue';
import scroll from '../subComponents/Scroll.vue';
export default {
  data() {
    return {
      goodsId: this.$route.params.id,
      commentList: []
    };
  },
  components: {
    comment: desComments,
    'better-scroll': scroll
  },
  methods: {
    cmtArray(val) {
      this.commentList = val;
    }
  }
};
</script>
