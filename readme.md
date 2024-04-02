
screen-scroll是一个基于 vue3 实现的全屏或区域滚动组件

##  安装

```shell
npm i screen-scroll
```

## 注册
```shell
import screenScroll from 'screen-scroll'
import 'screen-scroll/screen-scroll.css'

createApp(App).use(screenScroll).mount('#app')
```
## 使用
```shell
#基础使用
    <screenScroll>
      <div>doc1</div>
      <div>doc2</div>
    </screenScroll>
```
## 参数与事件
```shell
    #参数
    ScrollOption: {
        Id:'',// 多个组件时 必填 用于准确获取组件
        Index: 0,// 起始页下标 从0开始
        Time: 700,// 页面切换的间隔事件 单位ms
        Loop: false,// 是否循环 从0到结束 从结束到0
        PageHeight: "100vh",// 父元素高度
        Height: "100vh",// 子元素高度 auto为不额外设置高度
        Nav:false// 是否有侧边圆点导航
    }
```
```sheel
    #事件
    beforeChange(from,to)
    from 从第几页跳出 to 跳转到第几页
    在页面跳转之前的事件 不会等待事件结束
    
    afterChange(from,to)
    from 从第几页跳出 to 跳转到第几页
    在页面跳转之后的事件 不会等待事件结束
```
```sheel
    #使用
    <screenScroll :ScrollOption=ScrollOption @beforeChange=func1 @agterChange=func2>
      <div>doc1</div>
      <div>doc2</div>
    </screenScroll>
```
## 内置方法
```
import { setnode,getnode } from 'screen-scroll'

#相当于一个存放节点的地方 用于将节点或其他数据存起来 用于在其他组件或页面获取
function setnode(key: string, value: any): void;

#用于获取存放的节点 会返回一个Promise 即使先调用getnode再setnode 后续再使用getnode时也会取到相应的节点
function getnode(key: string): Promise<any>;
```

## 组件类
```
class PageScollClass {
  ChangeTime(time?: number): void;//用于改变页面之间切换时间
  PageNext(Number: number): void;//切换到下Number页
  PageUp(Number: number): void;//切换到上Number页
  PageTo(Number: number): void;//跳转到Number页
  ResizePageTo(Number: number): void;//立即跳转到Number
}
```
```
    <screenScroll ref="pagescrollref">
    </screenScroll>
    <script setup lang=ts>
    import { PageScollClass } from 'screen-scroll'
    let pagescrollref=ref<PageScollClass | null>(null)
    
    #调用 获取到节点后
    pagescrollref.value.xx
    </script>
```