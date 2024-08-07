import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width:200px;
  height:14px;
  background-color: rgb(220, 213, 213);
  border-radius: 10px;
  overflow: hidden;
  margin-left: 10px;
`
const InnerBar = styled.div`
  height: 14px;
  width: ${ ({ progress }) => progress }%;
  background-color: ${ ({codedColor})=> codedColor };
  transition: width 0.5s ease-in-out;
`
const ProgressBar = ({progress}) => {
  const colors = [
    'rgb(255,175,163)',
    'rgb(255,214,161)',
    'rgb(141,181,145)',
    'rgb(51, 141, 157)'
  ]
  const codedColor= colors[Math.floor(progress/25)]
  return (
    <Container>
      <InnerBar progress={progress} codedColor={codedColor}>

      </InnerBar>
    </Container>
  )
}

export default ProgressBar
