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
        <div className="fixed right-0 bottom-0 left-0 bg-dark-300 py-4 shadow md:py-5 lg:top-0 lg:bottom-auto">
            <div className="container mx-auto flex justify-between px-4 2xl:px-16">
                <div className="flex w-full lg:w-fit">
                    <div className="mr-12 hidden border-r border-neutral-600 pr-12 lg:block">
                        <HeaderLogo />
                    </div>
                    <div className="flex w-full justify-between gap-2 lg:w-fit">
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
                        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-dark-300 lg:hidden">
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
                <div>
                    <button className="hidden items-center gap-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-dark-300 lg:flex">
                        <span className="text-lg">
                            <FaCashRegister />
                        </span>
                        Point Of Sale
                    </button>
                </div>
            </div>
        </div>
    );
}
