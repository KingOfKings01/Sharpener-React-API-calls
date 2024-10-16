
export default function MovieList({ movieList, setMovieList }) {

    const handleDelete = async (id) => {

        try{
            const response = await fetch(import.meta.env.VITE_FIREBASE_PATH, {
                method: "DELETE",
                body: JSON.stringify(id),
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json()
            console.log(data);

        } catch(err){
            console.error("Error:", err);
        }
        


        const updatedList = movieList.filter((movie) => movie.id!== id);
        setMovieList(updatedList);
    }

    return (
        <>
            {movieList.map((movie) => (
                <div key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                    <p>{movie.opening}</p>
                    <button onClick={()=>{handleDelete(movie.id)}}>Delete</button>
                </div>
            ))}
        </>
    )
}
