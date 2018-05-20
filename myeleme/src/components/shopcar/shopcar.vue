<template>
    <div class="shop">
        <div class="orderlist" @click="toggleList">
            <div class="circle" :class="totalCount>0?'active':'circle'">
                <span class="icon icon-shopping_cart" :class="totalCount>0?'active':'icon'"></span>
                <span v-if="totalCount>0" class="shopnum">{{totalCount}}</span>
            </div>
            <div class="foodtext">
                <span>￥{{totalPrice}}</span>
                <span class="pricetext">另需要配送费￥{{deliveryPrice}}元</span>
                <span class="minprice" @click="pay" :class="{active:payClass}">{{payDescription}}</span>
            </div>
        </div>
        <div class="ball-container">
           <div v-for="ball in balls">
            <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                   <div class="inner inner-hook"></div>
                </div>
            </transition>
         </div>
      </div>
          <transition name="fold">
            <div class="shopcar-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content" ref="listContent">
                    <ul>
                        <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                               <span>￥</span><span>{{food.price*food.count}}</span>                                                          
                             </div>
                             <div class="cartgroup-wrapper">
                                <cartgroup :food="food" @add="addFood($event)"></cartgroup>
                             </div>
                        </li>
                    </ul>
                </div>               
         </div>
      </transition>
      <transition name="fade">
         <div class="overlary blur" v-show="listShow" @click="hideList"></div>
    </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import cartgroup from '@/components/cartgroup/cartgroup';
    export default {
        name:"shopcar",
        data(){
            return{
                balls:[
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                    {
                        show:false
                    },
                     {
                        show:false
                    },
                ],
                dropBalls:[],
                fold:true,//默认折叠
            }
        },
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return [];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
        },
        methods:{
            drop(el) {
                // console.log(el);
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                    }
                }
            },     
            beforeDrop(el) {    // el 是Vue 钩子选择作用动画的 DOM 对象
                let count = this.balls.length;
                while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect(); // 得到元素距视口各边的偏移量
                    // 是相对于小球初始位置的，所以 x 是正的，y 是负的
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 36);
                    el.style.display = '';        // 手动设置为空，小球会显示出来
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];   // 获取当前el的innerDom节点
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
                }
            },
            dropping(el, done) {  // Vue enter 的第二个参数必须给，否则会设置成同步
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                // 触发浏览器重绘，可以保证 dom 位置渲染正确后再执行之后的动画
                this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,-10px,0)';
                el.style.transform = 'translate3d(0,-10px,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                // 告知Vue，一个小球动画完成
                el.addEventListener('transitionend', done);   // 当动画结束，会有  CSS3 transitionend 事件派发
                });
            },
            afterDrop(el) {
                // 首先触发afterDrop是最先落的小球，所以把第一项也就是先落的小球重置
                let ball = this.dropBalls.shift();    // 删除dropBalls第一项，并返回此项
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            empty(){
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            toggleList(){  
                if(!this.totalCount){
                     return;
                }
                this.fold = !this.fold;
            },
            hideList(){
                this.fold=true;
            },
            pay(){
                if(this.totalPrice>this.minPrice){
                    return true;
                }
            },
            // 点击加号调用drop（）方法
            addFood(target) {
                this.drop(target);
            },
         },        
        computed:{
            totalPrice(){
                let total=0;                
                this.selectFoods.forEach((food) => {
                    total+=food.price*food.count;
                });
                return total;
            },
            totalCount(){
                let count=0;
                this.selectFoods.forEach((food) => {
                    count+=food.count;
                });
                return count;
            }, 
            listShow(){
                // 判断
                if (!this.totalCount) {
                   this.fold = true;
                   return false;
                } 
                let show = !this.fold;
                if(show){
                this.$nextTick(() => {
                    if (!this.shopcartListScroll) {
                      this.shopcartListScroll = new BScroll(this.$refs.listContent, {
                          click: true
                       });
                    } else {
                    // 根据每次toggle计算高度来决定能否滚动
                      this.shopcartListScroll.refresh();
                    }
                });
              }   
                return show;
            },
            payDescription() {
                if (this.totalPrice === 0) {
                    return '￥' + this.minPrice + '元起送';
                } else if (this.totalPrice < this.minPrice) {
                    let diffence = this.minPrice - this.totalPrice;
                    return `还差${diffence}元起送`;
                } else {
                    return `去结算`
                }
             },
            payClass() {
            if (this.totalPrice >= this.minPrice)
                return true;
            return false;
            },
        },
         components:{
            cartgroup,
        }
    }
