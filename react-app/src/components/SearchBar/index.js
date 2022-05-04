import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.css'


const SearchBar = () => {

    const stocks = useSelector(state => state.stocks)
    const stocklist = Object.values(stocks).map(stock => stock.long_name)

    console.log(stocklist);

    const [filteredList, setFilteredList] = useState([])
    const [searchWord, setSearchWord] = useState("")
    
    useEffect(() => {
        setFilteredList(stocklist.filter(stockname => stockname.includes(searchWord)))
    }, [searchWord])

    return (
        <div>
            <input
            type="text"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            className='search-bar-input'
            />

            <div>
                <ul className='searchresult-list'>
                    {filteredList.map((stock, idx)=> (
                        <li
                        key={idx}
                        value={stock}
                        >{stock}</li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default SearchBar


