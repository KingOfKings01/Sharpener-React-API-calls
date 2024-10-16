// import React from 'react'

export default function AddForm() {

    const handleSubmit = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const opening = event.target.opening.value
        const release_date = event.target.release_date.value

        const NewMovieObj = {
            title,
            opening,
            release_date
        }

        console.log(NewMovieObj);
    }

  return (
    <>
    <h2>Add Movie</h2>

    <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <input type="text" name="title" />
        </label>
        <br />
        <br />
        <label>
        Opening Text:
        <br />
          <textarea name="opening" />
        </label>
        <br />
        <br />
        <label>
        Release date:
        <br />
          <input type="text" name="release_date" />
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
