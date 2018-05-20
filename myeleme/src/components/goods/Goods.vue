<template>
  <div class="goods">
      <div class="goodsmenu" ref="goodsmenu">
            <ul>
                <li :class="index==currentIndex?'active':''" v-for="(good,index) in goods" @click="chooseGoods(index)" :key="index">
                    <span class="text"><span v-if="good.type>=0" class="type" :class="'type'+good.type"></span>{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="goodlist" ref="goodlist">
            <ul>
                <li v-for="(good,index) in goods" :key="index">
                     <div class="foodlist" v-for="(food,i) in good.foods" :key="i">
                        <img class="foodimg" :src="food.image" alt="食物头像">
                         <div class="foodinfo">
                             <h2>{{food.name}}</h2>
                             <div class="description">{{food.description}}</div>
                             <div class="name">月售{{food.sellCount}}份 <span>好评率{{food.rating}}%</span></div>
                             <div>
                                <span class="price">￥<span>{{food.price}}</span></span>
                                 <del v-if="food.oldPrice!=''">￥10{{food.oldPrice}}</del>
                            </div>
                            <cartgroup :food="food" @add="addFood($event)"></cartgroup>
                         </div>                      
                     </div>                    
                </li>
            </ul>
        </div>       
     <shopcar ref="shopcar" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcar>
  </div>
</template>

<script>
// 引入插件
 import BScroll from 'better-scroll';
 import cartgroup from '@/components/cartgroup/cartgroup';
 import shopcar from '@/components/shopcar/shopcar';
    export default {
        name:"goods",
        data(){
            return{
                goods:[],
                liHeight:[0],
                scrollY:0//记录右侧滚动高度
            }
        },
        props:{
            seller:{
                type:Object
            },
        },
         components:{
             shopcar,
             cartgroup,
         },
        methods:{
             chooseGoods(i){
                // 点击左边，右侧相应滚动
                var oLis=this.$refs.goodlist.getElementsByTagName("li");
                this.goodsScroll.scrollToElement(oLis[i],300);
                //300是滚动时间
            },
            _initScroll(){
                // console.log(this.$refs.goodlist);
                // DOM绑定better-scroll 插件
                 this.menuScroll = new BScroll(this.$refs.goodsmenu, {
                    click: true
                });
                this.goodsScroll = new BScroll(this.$refs.goodlist, {
                    click: true,
                    //探针作用，实时监测滚动位置
                    probeType:3
                });
                this.goodsScroll.on('scroll',(pos)=>{
                    // console.log(pos.y);
                    this.scrollY=Math.abs(Math.round(pos.y));
                });
            },
            _calHeight(){
                // 所有的li
                var oLis=this.$refs.goodlist.getElementsByTagName("li");
                var ht=0; //累加li的高度
                [...oLis].forEach((el)=>{
                    ht+=el.clientHeight;
                    this.liHeight.push(ht);
                });
                // console.log(this.liHeight);
            }, 
            addFood(event) {   // 监听子元素的add事件，执行addFodd函数
                this._drop(event);
            },      
            _drop(target) {  
                   this.$refs.shopcar.drop(target); // 父组件访问子组件的方式，调用子组件的方法，传值
            },
        },        
        created(){      
            this.$http.get('/api/goods').then((res)=>{
                this.goods=res.body.data;
                // console.log(this.goods);
              //$nextTick确保DOM节点渲染完成
                this.$nextTick(()=>{
                    this._initScroll();
                    this._calHeight();
                })              
            },(res)=>{
                console.log("获取失败");
            })
        },
         computed:{
            currentIndex(){
                // this.scrollY
                for(let i=0;i<this.liHeight.length;i++){//循环到最后一项ht2会没有值，不做判断
                    var ht1=this.liHeight[i];
                    var ht2=this.liHeight[i+1];
                    if(!ht2||(this.scrollY>=ht1&&this.scrollY<ht2)){
                        return i;
                    }
                }
            },
             selectFoods(){
                let foods=[];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count){
                            foods.push(food);
                        }
                    });
                });
                return foods;
            },     
        },
    }
</script>

<style scoped>
.goods{
    position: absolute;
    top: 3.48rem;
    bottom: 1rem;
    display: flex;
    border-top: 1px solid rgba(7,17,27,0.1);
    overflow: hidden;
}
.goods .goodsmenu ul li{
    display: table;
    padding: 0 .24rem;
    width: 1.6rem;
    height: 1.08rem;
    font-size: .24rem;
    font-weight: 200;
    background-color: #f3f5f7;
    box-sizing: border-box;
}
.goods .goodsmenu ul li.active{
    color:rgb(240,20,20);
    font-weight: bold;
    background-color: #fff;
}
.goods .goodsmenu ul li .text{
    display: table-cell;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.goods .goodsmenu ul li .type{
    display: inline-block;
    width: .32rem;
    height: .32rem;
    background: url(discount_1@2x.png) no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
}
.goods .goodsmenu ul li .type1{
    background-image: url(discount_1@2x.png);
}
.goods .goodsmenu ul li .type2{
    background-image: url(special_1@2x.png);
}
.goods .goodlist ul li h1{
    padding-left: .28rem;
    font-size: .24rem;
    height:0.52rem;
    line-height: .52rem;
    color:rgb(147,153,159);
    border-left: 2px solid #d9dde1;
    background-color: #f3f5f7;
}
.goods .goodlist ul li .foodlist{
    position: relative;
    display: flex;
    margin: .36rem;
    border-bottom:1px solid rgba(7, 17, 27, 0.1);
}
.goods .goodlist ul li .foodlist img{
    width:1.2rem;
    height:1.2rem;
    margin-right: 0.2rem;
}
.goods .goodlist ul li .foodlist .foodinfo{
    flex: auto;
    font-size: .2rem;
    color: rgb(147,153,159);
}
.goods .goodlist ul li .foodlist .foodinfo h2{
    font-size:0.28rem;
    line-height:0.28rem;
    margin-top:0.04rem;
    color:rgba(7,17,27);
}
.goods .goodlist ul li .foodlist .foodinfo .description{
     margin-top:0.16rem;
     line-height:.3rem;
}
.goods .goodlist ul li .foodlist .foodinfo div{
    margin-bottom: .16rem;
}
.goods .goodlist ul li .foodlist .foodinfo .price{
    color: rgb(240,20,20);
    line-height: .48rem;
}
.goods .goodlist ul li .foodlist .foodinfo .price span{
    font-size:.28rem;
    font-weight: 700;
}

</style>