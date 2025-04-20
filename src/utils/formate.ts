/**
 * 字符串处理工具函数
 */

/**
 * 将字符串首字母大写
 * @param str 输入字符串
 * @returns 首字母大写的字符串
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 将字符串中每个单词的首字母大写
 * @param str 输入字符串
 * @returns 每个单词首字母大写的字符串
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str.replace(/(^|\s)\S/g, l => l.toUpperCase());
};
