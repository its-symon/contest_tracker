import React, { useEffect, useState } from 'react';
import ProgressCard from './components/ProgressCard';
import Navbar from './components/NavbarCard';
import './App.css';

function App() {
    const [contests, setContests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const contestsPerPage = 20; // Number of contests per page

    useEffect(() => {
        async function fetchContests() {
            try {
                const response = await fetch('https://codeforces.com/api/contest.list?gym=false');
                const data = await response.json();
                if (data.status === "OK") {
                    setContests(data.result);
                }
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        }

        fetchContests();
    }, []);

    const indexOfLastContest = currentPage * contestsPerPage;
    const indexOfFirstContest = indexOfLastContest - contestsPerPage;
    const currentContests = contests.slice(indexOfFirstContest, indexOfLastContest);

    const totalPages = Math.ceil(contests.length / contestsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="background-grid">
            <Navbar />

            {/* Cards */}
            <div className="cards-wrapper">
                {currentContests.map((contest) => (
                    <ProgressCard
                        key={contest.id}
                        title={contest.name}
                        subtitle={`Status: ${contest.phase === 'CODING' ? 'Contest Started!' : contest.phase}`}
                        startTimeSeconds={contest.startTimeSeconds}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper">
                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &laquo; Previous
                    </button>

                    {/* Only show 5 page buttons */}
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
