import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './index.css'


const SearchBar = () => {
    const history = useHistory()

    const stocks = useSelector(state => state.stocks)
    const stocklist = Object.values(stocks).map(stock => [stock.long_name, stock.ticker, stock.id])

    const [filteredList, setFilteredList] = useState([])
    const [searchWord, setSearchWord] = useState("")

    useEffect(() => {
        setFilteredList(stocklist.filter(stock => stock[0].toLowerCase().includes(searchWord.toLowerCase()) || stock[1].toLowerCase().includes(searchWord.toLowerCase())))
    }, [searchWord])

    function handleSubmit(e) {
        e.preventDefault();
        if (filteredList.length > 0) {
            history.push(`/stocks/${filteredList[0][2]}`)
        }
    }

    return (
        <div className='search-bar-box'>
            <form onSubmit={e => handleSubmit(e)}>
            <input
                type="text"
                value={searchWord}
                onChange={e => setSearchWord(e.target.value)}
                className='search-bar-input'
                placeholder='Search for stocks'
            />
            </form>
            {searchWord != '' && (
                <div>
                    <ul className='searchresult-list'>
                        {filteredList.map((stock) => (
                            <li
                                key={stock.id}
                                value={stock.long_name}
                                onClick={() => history.push(`/stocks/${stock[2]}`)}
                            >{stock[0]}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

    )
}

export default SearchBar


