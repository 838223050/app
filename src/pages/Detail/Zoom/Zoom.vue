<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="(event) => zoom(event)"></div>
    <div class="big" >
      <img :src="skuImageList[currentIndex].imgUrl" ref='big'/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
// let mask = document.getElementsByClassName("mask")[0];
// let picture = document.getElementsByClassName("spec-preview")[0];
// picture.addEventListener("hover", (e) => {
//   console.log(e, mask);
// });
export default {
  name: "ZoomComp",
  props: {
    skuImageList: {
      default: function () {
        return [{}];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    this.$bus.$on("changeCurrentImage", this.changeCurrentImage);
  },
  methods: {
    changeCurrentImage(index) {
      this.currentIndex = index;
    },
    zoom(event) {
      let left = event.offsetX - 100;
      let top = event.offsetY - 100;
      if (left < 0) left = 0;
      if (left > 200) left = 200;
      if (top < 0) top = 0;
      if (top > 200) top = 200;
      this.$refs.big.style.left=-left*2 +'px';
      this.$refs.big.style.top=-top*2 +'px';
      this.$refs.mask.style.left = left + "px";
      this.$refs.mask.style.top = top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>