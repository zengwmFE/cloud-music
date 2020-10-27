import { axiosInstance } from './config'

export const getBannerListRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommandListRequest = () => {
  return axiosInstance.get('/personalized')
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  )
}

export const getRankListRequest = () => {
  return axiosInstance.get('/topList/detail')
}

export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}

export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`)
}

export const getLyricRequest = (id) => {
  return axiosInstance.get(`/lyric?id=${id}`)
}
