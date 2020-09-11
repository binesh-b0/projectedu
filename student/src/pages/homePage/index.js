import React, { useEffect } from 'react';
import Cookie from 'js-cookie';

function HomePage() {
    useEffect(() => {
        Cookie.set('regRe', false);
        Cookie.set('signRe', false);
    });
    return <div>home</div>;
}

export default HomePage;
