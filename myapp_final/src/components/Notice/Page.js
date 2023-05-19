import { Pagination } from 'react-bootstrap';
import { BsChevronLeft } from 'react-icons/bs';

const Page = ({ noticesPerPage, totalNotices, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNotices / noticesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />


                {pageNumbers.map((number) => (
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        activeLabel={null}
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </Pagination.Item>
                ))}
                <Pagination.Next disabled={currentPage >= Math.ceil(totalNotices / noticesPerPage)} onClick={() => paginate(currentPage + 1)} />
            </Pagination>
        </div>
    );
}
export default Page