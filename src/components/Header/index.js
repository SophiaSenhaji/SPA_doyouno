import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Header = ({ withSearch, withBack, withAdd, onSearchClick }) => (
    <div className="Header">
        {withSearch && <div className="Header__right Button" onClick={onSearchClick}>Search</div>}
        {withBack && <Link className="Header__right" to="/">{'<-'}</Link>}
        {!withSearch && !withBack && <div>{' '}</div>}
        <div className="Header__title">SPA</div>
        {withAdd && <Link className="Header__left" to="/form">+</Link>}
        {!withAdd && <div>{' '}</div>}
    </div>
)

export default Header;
