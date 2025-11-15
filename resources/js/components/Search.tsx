import { MdOutlineSearch } from 'react-icons/md';

export default function Search() {
    return (
        <div className="flex w-full gap-4 rounded-lg bg-white p-4">
            <MdOutlineSearch className="text-2xl" />
            <input
                type="text"
                placeholder="Search menu..."
                className="w-full text-sm outline-none placeholder:text-gray-400 md:text-base"
            />
        </div>
    );
}
