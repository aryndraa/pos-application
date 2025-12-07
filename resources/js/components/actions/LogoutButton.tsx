import { router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { CgLogOut } from 'react-icons/cg';

export default function LogoutButton({ url }: { url: string }) {
    const handleLogout: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(url);
    };

    return (
        <form onSubmit={handleLogout}>
            <button type="submit" className="text-3xl text-gray-400">
                <CgLogOut />
            </button>
        </form>
    );
}
