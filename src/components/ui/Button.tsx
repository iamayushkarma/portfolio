import type { ButtonProps } from "../../types/button.type";

function Button({ label, className, ...props }: ButtonProps) {
  return (
    <button
      className={`${className} sm:hidden px-3 py-1 border-2 border-ink shadow-brutal font-mono font-bold text-sm bg-white active:shadow-none active:translate-x-0.75 active:translate-y-0.75 transition-all`}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button;
