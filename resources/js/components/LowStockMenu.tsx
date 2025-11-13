import { Link } from '@inertiajs/react';

export default function LowStockMenu() {
    return (
        <div className="rounded-lg bg-white p-5">
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Low Stock Items</h3>
                <Link className="rounded-lg bg-secondary px-4 py-1 text-sm font-medium">
                    View More
                </Link>
            </div>
            <ul className="space-y-2">
                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-5">
                        <img
                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                            alt=""
                            className="size-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-medium">Katsu Sambal Bala</h4>
                            <p className="text-sm">
                                Stock : <span>12 Left</span>
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-5">
                        <img
                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                            alt=""
                            className="size-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-medium">Katsu Sambal Bala</h4>
                            <p className="text-sm">
                                Stock : <span>12 Left</span>
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-5">
                        <img
                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                            alt=""
                            className="size-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-medium">Katsu Sambal Bala</h4>
                            <p className="text-sm">
                                Stock : <span>12 Left</span>
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-5">
                        <img
                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                            alt=""
                            className="size-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-medium">Katsu Sambal Bala</h4>
                            <p className="text-sm">
                                Stock : <span>12 Left</span>
                            </p>
                        </div>
                    </div>
                </li>
                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                    <div className="flex items-center gap-5">
                        <img
                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                            alt=""
                            className="size-10 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="font-medium">Katsu Sambal Bala</h4>
                            <p className="text-sm">
                                Stock : <span>12 Left</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
