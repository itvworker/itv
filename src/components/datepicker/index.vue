<template>
<itv-dialog v-model="isVisible" type="bottom" :hideOnClick="hideOnClick">
	
	<picker
		:is-visible="isVisible"
		title="请选择日期"
		:list-data="listData"
		:default-value-data="defaultValueData"
		:custom-class-name="`nut-datepicker`"
		@confirm="setChooseValue"
		@choose="updateChooseValue"
		@close-update="closeUpdateChooseValue"
	/>   
 </itv-dialog>
  

</template>
<script>
import picker from '../picker/picker.vue';
import '../picker/picker.less';
import Utils from '../../libs/date.js';

export default {
  name: 'datepicker',
  props: {
	value: {
		type: String,
		defalut: null
	},
    type: {
      type: String,
      default: 'date'
    },
    isSetSecond: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    isUse12Hours: {
      type: Boolean,
      default: false
    },
    isAm: {
      type: Boolean,
      default: true
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    isShowChinese: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    defaultValue: {
      type: String,
      default: null
    },
    startDate: {
      type: String,
      default: '2000-01-01'
    },
    endDate: {
      type: String,
      default: Utils.date2Str(new Date())
    },
    startHour: {
      type: Number | String,
      default: 0
    },
    endHour: {
      type: Number | String,
      default: 23
    },
    use12Hours:{
        type: Array,
        defualt:()=>['上午', '下午']
    },
    yearType: {
        type: String,
        default: `{value}年`
    },
    monthType: {
        type: String,
        default: `{value}月`
    },
    dayType: {
        type: String,
        default: `{value}日`
    },
    hourType: {
        type: String,
        default: `{value}时`
    },
    minType: {
        type: String,
        default: `{value}分`
    },
    secType: {
        type: String,
        default: `{value}秒`
    }
  },
  data() {
    return {
        listData: [],
        defaultValueData: this.value,
        startDateArr: null,
        endDateArr: null,
        startYear: null,
        endYear: null,
        cacheDefaultData: [],
        cacheListData: [],
        updateYear: null,
        updateMonth: null,
        updateDay: null,
        updateHour: null,
       
    };
  },
  components: {
    picker
  },
  created() {
    this.init();
  },
  computed: {
     chinese() {
         return this.type == 'time'
            ? this.isUse12Hours
            ? [this.hourType, this.minType, '']
            : [this.hourType, this.minType, this.secType]
            : [this.yearType, this.monthType, this.dayType, this.hourType, this.minType]
     },
    dateRange() {
      const { startDate, endDate, defaultValue } = this;
      return { startDate, endDate, defaultValue };
    }
  },
  watch: {
    dateRange(newValue, oldValue) {
      this.init();
    }
  },
  methods: {
    init() {
      if (this.startDate && Utils.isDateString(this.startDate)) {
        this.startDateArr = Utils.getDateArr(this.startDate);
      } else {
        this.startDateArr = Utils.getDateArr('2000-01-01');
      }
      if (this.endDate && Utils.isDateString(this.endDate)) {
        this.endDateArr = Utils.getDateArr(this.endDate);
      } else {
        this.endDateArr = Utils.date2Str(new Date());
      }
      // 结束时间小于开始时间，结束时间重置为开始时间
      if (Utils.compareDateArr(this.endDateArr, this.startDateArr)) {
        // this.endDate = this.startDate;
        this.endDateArr = this.startDateArr;
      }
      // this.startDateArr = this.startDate.replace(/-/g, '/').split('/');
      // this.endDateArr = this.endDate.replace(/-/g, '/').split('/');
      this.initListData();
    },

    initListData() {
      this.resetDefaultValue();
      switch (this.type) {
        case 'date':
          this.cacheListData = [
            ...[this.getYears(), this.getMonths(this.defaultValueData[0]), this.getDays(this.defaultValueData[0], this.defaultValueData[1])]
          ];
          break;
        case 'datetime':
          this.cacheListData = [
            ...[
              this.getYears(),
              this.getMonths(this.defaultValueData[0]),
              this.getDays(this.defaultValueData[0], this.defaultValueData[1]),
              this.getChangeHours(this.defaultValueData[0], this.defaultValueData[1], this.defaultValueData[2]),
              this.getChangeMinutes(this.defaultValueData[0], this.defaultValueData[1], this.defaultValueData[2], this.defaultValueData[3])
            ]
          ];
          break;
        case 'time':
          this.cacheListData = [...[this.getHours(), this.getMinutes()]];
          if (this.isUse12Hours) {
            this.cacheListData = [...this.cacheListData, this.use12Hours];
          } else {
            this.cacheListData = this.isSetSecond ? [...this.cacheListData, this.getSeconds()] : [...this.cacheListData];
          }
          break;
      }
      this.listData = [...this.cacheListData];
    },

    resetDefaultValue() {
      let cacheDefaultValue = null;
      if (!this.defaultValue || !Utils.isDateString(this.defaultValue)) {
        switch (this.type) {
          case 'time':
            cacheDefaultValue = this.isSetSecond ? `00:00:00` : `00:00`;
            break;
          case 'date':
          case 'datetime':
            cacheDefaultValue = `${this.startDateArr[0]}-${this.startDateArr[1]}-${this.startDateArr[2]} ${this.startDateArr[3]}:${this.startDateArr[4]}`;
            break;
        }
      } else {
        cacheDefaultValue = this.defaultValue;
      }

      let splitArr = cacheDefaultValue.split(' ');
      if (this.type === 'time') {
        let timeArr = splitArr[0].split(':');
        this.isUse12Hours && timeArr.push(this.isAm ? this.use12Hours[0] : this.use12Hours[1]);
        this.cacheDefaultData = this.getCacheData(timeArr);
      } else {
        let cacheData = [...splitArr[0].replace(/-/g, '/').split('/')];
        if (this.type == 'datetime') {
          cacheData = [...cacheData, ...splitArr[1].split(':')];
        }
        this.cacheDefaultData = this.getCacheData(cacheData);
        this.updateYear = this.cacheDefaultData[0];
        this.updateMonth = this.cacheDefaultData[1];
        this.updateDay = this.cacheDefaultData[2];
        this.updateHour = this.cacheDefaultData[3];
      }
      this.defaultValueData = [...this.cacheDefaultData];
    },

    getCacheData(data) {
      let cacheData = [];
      data.map((item, index) => {
        item < 10 && (item = item.replace(/^0/g, ''));
        cacheData.push(`${this.chinese[index].replace('{value}',item)}`);
      });
      return cacheData;
    },

    getYears() {
      let cacheYears = [];
      for (var i = this.startDateArr[0]; i <= this.endDateArr[0]; i++) {
        cacheYears.push(`${this.chinese[0].replace('{value}',i)}`);
      }
      return cacheYears;
    },

    getMonths(year) {
      year = this.removeChinese(year);
      let cacheMonths = [];
      for (var i = 1; i <= 12; i++) {
        if (!(year == this.startDateArr[0] && i < this.startDateArr[1]) && !(year == this.endDateArr[0] && i > this.endDateArr[1])) {
          cacheMonths.push(`${this.chinese[1].replace('{value}',i)}`);
        }
      }
      return cacheMonths;
    },

    getDays(year, month) {
      year = this.removeChinese(year);
      month = this.removeChinese(month);
      let days = Array.from(Array(Utils.getMonthDays(year, month)), (v, k) => {
        if (
          !(year == this.startDateArr[0] && month == parseInt(this.startDateArr[1]) && k + 1 < parseInt(this.startDateArr[2])) &&
          !(year == this.endDateArr[0] && month == parseInt(this.endDateArr[1]) && k + 1 > parseInt(this.endDateArr[2]))
        ) {
          return `${this.chinese[2].replace('{value}',k + 1)}`;
        }
      });
      return days.filter(item => item);
    },

    getChangeHours(year, month, day) {
      year = this.removeChinese(year);
      month = this.removeChinese(month).padStart(2, '0');
      day = this.removeChinese(day).padStart(2, '0');
      let hours = Array.from(Array(24).keys()).map(hour => {
        let startEqualState = year == this.startDateArr[0] && month == this.startDateArr[1] && day == this.startDateArr[2];
        let endEqualState = year == this.endDateArr[0] && month == this.endDateArr[1] && day == this.endDateArr[2];
        let startHour = this.startDateArr[3],
          endHour = this.endDateArr[3];

        let resHour = undefined;
        if (startEqualState && endEqualState) {
          if (hour >= parseInt(startHour) && hour <= parseInt(endHour)) {
            resHour = hour;
          }
        } else if (startEqualState) {
          if (hour >= parseInt(startHour)) {
            resHour = hour;
          }
        } else if (endEqualState) {
          if (hour <= parseInt(endHour)) {
            resHour = hour;
          }
        } else {
          resHour = hour;
        }
        if (resHour == 0) {
          resHour = '0';
        }
        return resHour ? `${this.chinese[3].replace('{value}',resHour)}` : undefined;
      });
      return hours.filter(item => item);
    },

    getChangeMinutes(year, month, day, hour) {
      year = this.removeChinese(year);
      month = this.removeChinese(month).padStart(2, '0');
      day = this.removeChinese(day).padStart(2, '0');
      hour = this.removeChinese(hour).padStart(2, '0');
      let minutes = Array.from(Array(60).keys()).map(minute => {
        let startEqualState =
          year == this.startDateArr[0] && month == this.startDateArr[1] && day == this.startDateArr[2] && hour == this.startDateArr[3];
        let endEqualState = year == this.endDateArr[0] && month == this.endDateArr[1] && day == this.endDateArr[2] && hour == this.endDateArr[3];
        let startMinute = this.startDateArr[4],
          endMinute = this.endDateArr[4];

        let resMinute = undefined;
        if (startEqualState && endEqualState) {
          if (minute >= parseInt(startMinute) && minute <= parseInt(endMinute)) {
            resMinute = minute;
          }
        } else if (startEqualState) {
          if (minute >= parseInt(startMinute)) {
            resMinute = minute;
          }
        } else if (endEqualState) {
          if (minute <= parseInt(endMinute)) {
            resMinute = minute;
          }
        } else {
          resMinute = minute;
        }
        if (resMinute == 0) {
          resMinute = '0';
        }
        return resMinute % this.minuteStep == 0 ? `${this.chinese[4].replace('{value}',resMinute)}` : undefined;
      });
      return minutes.filter(item => item);
    },

    getHours() {
      let endHour = this.endHour;
      if (this.isUse12Hours) {
        endHour = 11;
      }
      let hours = Array.from(Array(parseInt(endHour) + 1), (v, k) => {
        if (this.isUse12Hours && k == 0) {
          k = 12;
        }
        if (k >= this.startHour) {
          return `${this.type == 'time' ? this.chinese[0].replace('{value}',k) : this.chinese[3].replace('{value}',k)}`;
        }
      });
      return hours.filter(item => item);
    },
    getMinutes() {
      let minutes = Array.from(Array(60), (v, k) => {
        if (k == 0 || k % this.minuteStep == 0) {
          return `${this.type == 'time' ? this.chinese[1].replace('{value}',k) : this.chinese[4].replace('{value}',k)}`;
        }
      });
      return minutes.filter(item => item);
    },

    getSeconds() {
      let seconds = Array.from(Array(60), (v, k) => {
        if (k == 0 || k % this.secondStep == 0) {
          return `${this.type == 'time' ? this.chinese[2].replace('{value}',k) : this.chinese[5].replace('{value}',k)}`;
        }
      });
      return seconds.filter(item => item);
    },

    setChooseValue(chooseData) {
      let cacheChooseData = [];
      chooseData.map((item, index) => {
        if (this.isUse12Hours && this.type == 'time' && index == 2) {
          cacheChooseData.push(item);
        } else {
          cacheChooseData.push(Utils.getNumTwoBit(this.removeChinese(item)));
        }
      });
      if (/^date/.test(this.type)) {
        switch (this.type) {
          case 'date':
            cacheChooseData.push(`${cacheChooseData[0]}-${cacheChooseData[1]}-${cacheChooseData[2]}`);
            break;
          case 'datetime':
            cacheChooseData.push(`${cacheChooseData[0]}-${cacheChooseData[1]}-${cacheChooseData[2]} ${cacheChooseData[3]}:${cacheChooseData[4]}`);
            break;
        }
        let week = Utils.getWhatDay(cacheChooseData[0], cacheChooseData[1], cacheChooseData[2]);
        cacheChooseData.push(week);
      } else {
        cacheChooseData.push(`${cacheChooseData[0]}:${cacheChooseData[1]}${this.isSetSecond ? ':' + cacheChooseData[2] : ''}`);
      }
      this.$emit('choose', cacheChooseData);
    },

    removeChinese(value) {
      return value.toString().replace(/([^\u0000-\u00FF])/g, '');
    },

    updateLinkage(self, index, value, chooseValue, cacheValueData) {
      if (!value || !cacheValueData[index] || this.type == 'time') {
        return false;
      }
      value = this.removeChinese(value);
      switch (index) {
        case 1: //year
          this.updateYear = value;
          this.listData.splice(index, 1, this.getMonths(value));
          chooseValue = chooseValue ? chooseValue : cacheValueData[index];
          let curMonthsData = this.listData[index];
          if (curMonthsData.indexOf(chooseValue) === -1) {
            chooseValue = curMonthsData[0];
          }
          self && self.updateChooseValue(self, index, chooseValue);
          this.updateLinkage(self, 2, cacheValueData[index], null, cacheValueData);
          break;
        case 2: //month
          this.updateMonth = value;
          this.listData.splice(index, 1, this.getDays(parseInt(this.updateYear), value));
          chooseValue = chooseValue ? chooseValue : cacheValueData[index];
          let curDaysData = this.listData[index];
          if (curDaysData.indexOf(chooseValue) === -1) {
            if (curDaysData.length < 28) {
              chooseValue = curDaysData[0];
            } else {
              let curChooseDay = parseInt(this.removeChinese(chooseValue));
              let days = curDaysData.length;
              chooseValue =  this.chinese[2].replace('{value}', (curChooseDay > days ? days : curChooseDay));
            }
          }

          self && self.updateChooseValue(self, index, chooseValue);
          this.updateLinkage(self, 3, cacheValueData[index], null, cacheValueData);
          break;
        case 3: //day
          this.updateDay = value;
          this.listData.splice(index, 1, this.getChangeHours(parseInt(this.updateYear), parseInt(this.updateMonth), value));
          chooseValue = chooseValue ? chooseValue : cacheValueData[index];
          let curHoursData = this.listData[index];
          if (curHoursData.indexOf(chooseValue) === -1) {
            chooseValue = curHoursData[0];
          }
          self && self.updateChooseValue(self, index, chooseValue);
          this.updateLinkage(self, 4, cacheValueData[index], null, cacheValueData);
          break;
        case 4: //hour
          this.updateHour = value;
          this.listData.splice(
            index,
            1,
            this.getChangeMinutes(parseInt(this.updateYear), parseInt(this.updateMonth), parseInt(this.updateDay), parseInt(this.updateHour), value)
          );
          chooseValue = chooseValue ? chooseValue : cacheValueData[index];
          let curMinuteData = this.listData[index];
          if (curMinuteData.indexOf(chooseValue) === -1) {
            chooseValue = curMinuteData[0];
          }
          self && self.updateChooseValue(self, index, chooseValue);
      }
    },

    updateChooseValue(self, index, value, cacheValueData) {
      switch (index) {
        case 0: //year
        case 1: //month
        case 2: //day
        case 3: //hour
          this.updateLinkage(self, index + 1, value, null, cacheValueData);
          break;
        case 4: //min
          break;
      }
    },

    closeUpdateChooseValue(self, chooseData) {
      this.updateLinkage(self, 1, chooseData[0], chooseData[1], chooseData);
    },

    switchPicker(param) {
      this.$emit('close');
    }
  }
};
</script>
