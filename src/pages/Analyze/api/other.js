import { requesttwo } from "./request";

export const getStrategyList = () => {
  return requesttwo({
    url: "/strategy",
    method: "get",
  })
}
export const deleteStrategy = (id) => {
  return requesttwo({
    url: "/strategy",
    method: "delete",
    params: { id }
  })
}
export const putStratrgy = (data) => {
  return requesttwo({
    url:"/strategy",
    method:"put",
    data
  })
}
export const addStratrgy = (data) => {
  return requesttwo({
    url:"/strategy",
    method:"post",
    data
  })
}
export const getModelList = () => {
  return requesttwo({
    url: "/model",
    method: "get"
  })
}
export const putModelLi = (data) => {
  return requesttwo({
    url:"/model",
    method:"put",
    data
  })
}
export const deleteModelLi = (id) => {
  return requesttwo({
    url:"/model",
    method:"delete",
    params: { id }
  })
}
export const addModelLi = (data) => {
  return requesttwo({
    url:"/model",
    method:"post",
    data
  })
} 
export const getFactorList = () => {
  return requesttwo({
    url: "/factor/",
    method: "get"
  })
}
export const addFactor = (data) => {
  return requesttwo({
    url: "/factor/",
    method: "post",
    data
  })
}
export const changeFactor = (data) => {
  return requesttwo({
    url: "/factor/",
    method: "put",
    data
  })
}

export const deleteFactor = (id) => {
  return requesttwo({
    url: " /factor/",
    method: "delete",
    params: { id }
  })
}

export const getStrategySeek = (data) => {
  return requesttwo({
    url: "/factor/fetch",
    method: "post",
    data
  })
}