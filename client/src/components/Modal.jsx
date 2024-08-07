import React, { useState } from 'react'
import {useCookies} from 'react-cookie'
import styled from 'styled-components'
const Container = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalContainer = styled.div`
    width: 500px;
    background-color: rgb(255,255,255);
    padding: 40px;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,0.05) 0 6px 24px 0,rgba(0,0,0,0.08) 0 0 0 1px;
`
const FormTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.h3`
    
`
const Button=styled.button`
    border: none;
    background-color: transparent;
    color: rgb(90, 178, 100);
    margin: 10px 5px;
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 12px;
    background-color: transparent;

    &:hover{
        background-color: rgb(219, 23, 23);
        color: white;
    }
    &:active{
        color: red;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    margin: 11px 0px;
    padding:11px 15px;
    border-radius: 10px;
    border:1.5px solid rgb(236, 231, 231);
`
const Label = styled.label`
    font-size: 13px;
`
const Submit = styled.input`
    margin: 11px 0px;
    padding:11px 15px;
    border-radius: 10px;
    border:1.5px solid rgb(208, 202, 202);
    &:hover{
        background-color: black;
        color: white;
    }
`
const base_URl="https://todo-list-backend-3pak.onrender.com/";
const Modal = ({mode,setShowModal,task,getData}) => {
    const [cookies,setCookies,removeCookies]= useCookies(null);
    const isEditMode = (mode === 'edit') ? true:false;
    //console.log("mode and task ",mode,task);
    const [data,setData]=useState({
        user_email:isEditMode?task.user_email:cookies.email,
        title:isEditMode?task.title:"",
        progress:isEditMode?task.progress:50,
        date: isEditMode?task.date:new Date()
    })
    const postData = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${base_URl}api/todos`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data)
            });
            //console.log(response)
            if(response.status===200){
                console.log("Success");
                setShowModal(false);
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const editData = async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch(`${base_URl}api/todos/${task.id}`,{
                method:"PUT",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data)
            })
            if(response.status===200){
                console.log("Success");
                setShowModal(false);
                getData();
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event)=>{
        //console.log("changing ",event.target.value);
        const {name,value}=event.target;
        setData((prev)=>{return {...prev,[name]:value}})
    }
  return (
    <Container>
        <ModalContainer>
            <FormTitleContainer>
                <Title>Lets {mode} your task </Title>
                <Button onClick={()=>{setShowModal(false)}}>X</Button>
            </FormTitleContainer>
            <Form>
                <Input 
                    required
                    maxLength={30}
                    placeholder='Enter Your Task Here'
                    name='title'
                    value={data.title}
                    onChange={handleChange}
                    />
                <br/>
                <Label htmlFor='range'>Drag to enter your current progress</Label>
                <Input
                    required
                    type='range'
                    id='range'
                    min='0'
                    max='100'
                    name='progress'
                    value={data.progress}
                    onChange={handleChange}
                    />
                <Submit type='submit' onClick={isEditMode?editData:postData}/>
            </Form>
        </ModalContainer>
    </Container>
  )
}

export default Modal
