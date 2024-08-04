import { requesttwo } from "./request";

export const getStrategyList = () =>{
    return requesttwo({
      url:"/strategy",
      method:"get",
    })
  }
  
  export const getModelList = () => {
    return requesttwo({
      url:"/model",
      method:"get"
    })
  }
  
  export const getFactorList = () => {
    return requesttwo({
      url:"/factor/",
      method:"get"
    })
  }