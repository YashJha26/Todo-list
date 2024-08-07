import React, { useState } from 'react'
import styled from 'styled-components'
import {useCookies} from 'react-cookie'
const base_URl="https://todo-list-backend-3pak.onrender.com/";
const Container = styled.div`
    
`
const Wrapper = styled.div`
    
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
const ButtonContainer = styled.div`
    
`
const Button = styled.button`
    width: 50%;
    border: none;
    padding: 10px;
    color:rgb(21, 20, 20);
    &:hover{
        background-color: #808182;
        color: white;
    }
`
const Error = styled.span`
  color: red;
`;


const Auth = () => {
    const [cookies,setCookies,removeCookies]= useCookies(null);
    const [isLogIn,setLogIn]=useState(true);
    const [error,setError]=useState(null);
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [confirmPassword,setConfirmPassword]=useState(null);

    const viewLogIn = (status)=>{
        setError(null);
        setLogIn(status);
    }

    const handleSubmit = async(event,endpoint)=>{
        event.preventDefault();
        if(!isLogIn && password!==confirmPassword){
            setError('Make sure password match');
            return;
        }
        const response=await fetch(`${base_URl}api/${endpoint}`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })
        const data= await response.json();
        console.log(data);
        if(data.detail){
            setError(data.detail);
        }else{
            setCookies('email',data.email);
            setCookies('accessToken',data.accessToken);
            window.location.reload();
        }
    }
    return (
        <Container>
            <Wrapper>
                <Form>
                    <h2>{isLogIn?"Please Login":"Please sign up"}</h2>
                    <Input 
                        type='email' 
                        placeholder='Enter your Email' 
                        onChange={(event)=>{setEmail(event.target.value)}}
                    />
                    <Input 
                        type='password' 
                        placeholder='Enter Your Password' 
                        onChange={(event)=>{setPassword(event.target.value)}}
                    />
                    {!isLogIn&&<Input type='password' placeholder='Confirm Password'  onChange={(event)=>{setConfirmPassword(event.target.value)}}/>}
                    <Input type='submit' onClick={(event)=>{handleSubmit(event,isLogIn?'login':'register')}}/>
                    {error&&<Error>{error}</Error>}
                </Form>
                <ButtonContainer>
                    <Button onClick={()=>{viewLogIn(false)}}>Sign Up</Button>
                    <Button onClick={()=>{viewLogIn(true)}}>Log In</Button>
                </ButtonContainer>
            </Wrapper>
        </Container>
    )
}

export default Auth
