<template>
  <div class="fom">
    <!-- 头部切换组件 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <!-- 选择城市组件 -->
    <el-form label-width="80px" class="cszj">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions -- 获取远程建议，每当输入框的值发生改变的时候触发 -->
        <!-- select -- 选中下拉框选项的时候触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          size="medium"
          style="width:200px"
          v-model="form.departCity"
          placeholder="请所搜出发城市"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          size="medium"
          style="width:200px"
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          @change="handleDate"
          v-model="form.departDate"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-button class="btn" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      <!-- 换 -->
      <div class="huan">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      currentTab: 0,
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", //到达城市代码
        departDate: "" //出发日期
      }
    };
  },
  methods: {
    //往返切换
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    //出发城市
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      if (!value) {
        cb([]); // 不出现加载下拉框
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        // 给数组中的对象添加value
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        cb(newData);
      });
    },
    //出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    //到达城市
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        cb([]); // 不出现加载下拉框
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const newData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        cb(newData);
      });
    },
    //目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    //确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    //触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.destCity = departCity;
      this.form.departCode = destCode;
      this.form.destCode = departCode;
    },
    //提交表单时触发
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发日期"
        }
      };
      // 开关作用，判断验证是否通过
      let valid = true;
      // 循环判断上面的字段是否为空
      Object.keys(rules).forEach(v => {
        // 判断只要有一次是空，不会在执行循环
        if (!valid) {
          return;
        }
        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message);
        }
      });
      // 跳转
      if (valid) {
        this.$router.push({
          path: "/air/flights",
          query: this.form
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.fom {
  width: 360px;
  height: 350px;
  border: 1px solid #ccc;
  position: relative;
  .search-tab {
    margin-bottom: 10px;
    .active {
      border-top: 3px orange solid;
      background: #fff;
    }
    span {
      display: block;
      flex: 1;
      height: 48px;
      text-align: center;
      line-height: 48px;
      background-color: #eee;
      border-top: 3px #eee solid;
    }
  }
  .cszj {
    padding: 0 15px 0;
    .huan {
      width: 30px;
      height: 60px;
      border: 1px solid #ccc;
      border-left: none;
      position: absolute;
      top: 80px;
      right: 33px;
      span {
        cursor: pointer;
        display: block;
        width: 20px;
        height: 20px;
        font-size: 12px;
        background-color: #999;
        color: #fff;
        position: absolute;
        top: 16px;
        right: -10px;
        border-radius: 2.5px;
        text-align: center;
        line-height: 20px;
      }
    }
    .btn {
      margin-left: 80px;
      width: 200px;
      background-color: #3a8ee6;
      color: #fff;
    }
  }
}
</style>

