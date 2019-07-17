// nuxt已经把store (vuex) 关联到应用m，只需要维护各个模块，每个模块下面通常需要暴露三个属性
// state:存数据
export const state = () => {
  return {
    userInfo: {
      token: "",
      user: {}
    }
  };
};
//mutations:同时设置修改state数据
export const mutations = {
  setuserInfo(state, data) {
    state.userInfo = data;
  },
  cleanUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    };
  }
};
//actions:异步设置修改state数据
export const actions = {
  //负责登陆的请求
  //第一个参数是store对象
  login( {commit},data ){
    this.$axios({
      url: "/accounts/login",
      method: "post",
      data
    }).then(res => {
      if(res.status === 200){
        commit('setuserInfo',res.data)
        this.$router.back()
      }else {
        return 
      }
    })
  }
};
