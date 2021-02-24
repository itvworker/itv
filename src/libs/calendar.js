export default {
    /**
     * @description 是否是闰年
     * @param {Number} 年
     */
    isLeapYear(year) {
        return year % 4 === 0
    },

    /**
     * @description 获取月份的天数
     * @param {Number} year 年
     * @param {Number} month 月
     */
    getMonthDays(year, month) {
        if(this.isLeapYear(year) && month ===2) {
            return  28
        }
        let daysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return daysArr[month - 1]
    },
    /**
     * 将0到9转换成09
     * @param {Number} value
     */
    gt(value) {
        value = parseInt(value)
        return value>=10?value:0+''+value
    },
    /**
     * @description 生成月分数组
     * @param {number} year  年
     * @param {number} month 月
     * @param {number} type 日期格式 0：直接生成数组， 1：按星期日到星期一的格式生成，多出的用上月补充 3:按星期一到星期日输出，多出的用上月补充
     * @param {number} fixed 是固定返回数组为42， 少的用下个的补充
     */
    getMonthArray(year, month) {
        let days = this.getMonthDays(year, month);
        let months = [];
        for (let i=1, l = days; i < l; i++) {
            
        }  
    },
    
    
}