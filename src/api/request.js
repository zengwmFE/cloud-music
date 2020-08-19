import { axiosInstance } from './config'

export const getBannerListRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommandListRequest = () => {
  return axiosInstance.get('/personalized')
}
