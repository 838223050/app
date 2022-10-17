<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in cartList" :key="index">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              v-model="item.isChecked"
              @change="checkedHandle(index)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="subs(index)">-</a>
            <input
              autocomplete="off"
              type="text"
              v-model="item.skuNum"
              minnum="1"
              class="itxt"
              @change="(e) => priceChangeHandle(e, index)"
            />
            <a href="javascript:void(0)" class="plus" @click="plus(index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:void(0);"
              class="sindelet"
              @click="deleteCart(index)"
              >删除</a
            >
            <br />
            <a href="javascript:void(0);">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          v-model="allIsChecked"
          @click="AllSelectHandle"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0);">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectedNumber }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ PriceOfSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mythrottle } from "@/utils";
export default {
  name: "ShopCart",
  mounted() {
    this.getData()
      .then(() => {
        this.cartList.forEach((item) => {
          this.numList.push(item.skuNum);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      numList: [],
    };
  },
  computed: {
    ...mapState({
      cartList: (state) => {if(state.CartList.cartList[0]){
        return state.CartList.cartList[0].cartInfoList
      }
      else{
        return [];
      }},
    }),
    allIsChecked() {
      if (!this.cartList) {
        return false;
      } else return this.cartList.every((item) => item.isChecked);
    },
    selectedNumber() {
      if (!this.cartList) {
        return 0;
      }
      let count = 0;
      this.cartList.forEach((item) => {
        if (item.isChecked) count++;
      });
      return count;
    },
    PriceOfSum() {
      if (!this.cartList) {
        return 0;
      }
      let count = 0;
      this.cartList.forEach((item) => {
        if (item.isChecked) count += item.skuNum * item.skuPrice;
      });
      return count;
    },
  },
  methods: {
    getData() {
      return this.$store.dispatch("getCartList");
    },
    plus(index) {
      this.cartList[index].skuNum += 1;
      mythrottle(() => {
        this.$store
          .dispatch("addCart", {
            id: this.cartList[index].skuId,
            num: this.cartList[index].skuNum - this.numList[index],
          })
          .then(() => {
            this.$store.dispatch("getCartList");
            this.numList[index] = this.cartList[index].skuNum;
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);
    },
    subs(index) {
      if (this.cartList[index].skuNum - 1 >= 1) {
        this.cartList[index].skuNum -= 1;
        mythrottle(() => {
          this.$store
            .dispatch("addCart", {
              id: this.cartList[index].skuId,
              num: this.cartList[index].skuNum - this.numList[index],
            })
            .then(() => {
              this.$store.dispatch("getCartList");
              this.numList[index] = this.cartList[index].skuNum;
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1000);
      }
    },
    priceChangeHandle(e, index) {
      if (!isNaN(e.target.value * 1)) {
        this.$store
          .dispatch("addCart", {
            id: this.cartList[index].skuId,
            num: e.target.value - this.numList[index],
          })
          .then(() => {
            this.$store.dispatch("getCartList");
            this.numList[index] = Number.parseInt(e.target.value);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        e.target.value = this.numList[index];
        this.cartList[index].skuNum = this.numList[index];
      }
    },
    AllSelectHandle() {
      if (this.allIsChecked) {
        this.cartList.forEach((item, index) => {
          item.isChecked = false;
          this.$store.dispatch("changeIsChecked", {
            id: this.cartList[index].skuId,
            isChecked: this.cartList[index].isChecked,
          });
        });
      } else {
        this.cartList.forEach((item, index) => {
          if (item.isChecked == false) {
            item.isChecked = true;
            this.$store.dispatch("changeIsChecked", {
              id: this.cartList[index].skuId,
              isChecked: this.cartList[index].isChecked,
            });
          }
        });
      }
    },
    deleteCart(index) {
      this.$store
        .dispatch("deleteCart", this.cartList[index].skuId)
        .then(() => {
          this.getData();
        }).catch(err=>{
          console.log(err);
        });
    },
    checkedHandle(index) {
      this.$store.dispatch("changeIsChecked", {
        id: this.cartList[index].skuId,
        isChecked: this.cartList[index].isChecked,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>