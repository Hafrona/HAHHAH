<template>
    <div class="fliHead">
        <el-row>
            <el-col :span="6">
                <span>航空信息</span>
            </el-col>
            <el-col :span="6">
                <span>起飞时间</span>
            </el-col>
            <el-col :span="6">
                <span>到达时间</span>
            </el-col>
            <el-col :span="6">
                <span>价格</span>
            </el-col>
        </el-row>  
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.fliHead{
    width: 100%;
    height: 38px;
    background-color: #f6f6f6;
    border:1px #ccc solid;
    text-align: center;
    line-height:38px;
    font-size: 12px;
    font-weight: 300;
}
</style>
