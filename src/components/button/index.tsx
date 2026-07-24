import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading: boolean;
  className: string;
  loadingText?: string;
}

const ButtonLoader = ({ loadingText }: Pick<ButtonProps, "loadingText">) => (
  <div className="flex justify-center items-center gap-2">
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    {loadingText}
  </div>
);

const Button = ({
  children,
  onClick,
  loading,
  className,
  loadingText,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? <ButtonLoader loadingText={loadingText} /> : children}
    </button>
  );
};

export default Button;
