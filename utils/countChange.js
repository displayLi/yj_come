export default{
  /**
   * 加一
   * @params that page对象
   * @params field 字段名
   * @params count 数量
   * @params MaxCount 最大数量
   * @params num 每次增加数量
   */
  addCount(that, field, count, MaxCount, num = 1){
    count += num
    if (count > MaxCount){
      count = MaxCount
    }
    that.setData({
      [field]: count
    })
  },

  /**
   * 减一
   * @params that page对象
   * @params field 字段名
   * @params count 数量
   * @params minCount 最小数量
   * @params num 每次增加数量
   */
  minusCount(that, field, count, minCount = 1, num = 1) {
    count -= num
    if (count < minCount) {
      count = minCount
    }
    that.setData({
      [field]: count
    })
  },

  /**
   * 输入
   * @params that page对象
   * @params field 字段名
   * @params count 数量
   * @params MaxCount 最大数量
   * @params minCount 最小数量
   */
  countInput(that, field, count, MaxCount , minCount = 1) {
    if (count > MaxCount) {
      count = MaxCount
    }
    if (count < minCount) {
      count = minCount
    }
    that.setData({
      [field]: count
    })
  },
}