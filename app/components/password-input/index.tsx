"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({
  id,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="relative">
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 focus:border-gray-900 rounded-md text-sm placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-3 text-gray-400"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};
