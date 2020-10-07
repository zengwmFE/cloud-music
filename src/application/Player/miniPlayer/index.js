import React,{useRef} from 'react'
import {getName} from '../../../api/utils'
import {MiniPlayerContainer} from './style'
import ProgressCircle from '../../../baseUI/progress-circle/index'
import {CSSTransition} from 'react-transition-group'
function MiniPlayer (props){
    const {song,fullScreen,playing,percent}  = props
    const {clickPlaying,setFullScreen,toggleFullScreen} = props
    const miniPlayerRef = useRef ();
    return (
        <CSSTransition
        in={!fullScreen}
        timeout={400}
        classNames="mini"
        onEnter={()=>{
            console.log(miniPlayerRef)
            miniPlayerRef.current.style.display = "flex";
        }}
        onExited={()=>{
            miniPlayerRef.current.style.display = "none";
        }}
        >
        <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen (true)}>
            <div className="icon">
                <div className="imageWrapper">
                    <img src={song.al.picUrl} width="40" height="40" className={`play ${playing?'':'pause'}`} alt="img"/>
                </div>
            </div>
            <div className="text">
                <h2 className="name">{song.name}</h2>
                <p className="desc">{getName(song.ar)}</p>
            </div>
            <div className="control">
                <ProgressCircle radius={32} percent={percent}>
                    {
                        playing?
                        <i className="icon-mini iconfont icon-pause" onClick={e=>clickPlaying(e,false)}>&#xe650;</i>:<i className="icon-mini iconfont icon-play" onClick={(e)=>clickPlaying(e,true)}>&#xe61e;</i>
                    }
                </ProgressCircle>
            </div>
            <div className="control">
            <i className="iconfont">&#xe640;</i>
            </div>
        </MiniPlayerContainer>
        </CSSTransition>
   )
}

export default React.memo(MiniPlayer)