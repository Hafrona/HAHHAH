<template>
  <div class="ber">
    <section class="container">
      <h2 class="air-title">
        <span class="iconfont iconfeiji"></span>
        <i>国内机票</i>
      </h2>

      <!-- 搜索广告栏 -->
      <el-row type="flex" justify="space-between">
        <!-- 搜索表单 -->
        <div>
          <SearchForm />
        </div>

        <!-- banner广告 -->
        <div class="sale-banner">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
        </div>
      </el-row>

      <!-- 广告 -->
      <el-row type="flex" class="statement">
        <el-col :span="8" class="Lieg">
          <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
          <span>100%航协认证</span>
        </el-col>
        <el-col :span="8" class="Lieg">
          <i class="iconfont iconbaozheng" style="color:green;"></i>
          <span>出行保证</span>
        </el-col>
        <el-col :span="8" class="Lieg">
          <i class="iconfont icondianhua" style="color:#409EFF;"></i>
          <span>7x24小时服务</span>
        </el-col>
      </el-row>

      <h2 class="air-sale-title">
        <span class="iconfont icontejiajipiao"></span>
        <i>特价机票</i>
      </h2>

      <!-- 特价机票 -->
      <div class="air-sale">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item,index) in sales" :key="index">
            <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
              <div class="grid-content bg-purple">
                <img :src="item.cover" alt />
                <div class="pastpr">
                  <span>{{item.departCity}}-{{item.destCity}}</span>
                  <span>￥{{item.price}}</span>
                </div>
              </div>
            </nuxt-link>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>
<script>
import SearchForm from "@/pages/air/searchForm";
export default {
  data() {
    return {
      sales: []
    };
  },
  components: {
    SearchForm
  },
  mounted() {
    this.$axios({
      url: "/airs/sale"
    }).then(res => {
      this.sales = res.data.data;
    });
  }
};
</script>
<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .air-title {
    font-size: 20px;
    color: orange;
    padding: 10px 0;
    .iconfeiji {
      font-size: 20px;
    }
  }
  .statement {
    width: 100%;
    height: 58px;
    background-color: #f5f5f5;
    font-size: 16px;
    padding: 10px 0;
    border: 1px solid #ccc;
    .Lieg {
      text-align: center;
      line-height: 38px;
      border-right: 1px solid #ddd;
      &:nth-child(3) {
        border-right: none;
      }
      i {
        font-size: 28px;
        vertical-align: middle;
      }
    }
  }
  .air-sale-title {
    font-size: 20px;
    color: #409eff;
    vertical-align: middle;
    font-weight: 500;
    padding: 15px 0;
    span {
      font-size: 20px;
    }
  }
  // 特价机票部分
  .air-sale {
    width: 1000px;
    height: 182px;
    border: 1px #ccc solid;
    margin-bottom: 60px;
    padding: 20px;
    .grid-content {
      position: relative;
      width: 100%;
      height: 140px;
      img {
        width: 100%;
        height: 100%;
      }
      .pastpr {
        width: 100%;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        line-height: 30px;
        padding: 0 15px;
        position: absolute;
        bottom: 0;
        span {
          color: #fff;
          &:nth-child(1) {
            float: left;
          }
          &:nth-child(2) {
            float: right;
          }
        }
      }
    }
  }
}
</style>