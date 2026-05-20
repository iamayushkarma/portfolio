import type { ButtonProps } from "../../types/button.type";

function Button({ label, className, to, ...props }: ButtonProps) {
  return (
    <button
      className={`${className} px-3 py-1 border-2 cursor-pointer border-ink shadow-brutal font-mono font-bold text-sm bg-white active:shadow-none hover:translate-x-0.75 hover:shadow-none hover:translate-y-0.75 active:translate-x-0.75 active:translate-y-0.75 transition-all`}
      {...props}
    >
      <a href={to}>{label}</a>
    </button>
  );
}

export default Button;
