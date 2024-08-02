import request from './request'

export const getStrategyList = () =>{
  return request({
    url:"/strategy",
    method:"get",
  })
}

export const getModelList = () => {
  return request({
    url:"/model",
    method:"get"
  })
}

export const getFactorList = () => {
  return request({
    url:"/factor/",
    method:"get"
  })
}