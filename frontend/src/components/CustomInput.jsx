import { useState } from "react";
import cn from "clsx";

const CustomInput = ({
  placeholder = "Enter text",
  onChange,
  type = "text",
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleChange = (e, callback) => {
    if (callback) {
      callback(e.target.value);
    }

    setIsActive(e.target.value.length > 0);
  };

  return (
    <input
      placeholder={placeholder}
      type={type}
      onChange={(e) => handleChange(e, onChange)}
      className={cn(
        "w-1/3 outline-0 px-1 border-b border-border text-white placeholder:text-border focus:border-white bg-transparent transition-colors duration-300",
        isActive && "border-white"
      )}
    />
  );
};

export default CustomInput;
