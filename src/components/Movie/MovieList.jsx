
export default function MovieList({ dummyData }) {
    return (
        <>
            <h1>MovieList</h1>

            {dummyData.map((movie, index) => (
                <div key={index}>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                    <p>{movie.opening_crawl}</p>
                </div>
            ))}
        </>
    )
}
