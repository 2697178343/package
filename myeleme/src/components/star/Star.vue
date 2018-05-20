<template>
    <div class="stargroup">
        <span v-if="staron>0">
            <span v-for="(s,index) in staron" class="star staron" :key="index"></span>
        </span>
        <span v-if="starhalf" class="star starhalf"></span>
        <span v-if="staroff>0">
            <span v-for="(s,index) in staroff" class="star staroff" :key="index"></span>
        </span>
    </div>
</template>

<script>
    // seller.score  3.4
    // 黄色的星星个数 3
    // 半黄半灰星星个数 0
    // 灰色星星个数   2
    export default {
        name:'star',
        computed:{
            staron(){
                return Math.floor(this.seller.score);
            },
            starhalf(){
                // this.seller.score 4.3
                if(this.seller.score*10%10>=5){
                    return true;
                }else{
                    return false;
                }
            },
            staroff(){
                if(this.starhalf){
                    return 4-this.staron;
                }else{
                    return 5-this.staron;
                }
            }
        },
        props:{
            seller:{
                type:Object
            },
           
        }
    }
</script>

<style scoped>
.stargroup{
    margin-top: .32rem;
}
.stargroup .star{
    display: inline-block;
    margin-right: .24rem;
    width: .48rem;
    height: .48rem;
    background: url(star48_on@2x.png) no-repeat;
    background-size: 100% 100%;
}
.stargroup .star.staron{
    background-image: url(star48_on@2x.png);
}
.stargroup .star.starhalf{
    background-image: url(star48_half@2x.png);
}
.stargroup .star.staroff{
    background-image: url(star48_off@2x.png);
}
</style>