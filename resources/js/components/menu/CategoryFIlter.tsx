import { FaPlus } from 'react-icons/fa';

export default function CategoryFIlter() {
    return (
        <div className="w-full rounded-lg bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-medium">All Categories</h2>
                <button className="rounded-full bg-secondary p-2 text-sm">
                    <FaPlus />
                </button>
            </div>
            <ul className="space-y-3">
                <li>
                    <button className="flex w-full cursor-pointer flex-col items-center justify-start gap-2 rounded-lg border-2 border-secondary px-4 py-4 font-medium text-dark-300">
                        <span>
                            <img
                                src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                                className="size-12 rounded-full object-cover"
                            />
                        </span>
                        All Menu
                    </button>
                </li>
                <li>
                    <button className="flex w-full cursor-pointer flex-col items-center justify-start gap-2 rounded-lg border-2 border-transparent bg-gray-100 px-4 py-4 font-medium text-dark-300">
                        <span>
                            <img
                                src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                                className="size-12 rounded-full object-cover"
                            />
                        </span>
                        Katsu
                    </button>
                </li>
                <li>
                    <button className="border- border-transparent2 flex w-full cursor-pointer flex-col items-center justify-start gap-2 rounded-lg bg-gray-100 px-4 py-4 font-medium text-dark-300">
                        <span>
                            <img
                                src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                                className="size-12 rounded-full object-cover"
                            />
                        </span>
                        Katsu
                    </button>
                </li>
                <li>
                    <button className="border- border-transparent2 flex w-full cursor-pointer flex-col items-center justify-start gap-2 rounded-lg bg-gray-100 px-4 py-4 font-medium text-dark-300">
                        <span>
                            <img
                                src="https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt=""
                                className="size-12 rounded-full object-cover"
                            />
                        </span>
                        Katsu
                    </button>
                </li>
            </ul>
        </div>
    );
}
