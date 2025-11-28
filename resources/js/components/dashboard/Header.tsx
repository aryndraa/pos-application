import { useEffect, useState } from 'react';

export default function Header() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleTimeString('en-US', {
        hour12: false,
    });

    const formattedDate = time.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    return (
        <div className="flex items-center justify-between rounded-lg border border-zinc-300 bg-white p-4 lg:p-5">
            <div>
                <h2 className="text-lg font-semibold lg:text-xl">
                    Welcome Back, User!
                </h2>
                <p className="text-sm text-gray-600">
                    Check your customer orders.
                </p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-lg font-semibold lg:text-2xl">
                    {formattedTime}
                </span>
                <span className="text-sm text-gray-600">{formattedDate}</span>
            </div>
        </div>
    );
}
