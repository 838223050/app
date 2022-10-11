<template>
  <div>
    <div class="fr page">
      <div class="sui-pagination clearfix">
        <ul>
          <li class="prev" :class="{ disabled: now == 1 }" @click="prePage">
            <a>«上一页</a>
          </li>
          <li
            :class="{ active: now == 1 }"
            v-show="flag"
            @click="pageHandle(1)"
          >
            <a>1</a>
          </li>
          <li class="dotted" v-show="flag"><span>...</span></li>

          <li
            v-for="page in end"
            :key="page"
            v-show="page >= start"
            :class="{ active: now == page }"
            @click="pageHandle(page)"
          >
            <a>{{ page }}</a>
          </li>

          <li class="dotted" v-show="flag"><span>...</span></li>
          <li
            v-show="flag"
            :class="{ active: now == total }"
            @click="pageHandle(total)"
          >
            <a>{{ total }}</a>
          </li>
          <li
            class="next"
            :class="{ disabled: now == total }"
            @click="nextPage"
          >
            <a>下一页»</a>
          </li>
        </ul>
        <div>
          <span>共{{ total }}页&nbsp;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationComp",
  data() {
    return {
      start: 1,
      end: null,
      flag: true,
    };
  },
  props: ["pageSize", "dataNumber", "now"],
  computed: {
    total() {
      return Math.ceil(this.dataNumber / this.pageSize);
    },
  },
  methods: {
    startAndEnd() {
      console.log("caculated", this.total);
      if (this.total <= 7) {
        this.flag = false;
        this.end = this.total;
      } else {
        this.flag = true;
        let i = 2;
        if (this.now <= this.total / 2) {
          for (i = 2; this.now - i <= 1; i--) {
            continue;
          }
          this.start = this.now - i;
          this.end = this.start + 4;
        } else {
          for (i = 2; this.now + i >= this.total; i--) {
            continue;
          }
          this.end = this.now + i;
          this.start = this.end - 4;
        }
      }
    },
    nextPage() {
      if (this.now < this.total) this.$emit("pageChange", this.now + 1);
    },
    prePage() {
      if (this.now > 1) this.$emit("pageChange", this.now - 1);
    },
    pageHandle(num) {
      this.$emit("pageChange", num);
    },
  },
  watch: {
    dataNumber: {
      immediate: true,
      handler() {
        this.startAndEnd();
      },
    },
    now: {
      handler() {
        this.startAndEnd();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 700px;
  height: 66px;
  overflow: hidden;
  margin: 0 auto;
  .sui-pagination {
    margin: 18px 0;
    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 600px;
      float: left;
      li {
        line-height: 18px;
        display: inline-block;
        cursor: pointer;
        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }
        &.active {
          a {
            background-color: #49af4f;
            color: #fff;
            border-color: #fff;
            cursor: default;
          }
        }
        &.prev {
          a {
            background-color: #fafafa;
          }
        }
        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }
        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 19px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border-left: 1px solid #e0e9ee;
            padding: 9px 18px;
            color: #333;
          }
        }
        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }
    div {
      color: #333;
      font-size: 14px;
      float: left;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>