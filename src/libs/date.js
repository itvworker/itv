export default {
    /**
     * 是否为闫年
     * @return {Boolse} true|false
     */
    isLeapYear: function(y) {
        return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    },

    /**
     * 返回星期数
     * @return {Number}
     */
    getWhatDay: function(year, month, day) {
        let date = new Date(year + '/' + month + '/' + day);
        let index = date.getDay();
        let dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return dayNames[index];
    },

    /**
     * 返回1号星期几
     * @return {Number}
     */
    getMonthPreDay: function(year, month) {
        let date = new Date(year + '/' + month + '/01');
        let day = date.getDay();
        if (day == 0) {
            day = 7;
        }
        return day;
    },

    /**
     * 返回月份天数
     * @return {Number}
     */
    getMonthDays: function(year, month) {
        if (/^0/.test(month)) {
            month = month.split('')[1];
        }
        return [0, 31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    /**
     * 补齐数字位数
     * @return {string}
     */
    getNumTwoBit(n) {
        n = Number(n);
        return (n > 9 ? '' : '0') + n;
    },

    /**
     * 日期对象转成字符串
     * @return {string}
     */
    date2Str: function(date, split) {
        if (typeof date == 'string') return date;
        split = split || '-';
        let y = date.getFullYear();
        let m = this.getNumTwoBit(date.getMonth() + 1);
        let d = this.getNumTwoBit(date.getDate());
        return [y, m, d].join(split);
    },

    /**
     * 返回日期格式字符串
     * @param {Number} 0返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
     * @return {string} '2014-12-31'
     */
    getDay(i) {
        i = i || 0;
        let date = new Date();
        let diff = i * (1000 * 60 * 60 * 24);
        date = new Date(date.getTime() + diff);
        return this.date2Str(date);
    },

    /**
     * 时间戳转换为日期格式
     * @return {String}
     */
    timestampToDate: function(timestamp) {
        let date = new Date(timestamp);
        return date.getFullYear() + '-' + getNumTwoBit(date.getMonth() + 1) + '-' + getNumTwoBit(date.getDate());
    },

    /**
     * 时间比较
     * @return {Boolean}
     */
    compareDate: function(date1, date2) {
        let startTime = new Date(date1.replace('-', '/').replace('-', '/'));
        let endTime = new Date(date2.replace('-', '/').replace('-', '/'));
        if (startTime >= endTime) {
            return false;
        }
        return true;
    },
    /**
     * 时间比较
     * @return {Boolean}
     */
    compareDateArr: function(date1, date2) {
        let startTime = new Date();
        startTime.setFullYear(date1[0], date1[1], date1[2]);
        startTime.setHours(date1[3], date1[4]);
        let endTime = new Date();
        endTime.setFullYear(date2[0], date2[1], date2[2]);
        endTime.setHours(date2[3], date2[4]);
        if (startTime >= endTime) {
            return false;
        }
        return true;
    },
    /**
     * 时间是否相等
     * @return {Boolean}
     */
    isEqual: function(date1, date2) {
        let startTime = new Date(date1).getTime();
        let endTime = new Date(date2).getTime();
        if (startTime == endTime) {
            return true;
        }
        return false;
    },
    /**
     * 
     * @param {Number} start 开始数
     * @param {Number} end 结束数
     * @returns 
     */
    getBeignEndArr(start, end) {
        let arr = [];
        for(let i = start; i<=end; i++) {
            arr.push(i.toString());
        }
        return arr;
    },
    /**
     * 
     * @param {Array} start 开始年月
     * @param {Array} end 结束的年月
     * @param {Array} now 选中的年月
     * @returns {Array}
     */
    getMonthArr(start, end, now) {
        let arr = []
        //当前选中年份等于结束年份时
        if(end[0] === now[0] && start[0]!==end[0]) {
            for(let i = 1; i <=parseInt(end[1]); i++) {
                arr.push(this.getNumTwoBit(i));
            }
        }
        //当前选中年份等于结束年份时
        if(start[0] === now[0] && start[0]!==end[0]) {
            for(let i = parseInt(now[1]); i <=12; i++) {
                arr.push(this.getNumTwoBit(i));
            }
        }
        //其它都显示12个月份
        if(end[0] !== now[0] && start[0] !== now[0] && start[0]!==end[0]) {
            for(let i = 1; i <=12; i++) {
                arr.push(this.getNumTwoBit(i));
            }
        }
        //结束年与开始年相等
        if(start[0]===end[0]) {
            for(let i = parseInt(start[1]); i <=parseInt(end[1]); i++) {
                arr.push(this.getNumTwoBit(i));
            }
        }
        return arr;
    },
    /**
     * 
     * @param {Array} start 开始年月
     * @param {Array} end 结束的年月
     * @param {Array} now 选中的年月
     * @returns {Array}
     */
    getDayArr(start, end, now) {
        
    }
    
};

