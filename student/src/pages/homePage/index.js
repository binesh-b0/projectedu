import React, { useEffect } from 'react';
import Cookie from 'js-cookie';

function HomePage(props) {
    useEffect(() => {
        Cookie.set('regRe', false);
        Cookie.set('signRe', false);
        props.history.push('/register');
    });
    return <div>home</div>;
}

export default HomePage;
