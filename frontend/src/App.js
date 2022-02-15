import React, {useState} from 'react';
import { 
    BrowserRouter as Router, 
    Route,
    Routes,
    // useParams
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginScreen from './screens/Login/LoginScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import RegisterScreen from './screens/Register/RegisterScreen';


function App() {
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isShowRegister, setIsShowRegister] = useState(false);
    const handleLoginClick = () => {
        setIsShowLogin((isShowLogin) => !isShowLogin);
        setIsShowRegister(false);
    };
    const handleRegisterClick = () => {
        setIsShowRegister((isShowRegister) => !isShowRegister);
        setIsShowLogin(false);
    };
    return (
        <Router>
            <Navbar handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
            <LoginScreen isShowLogin={isShowLogin} handleLoginClick={handleLoginClick} />
            <RegisterScreen isShowRegister={isShowRegister} handleRegisterClick={handleRegisterClick} />
            <main style={(isShowLogin|| isShowRegister)?{margin:'5rem 0rem','backgroundAttachment':'fixed','filter':'blur(8px)'} :{margin:'5rem 0rem'}}>
                
                <Routes>
                    
                    <Route path='/' element= {<MainScreen/>} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
