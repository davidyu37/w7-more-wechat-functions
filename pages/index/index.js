//index.js
const app = getApp()

Page({
  data: {
    imageBase64: '',
    imageURL: ''
  },
  takePhoto: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        let MyFile = new wx.BaaS.File()
        let fileParams = {filePath: res.tempFilePaths[0]}
        let metaData = {categoryName: 'SDK'}

        MyFile.upload(fileParams, metaData).then(res => {
          // Upload successful
          let data = res.data 
          console.log('data uploaded', res);
        }, err => {
          // HError 
        })
      }
    })
  },
  previewMyImage: function(files) {
    wx.previewImage({
      current: 'https://images.unsplash.com/photo-1568301931370-e069a9ff16f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3452&q=80',  // number of index or file path
      urls: ['https://images.unsplash.com/photo-1568301931370-e069a9ff16f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3452&q=80', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80']  // Array of temp files
    })
  },
  getLocation: function() {
    // To prevent asking user for permission if they already agree
    wx.getSetting({
      success(res) {
        console.log('setting res', res);
        // If user hasn't agree to give permission to access location
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success () {
              wx.getLocation({
                type: 'wgs84', // or gcj02
                success: function(res) {
                  console.log(res);
                }
              })
            }
          })
        } else {
          // If user had, get location
          wx.getLocation({
            type: 'wgs84', // or gcj02
            success: function(res) {
              console.log(res);
            }
          })
        }
      },
      fail(e) {
        console.log(e);
      }
    })
  },
  getQRCode: function() {
    const params = {
      path: '/pages/index/index',
      width: 250
    };

    wx.BaaS.getWXACode('wxacode', params, true).then(res => {
      console.log(res);
      this.setData({
        imageBase64: res.image,
        imageURL: res.download_url
        })
    }).catch(err => {
      // HError 对象
      console.log(err)
    });
  }
})
