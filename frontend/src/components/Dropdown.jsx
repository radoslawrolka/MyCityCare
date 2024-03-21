const Dropdown = ({isAdmin, shown}) => {
    return (
        <>
            <div className={"w-full"}>
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    {shown==="map" &&
                        <li>
                            <a href={"/map"} className="block py-2 px-3 text-white bg-blue-700 rounded"
                               aria-current="page">Mapa</a>
                        </li>
                    }
                    {shown !== "map" &&
                        <li>
                            <a href={"/map"} className="block py-2 px-3 rounded hover:bg-gray-100 bg-gray-800 border-gray-700 text-white"
                               aria-current="page">Mapa</a>
                        </li>
                    }
                    {shown === "add" &&
                        <li>
                            <a href={"/add"} className="block py-2 px-3 text-white bg-blue-700 rounded"
                               aria-current="page">Zgłoś</a>
                        </li>
                    }
                    {shown !== "add" &&
                        <li>
                            <a href={"/add"}
                               className="block py-2 px-3 rounded hover:bg-gray-100 bg-gray-800 border-gray-700 text-white">Zgłoś</a>
                        </li>
                    }
                    {isAdmin && shown === "admin" &&
                        <li>
                            <a href={"/admin"}
                               className="block py-2 px-3 text-white bg-blue-700 rounded">Zarządzaj</a>
                        </li>
                    }
                    {isAdmin && shown !== "admin" &&
                        <li>
                            <a href={"/admin"}
                               className="block py-2 px-3 rounded hover:bg-gray-100 bg-gray-800 border-gray-700 text-white">Zarządzaj</a>
                        </li>
                    }
                </ul>
            </div>
        </>
    )
}

export default Dropdown