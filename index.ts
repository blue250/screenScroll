import PageScroll from "./main";
// PageScollClass
const coms=[PageScroll]
// let v:any
const storage: { [key: string]: { value?: any, promise: Promise<any> } } = {};  
const resolvers: { [key: string]: (value: any) => void } = {};  

export function getnode(key: string): Promise<any> {  
    if (!storage[key]) {  
        // 创建一个新的Promise，并将其resolver函数存储在resolvers对象中  
        storage[key] = {  
            promise: new Promise((resolve, reject) => {  
                resolvers[key] = resolve;  
            }),  
        };  
    }  
    return storage[key].promise;  
}  

export function setnode(key: string, value: any): void {  
    // 检查是否有等待这个key的resolver函数  
    if (resolvers[key]) {  
        console.log(resolvers[key],resolvers[key](value),'resolvers[key]');
        
        // 如果有，调用它并传入值来resolve对应的Promise  
        resolvers[key](value);  
        // 清理resolver，避免重复设置  
        delete resolvers[key];  
    } else {  
        // 如果没有等待的resolver，直接设置值（这种情况可能发生在getvalue之后立即setvalue）  
        storage[key] = { value,promise:new Promise(()=>{}) };  
    }  
} 


function install(Vue:any){
  // v=Vue
  coms.forEach((com)=>{
    Vue.component(com.name,com)
  })
}
export default install