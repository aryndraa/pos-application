import { MenuType } from '@/types/Menu';
import { formatRupiah } from '@/utils/formatRupiah';
import { MdFastfood } from 'react-icons/md';

export default function MenuCard({
    name,
    category,
    orders_count,
    price,
    stock,
}: MenuType) {
    return (
        <div className="flex flex-col gap-2 rounded-lg bg-white p-3 md:p-4">
            <img
                src="https://images.unsplash.com/photo-1591814252471-068b545dff62?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="h-36 w-full rounded-lg object-cover md:h-full"
            />
            <div>
                <div className="mb-4">
                    <h3 className="mb-1 text-sm font-medium md:mb-0 md:text-lg">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500">
                        <MdFastfood />
                        <p className="text-xs font-medium md:text-base">
                            {category.name}
                        </p>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-2 border-b border-gray-300 pb-2 md:pb-4">
                    <div>
                        <h4 className="text-xs font-medium text-gray-500 md:text-sm">
                            Orders
                        </h4>
                        <span className="text-sm font-medium md:text-base">
                            {orders_count} Sold
                        </span>
                    </div>
                    <div>
                        <h4 className="text-xs font-medium text-gray-500 md:text-sm">
                            Stock
                        </h4>
                        <span className="text-sm font-medium md:text-base">
                            {stock} Left
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs md:text-base">
                        <p className="font-medium">Price :</p>
                        <span className="font-semibold">
                            {formatRupiah(price)}
                        </span>
                    </div>
                    <button className="flex-1 cursor-pointer rounded bg-secondary py-1 text-sm font-semibold md:rounded-lg md:py-2 md:text-base">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    );
}
