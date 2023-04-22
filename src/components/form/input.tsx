interface InputProps {
  register: any;
  label: string;
  type: string;
  name: string;
  id: string;
  placeholder: string;
}

const Input = ({ register, label, type, name, id, placeholder }: InputProps) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        {...register}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="text-black"
      />
    </>
  );
}

export default Input;