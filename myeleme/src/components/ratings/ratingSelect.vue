<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{'active': selectType === 2}">{{desc.all}}<span
        class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active': selectType === 0}">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active': selectType === 1}">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent($event)" class="switch" :class="{active:onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
// 满意
  const POSITIVE = 0;
// 不满意
  const NEGATIVE = 1;
// 全部
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      // 正面评价
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      // 负面评价
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type) {
        this.$emit('select', type);
      },
      toggleContent(event) {
        this.$emit('toggle');
      }
    }
  };
</script>

<style scoped>
.ratingselect .rating-type{
  padding:0.36rem 0 0.36rem 0.48rem;
  border-bottom:1px solid #EFF0F0;
}
.ratingselect .rating-type .block{
  padding:0.15rem;
  margin-right:0.11rem;
  border-radius:0.03rem;
}
.ratingselect .rating-type .block.active{
   background-color:#00A0DC;
   color:#fff;
}
.ratingselect .rating-type .positive{
    background: rgba(0, 160, 220, 0.2);
}
.ratingselect .rating-type .positive.active{
   background: rgb(0, 160, 220);
}
.ratingselect .rating-type .negative {
   background: rgba(77, 85, 93, 0.2);
}
.ratingselect .rating-type .negative.active{
   background: rgb(77, 85, 93);
}
.ratingselect .switch{
  padding: 0.3rem;
  margin-left:0.06rem;
  line-height: 24px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  color: rgb(147, 153, 159);
}
.ratingselect .switch.active{
  color: #00c850;
}
</style>
