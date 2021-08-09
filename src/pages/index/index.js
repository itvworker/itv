// index.js
// 获取应用实例
const app = getApp()
Page({
    data: {
        motto: 10,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
        listData:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        defaultValue: 5,
        datePickerShow: false,
        show: false,
        defaultValue:[0, 3],
        items:[{
            text: '分类1',
            value: 0,
            children:[
                {
                    text:"分类1-1",
                    value: 1,
                },
                {
                    text:"分类1-2",
                    value: 3,
                    forbid:true
                }
            ]
        },
        {
            text: '分类2',
            value: 4,
            children:[
                {
                    text:"分类2-1",
                    value: 5,
                },
                {
                    text:"分类2-2",
                    value: 6
                },
                {
                    text:"分类2-3",
                    value: 7
                },
                {
                    text:"分类2-4",
                    value: 8
                },
                {
                    text:"分类2-5",
                    value: 9
                },
                {
                    text:"分类2-6",
                    value: 10
                },
                {
                    text:"分类2-7",
                    value: 11,
                },
                {
                    text:"分类2-8",
                    value: 12
                },
                {
                    text:"分类2-10",
                    value: 13
                },
                {
                    text:"分类2-11",
                    value: 14
                },
                {
                    text:"分类2-12",
                    value: 15
                },
                {
                    text:"分类2-13",
                    value: 16
                }
            ]
        }
        ]
        
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
        url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
        this.setData({
            canIUseGetUserProfile: true
        })
    }
    setTimeout(() => {
        this.setData({
            listData: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            // listData: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17, 18, 19, 20],
        })
    }, 10000);
  },
  onOpen() {
    // let res = this.selectComponent("#picker");
    // res.init();
    this.setData({
        show: true
    })
  },
  onChooseItem(item) {
    console.log(item);
    this.setData({
        show: false
    })
  },
  onClose() {
    this.setData({
        show: false
    })
  },
  onDatepicker() {
        this.setData({
            datePickerShow: true
        })
  }
  
})


