<template>
<div class="panel">
    <div class="noData">
        <img :src="nodataPic">
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            nodataPic: require('@/assets/nodata.png')
        }
    }
}
</script>

<style lang="less" scoped>
.noData {
    min-height: 500px;
    text-align: center;
    line-height: 500px;
}
</style>
