<!-- @format -->

<template>
  <div style="position: relative; overflow: hidden;height:100%">
    <slot name="tabbar"></slot>
    <div
      class="pagescrollnode"
      :id="'pagescrollnode'+defprop.Id"
      ref="pagescrollnode"
      :style="pagescroll.pagescrollstyle"
    >
      <slot></slot>
    </div>
    <div class="sild" v-if="ScrollOption.Nav">
      <ul>
        <li
          v-for="(item, index) in pagescroll.PageMax + 1"
          :key="'sild' + index"
          :class="{ active: pagescroll.ActiveNumber == index }"
          @click="pagescroll.PageTo(index)"
        >
          <span></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, defineComponent, reactive, h } from "vue";
import PageScroll from "./main";
import PageScollClass from "./main/index";
// interface ScrollOption{
//   Index:number
// }
export default defineComponent({
  name: "screenScroll",
  props: {
    ScrollOption: {
      type: Object,
      default: {
        // 多个组件时 必填
        Id:'',

        // 起始页下班 从0开始
        Index: 0,

        // 页面直接的间隔
        Time: 700,

        // 是否循环
        Loop: false,

        // 父元素高度
        PageHeight: "100vh",

        // 子元素高度 auto可选
        Height: "100vh",

        // 是否有侧边导航
        Nav:false
      },
    },
  },
  // render() {
  //   return h('div', { style: { overflow: 'hidden' } }, [
  //     h('div', {
  //       class: 'pagescrollnode',
  //       id: 'pagescrollnode',
  //       ref: 'pagescrollnode',
  //       style: this.pagescroll.pagescrollstyle
  //     }, this.$slots.default!())
  //   ]);
  // },
  setup(props,{emit}:any) {
    let defprop=reactive({
        Id:'',

        // 起始页下班 从0开始
        Index: 0,

        // 页面直接的间隔
        Time: 700,

        // 是否循环
        Loop: false,

        // 父元素高度
        PageHeight: "100vh",

        // 子元素高度 auto可选
        Height: "100vh",

        // 是否有侧边导航
        Nav:false
      })
    let p=Object.assign(defprop,props.ScrollOption)

      
    let pagescroll = reactive(new PageScollClass(p.Index, 0,emit));
    onMounted(() => {

      
      pagescroll.Mounted(p);
      // pagescroll.ReloadHeight()
      // // 设置页面监听
      // pagescroll.PageOnload();
    });
    return { pagescroll,defprop };
  },
});
</script>

<style lang="less" scoped>
.pagescrollnode {
  position: relative;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.sild {
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translateY(-50%);
  li {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      transition:all 200ms;
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #333;
    }
    &:hover {
      span{
        width: 10px;
      height: 10px;
      }
    }
  }
  .active{
      span{
        width: 12px;
        height: 12px;
      }
      &:hover{
        span{

          width: 12px;
          height: 12px;
        }
      }
    }
}
// .d_tabber{
//   width: 100%;
//   position: fixed;
//   top: 0;
//   z-index: 2;
// }
</style>
