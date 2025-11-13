import { MdOutlineSearch, MdRoomService } from 'react-icons/md';

export default function OrderList() {
    return (
        <div className="flex h-full flex-col gap-4 rounded-lg bg-white p-4">
            <div className="grid grid-cols-2 rounded-lg bg-gray-100 p-2">
                <button className="rounded-lg bg-white p-2 font-medium">
                    In Progress
                </button>
                <button className="rounded-lg p-2 font-medium text-gray-400">
                    Waiting For Payment
                </button>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-gray-100 p-4">
                <MdOutlineSearch className="text-2xl" />
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="outline-none placeholder:text-gray-400"
                />
            </div>
            <ul className="w-full space-y-2">
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-3 font-semibold text-white">
                            #1
                        </span>
                        <div>
                            <h4 className="font-medium">Gilbrut James</h4>
                            <p className="text-sm text-gray-500">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 flex items-center gap-2 rounded-sm bg-secondary p-4 py-2 text-xs font-semibold text-dark-300">
                            <MdRoomService className="text-lg" />
                            Pending
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-3 font-semibold text-white">
                            #1
                        </span>
                        <div>
                            <h4 className="font-medium">Gilbrut James</h4>
                            <p className="text-sm text-gray-500">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 flex items-center gap-2 rounded-sm bg-secondary p-4 py-2 text-xs font-semibold text-dark-300">
                            <MdRoomService className="text-lg" />
                            Pending
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-3 font-semibold text-white">
                            #1
                        </span>
                        <div>
                            <h4 className="font-medium">Gilbrut James</h4>
                            <p className="text-sm text-gray-500">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 flex items-center gap-2 rounded-sm bg-secondary p-4 py-2 text-xs font-semibold text-dark-300">
                            <MdRoomService className="text-lg" />
                            Pending
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-2.5 rounded-full bg-secondary"></span>
                            <p className="text-end text-xs text-gray-500">
                                Ready to serve
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex w-full items-center justify-between rounded-lg p-3 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-primary p-3 font-semibold text-white">
                            #1
                        </span>
                        <div>
                            <h4 className="font-medium">Gilbrut James</h4>
                            <p className="text-sm text-gray-500">
                                4 Items - Tomorrow
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="mb-2 flex items-center gap-2 rounded-sm bg-secondary p-4 py-2 text-xs font-semibold text-dark-300">
                            <MdRoomService className="text-lg" />
                            Pending
                        </div>
                        <div className="flex items-center gap-2">
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
