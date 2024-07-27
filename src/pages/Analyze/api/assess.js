import request from './request'

export const getStockList = (data) => {
  return request({
    url:"/sotcklist",
    method:"post",
    data
  })
}

export const getStockKline = (data) => {
  return request({
    url:"/getstock_kline",
    method:"post",
    data
  })
}

export const getHistoryFactor = (data) => {
  return request({
    url:"/historyfactor",
    method:"post",
    data
  })
}
export const profileText = (data) => {
  return request({
    url:"/factor_profile_test",
    method:"post",
    data
  })
}
export const profileTextResult = (data) => {
  return request({
    url:"/get_factor_profile_test_result",
    method:"post",
    data
  })
}