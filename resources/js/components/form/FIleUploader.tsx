import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';

interface FileUploaderProps {
    label?: string;
    required?: boolean;
    accept?: string;
    multiple?: boolean;
    onChange?: (files: FileList | null) => void;
}

export default function FileUploader({
    label = 'Upload File',
    required = false,
    accept = 'image/*',
    multiple = false,
    onChange,
}: FileUploaderProps) {
    const [preview, setPreview] = useState<string[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        onChange?.(files);

        if (!files || files.length === 0) {
            setPreview([]);
            return;
        }

        const previews = Array.from(files).map((file) =>
            URL.createObjectURL(file),
        );

        setPreview(previews);
    }

    return (
        <label className="block cursor-pointer">
            {label && (
                <span className="text-sm font-medium text-gray-500">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </span>
            )}

            <div className="mt-2 rounded-md border p-4">
                <div className="flex flex-wrap gap-3 rounded-md">
                    {preview.length > 0 && (
                        <>
                            {preview.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    className="size-28 rounded-md border object-cover"
                                />
                            ))}
                        </>
                    )}

                    <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 sm:p-6">
                        <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
                            <MdOutlineFileUpload className="text-lg" />
                            <span className="text-sm">Upload File</span>
                        </div>

                        <input
                            type="file"
                            required={required}
                            className="sr-only"
                            accept={accept}
                            multiple={multiple}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </label>
    );
}
