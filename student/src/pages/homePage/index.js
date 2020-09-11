import React, {useEffect} from 'react'
import Cookie from 'js-cookie';

function HomePage() {
    useEffect(() => {
        Cookie.set("regRE",false);
      } )
    return (
        <div>
            home
        </div>
    )
}

export default HomePage
