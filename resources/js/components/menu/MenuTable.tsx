import { FaFilter } from 'react-icons/fa';
import Search from '../Search';

export default function MenuTable() {
    return (
        <div className="rounded-lg border border-zinc-300 bg-white p-6">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-xl font-semibold">List Products</h1>
                <div className="flex items-stretch gap-4">
                    <Search />
                    <button className="flex items-center justify-center gap-3 rounded-lg bg-primary px-4 text-sm font-semibold text-white">
                        <FaFilter />
                        Filter
                    </button>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-4 text-left text-gray-700">
                            No
                        </th>
                        <th className="px-4 py-4 text-left text-gray-700">
                            Image
                        </th>
                        <th className="px-4 py-4 text-left text-gray-700">
                            Name
                        </th>
                        <th className="px-4 py-4 text-left text-gray-700">
                            Category
                        </th>
                        <th className="px-4 py-4 text-left text-gray-700">
                            Price
                        </th>
                        <th className="px-4 py-4 text-left text-gray-700">
                            Price
                        </th>
                        <th className="px-4 py-4 text-left text-gray-700">
                            Stock
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="transition duration-300 hover:bg-zinc-100">
                        <td className="px-3 py-4">#001</td>
                        <td className="px-3 py-4">user_01</td>
                        <td className="px-3 py-4">user_01</td>
                        <td className="px-3 py-4 text-green-500">Active</td>
                        <td className="px-3 py-4">#001</td>
                        <td className="px-3 py-4">user_01</td>
                        <td className="px-3 py-4 text-green-500">Active</td>
                    </tr>
                    <tr className="transition duration-300 hover:bg-zinc-100">
                        <td className="px-3 py-4">#001</td>
                        <td className="px-3 py-4">user_01</td>
                        <td className="px-3 py-4">user_01</td>
                        <td className="px-3 py-4 text-green-500">Active</td>
                        <td className="px-3 py-4">#001</td>
                        <td className="px-3 py-4">user_01</td>
                        <td className="px-3 py-4 text-green-500">Active</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
