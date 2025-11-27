import InputLabel from '@/components/form/InputLabel';
import { Category } from '@/types/Menu';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PageProps } from 'node_modules/@inertiajs/core/types/types';
import { MdArrowBackIos } from 'react-icons/md';

interface CreateMenuProps extends PageProps {
    categories: Category[];
}

export default function CreateMenu() {
    const { categories } = usePage<CreateMenuProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        menu_category_id: '',
        name: '',
        price: '',
        stock: '',
        is_available: true,
    });

    const submit = (e: any) => {
        e.preventDefault();
        post('menu');
    };

    return (
        <main className="p-3 pb-24 md:p-4 md:px-12 md:pb-4 lg:px-16">
            <div className="mb-4 flex items-center gap-4 rounded-lg">
                <Link
                    href="/menu"
                    className="flex items-center gap-2 rounded-lg bg-white px-6 py-4 font-medium md:text-2xl"
                >
                    <MdArrowBackIos />
                    Back
                </Link>
                <div className="w-full rounded-lg bg-white p-4 px-6 text-lg font-medium md:text-2xl">
                    Create New Menu
                </div>
            </div>
            <section className="grid grid-cols-12 gap-4">
                <div className="col-span-8 rounded-lg bg-white p-6">
                    <h3 className="mb-4 border-b pb-4 text-lg font-medium">
                        Menu Info
                    </h3>
                    <div className="flex flex-col gap-4">
                        <InputLabel name="Menu Name" type="text" />
                        <div className="grid grid-cols-2 gap-4">
                            <InputLabel name="Price" type="text" />
                            <InputLabel name="Stock" type="number" />
                        </div>
                        <label>
                            <span className="text-sm font-medium text-gray-500">
                                Category
                            </span>

                            <input
                                list="category-list"
                                value={data.menu_category_id}
                                onChange={(e) =>
                                    setData('menu_category_id', e.target.value)
                                }
                                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-primary sm:text-sm"
                                placeholder="Search category..."
                            />

                            <datalist id="category-list">
                                {categories.map((cat) => (
                                    <option
                                        key={cat.id}
                                        value={cat.id}
                                        label={cat.name}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                            </datalist>

                            {errors.menu_category_id && (
                                <div className="text-sm text-red-500">
                                    {errors.menu_category_id}
                                </div>
                            )}
                        </label>
                    </div>
                </div>
                <div className="col-span-4"></div>
            </section>
        </main>
    );
}
