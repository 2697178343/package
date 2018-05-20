<template>
  <div id="app">
    <sell-header :seller="seller"></sell-header>
    <div class="tab">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/Seller">商家</router-link>
    </div>
    <router-view :seller="seller"/>
  </div>
</template>

<script>
// 引入公共样式的函数
import init from '@/common/js/base.js'
import sellHeader from '@/components/header/sellHeader'
export default {
  name: 'App',
  components:{
     sellHeader,
   },
  data(){
    return{
      seller:{
        supports:[
          {
            description:''
          }
        ]
      }
    }
  },
  created(){
    init();
    this.$http.get('/api/seller').then((res)=>{
      this.seller=res.body.data;
      // console.log(this.seller);
    },(res)=>{
      console.log("获取商品信息失败");
    })
  }
}
</script>

<style>
.clearfix:after{
  content:"";
  display: block;
  clear:both;
}
.blur {  
    -webkit-filter: blur(10px);  /* Chrome, Opera*/
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);    
    filter: blur(10px);    
} 
.tab{
  display:flex;
  border-bottom:1px solid rgba(7,17,27,.1);
}
.tab .tab-item{
  flex:1;
  line-height:0.8rem;
  text-align:center;
  color:rgb(77,85,93);
}
.tab .tab-item.router-link-exact-active{
  color: rgb(240, 20, 20);
}
</style>
