interface InputLabelProps {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLabel({
    name,
    type,
    placeholder = '',
    label = name,
    value,
    required = false,
    onChange,
}: InputLabelProps) {
    return (
        <label>
            <span className="text-sm font-medium text-gray-500">
                {label ?? name}
                {required && <span className="ml-1 text-red-500">*</span>}
            </span>

            <input
                type={type}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-primary sm:text-sm"
            />
        </label>
    );
}
