import { cn } from "../../../utils/cn";
import down from "../../../assets/images/down.svg";
import { ErrorMessage, useField } from "formik";

const CommonSelectBox = ({
  options = [],
  className = "",
  name,
  label,
  field,
  ...props
}) => {


  return (
    <div className="relative w-full">
      {
        label && <div className="text-white font-bold mb-3">{label}</div>
      }
      
      <select
        name={name}
        {...field}
        {...props}
        className={cn(
          "bg-white w-full h-[45px] outline-0 appearance-none pr-10 ps-2 rounded-[3px] select-with-border border-teal-600",
          className,
        //   meta.touched && meta.error ? "border border-red-500" : ""
        )}
      >
        {options.map((e) => (
          <option key={e.value} value={e.value}>
            {e.name}
          </option>
        ))}
      </select>

      <img
        src={down}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        alt="dropdown arrow"
      />
{/* 
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      /> */}
    </div>
  );
};

export default CommonSelectBox;
