import { cn } from "../utils/cn";


export default function CustomToggleSwitch({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      disabled={disabled}
      className={cn(
        "w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative flex items-center",
        checked ? "bg-teal" : "bg-bluewave",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}