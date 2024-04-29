// import { getCurrentInstance } from 'vue';
// const instance = getCurrentInstance()!
// 节流
const throttleScroll = function (callback: (...args: any[]) => void, time: number = 100) {
  let timer: number | null = null;
  return function (this: Window, ...args: any[]) {
    if (!timer) {
      callback.apply(this, args);
      timer = window.setTimeout(() => {
        timer = null;
      }, time);
    }
  };
}

// 防抖
const debounce = function (callback: (...args: any[]) => void, time: number = 100) {
  let timer: number | undefined;
  return function (this: Window, ...args: any[]) {
    window.clearTimeout(timer)
    
    timer = window.setTimeout(() => {
      callback.apply(this, args)
    }, time);
  }
}

// 判断类型
const showtype = function (v: any) {
  let type = Object.prototype.toString.call(v)
  let t = type.slice(1, type.length - 1).split(' ')[1]
  return type

}

// 页面类
export default class PageScollClass {
  // 当前显示页面下标
  ActiveNumber: number = 0;

  // loop 循环
  Loop:boolean=false;

  // 距离顶部高度
  MarginTop:number=0;

  // 固定滚动高度
  Height: number = 0;

  // 自定义滚动高度
  NodeHeightList: [number?] = []

  // 固定滚动事件 ms
  Time: number = 700;

  // 冻结
  Freeze:boolean=false;

  // 自定义滚动事件 ms
  NodeTimeList: [number?] = []

  // 父节点
  pagescrollnode: HTMLElement | null = null;

  emit:any

  // 页面样式
  pagescrollstyle = {
    transform: "",
    transition: `transform 700ms ease 0s`,
  };

  // 最大页数
  PageMax: number = 0;

  constructor(index: number, height: number = 0,emit:any) {
    this.ActiveNumber = index;
    this.Height = height;
    this.emit=emit
    this.pagescrollstyle = {
      transform: "",
      transition: `transform ${this.Time}ms ease 0s`,
    };
  }

  // 挂载后 有节点后
  Mounted(option: any) {
    this.Time=option.Time
    this.Loop=option.Loop
    this.pagescrollnode = document.getElementById("pagescrollnode"+option.Id);
    // const mtype=showtype(option.Height)
    if (this.pagescrollnode) {
      this.PageMax = this.pagescrollnode.children.length - 1;
      const children = this.pagescrollnode.children as HTMLCollectionOf<HTMLElement>;
      this.pagescrollnode.style.height = option.PageHeight
      if (option.Height == 'auto') {

      } else {
        for (const i of Array.from(children)) {

          // 子节点也设置为传入高度
          i.style.height || (i.style.height = option.Height);
        }
      }
      this.ReloadNode(children)
      this.PageLoad('On')
    }else{

      
    }

  }

  // 加载高度
  ReloadNode(children:HTMLCollectionOf<HTMLElement>) {
    this.Height = this.pagescrollnode!.clientHeight
    for (let i=0;i<children.length;i++) {

      
      // 子节点设置高度
      this.NodeTimeList[i]=parseInt(children[i].getAttribute('time')||this.Time.toString())
      this.NodeHeightList[i]=children[i].offsetTop
      // children[i].style.height
    }
  }
  // 改变时间
  ChangeTime(time:number=0){ 
    this.Time=time
    this.pagescrollstyle.transition= `transform ${this.Time}ms ease 0s`
    // this.PageLoad('On')
    
  }

  // 改变activenumber方法
  // ChangeActiveNumber(number: number) {
  //   this.ActiveNumber = number;
  // }


