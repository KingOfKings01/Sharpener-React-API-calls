// import React from 'react'

export default function AddForm({setMovieList}) {

    const handleSubmit = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const opening = event.target.opening.value
        const release_date = event.target.release_date.value

        const NewMovieObj = {
            title,
            opening,
            release_date
        }

        try{
            const response = await fetch(import.meta.env.VITE_FIREBASE_PATH, {
                method: "POST",
                body: JSON.stringify(NewMovieObj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json()

            NewMovieObj.id = data.name

            setMovieList(prevMovies => [...prevMovies, NewMovieObj])

        } catch(err){
            console.error("Error:", err);
        }
        event.target.reset()


    }

  return (
    <>
    <h2>Add Movie</h2>

    <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <input type="text" name="title" required/>
        </label>
        <br />
        <br />
        <label>
        Opening Text:
        <br />
          <textarea name="opening" required/>
        </label>
        <br />
        <br />
        <label>
        Release date:
        <br />
          <input type="text" name="release_date" required/>
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
    </form>
        <br />
        <br />
    </>
  )
}
