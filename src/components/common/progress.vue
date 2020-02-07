<template>
    <div class="mainContain">
        <div class="proLabel">
            <span class="sure">{{sure}}</span>
            <span class="nums">/{{total}}</span>
        </div>
        <div class="proContain">
            <div class="proItem" v-bind:style="{width:barwidth+'%'}"></div>
        </div>
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
    margin-top: 60px;
}
.proContain {
    width: 85%;
    height: 15px;
    margin: auto;
    background: #666666;
    border-radius: 15px;
}
.proLabel {
    margin-left: 25px;
    font-size: 20px;
    color:#b2b2b2;
}
.proItem {
    width: 85%;
    height: 15px;
    background: #46a2eb;
    border-radius: 15px;
}
</style>
