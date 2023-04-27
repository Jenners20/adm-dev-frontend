import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "./styles/Navbar.css";

export const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        navigate('/guest', {
            replace: true
        })
    }


    return (
        <div id="navb">
            <nav className="navbar navbar-expand" id='nav' >

                <Link
                    className="navbar-brand"
                    to="/" id="logo"
                >
                 Inicio
                </Link>

                <div 
                // className="navbar-collapse" 
                id='iconosc'>
                      
                    {/* <div className="btn btn-outline-secondary" > */}
                   
                        <NavLink
                            className={({ isActive }) => 'btn btn-outline-secondary' + (isActive ? ' active' : '')}
                            to="/integraciones" id='calificaciones'
                        >
                           Integraciones
                        </NavLink>
                    {/* </div> */}
                </div>
                <div 
                // className="navbar-collapse" 
                id='iconosc'>
                      
                    {/* <div className="btn btn-outline-secondary" > */}
                   
                        <NavLink
                            className={({ isActive }) => 'btn btn-outline-secondary' + (isActive ? ' active' : '')}
                            to="/desarrolladores" id='calificaciones'
                        >
                           Desarrolladores
                        </NavLink>
                    {/* </div> */}
                </div>
                {/* <div 
                // className="navbar-collapse" 
                id='iconosc'>
                    {/* <div className="navbar-nav">
                        <NavLink
                            className={({ isActive }) => 'btn btn-outline-secondary' + (isActive ? ' active' : '')}
                            to="/compra" id='calificaciones'
                        >
                            Visualizar
                        </NavLink>
                    {/* </div> 
                </div> */}

                <div 
                // className="navbar-collapse" 
                id='iconosc'>
                    <div className="navbar-nav margin-10px">

                        <NavLink
                            className={({ isActive }) => 'btn btn-outline-secondary' + (isActive ? ' active' : '')}
                            to="/" id='calificaciones'
                        >
                        {/* Inventario */}
                        Reportes
                        </NavLink>
                    </div>
                    
                </div>

                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    <ul className="navbar-nav ml-auto">
                        {/* <span className="nav-item nav-link" id="nombre">
                            Jenners Acevedo

                        </span> */}
                        <button
                            className="nav-item nav-link btn"
                            onClick={handleLogout}

                        >
                            Logout
                        </button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}