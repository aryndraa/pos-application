import { formatRupiah } from '@/utils/formatRupiah';

interface itemType {
    id: number;
    name: string;
    additional_price: number;
    stock: number;
}

interface additionalType {
    name: string;
    items: itemType[];
}

interface MenuAdditionalVariantsProps {
    additionals: additionalType[];
}

export default function MenuAdditionalVariants({
    additionals,
}: MenuAdditionalVariantsProps) {
    if (additionals.length <= 0) return;

    return (
        <div className="w-full rounded-lg border border-zinc-300 bg-white p-4 lg:p-5">
            <h3 className="border-b border-gray-300 pb-4 text-lg font-semibold text-dark-300">
                Additional Variants
            </h3>
            <ul className="flex flex-col divide-y">
                {additionals.map((additional, index) => (
                    <li key={index}>
                        <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-4 bg-white py-4 font-medium last:border-transparent md:px-4">
                                <span className="font-semibold text-primary">
                                    {additional.name}
                                </span>

                                <svg
                                    className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </summary>

                            <ul className="pb-4 last:pb-0">
                                {additional.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-2 transition hover:bg-gray-100 md:gap-5"
                                    >
                                        <div className="flex items-center gap-4 md:gap-5">
                                            <img
                                                src="https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
                                                alt=""
                                                className="size-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <h4 className="text-sm font-medium md:text-lg">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs font-medium text-zinc-500 md:text-sm">
                                                    Stock : {item.stock}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-nowrap md:text-base">
                                            +{' '}
                                            {formatRupiah(
                                                item.additional_price,
                                            )}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}
