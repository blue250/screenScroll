import PageScroll from "./main";
// PageScollClass
const coms=[PageScroll]

function install(Vue:any){
  // v=Vue
  coms.forEach((com)=>{
    Vue.component(com.name,com)
  })
}
export default install