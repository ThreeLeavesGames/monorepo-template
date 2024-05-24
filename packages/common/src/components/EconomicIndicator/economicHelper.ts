export function split(str: string, index: number):string[] {
    const result = [str.slice(0, index), str.slice(index)];
  
    return result;
  }