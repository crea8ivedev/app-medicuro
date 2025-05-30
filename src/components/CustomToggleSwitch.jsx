import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

export default function CustomToggleSwitch({checked,onChange}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if(checked) setEnabled(true)
  })

  const handleChange = () => {
    onChange(!enabled)
    setEnabled(!enabled);
  }

  return  <button
      type="button"
      onClick={() => handleChange()}
      className = {cn("w-11 h-6 rounded-full p-0.5 transition-colors duration-300 relative flex items-center cursor-pointer",enabled ? 'bg-teal' : 'bg-bluewave')}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  
}