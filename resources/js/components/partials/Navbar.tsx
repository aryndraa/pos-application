import { FaCashRegister } from 'react-icons/fa';
import {
    MdHistory,
    MdOutlineDashboard,
    MdOutlineRestaurantMenu,
    MdOutlineRoomService,
} from 'react-icons/md';
import HeaderLogo from '../HeaderLogo';
import NavLink from './NavLink';

export default function Navbar() {
    return (
        <div className="fixed right-0 bottom-0 left-0 m-3 rounded-lg bg-white py-4 shadow md:py-5 lg:top-0 lg:right-auto">
            <div className="flex h-full flex-col items-center justify-between">
                <div className="flex w-full flex-col lg:w-fit">
                    <div className="mb-4 hidden justify-center border-b border-gray-400 pb-4 lg:flex">
                        <HeaderLogo />
                    </div>
                    <div className="m-4 flex w-full flex-col justify-between gap-2 lg:w-fit">
                        <NavLink
                            href="/"
                            icon={MdOutlineDashboard}
                            label="Dashboard"
                        />
                        <NavLink
                            href="/menu"
                            icon={MdOutlineRestaurantMenu}
                            label="Menu"
                        />
                        <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-dark-300 lg:hidden">
                            <span className="text-xl">
                                <FaCashRegister />
                            </span>
                        </button>
                        <NavLink
                            href="/orders"
                            icon={MdOutlineRoomService}
                            label="Orders"
                        />
                        <NavLink
                            href="/history"
                            icon={MdHistory}
                            label="History"
                        />
                    </div>
                </div>
                <div className="w-full px-4">
                    <button className="hidden w-full flex-col items-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-gray-800 lg:flex">
                        <span className="text-lg">
                            <FaCashRegister />
                        </span>
                        POS
                    </button>
                </div>
            </div>
        </div>
    );
}
