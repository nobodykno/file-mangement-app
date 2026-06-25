import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './sidebar.scss'

const Sidebar = () => {
    const navigate = useNavigate()

    const [authenticated, SetAuthenticated] = useState<boolean>(false)


      /**
       * Handles the logout
       * @param void
       */
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

        /**
       * Handles the routing
       * @param routepath
       */

    const handleNavigation = (path) => {
        navigate(path)
    }

      /**
       * Handles the routing
       * load to check logged in or not
       */

    useEffect(() => {

        const token = localStorage.getItem('token')
        SetAuthenticated(!!token)
    }, [])

    return (

        <>
            {authenticated && (<aside className='sidebar'>
                <div className='sidebar_logo'>File</div>

                <ul className='sidebar_menu'>
                    <li>
                        <div
                            className='menu_item'
                            onClick={() => handleNavigation('/dashboard')}
                        >
                            <span className='menu_text'>Menu 1</span>
                        </div>
                    </li>

                    <li>
                        <div
                            className='menu_item'
                            onClick={() => handleNavigation('/dashboard')}
                        >
                            <span className='menu_text'>Menu 2</span>
                        </div>
                    </li>

                </ul>

                <div className='sidebar_logout' onClick={handleLogout}>
                    <span className='menu_icon'>🚪</span>
                    <span className='menu_text'>Logout</span>
                </div>
            </aside>
            )}
        </>

    )
}

export default Sidebar