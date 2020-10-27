import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container } from './style'

function Search(props) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExit={() => props.history.goBack}
    >
      <Container>
        <div onClick={() => setShow(false)}>返回</div>
      </Container>
    </CSSTransition>
  )
}

export default Search
