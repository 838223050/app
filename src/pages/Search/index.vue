<template>
  <!-- 项目的最外层 -->
  <div class="outer">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeTag">x</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeParams">x</i>
            </li>
            <li class="with-x" v-if="brander">
              {{ brander }}<i @click="removeTrademark">x</i>
            </li>
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="index"
              @click="removeAttr(index)"
            >
              {{ item.split(":")[1] }}<i @click="removeTrademark">x</i>
            </li>
          </ul>
        </div>
        <!--属性选择器-->
        <SearchSelector @addBrander="addTrademark" @attrFilter="fliterHandle" />
        <!--排序选择-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: searchParams.order.indexOf('1') != -1 }"
                  @click="sortChange('1')"
                >
                  <a
                    >综合<span
                      v-show="searchParams.order.indexOf('1') != -1"
                      :class="isAsc ? 'el-icon-top' : 'el-icon-bottom'"
                    ></span
                  ></a>
                </li>
                <li
                  :class="{ active: searchParams.order.indexOf('2') != -1 }"
                  @click="sortChange('2')"
                >
                  <a
                    >价格<span
                      v-show="searchParams.order.indexOf('2') != -1"
                      :class="isAsc ? 'el-icon-top' : 'el-icon-bottom'"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div @click='(e)=>goToDetail(e,good.id)'>
                    <div class="p-img">
                      <a  target="_blank"
                        ><img :src="good.defaultImg"
                      /></a>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥ </em>
                        <i>{{ good.price }}</i>
                      </strong>
                    </div>
                    <div class="attr">
                      <a target="_blank"  :title="good.title">{{
                        good.title
                      }}</a>
                    </div>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      @click="addToCart(good.id)"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <PaginationComp
            :now="searchParams.pageNo"
            :dataNumber="searchList.total"
            :pageSize="searchParams.pageSize"
            @pageChange="pageChange"
          />
        </div>
        <!--热卖商品-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "SearchPage",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      },
      brander: "",
    };
  },
  methods: {
    // 更新搜索参数对象
    updateQueryAndParams() {
      let params = this.$route.params;
      let query = this.$route.query;
      this.searchParams = {
        ...{
          category1Id: "",
          category2Id: "",
          category3Id: "",
          categoryName: "",
          keyword: "",
          order: "1:desc",
          pageNo: 1,
          pageSize: 3,
          props: [],
          trademark: this.searchParams.trademark,
        },
        ...params,
        ...query,
      };
    },
    getData() {
      console.log("look", this.searchParams);
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 移除分类标签
    removeTag() {
      Object.assign(this.searchParams, {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
      });
      if (this.$route.params)
        this.$router.push({ name: "search", params: this.$route.params });
      else this.$router.push({ name: "search" });
    },
    // 移除搜索关键字
    removeParams() {
      this.searchParams.keyword = "";
      this.$bus.$emit("clear");
      if (this.$route.query)
        this.$router.push({ name: "search", query: this.$route.query });
      else this.$router.push({ name: "search" });
    },
    // 移除商标标签
    removeTrademark() {
      this.searchParams.trademark = "";
      this.brander = "";
      this.getData();
    },
    // 添加商标标签
    addTrademark(tmid, tmname) {
      this.searchParams.trademark = `${tmid}:${tmname}`;
      this.brander = tmname;
      console.log(this.searchParams);
      this.getData();
    },
    // 属性选择处理
    fliterHandle(id, name, value) {
      let props = `${id}:${value}:${name}`;
      this.searchParams.props.push(props);
      this.getData();
    },
    // 移除属性选择
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 排序方式变更
    sortChange(target) {
      let now = this.searchParams.order.split(":")[0];
      if (now == target) {
        this.sortRollBack();
      } else {
        this.searchParams.order = this.searchParams.order.replace(now, target);
      }
      this.getData();
    },
    // 排序反转
    sortRollBack() {
      if (this.isAsc) {
        this.searchParams.order = this.searchParams.order.replace(
          "asc",
          "desc"
        );
      } else {
        this.searchParams.order = this.searchParams.order.replace(
          "desc",
          "asc"
        );
      }
    },
    // 页数变更控制
    pageChange(num) {
      this.searchParams.pageNo = num;
      this.getData();
    },
    // 前往详情页
    goToDetail(event,id){
      console.log(event,id)
      event.preventDefault();
      
      this.$router.push({name:'detail',params:{'productId':id}});
    },
    addToCart(id){
      this.$store.dispatch('addCart',{'id':id,'num':1});
    }
  },
  mounted() {
    this.$store.dispatch("getSearchList", this.searchParams);
  },
  beforeMount(){
    this.updateQueryAndParams();
  },
  computed: {
    ...mapGetters(["goodsList", "trademarkList", "searchList"]),
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
  },
  components: {
    SearchSelector,
  },
  // 监视路由对象的变更，一旦路由对象发生变更立即向vuex请求更新仓库库数据
  watch: {
    $route() {
      this.updateQueryAndParams();
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.outer {
  .toolbar {
    position: fixed;
    z-index: 999;
    width: 300px;
    height: 100%;
    background-color: #7a6e6e;
    transition: right 0.3s ease-in-out 0s;
    &.toolbar-out {
      top: 0px;
      right: 0px;
    }
    &.toolbar-wrap {
      top: 0px;
      right: -294px;
    }
    .content {
      position: relative;
      left: 6px;
      width: 294px;
      background-color: bisque;
      height: 100%;
      z-index: 99;
    }
    .but {
      position: relative;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      margin-bottom: 1px;
      cursor: pointer;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      position: absolute;
      top: 0;
      /*right: -6px;*/
      left: -29px;
      &.list {
        background-image: url(@/assets/list.png);
        background-repeat: no-repeat;
        background-size: cover;
      }
      &.pull-wrap {
        background-image: url(@/assets/cross.png);
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .toolist {
      position: absolute;
      top: 50%;
      left: -29px;
      width: 35px;
      margin-top: -80px;
      /*background-color: cadetblue;*/
      .pull {
        position: relative;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin-bottom: 1px;
        cursor: pointer;
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        z-index: 66;
        .vip {
          background-image: url(@/assets/toolbars.png);
          background-position: -88px -175px;
        }
        .cart {
          background-image: url(@/assets/toolbars.png);
          background-position: -50px 0;
        }
        .follow {
          background-image: url(@/assets/toolbars.png);
          background-position: -50px -50px;
        }
        .history {
          background-image: url(@/assets/toolbars.png);
          background-position: -50px -100px;
        }
        .message {
          background-image: url(@/assets/toolbars.png);
          background-position: -190px -150px;
        }
        .jimi {
          background-image: url(@/assets/toolbars.png);
          background-position: -50px -150px;
        }
        .top {
          background-image: url(@/assets/toolbars.png);
          background-position: -50px -250px;
        }

        .tab-text {
          width: 62px;
          height: 35px;
          line-height: 35px;
          color: #fff;
          text-align: center;
          font-family: 微软雅黑;
          position: absolute;
          /*position: relative;*/
          z-index: 1;
          left: 35px;
          top: 0;
          background-color: #7a6e6e;
          border-radius: 3px 0 0 3px;
          font-style: normal;
          -webkit-transition: left 0.3s ease-in-out 0.1s;
          transition: left 0.3s ease-in-out 0.1s;
        }
        .tab-ico {
          display: inline-block;
          position: relative;
          /*background-image: url(img/toolbars.png);*/
          background-color: #7a6e6e;
          border-radius: 3px 0 0 3px;
          z-index: 2;
          width: 35px;
          height: 35px;
        }
      }
    }

    & > .pull {
      position: relative;
      width: 35px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      margin-bottom: 1px;
      cursor: pointer;
      background-color: #7a6e6e;
      border-radius: 3px 0 0 3px;
      z-index: 66;
      .tab-ico {
        display: inline-block;
        position: relative;
        /*background-image: url(img/toolbars.png);*/
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        z-index: 2;
        width: 35px;
        height: 35px;
      }
      .top {
        background-image: url(@/assets/toolbars.png);
        background-position: -50px -250px;
      }

      .tab-text {
        width: 62px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        text-align: center;
        font-family: 微软雅黑;
        position: absolute;
        /*position: relative;*/
        z-index: 1;
        left: 35px;
        top: 0;
        background-color: #7a6e6e;
        border-radius: 3px 0 0 3px;
        font-style: normal;
        -webkit-transition: left 0.3s ease-in-out 0.1s;
        transition: left 0.3s ease-in-out 0.1s;
      }
    }
    & > .back {
      position: absolute;
      bottom: 0;
      /*right: -6px;*/
      left: -29px;
      display: inline-block;
      background-image: url(@/assets/toolbars.png);
    }
  }
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
  .typeNav {
    border-bottom: 2px solid #e1251b;
    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;
      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }
      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }
      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;
              a {
                color: #333;
              }
            }
            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              _height: 200px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;
              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;
                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;
                  &.fore {
                    border-top: 0;
                  }
                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }
                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;
                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
            &:hover {
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
  .main {
    margin: 10px 0;
    .py-container {
      width: 1200px;
      margin: 0 auto;
      .bread {
        margin-bottom: 5px;
        overflow: hidden;
        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;
          li {
            display: inline-block;
            line-height: 18px;
            a {
              color: #666;
              text-decoration: none;
              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }
        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;
          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;
            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            &:hover {
              color: #28a3ef;
            }
          }
        }
      }
      .details {
        margin-bottom: 5px;
        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;
          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;
              li {
                float: left;
                line-height: 18px;
                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }
                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .goods-list {
          margin: 20px 0;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;
              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;
                  a {
                    color: #666;
                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }
                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }
                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }
                .operate {
                  padding: 12px 15px;
                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }
                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;
                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }
                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;
                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .hot-sale {
        margin-bottom: 5px;
        border: 1px solid #ddd;
        .title {
          font-weight: 700;
          font-size: 14px;
          line-height: 21px;
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          margin: 0;
          padding: 5px 0 5px 15px;
        }
        .hot-list {
          padding: 15px;
          ul {
            display: flex;
            li {
              width: 25%;
              height: 100%;
              .list-wrap {
                .p-img,
                .price,
                .attr,
                .commit {
                  padding-left: 15px;
                }
                .p-img {
                  img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                  }
                }
                .attr {
                  width: 85%;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                }
                .price {
                  font-size: 18px;
                  color: #c81623;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .commit {
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                }
              }
            }
          }
        }
      }
    }
  }
  .footer {
    background-color: #eaeaea;
    .footer-container {
      width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
      .footerList {
        padding: 20px;
        border-bottom: 1px solid #e4e1e1;
        border-top: 1px solid #e4e1e1;
        overflow: hidden;
        padding-left: 40px;
        .footerItem {
          width: 16.6666667%;
          float: left;
          h4 {
            font-size: 14px;
          }
          .footerItemCon {
            li {
              line-height: 18px;
            }
          }
          &:last-child img {
            width: 121px;
          }
        }
      }
      .copyright {
        padding: 20px;
        .helpLink {
          text-align: center;
          li {
            display: inline;
            .space {
              border-left: 1px solid #666;
              width: 1px;
              height: 13px;
              background: #666;
              margin: 8px 10px;
            }
          }
        }
        p {
          margin: 10px 0;
          text-align: center;
        }
      }
    }
  }
}
</style>