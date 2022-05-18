import Navbar from 'react-bootstrap/Navbar';
import { AuthProvider } from '../../context/AuthContext';
import logo from '../../images/logo.png';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

import Nav from 'react-bootstrap/Nav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link
  } from 'react-router-dom';
import Home from '../../pages/Home';
import Hotels from '../../pages/Hotels';
import Contact from '../../pages/Contact';
import Login from '../../pages/Login';
import Details from '../../pages/Details';
import AddHotel from '../../pages/AddHotel';
import Enquiries from '../../pages/Enquiries';
import Booking from '../../pages/Booking';


const Layout = () => {
    const [auth, setAuth] = useContext(AuthContext);
    const history = useHistory();

    function logout() {
        setAuth(null);
    }

    return(
        <AuthProvider>
            <Router>
                <Navbar variant='dark' expand='lg'>
                    <Navbar.Brand href='/'><img className="logo" src={logo} alt="logo"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/hotels'>Hotels</Nav.Link>
                            <Nav.Link href='/contact'>Contact</Nav.Link>
                            <Nav.Link href='/booking'>Booking</Nav.Link>
                            {auth ? (
                                <>
                                    <Link className="nav__login" to='/addhotel'>Add Hotel</Link>{' '}
                                    <Link className="nav__login" to='/enquiries'>Enquiries</Link>{' '}
                                    <button className='logout__button' onClick={logout}>Log out</button>
                                </>
                            ) : (
                                <Link className="nav__login" to='/login'>Login</Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/hotels' component={Hotels} />
                        <Route path='/contact' component={Contact} />
                        <Route path ='/login' component={Login} />
                        <Route path ='/hotels/:id' component={Details} />
                        <Route path ='/addhotel' component={AddHotel} />
                        <Route path ='/enquiries' component={Enquiries} />
                        <Route path ='/booking' component={Booking} />
                    </Switch>
            </Router>
        </AuthProvider>
    );
};

export default Layout;