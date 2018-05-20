<template>
<div class="seller">
    <div class="boss">
        <div class="title">{{seller.name}}</div>
        <div class="desc">
            <star :seller="seller"></star>
            <span class="text">({{seller.ratingCount}})</span>
            <span class="text">月售{{seller.sellCount}}单</span>
            <div class="favorite" @click="toggle">
                <span class="icon icon-favorite" :class="{active:!icon}"></span>
                <!-- <span class="text">{{favoriteText}}</span> -->
            </div>
        </div>
        <ul class="money">
            <li><p>起送价</p><span>{{seller.minPrice}}</span><span>元</span></li>
            <li><p>商家配送</p><span>{{seller.deliveryPrice}}</span><span>元</span></li> 
            <li><p>平均配送时间</p><span>{{seller.deliveryTime}}</span><span>分钟</span></li>         
        </ul>
    </div>
    <div class="bg"></div>
    <div class="affact">
        <div class="affiche">
            <p>公告与活动</p>
            <p>{{seller.bulletin}}</p>
        </div>
        <ul class="acticity">
            <li v-for="(s,index) in seller.supports" :key="index">
                <span class="type" :class="'type'+s.type"></span>
                <span>{{s.description}}</span>
            </li>
        </ul>
    </div>
    <div class="bg"></div>
    <div class="pics">
        <p>商家实景</p>
        <ul class="picslist">
            <li class="picsitem" v-for="(pic,id) in seller.pics" :key="id">
                <img :src="pic" alt="商家实景">
            </li>
        </ul>
    </div>
    <div class="bg"></div>
    <div class="info">
        <p>商家信息</p>
        <ul>
           <li class="infoitem" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
    </div>
</div>
</template>

<script>
// 引入星星的组件
import Star from '@/components/star/Star';
    export default {
        name:'Seller',
        props:{
            seller:{
                type:Object
            },
        },
        data() {
            return {
                icon:true,//爱心的颜色
            };
        },
        methods:{
            toggle(){
                this.icon=!this.icon;
            },
        },
        components:{
            Star
        },
    }
</script>

<style scoped>
.boss{
    padding:0.36rem;
    border-bottom:1px solid rgba(7,17,27,0.1);
}
.boss .title{
    font-size:0.28rem;
    line-height:0.28rem;
    color:rgb(7,17,27);
}
.boss .desc{
    position:relative;
    height:0.88rem;
    line-height:0.88rem;
    margin:0.16rem 0 0.36rem;
}
.boss .stargroup.stargroup{
    display:inline-block;
    margin-top:0;
}
.boss .stargroup /deep/ .star{
    width:0.3rem;
    height:0.3rem;
}
.boss .desc .text{
     display: inline-block;
     margin-right:0.24rem;
     font-size:0.2rem;
     line-height:0.36rem;
     color:rgba(77,85,93);
}
.boss .desc .favorite{
    position:absolute;
    top:0;
    right:0;
}
.boss .desc .favorite .icon{
    font-size:0.48rem;
    line-height:0.48rem;
    color: #d4d6d9;
}
.boss .desc .favorite .icon.active{
    color: rgb(240, 20, 20);
}
.boss .money{
    display: flex;
    border-top:1px solid rgba(7,17,27,0.1);
}
.boss .money li{
    float:left;
    flex:1;
    margin-top:0.36rem;
    text-align:center;
}
.boss .money li p{
    margin-bottom:.08rem;
    font-size:.2rem;
    line-height:.2rem;
    color:rgb(147,153,159);
}
.boss .money li:nth-child(2){
    border-left: 1px solid rgba(7,17,27,0.1);
    border-right: 1px solid rgba(7,17,27,0.1);
}
.boss .money li span:nth-child(2){
    display: inline-block;
    font-size:0.48rem;
    line-height:0.48rem;
    color:rgba(7,17,27);
}
.bg{
    height:0.32rem;
    background-color:#F3F5F7;
    border-bottom:1px solid #EAEBEC;
}
.affact{
    padding:0 0.36rem 0 0.36rem;
    border-bottom:1px solid #EAEBEC;
}
.affiche{
 margin-bottom:0.36rem;
}
.affiche p:first-child{
    margin:0.36rem 0 0.16rem;    
}

.affiche p:last-child{
    margin-left:0.24rem;
    font-size:0.24rem;
    line-height:0.48rem;
    color:red;
}
.acticity p{
    height:0.32rem;
    border-top:1px solid rgba(7,17,27,0.1);
    background-color:#F3F5F7;
}
.acticity li{
    height:0.96rem;
    padding:0 0.36rem 0 ;
    line-height:0.96rem;
    font-size:0.24rem;
    color:rgb(7,17,27);
    border-top:1px solid rgba(7,17,27,0.1);
}
.acticity .type{
    display:inline-block;
    width: .32rem;
    height: .32rem;
    background:url(decrease_2@2x.png) center no-repeat;
    background-size:100%;
    vertical-align:middle;
}
.acticity .type0{
    background-image:url(decrease_2@2x.png);
}
.acticity .type1{
    background-image:url(discount_2@2x.png);
}
.acticity .type2{
   background-image:url(special_2@2x.png);
}
.acticity .type3{
    background-image:url(invoice_2@2x.png);
}
.acticity .type4{
    background-image:url(guarantee_2@2x.png);
}
.pics,.info{
    padding:0.36rem 0 0.36rem 0.36rem;
}
.pics .picslist{
    width: 100%;
    height:1.8rem;
    margin-top:0.24rem;
    overflow: hidden;
}
.pics .picslist li{ 
   width:10.08rem;  
}
.pics .picslist li img{
    float:left;
    width:2.4rem;
    height:100%;
    margin-right:0.12rem;
}
.info ul{
    margin-top:0.24rem;
}
.info ul li{
    padding:0.32rem 0.24rem;
    line-height:0.32rem;
    font-size:0.24rem;
    font-weight:200;
    color:rgb(7,17,27);
    border-top:1px solid rgba(7,17,27,0.1);
}
</style>