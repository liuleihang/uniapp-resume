/**
 * 判断是否是微信环境
 * @returns Boolean
 */
function isWeixin() {
  return /(micromessenger|wechatdevtools)/i.test(navigator?.userAgent);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
function shuffle(array) {
  let newArray = copyArray(array)
  let j, x, i;
  for (i = newArray.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = newArray[i - 1];
    newArray[i - 1] = newArray[j];
    newArray[j] = x;
  }
  return newArray;
}
export {
  isWeixin,
  shuffle
}