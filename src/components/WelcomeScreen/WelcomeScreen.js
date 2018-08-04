import React from 'react';
import cssStyles from './WelcomeScreen.css';
import TopNavbar from './../TopNavbar/TopNavbar';

const WelcomeScreen = props => {
    return (
        <div>
            <TopNavbar />
            <div className={cssStyles.wrapper}>
                <p className={cssStyles.mainText}>welcome!</p>
                <p className={cssStyles.subText}>navigate to 'category' or 'location' to get started</p>
            </div>
        </div>
    );
}

export default WelcomeScreen;