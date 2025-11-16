import FileUploader from '@/components/form/FIleUploader';
import InputLabel from '@/components/form/InputLabel';
import Modal from '@/components/Modal';
import { useNotification } from '@/contexts/NotificationContext';
import { useForm } from '@inertiajs/react';

type CategoryFormProps = {
    mode: 'create' | 'edit';
    initialData?: {
        id: number;
        name: string;
        file_url: string | null;
    } | null;
    setIsOpen: () => void;
};

export default function CategoryForm({
    mode,
    initialData,
    setIsOpen,
}: CategoryFormProps) {
    const isEdit = mode === 'edit';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: initialData?.name ?? '',
        image: null as File | null,
    });

    const { notify } = useNotification();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const url = isEdit
            ? `/category/update/${initialData?.id}`
            : '/category/store';

        post(url, {
            forceFormData: true,
            onSuccess: () => {
                notify(
                    'success',
                    isEdit
                        ? 'Category updated successfully!'
                        : 'Category created successfully!',
                );
                reset();
                setIsOpen();
            },
            onError: (serverErrors) => {
                const message = Object.values(serverErrors).join('\n');
                notify('error', message);
            },
        });
    }

    return (
        <Modal
            title={isEdit ? 'Edit Category' : 'Add Category'}
            toggle={setIsOpen}
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-8 flex flex-col gap-4">
                    <InputLabel
                        name="name"
                        label="Category Name"
                        type="text"
                        required={true}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <FileUploader
                        label="Category Image"
                        required={!isEdit}
                        previewUrl={initialData?.file_url ?? undefined}
                        onChange={(files) => {
                            if (files) {
                                setData('image', files[0]);
                            }
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`flex w-full cursor-pointer justify-center rounded-md bg-secondary py-2.5 text-sm font-medium ${
                        processing && 'opacity-50'
                    }`}
                >
                    {processing
                        ? isEdit
                            ? 'Updating...'
                            : 'Saving...'
                        : isEdit
                          ? 'Update Category'
                          : 'Create Category'}
                </button>
            </form>
        </Modal>
    );
}
