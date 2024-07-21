import { dayTypes } from "../config/resource-options-config";

type Props = {
    selectedDays: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DaysFilter = ({ selectedDays, onChange }: Props) => {
    return (
        <div className="border-b-2 border-background pb-6 text-primary">
            <h4 className="text-lg font-semibold mb-2">Days Open</h4>
            {dayTypes.map((day) => (
                <label className="flex items-center gap-2" key={day}>
                    <input
                        type="checkbox"
                        name="days"
                        value={day}
                        checked={selectedDays.includes(day)}
                        onChange={onChange}
                    />
                    {day}
                </label>
            ))}
        </div>
    );
};

export default DaysFilter;
