<template>
    <header>
        <div class="bgimg"><img class="blur" :src="seller.avatar" alt="背景图片"></div>
        <img class="avatar" :src="seller.avatar" alt="商品头像">
        <div class="info">
            <span></span>
            <span class="storename">{{seller.name}}</span>
            <p class="takeout">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
            <span></span>
            <span class="support">{{seller.supports[0].description}}</span>
        </div>
         <div class="supports-count">{{seller.supports.length}}个
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="bulletin" @click="showDetail">
                <span></span>
                <span class="bulltext">{{seller.bulletin}}</span>
                <span class="icon-keyboard_arrow_right"></span>
        </div>
        <transition name="fade">
            <!-- 商品页的公告 -->
            <div v-show="isShowDetail" class="detail">
                <h2>{{seller.name}}</h2>
                <!-- 星星 -->
                <star :seller="seller"></star>
                <h4><span>优惠信息</span></h4> 
                <ul>
                    <li v-for="s in seller.supports">
                        <span class="type" :class="'type'+s.type"></span>
                        <span class="message">{{s.description}}</span>
                    </li>
                </ul>
                <h4><span>商家公告</span></h4>
                <p>{{seller.bulletin}}</p>
                <div class="iconfont icon-close" @click="hideDetail"></div>
            </div>
        </transition>
    </header>
</template>

<script>
// 头部
import Star from '@/components/star/Star'
    export default {
        name:'sellHeader',
        data(){
            return{
                isShowDetail:false
            }
        },
        props:{
            seller:{
                type:Object
            }
        },
        methods: {
            showDetail() {
                this.isShowDetail=true;
            },
            hideDetail(){
                this.isShowDetail=false;
            }
        },
        // created(){
        //     this.$http.get('/api/seller').then((res)=>{
        //         // 获取成功
        //         this.seller=res.body.data;
        //         // console.log(this.seller);
        //     },(res)=>{
        //         // 获取失败
        //         console.log("获取失败");
        //     })
        // },
         components:{
            Star
        }
    }
</script>

<style scoped>
header{
    position:relative;
    display:flex;
    height:2.68rem;
    background:url();
    background-color:rgba(7,17,27,0.5);
    overflow: hidden;
}
header .bgimg{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: 2.68rem;
    z-index:-1;
}
header .bgimg .blur{
    width:100%;
    height:100%;
    background-size:100%;
}
header .avatar{
    width:1.28rem;
    height:1.28rem;
    margin:0.48rem 0.32rem 0.36rem 0.48rem;
    border-radius:4px;
}
header .info{
    margin-top:0.48rem;
}
header .info span:first-child{
    display:inline-block;
    width:.6rem;
    height:.36rem;
    background:url(brand@2x.png) center no-repeat;
    background-size:100% 100%;
    vertical-align: middle;
}
header .info span:nth-child(4){
    display:inline-block;
    width:.36rem;
    height:.36rem;
    background:url(decrease_1@2x.png) center no-repeat;
    background-size:100% 100%;
    vertical-align: middle;
}
header .info .storename{
    font-weight:bold;
    line-height:0.36rem;
    font-size:0.32rem;
    color:#fff;
}
header .info .takeout{
    font-size:0.24rem;
    line-height:.24rem;
    margin-top:0.16rem;
    color:#e3e3e4;

}
header .info .support{
    display:inline-block;
    margin-top:0.2rem;
    font-size:.2rem;
    line-height:0.24rem;
    color:#e3e3e4;

}
header .supports-count{
    position: absolute;
    bottom: .7rem;
    right: .24rem;  
    padding: .14rem .16rem;
    font-size: .2rem;
    font-weight: 200;
    line-height: .24rem; 
    border-radius: .5rem;
    background-color: rgba(0,0,0,0.2);
}
header .bulletin{
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    height:0.56rem;
    line-height:0.56rem;  
    background-color:#4F545B;
}
header .bulletin span:first-child{ 
    display:inline-block;
    width:0.5rem;
    height:0.36rem;
    margin:0.1rem .08rem 0.1rem 0.24rem;
    background:url(bulletin@2x.png) center no-repeat;
    background-size:100% 100%;
}
header .bulletin .bulltext{
    display:inline-block;
    width:70%;
    font-size:0.2rem;
    margin-right:0.08rem;
    white-space:nowrap;
    text-overflow: ellipsis;;
    overflow: hidden;
}
header .bulletin .icon-keyboard_arrow_right{
    float:right;
    line-height:0.56rem;
    margin-right:0.24rem;
}

header ul{
    margin:0.48rem 0 0.56rem 0;
    text-align:left;
    font-size:0.24rem;
    color:rgb(255,255,255);
   
}
header ul li{
    margin-bottom:0.24rem;
}
header ul li .message{
    margin-left:0.12rem;
}
header ul li .type{
    display:inline-block;
    width: .32rem;
    height: .32rem;
    background:url(decrease_2@2x.png) center no-repeat;
    background-size:100%;
    vertical-align:middle;
}
header ul li .type0{
    background-image:url(decrease_2@2x.png);
}
header ul li .type1{
    background-image:url(discount_2@2x.png);
}
header ul li .type2{
    background-image:url(special_2@2x.png);
}
header ul li .type3{
    background-image:url(invoice_2@2x.png);
}
header ul li .type4{
    background-image:url(guarantee_2@2x.png);
}
header .detail{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    padding: 1.28rem .72rem .64rem .72rem;
    box-sizing:border-box;
    text-align:center;
    font-size:0.32rem;
    color:rgb(255,255,255);
    line-height:0.32rem;
    background-color: rgba(7, 17, 27, .8);
    z-index:1;
}
header .detail h4{
    position: relative;
    margin-bottom: .48rem;
    height: .28rem;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
}
header .detail h4 span{
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 0 .24rem;
    transform: translateX(-50%);
    background-color:#394149;
}
header .detail p:nth-last-child(2){
    display:inline-block;
    line-height:0.48rem;
    font-size:0.24rem;
}
header .detail div:last-child{
    position:absolute;
    bottom:0;
    left:0;
    width:100%;
    margin-bottom:0.64rem;
    font-size:.64rem;
    color:rgba(255, 255, 255, .5);
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.5s ease;  
  }  
.fade-enter, .fade-leave-active{
  opacity: 0 ;
}
</style>