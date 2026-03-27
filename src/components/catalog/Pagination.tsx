interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onGoToPage: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onGoToPage,
  onNextPage,
  onPrevPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span className="hidden sm:inline text-xs tracking-wider">PREV</span>
      </button>

      <div className="flex items-center gap-1 mx-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onGoToPage(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-sm text-sm font-medium transition-colors duration-150 ${
              page === currentPage
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <span className="hidden sm:inline text-xs tracking-wider">NEXT</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  );
}
