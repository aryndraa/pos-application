import FileUploader from '@/components/form/FIleUploader';
import InputLabel from '@/components/form/InputLabel';
import Modal from '@/components/Modal';

export default function CategoryForm({ setIsOpen }: { setIsOpen: () => void }) {
    return (
        <Modal title="Add Category" toggle={setIsOpen}>
            <div>
                <form action="#" method="post">
                    <div className="mb-8 flex flex-col gap-4">
                        <InputLabel
                            name="name"
                            label="Category Name"
                            type="text"
                            required={true}
                        />

                        <FileUploader
                            label="Category Image"
                            required
                            onChange={(f) => console.log(f)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex w-full cursor-pointer justify-center rounded-md bg-secondary py-2.5 text-sm font-medium"
                    >
                        Create Category
                    </button>
                </form>
            </div>
        </Modal>
    );
}
