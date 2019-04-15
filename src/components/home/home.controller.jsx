/*
|----------------------------------------------
| setting up home controller for the site
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: chefcooks, 2018
|----------------------------------------------
*/

import React, { Component } from 'react';
import { render } from 'react-dom';

class WelcomeHome extends Component {

    state = {

    }

    render() {
        return (
            <div className="position-relative chefcooks-hm-welcomehero">
                <div id="sitecarousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner py-4">
                        <div className="carousel-item active max-height-60vh">
                            <img src = "./public/img/hot-chili-pepper-homeslide.jpg"
                            className={'img-fluid'}
                                width = {'50%'}
                                height = {'35%'}
                                alt = {'home slider'} />
                            <h1 className="text-right f-55 thin text-body text-uppercase position-absolute rg-20p tp-45p">
                                medium, hot, extra hot?
                                <p className = {'lead text-body text-center py-3'}>choose how you like it.</p>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<WelcomeHome />, document.getElementById('welcomeHome'));
