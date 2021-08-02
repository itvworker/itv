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
        defaultValue: 5
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
  onChooseItem(item) {
    console.log(item);
  }
  
})


