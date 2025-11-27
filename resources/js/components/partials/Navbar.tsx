import { FaCashRegister } from 'react-icons/fa';
import {
    MdHistory,
    MdOutlineDashboard,
    MdOutlineRestaurantMenu,
    MdOutlineRoomService,
} from 'react-icons/md';
import LogoutButton from '../actions/LogoutButton';
import HeaderLogo from '../HeaderLogo';
import NavLink from './NavLink';

export default function Navbar() {
    return (
        <div className="fixed top-auto right-0 bottom-0 left-0 z-50 rounded-lg border border-zinc-300 bg-primary px-4 py-2 md:top-0 md:right-auto md:m-3 md:px-0 md:py-4">
            <div className="flex h-full flex-col items-center justify-between md:px-4">
                <div className="flex w-full flex-col md:w-fit">
                    <div className="mb-4 hidden justify-center border-b border-gray-400 pb-4 md:flex">
                        <HeaderLogo />
                    </div>
                    <div className="m-2 mx-4 flex justify-between gap-2 md:m-0 md:my-3 md:w-fit md:flex-col md:gap-4 lg:gap-6">
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
                        <button className="text-pri rounded-lg bg-white p-2.5 text-sm font-semibold md:hidden md:px-4">
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
                <div className="hidden w-full flex-col items-center gap-6 md:flex">
                    <LogoutButton />
                    <button className="w-full flex-col items-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-primary md:flex">
                        <span className="text-lg">
                            <FaCashRegister />
                        </span>
                        SALE
                    </button>
                </div>
            </div>
        </div>
    );
}
