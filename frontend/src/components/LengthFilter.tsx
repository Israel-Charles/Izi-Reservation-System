type Props = {
    length?: number;
    onChange: (value?: number) => void;
};

const LengthFilter = ({ length, onChange }: Props) => {
    return (
        <div className="border-b-2 border-background pb-6 text-primary">
            <h4 className="text-base font-semibold mb-2">Duration (in mns)</h4>
            <label className="flex items-center gap-2 placeholder-secondary">
                <input
                    id="lengthFilter"
                    type="number"
                    value={length}
                    min={15}
                    step={15}
                    className="w-full rounded-lg bg-background p-2"
                    onChange={(e) => onChange(parseInt(e.target.value))}
                />
            </label>
        </div>
    );
};

export default LengthFilter;
