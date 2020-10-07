import React from 'react'
import {connect} from 'react-redux'
import {
    changeCurrentIndex,
    changeCurrentSong,
    changeFullScreen,
    changePlayList,
    changePlayMode,
    changePlayState,
    changeShowPlayList
} from './store/actionCreator'
import MiniPlayer from './miniPlayer/index'
import NormalPlayer from './normalPlayer/index'
function Player(props){
    const {fullScreen,playing,sequencePlayList,playList,mode,currentIndex,showPlayList} = props
    const currentSong = {
        al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
        name: "木偶人",
        ar: [{name: "薛之谦"}]
      }
    const  {
        togglePlayingDispatch,
        toggleFullScreenDispatch,
        togglePlayListDispatch,
        toggleCurrentIndexDipatch,
        changeCurrentDispatch,
        changeModeDispatch,
        changePlayListDispatch,
    } = props
    const clickPlaying = (e,state)=>{
        e.stopPropagation()
        
    }
    return (<div>
        <MiniPlayer
         song={currentSong}  
         playing={playing} 
         clickPlaying={clickPlaying} 
         fullScreen={fullScreen}
         toggleFullScreen={toggleFullScreenDispatch}
         />
        <NormalPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
        />
         </div>
         )
}
const mapStateToProps = (state)=>({
    fullScreen: state.getIn(['player','fullScreen']),
    playing: state.getIn(['player','playing']),
    sequencePlayList: state.getIn(['player','sequencePlayList']),
    playList: state.getIn(['player','playList']),
    mode: state.getIn(['player','mode']),
    currentIndex: state.getIn(['player','currentIndex']),
    showPlayList: state.getIn(['player','showPlayList']),
    currentSong: state.getIn(['player','currentSong'])
})
const mapDispatchToProps = (dispatch)=>({
    togglePlayingDispatch(data){
        dispatch(changePlayState(data))
    },
    toggleFullScreenDispatch(data){
        dispatch(changeFullScreen(data))
    },
    togglePlayListDispatch(data){
        dispatch(changeShowPlayList(data))
    },
    toggleCurrentIndexDipatch(data){
        dispatch(changeCurrentIndex(data))
    },
    changeCurrentDispatch(data){
        dispatch(changeCurrentSong(data))
    },
    changeModeDispatch(data){
        dispatch(changePlayMode(data))
    },
    changePlayListDispatch(data){
        dispatch(changePlayList(data))
    },

})
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Player))