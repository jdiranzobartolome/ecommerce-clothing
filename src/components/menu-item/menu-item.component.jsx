import React from 'react';
// withRouter makes a component be able to access <Route> ancestors' 
// route special props (match, history...etc). This is needed particularly when 
// we want to reroute to /url/:id kind of assets. Since we will need to know the original
// url in which we are (the one from the ancestor Route) we use this to check the route 
// and, in addition, to use history.push (same effect to Link). All of these allow us to 
// perform rerouting in a dynamic way. So, if the original ancestor route url changes, this would still work.  
import { withRouter } from 'react-router-dom';

import './menu-item.style.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <div className={`${size} menu-item`}
        onClick={() =>  history.push(`${match.url}${linkUrl}`)}>
        <div 
        className="background-image" 
        style={{
            backgroundImage: `url(${imageUrl})`
        }} 
        />
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>                   
            <span className="subtitle">SHOP NOW</span>   
        </div>
    </div>
)

export default withRouter(MenuItem);