</script>

<style scoped>
.shop{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    height:1.04rem;
}
.orderlist{
    font-size:0.24rem;
    background-color:#141d27;
}
.orderlist .foodtext{
    position:relative;
    bottom:0;
    left:1.6rem;
}
.orderlist .foodtext span:first-child{
    font-size:0.32rem;
    font-weight:700;
    padding-right:0.2rem;
    color:rgba(255,255,255,0.4);
    border-right:1px solid rgba(255,255,255,0.1);
}
.orderlist .circle{
    display:flex;
    position: absolute;
    bottom: .16rem;
    left: .36rem;
    width: 0.88rem;
    height:0.88rem;
    line-height:0.88rem;
    border: .12rem solid #131D26;
    background-color: #2B343C;
    border-radius:50%;
}
.orderlist .circle.active{
    background-color:rgb(0,160,220); 
}
.orderlist .circle .icon{
    margin:auto;
    font-size:0.48rem;
    line-height: .48rem;
    color: #80858A;
}
.orderlist .circle .icon.active{
    color:rgb(255,255,255);
}
.orderlist .circle .shopnum{
    position: absolute;
    right: -.1rem;
    top: -.1rem;
    width:0.5rem;
    height:0.4rem;
    line-height:0.4rem;
    text-align:center;
    background-color: red;
    color: #fff;
    border-radius: .2rem;
}
.orderlist .pricetext{
    font-size:0.32rem;
    margin-left: 0.07rem;
    line-height: 1.04rem;
    color:rgba(255,255,255,0.4);
    
}
.orderlist .minprice{
    display:inline-block;
    width: 2.2rem;
    height:1.08rem;
    line-height:1.08rem;
    font-size:0.24rem;
    text-align: center;
    background-color: #2B333B;
    color: rgba(255,255,255,0.4);
 
}
.orderlist .minprice.active{
    background: #00b43c;
    color: #fff
}
.ball-container .ball{
    position: fixed;
    bottom: 0.22rem;
    left: 0.32rem;
    z-index: 200;
    transition: all 0.4s cubic-bezier(.49, -0.29, .75, .41);
}
.inner{
    width:0.32rem;
    height:0.32rem;
    border-radius: 50%;
    background-color: rgb(0,160,220);
    transition: all 0.4s linear;
}
.shopcar-list{
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    transition: all 0.5s;
    transform: translate3d(0,-100%,0);
}
.shopcar-list .list-header{
    height: 0.8rem;
    line-height:0.8rem;
    padding: 0 0.36rem;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    background: #f3f5f7;
}
.shopcar-list .list-header .title{
    float: left;
    font-size: 0.28rem;
    font-weight: 200;
    color: rgb(7,17,27);
}
.shopcar-list .list-header .empty{
    float: right;
    font-size: 0.12rem;
    color: rgb(0,160,220);
}
.shopcar-list .list-content{
    padding: 0 0.36rem;
    max-height: 2.75rem;
    overflow: hidden;
    background: #fff;
}
.shopcar-list .list-content li{
    height:0.96rem;
    line-height:0.96rem;
    border-top:1px solid rgba(7,17,27,0.1);
}
.shopcar-list .list-content .food .name{
    float:left;
    font-size:0.28rem;
    color:rgb(7,17,27);
    line-height:
} 
.shopcar-list .list-content .food .price{
    position: absolute;
    right:2rem;

    color:rgb(240,20,20);
}
.shopcar-list .list-content .food .price span:first-child{
    font-size:0.2rem;    
} 
.shopcar-list .list-content .food .price span:last-child{
    font-weight:700;
} 
.shopcar-list .list-content .food .cartgroup-wrapper{
     position: absolute;
     right: 0.36rem;
}
.shopcar-list .list-content .food .cartgroup-wrapper /deep/ .cartgroup{
    position: absolute;
    bottom:-0.7rem;
}
.overlary{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(7,17,27,0.6);
    z-index:-2;
}
.fold-enter-active, .fold-leave-active{
  transition: all 0.5s ease; 
}  
.fold-enter, .fold-leave-active{
  opacity:0;
}
</style>