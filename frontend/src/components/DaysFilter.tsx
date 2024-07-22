import { dayTypes } from "../config/resource-options-config";

type Props = {
    selectedDays: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DaysFilter = ({ selectedDays, onChange }: Props) => {
    return (
        <div className="col-span-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 text-primary">
            <h4 className="col-span-full text-lg font-semibold mb-2 text-center lg:text-left">
                Days Open
            </h4>
            {dayTypes.map((day) => (
                <label
                    className={`flex cursor-pointer rounded font-semibold px-4 py-2 text-sm ${
                        selectedDays.includes(day)
                            ? "bg-med_orange hover:bg-light_orange transition"
                            : "bg-transparent hover:bg-background transition"
                    }`}
                    key={day}
                >
                    <input
                        type="checkbox"
                        name="days"
                        value={day}
                        checked={selectedDays.includes(day)}
                        onChange={onChange}
                        className="hidden"
                    />
                    {day}
                </label>
            ))}
        </div>
    );
};

export default DaysFilter;
