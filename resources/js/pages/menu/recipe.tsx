import AppLayout from '@/layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import { PageProps } from 'node_modules/@inertiajs/core/types/types';
import { FaChevronLeft } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface RecipeProps extends PageProps {
    id: number;
    name: string;
    recipe: string;
}

export default function Recipe() {
    const { name, recipe } = usePage<RecipeProps>().props;

    return (
        <AppLayout>
            <section className="grid grid-cols-12 gap-4">
                <div className="col-span-full w-full rounded-lg border border-zinc-300 bg-white p-4 lg:p-5">
                    <div className="mb-4 flex w-full items-center justify-between gap-4 border-b border-gray-300 pb-4">
                        <h1 className="text-xl font-semibold text-dark-300 capitalize md:text-3xl">
                            {name} Recipe
                        </h1>
                        <button
                            onClick={() => window.history.back()}
                            className="flex w-fit rounded-lg bg-primary p-3 text-white md:p-4"
                        >
                            <FaChevronLeft />
                        </button>
                    </div>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    >
                        {recipe}
                    </ReactMarkdown>
                </div>
            </section>
        </AppLayout>
    );
}
