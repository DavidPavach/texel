import { useState } from "react";

//Import Data
import countriesJson from "../../../data/countries.json";

//Icons
import { ArrowDown2 } from "iconsax-react";

type CountryDropDownProps = {
    onSelect: (country: string) => void;
}


const CountryDropDown = ({ onSelect }: CountryDropDownProps) => {

    const countries: Record<string, string> = countriesJson;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedCode, setSelectedCode] = useState<string>(Object.keys(countries)[0]);

    //Functions
    const handleSelect = (code: string, name: string) => {
        setSelectedCode(code);
        onSelect(name);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full text-sm md:text-base xl:text-lg">
            <label className="text-neutral-600 cursor-pointer">
                Country <span className="text-red-500">*</span>
            </label>
            <button type="button" onClick={() => setIsOpen((prev) => !prev)} className={`flex justify-between items-center bg-[#F8F6F1] px-4 py-3 rounded-3xl focus:outline-none w-full`}>
                <div className="flex items-center gap-2">
                    <img src={`/flags/${selectedCode}.png`} alt={countries[selectedCode]} className="border rounded w-5 h-4 object-cover" />
                    <span className="text-gray-800">{countries[selectedCode]}</span>
                </div>
                <span className={`ml-auto transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}><ArrowDown2 size={16} variant="Bold" /></span>
            </button>
            {isOpen && (
                <ul className="z-[2] absolute bg-white shadow-md mt-2 border rounded-2xl w-full max-h-60 overflow-y-auto">
                    {Object.entries(countries).map(([code, name]) => (
                        <li key={code} onClick={() => handleSelect(code, name)} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 cursor-pointer">
                            <img src={`/flags/${code}.png`} alt={name} className="border rounded w-5 h-4 object-cover" />
                            <span className="text-gray-600 text-sm">{name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CountryDropDown;