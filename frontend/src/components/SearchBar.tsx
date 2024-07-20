import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { TbInputSearch, TbMapPinSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
	const navigate = useNavigate();
	const search = useSearchContext();

	const [name, setName] = useState<string>(search.name);
	const [location, setLocation] = useState<string>(search.location);
	const [maxLen, setMaxLen] = useState<number>(search.maxLen);
	const [maxSize, setMaxSize] = useState<number>(search.maxSize);
	const [type, setType] = useState<string>(search.type);
	const [open, setOpen] = useState<string>(search.open);
	const [close, setClose] = useState<string>(search.close);
	const [days, setDays] = useState<string[]>(search.days);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		search.saveSearchValues(
			name,
			location,
			maxLen,
			maxSize,
			type,
			open,
			close,
			days
		);
		navigate("/search");
	};
	return (
		<div className="container mx-auto -mt-8 -mb-24 px-6">
			<form
				onSubmit={handleSubmit}
				className="p-3 bg-gradient-to-r from-dark_orange to-light_orange rounded shadow-sm grid grid-cols-2 lg:grid-cols-3 items-center gap-4">
				<div className="flex flex-row items-center flex-1 bg-background p-2 rounded">
					<TbInputSearch size={25} className="text-primary mr-2" />
					<input
						placeholder="What is the name?"
						className="bg-background text-md text-primary w-full focus:outline-none"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div className="flex flex-row items-center flex-1 bg-background p-2 rounded">
					<TbMapPinSearch size={25} className="text-primary mr-2" />
					<input
						placeholder="What is the location?"
						className="bg-background text-md text-primary w-full focus:outline-none"
						value={location}
						onChange={(event) => setLocation(event.target.value)}
					/>
				</div>
				<div className="flex flex-row items-center flex-1 bg-background px-2 py-1 gap-2 rounded">
					<label className="items-center flex text-primary">
						Length:
						<input
							className="bg-background text-primary w-full p-1 focus:outline-none font-bold"
							type="number"
							min={15}
							max={300}
							step={15}
							value={maxLen}
							onChange={(event) => setMaxLen(parseInt(event.target.value))}
						/>
					</label>
					<label className="items-center flex text-primary">
						Group:
						<input
							className="bg-background text-primary w-full p-1 focus:outline-none font-bold"
							type="number"
							min={1}
							max={50}
							value={maxSize}
							onChange={(event) => setMaxSize(parseInt(event.target.value))}
						/>
					</label>
				</div>
				<div className="flex gap-2">
					<button className="rounded w-2/3 bg-light_neutral text-med_orange h-full p-1.5 font-bold text-xl hover:bg-secondary transition-all">
						Search
					</button>
					<button className="rounded w-1/3 bg-background_alt text-light_neutral h-full p-1.5 font-bold text-xl hover:bg-background transition-all">
						Clear
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
