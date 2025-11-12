import WidgetCard from '@/components/WidgetCard';
import AppLayout from '@/layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Home() {
    return (
        <AppLayout>
            <section className="grid min-h-screen grid-cols-12 px-4 md:px-8 lg:px-12 2xl:px-16">
                <div className="col-span-7">
                    <div className="col-span-full mb-4">
                        {/* <div className="mb-4 flex justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Welcome Back, User!
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Check your customer orders.
                                </p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-2xl font-semibold">
                                    22:49:02
                                </span>
                                <span className="text-sm text-gray-600">
                                    Nov 12 2025
                                </span>
                            </div>
                        </div> */}
                        <div className="grid grid-cols-3 gap-4">
                            <WidgetCard />
                            <WidgetCard />
                            <WidgetCard />
                        </div>
                    </div>
                    <div className="col-span-full grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-white p-5">
                            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                                <h3 className="text-lg font-semibold">
                                    Popular Menu
                                </h3>
                                <Link className="rounded-lg bg-secondary px-4 py-1 text-sm font-medium">
                                    View More
                                </Link>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-lg bg-white p-5">
                            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                                <h3 className="text-lg font-semibold">
                                    Unready Stock
                                </h3>
                                <Link className="rounded-lg bg-secondary px-4 py-1 text-sm font-medium">
                                    View More
                                </Link>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-center gap-5 rounded-lg px-4 py-2 hover:bg-gray-100">
                                    <span className="text-xl font-semibold">
                                        01
                                    </span>
                                    <div className="flex items-center gap-5">
                                        <img
                                            src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                            alt=""
                                            className="size-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium">
                                                Katsu Sambal Bala
                                            </h4>
                                            <p className="text-sm">
                                                Orders : <span>12</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-5"></div>
            </section>
        </AppLayout>
    );
}
