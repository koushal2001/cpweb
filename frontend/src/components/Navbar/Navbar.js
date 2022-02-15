import React, { useState,useEffect } from "react";
import {FaBars, FaSignInAlt} from 'react-icons/fa'
import { Link } from "react-router-dom";
import styled from "styled-components";
import {  useDispatch,useSelector }   from 'react-redux';
import { logout } from "../../actions/userActions";
const Navbar = ({ handleLoginClick,handleRegisterClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const dispatch = useDispatch();
    useEffect(()=>{
        window.innerWidth <= 768 ?setShow(true) :setShow(false);
    },[])
    const logoutHandler = () =>{
        dispatch(logout());
    }
    return (
        <Nav>
            {show && (
                    <Logo to="/">
                        Cp<span>Web</span>
                    </Logo>
                )
            }
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <span>X</span>: <Bars/>}
            </Hamburger>
            <Menu isOpen={isOpen}>
                {
                    userInfo ? (
                        <>
                            <MenuLink to='/' onClick={logoutHandler}>Logout</MenuLink>
                        </>
                    ) : (
                        <>
                            <MenuLink to="/" onClick={handleRegisterClick}><FaSignInAlt/>&nbsp;Register</MenuLink>
                            <MenuLink to="/" onClick={handleLoginClick}><FaSignInAlt/>&nbsp;Login</MenuLink>
                        </>
                    )
                }
                {/* <MenuLink to="/">Link1</MenuLink>
                <MenuLink to="/">Link2</MenuLink>
                <MenuLink to="/">Link3</MenuLink> */}
                
            </Menu>
            {!show && (
                    <Logo to="/">
                        Cp<span>Web</span>
                    </Logo>
                )
            }
        </Nav>
    );
};
export default Navbar

const MenuLink = styled(Link)`
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    color: white;
    transition: all 0.3s ease-in;
    font-size: 1rem;
    font-weight: 800;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin: 0.25rem 1rem;
    &:hover {
        background-color: #c82090; /* For browsers that do not support gradients */
        background-image:linear-gradient(to right, #c82090 , #6a14d1);
    }
`;

const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background: black;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    @media (max-width: 768px) {
        flex-direction: row;
    }
`;

const Logo = styled(Link)`
    padding: 1rem 0;
    color: #c82090;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.7rem;
    span {
        color: #6a14d1;
        font-weight: 500;
        font-size: 1.7rem;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media (max-width: 768px) {
        overflow: hidden;
        flex-direction: column;
        max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
        transition: max-height 0.3s ease-in;
        width: 100%;
    }
`;

const Hamburger = styled.div`
    display: none;
    flex-direction: column;
    cursor: pointer;
    span {
        height: 25px;
        width: 25px;
        color: #7b7fda;
        font-size: 1.5rem;
        margin-bottom: 4px;
        border-radius: 5px;
        font-weight: 600;
    }
    @media (max-width: 768px) {
        display: block;
    }
`;
const Bars = styled(FaBars)`
    height: 25px;
    width: 25px;
    color: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
    font-weight: 600;
`;
