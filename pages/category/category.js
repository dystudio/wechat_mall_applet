const product = require('../../utils/product.js')

Page({
  data: {
    items: []
  },

  onLoad: function(params) {
    var that = this
    wx.setNavigationBarTitle({
      title: params.type
    })
    product.getCategories(params.type).then(function(result) {
      var data = getApp().store.sync(result.data)
      that.setData({items: data})
      wx.setStorage({
        key: `cate_${params.type}`,
        data: data
      })
    }, function(fail) {
      var key = `cate_${params.type}`
      var data = wx.getStorage(key)
      wx.setData({items: data})
    })
  },

  bindShowProduct: function(e) {
    var that = this
    var cartItems = wx.getStorageSync('cartItems') || []
    var thisItem  = this.data.items.find(function(ele){
      return ele.id === e.currentTarget.dataset.id
    })

    var exist = cartItems.find(function(ele){
      return ele.id === that.data.id
    })

    if (exist) {
      exist.quantity = '1'
    } else {
      cartItems.push({
        id: thisItem.id,
        quantity: '1',
        product: thisItem
      })
    }
    wx.setStorage({
      key: 'cartItems',
      data: cartItems
    })

    wx.navigateTo({
      url: '../cart/cart'
    })

  }
})
