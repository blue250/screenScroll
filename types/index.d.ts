export declare function getnode(key: string): Promise<any>;
export declare function setnode(key: string, value: any): void;
declare function install(Vue: any): void;
export declare class PageScollClass {
  pagescroll:{
    ActiveNumber: number;
    Loop: boolean;
    MarginTop: number;
    Height: number;
    NodeHeightList: [number?];
    Time: number;
    NodeTimeList: [number?];
    pagescrollnode: HTMLElement | null;
    ChangeTime(time?: number): void;
    PageNext(Number: number): void;
    PageUp(Number: number): void;
    PageTo(Number: number): void;
    ResizePageTo(Number: number): void;
  }
}
export default install;
