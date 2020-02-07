<template>
    <div class="mainContain">
        <div class="proContain">
            <div class="proItem" v-bind:style="{width:barwidth+'%'}"></div>
        </div>
        <span class="proLabel">
            <span class="sure">{{sure}}</span>
            <span>/</span>
            <span>{{total}}</span>
        </span>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['sure', 'total', 'barwidth']
}
</script>

<style lang="scss" scoped>
.mainContain {
    display: flex;
    margin-top: 70px;
    justify-content: center;
    align-items: center;
}
.proLabel {
    font-size: 20px;
    color:#333;
}
.sure {
    color: #46a2eb;
}
.proContain {
    width: 80%;
    height: 20px;
    margin-right: 10px;
    background: #b5b5b5;
    border-radius: 15px;
}
.proItem {
    width: 80%;
    height: 20px;
    background: #46a2eb;
    border-radius: 15px;
}
</style>
