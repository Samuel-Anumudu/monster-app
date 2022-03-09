import { Component } from 'react'
import './App.css'
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

class App extends Component {
  constructor() {
    super()

    this.state = {
      monsters: [],
    }
  }

  /*
  // Get NASA API
  async componentDidMount() {
    const apiKey = '09wuT1wtxbCIvrCTQyR3cZ7Sg2xc3YpDIVixeTuc'
    const count = 10
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`
    )
    const data = await response.json()
  }
  */

  async componentDidMount() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    this.setState(() => {
      return {
        monsters: data,
        searchField: '',
      }
    })
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase()
    this.setState(() => {
      return {
        searchField,
      }
    })
  }

  render() {
    const { monsters, searchField } = this.state
    const { onSearchChange } = this

    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField)
    })

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          className="monsters-search-box"
        />
        <CardList monsters={filteredMonster} />
      </div>
    )
  }
}

export default App
