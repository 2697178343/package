<template>
<div class="cartgroup">
    <transition name="move">
        <span v-if="food.count>0" class="carticon icon-remove_circle_outline" @click="decreCar()"></span>
    </transition>
<!-- 自定义的变量 -->
    <span v-if="food.count>0" class="count">{{food.count}}</span>
    <span class="carticon icon-add_circle" @click="addCar($event)"></span>
</div> 
</template>

<script>
    export default {
        name:"cartgroup",
        props: {
            food:{
               type: Object,
            }
        },
       methods:{
          addCar(event) {
            if (!this.food.count){
                this.$set(this.food, 'count', 1);
            }else{
                this.food.count++;
            };
            // console.log(event.target);
            this.$emit('add', event.target);  
            // 触发当前实例上的事件，以便父元素@监听子元素。将点击的元素传入
       },     
        decreCar(event){
            if(this.food.count){
               this.food.count--;
            }
        },

    }
}
</script>

<style scoped>
.cartgroup{
    position: absolute;
    bottom:0.1rem;
    right:0;
    font-size: .2rem;
    line-height: .48rem;
    color: rgb(147,153,159);
    display: flex;
    align-items: center;
}
.cartgroup .carticon{    
    font-size: .48rem; 
    color:rgb(0,160,220);
    transition: all .4s;
}
.cartgroup .count{
    width: .48rem;
    text-align:center;
}
.cartgroup .move-enter-active{
    opacity: 1;
    transform: translate3d(0,0,0);
}
 .cartgroup .move-enter, 
.cartgroup
.move-leave-to{
    opacity: 0;
    transform: translate3d(24px,0,0);
}
</style>