import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginLanding from './../Login/LoginLanding.js';
import './MainHeader.css';

import arrow from './../../media/arrow.png';
import hamMenu from './../../media/hamMenu.png';

window.mainHeaderState = {
    isAdmin: false,
    showLogin: false,
    userName: '',
    showMobileDropdown: false
}

class MainHeader extends Component {
    constructor(props) {
        super(props)

        this.state = window.mainHeaderState
        // 
        this.updateShowLogin = this.updateShowLogin.bind(this);
        this.updateIsAdmin = this.updateIsAdmin.bind(this);
    }

    componentWillUnmount(){
        window.mainHeaderState = this.state;  
        window.mainHeaderState.showMobileDropdown = false;
    }

    updateShowLogin(){
        let val = this.state.showLogin ? false : true;
        this.setState({
            showLogin: val
        })
    }

    updateIsAdmin(val, name){
        this.setState({
            isAdmin:val,
            userName: name
        })
    }

    render() {
        let headerName = {
            "transform": "scale(1, .6)",
            "font-weight": "bolder",
            "letter-spacing": "-1px",
            "font-size": "20px"
        }

        let adminProtalLink = this.state.isAdmin ?
            <Link to='/admin' className='navTextMedium'>ADMIN PORTAL</Link> :
            null;
        
        let loginIcon = this.state.userName === '' ?
            <img onClick={this.updateShowLogin} className='aLink' style={{ "height": "20px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETV_iGZaujVjXGEEhzClQMErGjomXPTr7XfTj_qIltNDzqUwmAQ" alt="" />:
            <h1 onClick={this.updateShowLogin} className='aLink' style={{"height": "20px"}}>{this.state.userName}</h1>

        return (
            <section>
                <div className="mainHeaderWrapper">
                    <Link to='/'>
                        <img className='headerLogo' src={arrow} alt="" />
                    </Link>
                    <div style={{ "width": "500px" }} className={`flexRow desktopHeader`}>
                        <Link to='/' className='navTextMedium'>PRODUCTS</Link>
                        <Link to='/community' className='navTextMedium'>COMMUNITY</Link>
                        <Link to='/support' className='navTextMedium'>SUPPORT</Link>
                        <Link to='/about' className='navTextMedium'>ABOUT</Link>
                    </div>
                    <div className={`mobileHeader`}>
                        <img className={`hamMenu`} src={hamMenu} alt='hamburger menu' onClick={(e)=>this.setState({showMobileDropdown: !this.state.showMobileDropdown})} />

                        { this.state.showMobileDropdown ? 
                            <div className='mobileDropdown'>
                                <p><Link to='/'>PRODUCTS</Link></p>
                                <p><Link to='/community'>COMMUNITY</Link></p>
                                <p><Link to='/support'>SUPPORT</Link></p>
                                <p><Link to='/about'>ABOUT</Link></p>
                            </div>
                        : null
                        }

                    </div>
                    <div className={`flexRow rightMenu`}>
                        {loginIcon}
                        <Link to='/cart'><img className='aLink' style={{ "height": "20px" }} src="https://d30y9cdsu7xlg0.cloudfront.net/png/5641-200.png" alt="" /></Link>
                        <img className={`aLink searchGlass`} src="https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//search1600.png" alt="" />
                    </div>
                </div>
                <LoginLanding   showLogin={this.state.showLogin}
                                updateIsAdmin={this.updateIsAdmin}
                                updateShowLogin={this.updateShowLogin}/>
            </section>
        );
    }
}


export default MainHeader;