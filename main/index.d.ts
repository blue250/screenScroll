declare class PageScollClass {
  ActiveNumber: number;
  Height: number;
  Time: number;
  pagescrollnode: HTMLElement | null;
  pagescrollstyle: {
    transform: string;
    transition: string;
  };

  constructor(index: number, height?: number);

  ReloadHeight(): void;

  ChangeActiveNumber(number: number): void;

  throttleScroll(callback: (...args: any[]) => void): (this: Window, ...args: any[]) => void;

  debounce(callback: (...args: any[]) => void, time?: number): (this: Window, ...args: any[]) => void;

  PageOnload(): void;

  PageChange(Number: number): Promise<void>;

  PageNext(Number: number): number;

  PageUp(Number: number): number;

  PageTo(Number: number): void;

  pagescrollstylefun(height: number, index: number): void;
}