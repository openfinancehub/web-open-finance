import { requestone } from "./request";

export const getStrategyTest = (data) => {
  return requestone({
    url:"/strategy_test",
    method:"post",
    data
  })
}

export const getStrategyResult = (data) => {
  return requestone({
    url:"/get_strategy_test_result",
    method:"post",
    data
  })
}

export const getStrtegyList = (data) => {
  return requestone({
    url:"/strtegylist",
    method:"post",
    data
  })
}