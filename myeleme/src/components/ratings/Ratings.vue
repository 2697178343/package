<template>
    <div class="box">
        <div class="startop clearfix">
            <div class="ratingl">
                <p>{{seller.foodScore}}</p>
                <div>综合评分</div>
                <div>高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="ratingr clearfix">
                <div class="standard"><span>服务态度</span><star :seller="seller"></star></div>
                <div class="standard"><span>服务态度</span><star :seller="seller"></star></div>
                <div class="standard"><span>送达时间</span><span class="times">{{seller.deliveryTime}}分钟</span></div>
            </div>
        </div>
        <div class="gap"></div>
        <rating-select @select="selectRating" @toggle="toggleContent($event)" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></rating-select>
        <div class="userating">
        <ul>
          <li v-for="(rating,index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :seller="seller"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Star from '@/components/star/Star'
import ratingSelect from '@/components/ratings/ratingSelect'
const ALL = 2;
    export default {
        name:"ratings",
        data(){
            return{
               ratings:[],
               selectType: ALL,
               onlyContent: false  //让onlyContent先为没有点击时的状态
            }
        },
        props:{
            seller:{
                type:Object
            }
        },
        components:{
            Star,
            ratingSelect,
        },
        created(){
            this.$http.get('/api/ratings').then((res)=>{
                // this.ratings=res.body.data;
                console.log(this.ratings);
            },(res)=>{
                console.log('获取失败');
            })
        },
        methods:{
            selectRating(type) {
                this.selectType = type;
            },
            toggleContent(event) {
                this.onlyContent = !this.onlyContent;
            },
            needShow(type, text) {
                if(this.onlyContent && !text){    // 如果只显示内容，但无内容时，返回false
                    return false;
                }else if (this.selectType === ALL){      // 如果是显示全部内容，每条直接返回true
                    return true;
                }else{
                    return type === this.selectType;  // 符合选择type类型的条数才显示
                }
            }
         },

    }
</script>

<style scoped>
.box .startop{
    border-bottom:1px solid rgba(7,17,27,0.1);
    padding:0.36rem  0.48rem;
}
.box .startop .ratingl{
    float:left;
    width:2.75rem;
    text-align:center;
}
.box .startop .ratingl p{
    font-size:0.48rem;
    line-height:0.56rem;
    color:rgb(255,153,0);
}
.box .startop .ratingl div:nth-last-child(2){
    font-size:0.24rem;
    line-height:0.4rem;
    color:rgb(7,17,27);
}
.box .startop .ratingl div:last-child{
    font-size:0.2rem;
    line-height:0.45rem;
    color:rgba(7,17,27,0.5);
}
.box .startop .ratingr{
    float:right;
    border-left:1px solid rgba(7,17,27,0.1);
}
.box .startop .ratingr .standard {
    padding-left:0.4rem;
    margin-bottom:0.16rem;
}
.box .startop .ratingr .standard span{
    display:inline;
    margin-right:0.15rem;
    font-size:0.24rem;
    line-height:0.36rem;
    color:rgb(7,17,27);
}
.box .startop .ratingr .standard .times{
    color:rgb(147,153,159);
    font-size:0.24rem;
    line-height:0.36rem;
}
.box .startop .ratingr .standard .stargroup{
    float:right;
    margin:0;
}
.box .startop .ratingr .standard .stargroup /deep/ .star{
    display:inline-block;
    width:0.3rem;
    height:0.3rem;
    margin-right:0.1rem;
}
.box .gap{
    height:0.32rem;
    background-color:#F3F5F7;
    border-bottom:1px solid rgba(7,17,27,0.1);
}
.box .btns{
    padding:0.36rem 0 0.36rem 0.48rem;
    border-bottom:1px solid #EFF0F0;
}
.box .btns div{
    float:left;
    padding:0.15rem;
    margin-right:0.11rem;
    border-radius:0.05rem;
}
.box .btns .allbtn{
    background-color:#00A0DC;
}
.box .btns .satis{
    background-color:#CCECF8;
}
.box .btns .nosatis{
    background-color:#E9EBEC;
}
.userating li{
    display:flex;
    padding:0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
}
.userating .avatar{
    margin-right:0.24rem;
}
.userating .avatar img{
    width:0.56rem;
    height:0.56rem;
    border-radius:50%;
}
.userating .content{
    position: relative;
    flex:1;
}
.userating .content .name{
    font-size:0.2rem;
    line-height:0.24rem;
    color:rgb(7,17,27);
}
.userating .content .star-wrapper .stargroup{
  display:inline-block;
}
.userating .content .star-wrapper .stargroup /deep/ .star{  
    width:0.3rem;
    height:0.3rem;
    margin-right:0.1rem;
}
.userating .content .delivery{
    display:inline-block;
    margin:0 0.12rem 0.12rem 0.08rem;
    font-size:0.2rem;
    font-weight:200;
    color:rgb(147,153,159);
    line-height:0.24rem;
}
.userating .content .text{
    margin-bottom:0.16rem;
    font-size:0.24rem;
    line-height:0.36rem;
    color:rgb(7,17,27);
}
.userating .content .recommend span:first-child{
    color:rgb(0,160,220);
}
.userating .content .recommend .item{
    display:inline-block;
    margin:0.05rem 0 0 0.16rem;
    padding:0.12rem;
    font-size:0.18rem;
    line-height:0.32rem;
    color:rgb(147,153,159);
    border:1px solid rgba(7,17,27,0.1);
    border-radius:0.2rem;
    background-color:rgb(255,255,255);
}
.userating .content .time{
    position: absolute;
    top:0;
    right:0;
}
</style>