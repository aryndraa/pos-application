import { MdOutlineSearch, MdRoomService } from 'react-icons/md';

export default function OrderList() {
    return (
        <div className="flex h-full flex-col gap-4 rounded-lg bg-white p-4">
            <div className="grid grid-cols-2 rounded-lg bg-gray-100 p-2">
                <button className="rounded-lg bg-white p-2 text-sm font-medium">
                    In Progress
                </button>
                <button className="rounded-lg p-2 text-sm font-medium text-gray-400">
                    Waiting Payment
                </button>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-4 py-3 md:gap-4 md:py-4">
                <MdOutlineSearch className="text-2xl" />
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="text-sm outline-none placeholder:text-gray-400 md:text-base"
                />
            </div>
            <ul className="w-full space-y-2">
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-2 text-sm font-semibold text-white md:p-3 md:text-base">
                            #1
                        </span>
                        <div>
                            <h4 className="text-sm font-medium md:text-base">
                                Gilbrut James
                            </h4>
                            <p className="text-xs text-gray-500 md:text-sm">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 rounded-sm bg-secondary px-2.5 py-1.5 text-xs font-semibold text-dark-300 md:mb-2 md:p-4 md:py-2">
                            <MdRoomService className="text-base md:text-lg" />
                            Pending
                        </div>
                        <div className="hidden items-center gap-2 md:flex">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-2 text-sm font-semibold text-white md:p-3 md:text-base">
                            #1
                        </span>
                        <div>
                            <h4 className="text-sm font-medium md:text-base">
                                Gilbrut James
                            </h4>
                            <p className="text-xs text-gray-500 md:text-sm">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 rounded-sm bg-secondary px-2.5 py-1.5 text-xs font-semibold text-dark-300 md:mb-2 md:p-4 md:py-2">
                            <MdRoomService className="text-base md:text-lg" />
                            Pending
                        </div>
                        <div className="hidden items-center gap-2 md:flex">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-2 text-sm font-semibold text-white md:p-3 md:text-base">
                            #1
                        </span>
                        <div>
                            <h4 className="text-sm font-medium md:text-base">
                                Gilbrut James
                            </h4>
                            <p className="text-xs text-gray-500 md:text-sm">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 rounded-sm bg-secondary px-2.5 py-1.5 text-xs font-semibold text-dark-300 md:mb-2 md:p-4 md:py-2">
                            <MdRoomService className="text-base md:text-lg" />
                            Pending
                        </div>
                        <div className="hidden items-center gap-2 md:flex">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-2 text-sm font-semibold text-white md:p-3 md:text-base">
                            #1
                        </span>
                        <div>
                            <h4 className="text-sm font-medium md:text-base">
                                Gilbrut James
                            </h4>
                            <p className="text-xs text-gray-500 md:text-sm">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 rounded-sm bg-secondary px-2.5 py-1.5 text-xs font-semibold text-dark-300 md:mb-2 md:p-4 md:py-2">
                            <MdRoomService className="text-base md:text-lg" />
                            Pending
                        </div>
                        <div className="hidden items-center gap-2 md:flex">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-2 text-sm font-semibold text-white md:p-3 md:text-base">
                            #1
                        </span>
                        <div>
                            <h4 className="text-sm font-medium md:text-base">
                                Gilbrut James
                            </h4>
                            <p className="text-xs text-gray-500 md:text-sm">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 rounded-sm bg-secondary px-2.5 py-1.5 text-xs font-semibold text-dark-300 md:mb-2 md:p-4 md:py-2">
                            <MdRoomService className="text-base md:text-lg" />
                            Pending
                        </div>
                        <div className="hidden items-center gap-2 md:flex">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
