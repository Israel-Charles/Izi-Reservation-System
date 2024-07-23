type Props = {
    close?: string;
    onChange: (value?: string) => void;
};

const CloseFilter = ({ close, onChange }: Props) => {
    return (
        <div className="pb-6 text-primary border-b-2 border-background">
            <h4 className="text-lg font-semibold mb-2">Close Time</h4>
            <label className="flex items-center gap-2 placeholder-secondary">
                <input
                    id="CloseFilter"
                    type="time"
                    step="900"
                    value={close}
                    className="w-full rounded-lg bg-background p-2"
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>
        </div>
    );
};

export default CloseFilter;
