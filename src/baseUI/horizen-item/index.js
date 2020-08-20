import PropTypes from 'prop-types'
import React, { useRef } from 'react'
// import styled from 'styled-components'
// import style from '../../assets/global-style'
import Scroll from '../scroll'
Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
}
Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null,
}
function Horizen(props) {
  const scrollRef = useRef()
  const { list, oldVal, title, handleClick } = props
  return <Scroll direction={'horizental'}></Scroll>
}

export default React.memo(Horizen)
