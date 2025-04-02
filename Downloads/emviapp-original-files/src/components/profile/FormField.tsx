
import { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  icon?: ReactNode;
  as?: "input" | "textarea";
  rows?: number;
}

const FormField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  icon,
  as = "input",
  rows = 3
}: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      {as === "input" ? (
        <div className={`relative ${icon ? "" : ""}`}>
          {icon && (
            <span className="absolute left-3 top-3 text-gray-400">
              {icon}
            </span>
          )}
          <input
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`bg-gray-900 text-white ${icon ? "pl-10" : "px-4"} py-2 rounded border border-gray-700 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
