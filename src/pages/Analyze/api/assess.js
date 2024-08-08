import {requestone} from './request'

export const getStockList = (data) => {
  return requestone({
    url:"/sotcklist",
    method:"post",
    data
  })
}

export const getStockKline = (data) => {
  return requestone({
    url:"/getstock_kline",
    method:"post",
    data
  })
}

export const getHistoryFactor = (data) => {
  return requestone({
    url:"/historyfactor",
    method:"post",
    data
  })
}
export const profileText = (data) => {
  return requestone({
    url:"/factor_profile_test",
    method:"post",
    data
  })
}
export const profileTextResult = (data) => {
  return requestone({
    url:"/get_factor_profile_test_result",
    method:"post",
    data
  })
}