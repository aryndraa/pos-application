import { useOrder } from '@/contexts/OrderContext';
import { formatRupiah } from '@/utils/formatRupiah';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

interface itemType {
    id: number;
    name: string;
    additional_price: number;
    stock: number;
}

interface additionalType {
    name: string;
    type: string;
    is_required: boolean;
    items: itemType[];
}

interface AddOrderModalProps {
    id: number;
    name: string;
    price: number;
    additionals: additionalType[];
    file_url: string;
    closeModal: () => void;
}

export default function AddOrderModal({
    id,
    name,
    price,
    file_url,
    additionals,
    closeModal,
}: AddOrderModalProps) {
    const [menuCount, setMenuCount] = useState(1);
    const [notes, setNotes] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { addOrder } = useOrder();

    const [selectedAdditional, setSelectedAdditional] = useState(() => {
        const initial: Record<string, any> = {};
        additionals.forEach((add) => {
            if (add.type === 'single') initial[add.name] = null;
            if (add.type === 'multiple') initial[add.name] = [];
            if (add.type === 'counting') initial[add.name] = {};
        });
        return initial;
    });

    const toggleSingle = (group: string, item: itemType | null) => {
        setSelectedAdditional((prev) => ({
            ...prev,
            [group]: item
                ? {
                      id: item.id,
                      name: item.name,
                      additional_price: item.additional_price,
                  }
                : null,
        }));

        if (errors[group]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[group];
                return newErrors;
            });
        }
    };

    const toggleMultiple = (group: string, item: itemType) => {
        const arr = selectedAdditional[group] || [];
        const exists = arr.some((x: any) => x.id === item.id);

        const updated = exists
            ? arr.filter((x: any) => x.id !== item.id)
            : [
                  ...arr,
                  {
                      id: item.id,
                      name: item.name,
                      additional_price: item.additional_price,
                  },
              ];

        setSelectedAdditional((prev) => ({
            ...prev,
            [group]: updated,
        }));
        if (errors[group]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[group];
                return newErrors;
            });
        }
    };

    const increaseMenu = () => {
        setMenuCount(menuCount + 1);
    };

    const decreaseMenu = () => {
        setMenuCount(menuCount - 1);
    };

    const handleSubmit = () => {
        let hasError = false;
        const newErrors: Record<string, string> = {};

        additionals.forEach((add) => {
            if (add.is_required) {
                const selected = selectedAdditional[add.name];
                if (add.type === 'single' && !selected) {
                    newErrors[add.name] = `${add.name} is required`;
                    hasError = true;
                } else if (
                    add.type === 'multiple' &&
                    (!selected || selected.length === 0)
                ) {
                    newErrors[add.name] = `${add.name} is required`;
                    hasError = true;
                } else if (
                    add.type === 'counting' &&
                    (!selected || Object.keys(selected).length === 0)
                ) {
                    newErrors[add.name] = `${add.name} is required`;
                    hasError = true;
                }
            }
        });

        setErrors(newErrors);

        if (hasError) return;

        addOrder(
            {
                id,
                name,
                price,
            } as any,
            menuCount,
            selectedAdditional,
            notes,
        );

        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex min-h-screen items-end justify-center bg-black/10 md:items-center">
            <div className="scroll-y max-h-screen w-full overflow-y-auto rounded-lg border bg-white p-4 shadow-lg md:max-h-[90vh] md:w-[70%] md:p-5 lg:w-[40%]">
                <div className="mb-6 flex items-center justify-between border-b pb-6">
                    <h1 className="text-xl font-semibold">Add To Order</h1>
                    <button
                        className="cursor-pointer rounded-lg border bg-zinc-200 p-2"
                        onClick={closeModal}
                    >
                        <MdClose />
                    </button>
                </div>

                <div className="flex items-center gap-6 border-b pb-6">
                    {file_url ? (
                        <img
                            src={file_url}
                            alt={name}
                            className="aspect-square size-28 rounded-lg object-cover"
                        />
                    ) : (
                        <img
                            src="https://i.pinimg.com/736x/d8/4e/25/d84e25ff3c9dd2fc129c7de8f7176b34.jpg"
                            className="aspect-square size-28 rounded-lg border object-cover"
                        />
                    )}

                    <div className="flex w-full flex-col items-start justify-between md:flex-row">
                        <div>
                            <h2 className="text-xl font-semibold text-primary capitalize">
                                {name}
                            </h2>

                            <p className="text-xl font-medium text-primary">
                                {formatRupiah(price)}{' '}
                                <span className="text-base text-zinc-500">
                                    /Pcs
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
                            <button
                                type="button"
                                className="size-7 rounded border font-medium"
                                onClick={decreaseMenu}
                            >
                                -
                            </button>

                            <span className="w-8 text-center text-lg font-semibold">
                                {menuCount}
                            </span>

                            <button
                                type="button"
                                className="size-7 rounded border font-medium"
                                onClick={increaseMenu}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <ul className="mb-4 flex flex-col divide-y border-b">
                    {additionals?.map((additional, index) => {
                        const selected = selectedAdditional[additional.name];

                        return (
                            <li key={index}>
                                <details className="group">
                                    <summary className="flex cursor-pointer items-center justify-between py-4 font-medium">
                                        <div>
                                            <h3>
                                                {additional.name}
                                                {additional.is_required ? (
                                                    <span className="ml-1 text-red-500">
                                                        *
                                                    </span>
                                                ) : (
                                                    ''
                                                )}
                                            </h3>
                                            {errors[additional.name] && (
                                                <p className="pb-2 text-sm text-red-500">
                                                    {errors[additional.name]}
                                                </p>
                                            )}
                                        </div>
                                        <svg
                                            className="size-5 transition-transform group-open:-rotate-180"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </summary>

                                    <ul className="pb-4">
                                        {additional.items.map((item) => {
                                            return (
                                                <li
                                                    key={item.id}
                                                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <h4 className="text-sm font-medium">
                                                                {item.name}
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    <p className="text-sm font-medium">
                                                        +{' '}
                                                        {formatRupiah(
                                                            item.additional_price,
                                                        )}
                                                    </p>

                                                    <div className="flex items-center gap-2">
                                                        {additional.type ===
                                                            'single' && (
                                                            <input
                                                                className="size-4 rounded border-gray-300 shadow-sm"
                                                                type="radio"
                                                                name={
                                                                    additional.name
                                                                }
                                                                checked={
                                                                    selected?.id ===
                                                                    item.id
                                                                }
                                                                onChange={() =>
                                                                    toggleSingle(
                                                                        additional.name,
                                                                        item,
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    if (
                                                                        selected?.id ===
                                                                        item.id
                                                                    ) {
                                                                        toggleSingle(
                                                                            additional.name,
                                                                            null,
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        )}

                                                        {additional.type ===
                                                            'multiple' && (
                                                            <input
                                                                className="size-4 rounded border-gray-300 shadow-sm"
                                                                type="checkbox"
                                                                checked={(
                                                                    selected ||
                                                                    []
                                                                ).some(
                                                                    (x: any) =>
                                                                        x.id ===
                                                                        item.id,
                                                                )}
                                                                onChange={() =>
                                                                    toggleMultiple(
                                                                        additional.name,
                                                                        item,
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </details>
                            </li>
                        );
                    })}
                </ul>

                <div className="mb-4">
                    <label className="mb-3 block font-medium">Notes :</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes (optional)"
                        className="min-h-[12vh] w-full rounded-lg border p-3"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full rounded-lg bg-primary p-3 font-semibold text-white"
                >
                    Add Menu
                </button>
            </div>
        </div>
    );
}
