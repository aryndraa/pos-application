import { formatRupiah } from '@/utils/formatRupiah';
import { useState } from 'react';
import AddOrderModal from './AddOrderModal';

interface itemType {
    id: number;
    name: string;
    additional_price: number;
    stock: number;
}

interface additionalType {
    name: string;
    type: string; // single. mutiple, counting
    is_required: boolean;
    items: itemType[];
}

interface MenuCardProps {
    id: number;
    name: string;
    price: number;
    additionals: additionalType[];
    file_url: string;
}

export default function MenuCard({
    id,
    name,
    price,
    additionals,
    file_url,
}: MenuCardProps) {
    const [opeModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="relative flex cursor-pointer flex-col items-center gap-4 rounded-lg border border-zinc-300 p-4 transition"
            >
                {file_url ? (
                    <img
                        src={file_url}
                        alt={name}
                        className="aspect-square h-full w-full rounded-lg object-cover"
                    />
                ) : (
                    <img
                        src="https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
                        alt=""
                        className="aspect-square border object-cover"
                    />
                )}

                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-medium capitalize">{name}</h3>

                    <p className="font-semibold text-primary md:text-lg">
                        {formatRupiah(price)}
                    </p>
                </div>
                {/* <span className="absolute top-0 right-0 m-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold">
                Not Available
            </span> */}
            </button>

            {opeModal && (
                <AddOrderModal
                    id={id}
                    file_url={file_url}
                    name={name}
                    price={price}
                    additionals={additionals}
                    closeModal={() => setOpenModal(false)}
                />
            )}
        </>
    );
}
