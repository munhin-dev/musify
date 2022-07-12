import './SearchBar.css'
import {useState} from 'react'

function SearchBar() {
  let [searchBar1Content, setSearchBar1Content] = useState([])
  let [searchBarList, setSearchBarList] = useState([1])

  function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const formEntries = Object.fromEntries(formData)
    for (let key in formEntries){
      console.log(`the value of ${key} is ${formEntries[key]}`)
    }
    // console.log(formEntries.choice0)
  }

  function addParameter(){
    setSearchBarList([...searchBarList, 1])
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="searchForm">
      {searchBarList.map((_, idx) => <div className={`searchBar${idx}`}>
        <input type="text" name={`searchBarText${idx}`}/>
         <select name={`choice${idx}`}>
           <option value="artist">Artist</option>
           <option value="track">Track</option>
           <option value="genre">Genre</option>
         </select>
       </div>)}
        <button>Submit</button>
      </form>
      <button onClick={addParameter}>Add Parameter</button>
      
    </div>
  )
}

export default SearchBar