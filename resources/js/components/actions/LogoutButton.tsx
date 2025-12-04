import { router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { CgLogOut } from 'react-icons/cg';

export default function LogoutButton() {
    const handleLogout: FormEventHandler = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <form onSubmit={handleLogout}>
            <button type="submit" className="text-3xl text-gray-400">
                <CgLogOut />
            </button>
        </form>
    );
}