  // 页面滚轮监听
  PageLoad(type:'On'|'Off') {
    // const WheelList=throttleScroll((e: WheelEvent) => {
    //   if (e.deltaY > 0) {
    //     this.PageChange(1);
    //   }
    //   if (e.deltaY < 0) {
    //     this.PageChange(-1);
    //   }
    // },this.Time)
    //   let EventList: 'addEventListener' | 'removeEventListener'=(type=='On'?'addEventListener':'removeEventListener')
          // 监听滚动
          this.pagescrollnode!.addEventListener(
      "wheel",
      e=>{
        e.stopPropagation()
      if (e.deltaY > 0) {
        
        this.PageChange(1);
      }
      if (e.deltaY < 0) {
        this.PageChange(-1);
      }
    }
    );



    // 监听页面尺寸变化 重新赋值高度
    let resizeObserver:ResizeObserver|null=null;
    let resizeFun=debounce((e) => {
      const children = this.pagescrollnode!.children as HTMLCollectionOf<HTMLElement>;
      this.ReloadNode(children)
      this.ResizePageTo(this.ActiveNumber)
    },100)
    if(resizeObserver!==null){
      (resizeObserver as ResizeObserver).unobserve(this.pagescrollnode as Element)
    }
    resizeObserver = new ResizeObserver(resizeFun);
    resizeObserver.observe(this.pagescrollnode as Element);



    let startY: number | null = null;

    this.pagescrollnode!.addEventListener("touchstart", function (e:any) {
      startY = e.touches[0].clientY;
    });

    this.pagescrollnode!.addEventListener("touchmove", (e) => {
      if (!startY) return;

      let deltaY = e.touches[0].clientY - startY;

      if (deltaY > 10) {
        // 向上滚动
        this.PageChange(-1);
      } else if (deltaY < -10) {
        // 向下滚动
        this.PageChange(1);
      }

      // 重置 startY，以便下一次触摸事件
      startY = null;
    });


  }

  // PageUnLoad(){
  //   window.removeEventListener('wheel')
  // }

  // 切换页面方法
  PageChange(Number: number){
    if(Number<0){
      this.PageUp(1)
    }
    if(Number>0){
      this.PageNext(1)
    }
    // this.pagescrollstyle.transition=`transform ${this.NodeTimeList[this.ActiveNumber]}ms ease 0s`
  }

  // 页面切到下number屏
  PageNext(Number: number){
    
    let n = this.ActiveNumber;
    n += Number;
    if (n > this.PageMax) {
      // debugger

      
      if(this.Loop){
        n=0
      }else{
        // this.PageLoad('Off')
        n = this.PageMax;
        // this.PageLoad('On')
      }
    }
    this.PageTo(n)
    // return n;
  }

  // 页面切到上number屏
  PageUp(Number: number){
    let n = this.ActiveNumber;
    n -= Number;
    if (n < 0) {
      if(this.Loop){
        n=this.PageMax
      }else{
        // this.PageLoad('Off')
        n = 0;
        // this.PageLoad('On')
      }
    }
    this.PageTo(n)
  }

  // 页面跳转到number
  PageTo(Number: number){

    
    if(this.ActiveNumber==Number){

    }else{
      // 如果没冻结 可以动
      if(!this.Freeze){

        
      // 改变之前事件
      this.emit('beforeChange',{from:this.ActiveNumber,to:Number})
      // 翻页之前 改变时间
      this.Freeze=true
      this.ChangeTime(this.NodeTimeList[this.ActiveNumber])
      this.ActiveNumber = Number;
      this.MarginTop=(this.NodeHeightList[this.ActiveNumber])||0
      this.pagescrollstylefun(this.MarginTop);
      setTimeout(() => {
      this.emit('afterChange',{from:this.ActiveNumber,to:Number})
        this.Freeze=false
      }, this.Time);
      }

    }
  }

  // resize时重新改变高度
  ResizePageTo(Number:number){
    this.ChangeTime(0)
    this.MarginTop=(this.NodeHeightList[Number])||0
    this.pagescrollstylefun(this.MarginTop);
    // 重置时间
    this.ChangeTime(this.NodeTimeList[this.ActiveNumber])
  }

  // 父节点style函数
  pagescrollstylefun(height:number) {
    this.pagescrollstyle.transform = `translate(0,-${height}px)`;

    
  }

}