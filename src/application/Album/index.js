import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header/index'
import { Container } from './style'
function Album(props) {
  const [showStatus, setShowStatus] = useState(true)
  const handleBack = () => {
    setShowStatus(false)
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Header title={'返回'} handleClick={handleBack}></Header>
      <Container>12312</Container>
    </CSSTransition>
  )
}
export default Album
