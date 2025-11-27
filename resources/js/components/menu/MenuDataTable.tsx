import CheckboxFilter from '../CheckboxFilter';
import Search from '../Search';

export default function MenuDataTable() {
    return (
        <div className="rounded-lg border border-zinc-300 bg-white p-4">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-xl font-semibold">List Products</h1>
                <div className="flex items-stretch gap-4">
                    <Search />
                    <CheckboxFilter />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                No
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Image
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Name
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Category
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                SKU
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
                                Price
                            </th>
                            <th className="px-4 py-4 text-left text-sm font-medium text-zinc-500">
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
        </div>
    );
}
