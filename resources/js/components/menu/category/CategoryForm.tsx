import FileUploader from '@/components/form/FIleUploader';
import InputLabel from '@/components/form/InputLabel';
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/react';

export default function CategoryForm({ setIsOpen }: { setIsOpen: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        image: null as File | null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post('/category/store', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setIsOpen();
            },
        });
    }

    return (
        <Modal title="Add Category" toggle={setIsOpen}>
            <div>
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
                            required
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
                        {processing ? 'Saving...' : 'Create Category'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}
