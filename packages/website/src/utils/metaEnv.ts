/**
 * 直接写import.meta.env，不知为什么会报错，似乎解析成字符串有问题，所以专门搞个模块隔离，
 */
const PROD = import.meta.env.PROD;

export {PROD};


