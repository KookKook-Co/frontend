import React, { useContext } from 'react';

import BackBtn from '../../static/icon/backBtn.svg';
import { Context } from '../../Store';
import CreateAccountLogo from '../../static/icon/createaccount.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Hamburger from '../../static/icon/hamburger.svg';
import HelpLogo from '../../static/icon/help.svg';
import LogoutLogo from '../../static/icon/logout.svg';
import ManageChickenLogo from '../../static/icon/managechicken.svg';
import { slide as Menu } from 'react-burger-menu';
import Navbar from 'react-bootstrap/Navbar';
import ProfilePic from '../../static/icon/profile_pic.svg';
import SettingLogo from '../../static/icon/settings.svg';
import TermLogo from '../../static/icon/term.svg';
import styles from './index.module.scss';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Nav = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(Context);

    const getTitle = () => {
        switch (history.location.pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/dead-chicken':
                return 'Dead Chicken';
            case '/daily-data':
                return 'Daily Data';
            case '/manage-chicken':
                return 'Manage Chicken';
            case '/manage-flock':
                return 'Manage Chicken';
            case '/chicken-info':
                return 'Manage Chicken';
            case '/create-account':
                return 'Create Account';
            case '/personal-info':
                return 'Create Account';
            default:
                return 'kookkook';
        }
    };

    const isNotLogin = () => {
        const list = ['/login'];
        //in list return true
        return !list.includes(history.location.pathname);
    };

    return (
        <>
            {isNotLogin() && (
                <Menu
                    right
                    pageWrapId={'page-wrap'}
                    outerContainerId={'outer-container'}
                    customBurgerIcon={<img src={Hamburger} alt="hamburger" />}
                >
                    <div className="d-flex flex-column align-items-end mb-4">
                        <img
                            src={state.user.imageUrl}
                            alt="profile_pic"
                            className={`mb-2 ${styles.imgProfile}`}
                        />
                        <div className={styles.textName}>Worker Name</div>
                        <div>{state.user.hno}</div>
                        <DropdownButton id={styles.btnDropdown} title="House A">
                            <Dropdown.Item href="#/action-1">
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                Something else
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className={styles.borderLine}></div>
                    <div className="my-4">
                        <img src={SettingLogo} alt="setting_logo" />
                        <a
                            id="home"
                            className={`menu-item ${styles.textMenu} ml-3`}
                            href="/"
                        >
                            Settings and Privacy
                        </a>
                    </div>
                    <div className="my-4">
                        <img src={TermLogo} alt="term_logo" />
                        <a
                            id="about"
                            className={`menu-item ${styles.textMenu} ml-3`}
                            href="/"
                        >
                            Term and Conditions
                        </a>
                    </div>
                    <div className="my-4">
                        <img src={HelpLogo} alt="help_logo" />
                        <a
                            id="contact"
                            className={`menu-item ${styles.textMenu} ml-3`}
                            href="/"
                        >
                            Help
                        </a>
                    </div>
                    <div className="my-4">
                        <img src={CreateAccountLogo} alt="create_logo" />
                        <a
                            id="contact"
                            className={`menu-item ${styles.textMenu} ml-3`}
                            href="/"
                        >
                            Create Account
                        </a>
                    </div>
                    <div className="my-4">
                        <img src={ManageChickenLogo} alt="manage_logo" />
                        <a
                            id="contact"
                            className={`menu-item ${styles.textMenu} ml-3`}
                            href="/manage-chicken"
                        >
                            Manage Chicken
                        </a>
                    </div>
                    <div className="my-4">
                        <img src={LogoutLogo} alt="logout_logo" />
                        <a
                            id="contact"
                            className={`menu-item ${styles.textMenu} ml-3`}
                            href="/"
                        >
                            Logout
                        </a>
                    </div>
                </Menu>
            )}
            <Navbar
                collapseOnSelect
                expand="lg"
                className={styles.bgYellow}
                variant="dark"
            >
                {isNotLogin() && (
                    <img
                        src={BackBtn}
                        alt="back_btn"
                        onClick={() => history.goBack()}
                    />
                )}
                <Navbar.Brand className="text-align-center flex-grow-1 m-0">
                    {getTitle()}
                </Navbar.Brand>
            </Navbar>
        </>
    );
};

export default Nav;
