import { requestone } from "./request";

export const getStrategyTest = (data) => {
  return requestone({
    url:"/quant/strategy_test",
    method:"post",
    data
  })
}

export const getStrategyResult = (data) => {
  return requestone({
    url:"/quant/get_strategy_test_result",
    method:"post",
    data
  })
}

export const getStrtegyList = (data) => {
  return requestone({
    url:"/quant/strtegylist",
    method:"post",
    data
  })
}