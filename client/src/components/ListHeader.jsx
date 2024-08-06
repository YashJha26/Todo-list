import React, { useState } from 'react'
import {useCookies} from 'react-cookie'
import styled from 'styled-components'
import Modal from './Modal';
const Container = styled.div`
  padding: 10px;
  width: 97%;
  display: flex;
  justify-content: space-between;
  border-bottom: rgba(0,0,0,0.3) 1px solid;
`
const Title = styled.h1`
  margin-left: 10px;
`

const ButtonContainer = styled.div`
  display:flex;
  align-items: center;
`
const Button = styled.button`
  margin: 10px 5px;
  padding: 5px 10px;
  font-size: 10px;
  border-radius: 12px;
  background-color: transparent;
`
const ListHeader = ({listName,getData}) => {
  const [showModal,setShowModal]=useState(false);
  const [cookies,setCookies,removeCookies]= useCookies(null);
  const signOut= ()=>{
    removeCookies('email');
    removeCookies('accessToken');
    window.location.reload();
  }
  return (
    <Container>
      <Title>{listName}</Title>
      <ButtonContainer>
        <Button onClick={()=>{setShowModal(true)}}>Add New</Button>
        <Button onClick={signOut}>Sign Out</Button>
      </ButtonContainer>
      {showModal&&<Modal mode='create' setShowModal={setShowModal} getData={getData} />}
    </Container>
  )
}

export default ListHeader
