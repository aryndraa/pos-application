import { FaUserFriends } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

export default function PopularMenuCard() {
    return (
        <div className="flex cursor-pointer flex-col gap-4 rounded-lg bg-white p-4 lg:flex-row">
            <img
                src="https://images.unsplash.com/photo-1591814252471-068b545dff62?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="h-32 w-full rounded-lg object-cover lg:size-26"
            />
            <div className="flex w-full flex-col justify-between gap-3 lg:gap-0">
                <div>
                    <h3 className="text-lg font-medium">Katsu Ambaltukam</h3>
                    <div className="flex items-center gap-2 text-gray-500">
                        <MdFastfood />
                        <p className="font-medium">Katsu</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <p className="hidden text-lg font-semibold lg:block">
                        Rp. 12.000
                    </p>
                    <span className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white lg:w-fit lg:py-1.5">
                        <FaUserFriends />
                        120 Orders
                    </span>
                </div>
            </div>
        </div>
    );
}
