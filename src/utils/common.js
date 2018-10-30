// 判断图片来源
export function isOriginal(src) {
  let isOriginal = /\/cars\//
  return isOriginal.test(src)
}