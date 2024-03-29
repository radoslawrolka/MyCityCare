import {useState} from 'react';
import Dropdown from "./Dropdown.jsx";

const Navbar = ({shown}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isAdmin = true;
    return (
        <div className={"sticky"}>
            <nav className={"bg-gray-800 border-gray-700"}>
                <div className={"max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-2 text-white"}>
                    {isAdmin &&
                        <p className={"font-bold self-center text-xl whitespace-nowrap flex items-center"}>MyCityCare -
                            Admin</p>}
                    {!isAdmin && <p className={"font-bold inline-flex self-center"}>MyCityCare</p>}
                    <button data-collapse-toggle="navbar-hamburger" type="button"
                            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-hamburger" aria-expanded="false"
                            onClick={() => {
                                setIsOpen((prev) => !prev)
                            }}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    {isOpen && <Dropdown isAdmin={isAdmin} shown={shown}/>}
                </div>
            </nav>
        </div>)
}

export default Navbar;