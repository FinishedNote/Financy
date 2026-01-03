const CustomInput = ({
  id,
  placeholder = "Enter text",
  onChange,
  type = "text",
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      className="w-1/3 outline-0 px-1 border-b border-border text-white placeholder:text-border"
    />
  );
};

export default CustomInput;
