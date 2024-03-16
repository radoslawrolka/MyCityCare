const Dropdown = ({isAdmin}) => {
    return (
        <>
            <div className={"w-full"}>
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <li>
                        <a href={"/map"} className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                           aria-current="page">Map</a>
                    </li>
                    <li>
                        <a href={"/add"}
                           className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Report</a>
                    </li>
                    {isAdmin &&
                        <li>
                            <a href={"/admin"}
                               className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Manage</a>
                        </li>
                    }
                </ul>
            </div>
        </>
    )
}

export default Dropdown