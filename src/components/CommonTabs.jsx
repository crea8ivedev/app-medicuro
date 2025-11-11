import { useState } from "react";

const CommonTabs = ({ tabs = [], onChange }) => {
  const [active, setActive] = useState(tabs[0]?.value);

  const handleTabClick = (value) => {
    setActive(value);
    if (onChange) onChange(value); // ✅ Notify parent
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex rounded-md overflow-hidden cursor-pointer">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-all text-black
              ${active === tab.value ? " bg-[#2cd5be]" : " bg-[#a4e8e1]"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommonTabs;
