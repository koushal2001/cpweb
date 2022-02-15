import React, { useState } from 'react'
import { useDispatch, useSelector }   from 'react-redux';
import styled from 'styled-components';
import { register } from '../../actions/userActions';
const RegisterScreen = ({isShowRegister,handleRegisterClick}) => {
    const [firstName,setFirstName]  = useState('');
    const [lastName,setLastName]  = useState('');
    const [email,setEmail]  = useState('');
    const [password,setPassword]  = useState('');
    const [confpassword,setConfPassword]  = useState('');;
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error } = userLogin
    const dispatch = useDispatch();
    
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confpassword)
        {
            alert('password do not match!');
        }
        else{
            dispatch(register(firstName,lastName,email,password));
            handleRegisterClick();
        }
    }
    return (
        isShowRegister && (
            <MainContainer>
                {loading && (<p>Loading...</p>)}
                {error && (<p>{error}</p>)}
                <WelcomeText>Welcome</WelcomeText>
                <form onSubmit={submitHandler}>
                    <InputContainer>
                        <FormControl>
                            <input type="name" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder='First Name' required />
                        </FormControl>
                        <FormControl>
                            <input type="name" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder='Last Name' required />
                        </FormControl>
                        <FormControl>
                            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' required />
                        </FormControl>
                        <FormControl>
                            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' required />
                        </FormControl>
                        <FormControl>
                            <input type="password" value={confpassword} onChange={e=>setConfPassword(e.target.value)} placeholder='Confirm Password' required />
                        </FormControl>
                    </InputContainer>
                    <ButtonContainer>
                        <Button>Register</Button>
                    </ButtonContainer>
                </form>
            </MainContainer>
        )
    )
}
const MainContainer = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 30vw;
    margin: auto;
    left: 0;
    right: 0;
    background-color: #c82090; /* For browsers that do not support gradients */
    background-image:linear-gradient(to right, #c82090 , #6a14d1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border-radius: 25px;
    color: white;
    z-index: 2;
    
    @media only screen and (max-width: 320px) {
        width: 80vw;
        height: 90vh;
        hr {
            margin-bottom: 0.3rem;
        }
        h4 {
            font-size: small;
        }
    }
    @media only screen and (min-width: 360px) {
        width: 80vw;
        height: 90vh;
        h4 {
            font-size: small;
        }
    }
    @media only screen and (min-width: 411px) {
        width: 80vw;
        height: 90vh;
    }

    @media only screen and (min-width: 768px) {
        width: 80vw;
        height: 80vh;
    }
    @media only screen and (min-width: 1024px) {
        width: 70vw;
        height: 50vh;
    }
    @media only screen and (min-width: 1280px) {
        width: 30vw;
        height: 80vh;
    }
`;

const WelcomeText = styled.h2`
  margin: 1.5rem 0rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
    cursor: pointer;
  display: inline-block;
  width: 60%;
  background: skyblue;
  padding: 1rem;
  font-family: inherit;
  font-size: 1.1rem;
  border: none;
  outline: none;
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
  :active{
    transform: scale(0.98s);
  }
`;


const FormControl = styled.div`
    position: relative;
    width: 100%;
    margin: 0.5rem auto;
    input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #fff;
        display: block;
        width: 100%;
        padding: 15px 0;
        font-size: 18px;
        color: #fff;
        outline: none;
    }
`;
export default RegisterScreen
