import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import spinner from "../assets/images/spinner.gif";

function Privacy({ withCheckboxAndButton, onButtonClick }) {
  const [terms, setTerms] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const fetchTerms = async () => {
    const res = await axiosInstance.get("/api/v1/terms");
    setTerms(res.data);
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  return (
    <div className="flex flex-col gap-5 ">
      {!terms.length ? (
        <img src={spinner} className="w-20 m-auto" alt="loading" />
      ) : (
        terms.map((t, i) => {
          return Object.entries(t).map(([key, value], index) => {
            return (
              <div key={`${i}-${index}`}>
                {key ? (
                  <div className="flex flex-col gap-1 whitespace-break-spaces">
                    <div className="text-ocean font-bold mt-4 text-xl whitespace-break-spaces">
                      {key.replaceAll("_", " ")}
                    </div>
                    <div>
                      {typeof value === "string" ? (
                        <div className='whitespace-break-spaces'>{value}</div>
                      ) : (
                        <div>
                          <ul className="list-decimal px-10 md:px-5">
                            {value.map((item, idx) => (
                              <li className="my-3 whitespace-break-spaces" key={idx}>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {Array.isArray(value) &&
                      value?.map((terms, idx) => (
                        <div key={idx} className='whitespace-break-spaces'>{terms}</div>
                      ))}
                  </div>
                )}
              </div>
            );
          });
        })
      )}

      {withCheckboxAndButton && (
        <div className="text-center mt-4 flex flex-col gap-3 items-center">
          {/* ✅ Checkbox */}
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="cursor-pointer accent-blue-600 w-4 h-4"
            />
            <span>I agree to the Terms and Privacy Policy</span>
          </label>

          {/* ✅ Button disabled until checked */}
          <button
            className={`common-btn my-4 cursor-pointer font-outfit w-full md:w-auto ${
              !isChecked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => isChecked && onButtonClick()}
            disabled={!isChecked}
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}

export default Privacy;
