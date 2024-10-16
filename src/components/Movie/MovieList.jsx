
export default function MovieList({ movieList, isLoading }) {
    return (
        <>
            {movieList.map((movie, index) => (
                <div key={index}>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                    <p>{movie.opening_crawl}</p>
                </div>
            ))}
        </>
    )
}
