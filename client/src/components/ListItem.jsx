import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Modal from './Modal';
import ProgressBar from './ProgressBar';

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: rgba(0,0,0,0.08) 0 0 0 1px;
  display: flex;
  justify-content: space-between;
`
const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
`
const Info = styled.p`
    margin-left:10px;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const EditButton = styled.button`
    border: 1.5px solid rgb(90, 178, 100);
    color: rgb(90, 178, 100);
    margin: 10px 5px;
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 12px;
    background-color: transparent;

    &:hover{
        background-color: rgb(90, 178, 100);
        color: white;
    }
`
const DeleteButton = styled.button`
    border: 1.5px solid rgb(200, 60, 44);
    color:  rgb(200, 60, 44);
    margin: 10px 5px;
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 12px;
    background-color: transparent;

    &:hover{
        background-color: rgb(200, 60, 44);
        color: white;
    }
`
const StyledCheckCircleIcon = styled(CheckCircleOutlineOutlinedIcon)`
  &:hover {
    color: green;
  }
`;

const base_URl="https://todo-list-backend-3pak.onrender.com/";
const ListItem = ({task,getData}) => {
    const [showModal,setShowModal]=useState(false);
    const deleteItem = async ()=>{
        try {
            const respone = await fetch(`${base_URl}api/todos/${task.id}`,{
                method:"DELETE"
            })
            if(respone.status===200){
                console.log("Successfully Deleted");
                getData();
            }
        } catch (error) {
            
        }
    }
    return (
        <Container>
            <InfoContainer >
                <StyledCheckCircleIcon   />
                <Info>{task.title}</Info>
                <ProgressBar progress={task.progress}/>
            </InfoContainer>
            <ButtonContainer>
                <EditButton onClick={()=>{setShowModal(true)}}>Edit</EditButton>
                <DeleteButton onClick={deleteItem}>Delete</DeleteButton>
            </ButtonContainer>
            {showModal&&<Modal mode='edit' setShowModal={setShowModal} task={task} getData={getData}/>}
        </Container> 
  )
}

export default ListItem
