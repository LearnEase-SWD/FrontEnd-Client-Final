import { useState } from "react";

interface Comment {
  avatar: string;
  name: string;
  date: string;
  content: string;
}

type Props = {
  items: Comment[];
};

export const Comment = ({ items }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  // Calculate the indices for the current page
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = items.slice(indexOfFirstComment, indexOfLastComment);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-4">
      {currentComments.map((comment, index) => (
        <div
          key={index}
          className="flex gap-4 grow-0 w-full mb-4 border-t pt-2"
        >
          <img
            className="h-10 w-10 rounded-full"
            src={comment.avatar}
            alt="avatar"
          />
          <div className="flex-grow">
            <div className="flex justify-between">
              <div className="font-bold">{comment.name}</div>
              <div>{comment.date}</div>
            </div>
            <div>{comment.content}</div>
          </div>
        </div>
      ))}
      <Pagination
        commentsPerPage={commentsPerPage}
        totalComments={items.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

type PaginationProps = {
  commentsPerPage: number;
  totalComments: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  pageNumberStyle?: React.CSSProperties;
};

const Pagination = ({
  commentsPerPage,
  totalComments,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center mb-4">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 ${currentPage === number ? "font-bold" : ""}`}
          >
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-full border ${
                currentPage === number
                  ? "bg-black text-white font-bold"
                  : "text-gray-700"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
