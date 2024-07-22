export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center">
            <ul className="flex gap-2 cursor-pointer">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`shadow-lg rounded px-2 py-1 font-semibold hover:bg-light_orange transition ${
                            page === number
                                ? "bg-med_orange text-light_neutral"
                                : "bg-background_alt text-primary"
                        }`}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
