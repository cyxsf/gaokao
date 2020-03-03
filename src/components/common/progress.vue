<template>
    <div class="mainContain">
        <div class="proContain">
            <div class="proItem" v-bind:style="{width:barwidth+'%'}"></div>
        </div>
        <span class="proLabel">
            <span class="active">{{active}}</span>
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
  props: ['active', 'total', 'barwidth']
}
</script>

<style lang="scss" scoped>
.mainContain {
    display: flex;
    justify-content: center;
    align-items: center;
}
.proLabel {
    font-size: 20px;
    color:#333;
}
.active {
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
