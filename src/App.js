import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // all initial data from api
  const [data, setdata] = useState([]);
  const [tempData, setTempData] = useState([])

  // fetching data from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      headers: {
        "content-type": "application/json"
      },
      method: "GET"
    })
      .then(rawData => rawData.json())
      .then(res => {
        setdata(res)
        setTempData(res)
      })
  }, []);

  // data of search bar
  const [search, setSearch] = useState('');

  // state for storing data of search result
  const [searchData, setSearchData] = useState([]);
  const searchHandler = (e) => {
    // console.log(search.length)
    let arr = []
    e.preventDefault();
    data.map(ele => {
      if (search.split(" ").length == 1) {
        ele.title.split(" ").map(newEle => {
          if (newEle === search) {
            arr.push(ele)
          }
        })
      }
      else {
        if (ele.title.includes(search)) {
          arr.push(ele)
        }
      }
    })

    setTempData(arr)
  }


  return (
    <div className="App">
      <div className="searchContainer">
        <input type="text"
          placeholder='search title'
          value={search} onChange={(e) => {
            setSearch(e.target.value);

          }} />
        <br />
        <button onClick={searchHandler}>Search</button>
      </div>
      <div className="dataContainer">
        {tempData.map((ele, i) => {
          return (
            <>
              <div className="card" id={ele.id}>
                <span>Title : </span>
                <span className='title' style={{fontWeight:"bold"}}>{ele.title}</span>
                <p className='body'>Body : {ele.body}</p>
              </div>
              <hr />
            </>

          )
        })}
      </div>


    </div>
  );
}

export default App;
