const config = require('./key');
//app.js

App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)
    wx.BaaS.init(config.appKey)
    wx.BaaS.auth.loginWithWechat() 
  },
  globalData: {
    userInfo: null
  }
})