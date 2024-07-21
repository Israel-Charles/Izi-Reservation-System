type Props = {
    size?: number;
    onChange: (value?: number) => void;
};

const SizeFilter = ({ size, onChange }: Props) => {
    return (
        <div className="border-b-2 border-background pb-6 text-primary">
            <h4 className="text-lg font-semibold mb-2">Group Size</h4>
            <label className="flex items-center gap-2 placeholder-secondary">
                <input
                    type="text"
                    placeholder="# of people"
                    value={size}
                    className="rounded-lg bg-background p-2"
                    onChange={(e) => onChange(parseInt(e.target.value))}
                />
            </label>
        </div>
    );
};

export default SizeFilter;
