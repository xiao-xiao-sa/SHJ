var info = {
  //收货人
  name: '王一',
  //联系电话
  phone: '12345678900',
  //收货地址
  address: '浙江省杭州市余杭区良渚街道 青云坊8幢2单元301室',
  //订单编号
  orderNumber: 18254665144551,
  //订单状态 
  status: 3,
  shopList: [
    {
      imgUrl: '/assets/img/slt.png',
      title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",
      price: 200,
      count: 1
    },
    {
      imgUrl: '/assets/img/slt.png',
      title: "林氏木业北欧沙发家具小户型木框客厅现代简约组合",
      price: 200,
      count: 1
    }
  ],
  totalPrice: 400,
  //运费
  freight: 100,
  //快递公司
  company: 'yunda',
  //快递单号
  postid: 3831699397708,
  //订单创建时间
  orderTime01: '2018-04-26 13:12:24',
  //订单付款时间
  orderTime02: '2018-04-26 13:12:24',
  //订单发货时间
  orderTime03: '2018-04-26 13:12:24',
  //订单收货时间
  orderTime04: '2018-04-26 13:12:24'
}

module.exports = {
  info:info
}