interface InputProps {
  register?: any;
  defaultVal?: any;
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
}

const Input = ({ register, defaultVal, label, type, name, id, placeholder, required }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-left text-sm mb-2">
        {label}
      </label>
      <input
        {...register}
        defaultValue={defaultVal}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        className="text-gray-700 text-sm py-2 px-2 rounded-md"
      />
    </div>
  );
}

export default Input;