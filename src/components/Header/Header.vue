<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userinfo">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="register"
                >免费注册</router-link
              >
            </p>
            <p v-else>
              <a href="#">{{ userinfo.name }}</a>
              <a href="#" class="register" @click="logoutHandle">注销</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/trade">我的订单</router-link>
            <router-link to="/cart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <a class="logo" title="尚品汇" href="###" target="_blank">
            <img src="@/assets/logo.png" alt="" />
          </a>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyWords"
              @keyup.enter="doSearch"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="doSearch"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  mounted() {
    // 注册全局事件
    this.$bus.$on("clear", this.clear);

    this.$store.dispatch("getUserInfo").catch(()=>{
      localStorage.removeItem('k1');
      this.$store.state.userinfo=null;
    });
  },
  methods: {
    doSearch() {
      let location = {
        name: "search",
        params: { keyword: this.keyWords||null },
      };
      let query = this.$route.query;
      if (query) {
        location.query = query;
      }
      this.$router.push(location);
      console.log(this.$route, location, "open");
    },
    // 清空搜索框
    clear() {
      this.keyWords = "";
    },
    logoutHandle() {
      this.$store
        .dispatch("doLogout")
        .then(() => {
          this.$router.push({path:'/home'});
        })
        .catch((err) => alert(err));
    },
  },
  data() {
    return {
      keyWords: "",
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.User.userinfo;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>