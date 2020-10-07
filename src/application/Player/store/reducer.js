import {fromJS} from 'immutable'
import * as actionTypes from './constant'
import {playMode} from '../../../api/config' 
const defaultState = fromJS({
    fullScreen: false,// 播放器是否全屏
    playing: false,// 当前歌曲是否在播放
    sequencePlayList: [], // 顺序列表（因为之后有随机模式，列表会乱序，因此从这个保存顺序列表）
    playList: [],
    mode: playMode.sequence, // 播放模式
    currentIndex: -1, // 当前歌曲在播放列表的索引位置
    showPlayList: false,
    currentSong: {},
})

export default (state=defaultState,action)=>{
    switch(action.type){
        case actionTypes.SET_CURRENT_SONG: 
        return state.set('currentSong',action.data)
        case actionTypes.SET_FULL_SCREEN: 
        return state.set('fullScreen',action.data)
        case actionTypes.SET_PLAYLIST: 
        return state.set('playList',action.data)
        case actionTypes.SET_SEQUENCE_PLAYLIST: 
        return state.set('sequencePlayList',action.data)
        case actionTypes.SET_PLAY_MODE: 
        return state.set('mode',action.data)
        case actionTypes.SET_PLAYING_STATE:
        return state.set('playing',action.data)
        case actionTypes.SET_CURRENT_INDEX: 
        return state.set('currentIndex',action.data)
        case actionTypes.SET_SHOW_PLAYLIST: 
        return state.set('showPlayList',action.data)
        default: 
        return state
    }
}