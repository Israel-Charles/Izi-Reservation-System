type Props = {
    length?: number;
    onChange: (value?: number) => void;
};

const LengthFilter = ({ length, onChange }: Props) => {
    return (
        <div className="border-b-2 border-background pb-6 text-primary">
            <h4 className="text-lg font-semibold mb-2">Reservation Length</h4>
            <label className="flex items-center gap-2 placeholder-secondary">
                <input
                    type="text"
                    placeholder="minutes"
                    value={length}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                />
            </label>
        </div>
    );
};

export default LengthFilter;
