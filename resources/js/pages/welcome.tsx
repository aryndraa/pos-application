import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <main>
            <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
                <div className="w-full max-w-4xl">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-5xl font-bold text-gray-800">
                            POS System
                        </h1>
                        <p className="text-xl text-gray-600">
                            Choose the panel you want to access
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="transform rounded-xl bg-white transition-all duration-300 hover:-translate-y-2">
                            <div className="p-8 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600">
                                    <svg
                                        className="h-10 w-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-gray-800">
                                    Admin
                                </h2>
                                <p className="mb-6 text-gray-600">
                                    Manage menu, reports, and system settings
                                </p>
                                <Link
                                    href="/admin"
                                    className="inline-block w-full rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-purple-700"
                                >
                                    Open Admin
                                </Link>
                            </div>
                        </div>

                        <div className="transform rounded-xl bg-white transition-all duration-300 hover:-translate-y-2">
                            <div className="p-8 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600">
                                    <svg
                                        className="h-10 w-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-gray-800">
                                    Cashier
                                </h2>
                                <p className="mb-6 text-gray-600">
                                    Process orders and customer payments
                                </p>
                                <Link
                                    href="/cashier"
                                    className="inline-block w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-green-600 hover:to-green-700"
                                >
                                    Open Cashier
                                </Link>
                            </div>
                        </div>

                        <div className="transform rounded-xl bg-white transition-all duration-300 hover:-translate-y-2">
                            <div className="p-8 text-center">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600">
                                    <svg
                                        className="h-10 w-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-gray-800">
                                    Kitchen
                                </h2>
                                <p className="mb-6 text-gray-600">
                                    Monitor and manage incoming orders
                                </p>
                                <Link
                                    href="/kitchen"
                                    className="inline-block w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
                                >
                                    Open Kitchen
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
