<template>
  <itv-container>
      <itv-header>Picker</itv-header>
      <itv-main>
      <picker
        :is-visible="isVisible0"
        :list-data="listData0"
        title="请选择年月"
        :default-value-data="defaultValueData0"
        @close="switchPicker('isVisible0')"
        @confirm="setChooseValue0"
      ></picker>
      <!-- demo 城市选择(联动)-->
      <picker
        :is-visible="isVisible"
        title="请选择城市"
        :list-data="listData"
        :default-value-data="defaultValueData"
        @close="switchPicker('isVisible')"
        @confirm="setChooseValue"
        @choose="updateChooseValue"
        @close-update="closeUpdateChooseValue"
      ></picker>
      <!-- demo 年选择-->
      <picker
        :is-visible="isVisible1"
        :default-value-data="defaultValueData1"
        :list-data="listData1"
        @close="switchPicker('isVisible1')"
        @confirm="setYearValue"
      ></picker>
      <!-- demo 城市选择(联动) 自定义-->
      <picker
        :is-visible="isVisible2"
        title="请选择城市"
        :default-value-data="defaultValueData"
        :list-data="custmerCityData"
        :lastChange="true"
        @close="switchPicker('isVisible2')"
        @confirm="setChooseValueCustmer"
        @choose="updateChooseValueCustmer"
        @close-update="closeUpdateChooseValueCustmer"

      ></picker>
  </itv-main>
  </itv-container>

</template>

<script>
import picker from './picker.vue';
const APIData = [
  {
    label: 1,
    array: [
      {
        label: 3,
        value: "朝阳区"
      },
      {
        label: 4,
        value: "海淀区"
      }
    ]
  },
  {
    label: 2,
    array: [
      {
        label: 5,
        value: "测试1"
      },
      {
        label: 6,
        value: "测试2"
      },
      {
        label: 7,
        value: "测试2"
      }
    ]
  }
];
export default {
  components: {
      picker
  },
  data() {
    return {
      date: null,
      isVisible0: true,
      listData0: [
        [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
          "2027",
          "2028",
          "2029",
          "2030",
          "2031",
          "2032",
          "2033",
          "2034",
          "2035",
          "2036",
          "2037",
          "2038",
          "2039"
        ],
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
      ],
      defaultValueData0: ["2012", "2"],
      city: null,
      isVisible: false,
      data: {
        北京: ["北京"],
        黑龙江: [
          "哈尔滨",
          "绥化",
          "漠河",
          "大兴安岭",
          "牡丹江",
          "佳木斯",
          "齐齐哈尔",
          "大庆",
          "五大连池"
        ],
        江西: ["九江", "南昌", "赣州"],
        上海: ["上海"],
        重庆: ["重庆"],
        内蒙古: [
          "呼和浩特",
          "呼和浩特1",
          "呼和浩特2",
          "呼和浩特3",
          "呼和浩特4",
          "呼和浩特5",
          "呼和浩特6",
          "呼和浩特7"
        ]
      },
      dataSub: {
        上海: ["测试1", "测试2"],
        北京: ["西城区", "东城区", "大兴区", "朝阳区", "海淀区"],
        南昌: ["青山湖区", "西湖区", "宏都中路", "梦时代", "八一广场"],
        绥化: ["明水", "拜泉"],
        哈尔滨: ["道里区", "道外区"]
      },
      listData: [["上海", "黑龙江", "北京", "重庆", "江西", "内蒙古"]],
      defaultValueData: null,
      year: null,
      isVisible1: false,
      listData1: [
        ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"]
      ],
      custmerCityData: [
        [
          {
            label: 1,
            value: "北京"
          },
          {
            label: 2,
            value: "上海"
          }
        ]
      ],
      cityCustmer: null,
      isVisible2: false,
      defaultValueData1: null
    };
  },
  created() {
    this.listData = [
      ...[this.listData[0]],
      this.data[this.listData[0][0]],
      this.dataSub[this.data[this.listData[0][0]]]
    ];
  },
  methods: {
    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
    },

    setChooseValue0(chooseData) {
      this.date = `${chooseData[0]}年${chooseData[1]}月`;
    },

    setChooseValue(chooseData) {
      this.city = `${chooseData[0]}-${chooseData[1]}${
        chooseData[2] ? "-" + chooseData[2] : ""
      }`;
    },

    setYearValue(chooseData) {
      this.year = `${chooseData[0]}年`;
    },

    updateLinkage(self, value, index, chooseValue, cacheValueData) {
      if (!value) {
        return false;
      }
      switch (index) {
        case 1:
          let i = this.listData[0].indexOf(value);
          this.listData.splice(index, 1, [...this.data[this.listData[0][i]]]);
          chooseValue = chooseValue ? chooseValue : this.listData[index][0];
          self && self.updateChooseValue(self, index, chooseValue);
          this.updateLinkage(
            self,
            chooseValue,
            2,
            cacheValueData && cacheValueData[2] ? cacheValueData[2] : null
          );
          break;
        case 2:
          let areaData = this.dataSub[value] ? this.dataSub[value] : [];
          this.listData.splice(index, 1, [...areaData]);
          chooseValue = chooseValue ? chooseValue : this.listData[index][0];
          self && self.updateChooseValue(self, index, chooseValue);
          break;
      }
    },

    updateChooseValue(self, index, value, cacheValueData) {
    
      index < 2 && this.updateLinkage(self, value, index + 1, null);
    },

    closeUpdateChooseValue(self, chooseData) {
      this.updateLinkage(self, chooseData[0], 1, chooseData[1], chooseData);
    },

    setChooseValueCustmer(chooseData) {
      var str = chooseData.map(item => item.value).join("-");
      this.cityCustmer = str;
    },
    closeUpdateChooseValueCustmer(self, chooseData) {
      this.setChooseValueCustmer(chooseData);
    },
    updateChooseValueCustmer(self, index, resValue, cacheValueData) {
      let { label, value } = resValue;
      //此处模拟查询API
      setTimeout(() => {
        var resItems = APIData.find(item => item.label == label);
        if (resItems && resItems.array.length) {
          this.$set(this.custmerCityData, index + 1, resItems.array);
         
        }
      }, 100);
    },
    modifyCity() {
      this.updateLinkage("", "重庆", 1, "重庆");
      this.defaultValueData = ["重庆", "重庆"];
    },

    modifyYear() {
      this.defaultValueData1 = ["2018"];
    }
  }
};
</script>
<style lang="less">
@import './picker.less';
</style>
<style lang="less" scoped>
.btn,.show-value {
  display: inline-block;
  margin-left: 20px;
}
.btn {
  padding: 5px;
  border-radius: @itv-btn-border-radius-small;
  color: #fff;
  background-color: #999;
}
</style>
