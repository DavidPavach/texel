import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

type PaginationControlsProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
    
    const pageRange = () => {
        const range = [];
        for (let i = 1; i <= totalPages; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className="flex justify-center mt-6">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage - 1);
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {pageRange().map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                isActive={pageNumber === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(pageNumber);
                                }}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
