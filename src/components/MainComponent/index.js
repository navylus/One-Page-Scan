import React from 'react'
import './style.css'
import { mangas } from './manga'

class MainComponent extends React.Component {
  constructor(props) {
    super(props)
    const chapter = parseInt(
      window.location.href.split('/')[
        window.location.href.split('/').length - 1
      ]
    )
    this.state = {
      manga: 'one-piece',
      chapterNumber: chapter
    }
    this.mangas = mangas
  }

  renderImage = (chapter, manga) => {
    const res = []
    let page = 0
    while (page < 31) {
      let str = '' + page
      let pad = '00'
      let ans = pad.substring(0, pad.length - str.length) + str
      try {
        res.push(
          <div className="page">
            <img
              src={`http://lelscanv.com/mangas/${manga}/${chapter}/${ans}.jpg`}
              alt="page"
            ></img>
          </div>
        )
        page += 1
      } catch (e) {
        return
      }
    }
    return res
  }

  Selector = ({ chapterNumber, manga }) => {
    console.log({ chapterNumber, manga })
    return (
      <div className="buttons">
        <select
          value={manga}
          onChange={e => this.setState({ manga: e.target.value })}
        >
          {this.mangas.map(manga => (
            <option key={manga} value={manga.toLowerCase()}>
              {manga.toLowerCase()}
            </option>
          ))}
        </select>
        <button
          onClick={() => this.setState({ chapterNumber: (chapterNumber -= 1) })}
        >
          prev
        </button>
        <input
          type="text"
          value={chapterNumber}
          onChange={e => {
            this.setState({ chapterNumber: e.target.value })
          }}
        ></input>
        <button
          onClick={() => this.setState({ chapterNumber: (chapterNumber += 1) })}
        >
          next
        </button>
      </div>
    )
  }

  render() {
    let { chapterNumber, manga } = this.state
    const tableImage = this.renderImage(chapterNumber, manga)
    return (
      <div className="container">
        <this.Selector chapterNumber={chapterNumber} manga={manga} />
        <div className="content">{tableImage}</div>
        <this.Selector chapterNumber={chapterNumber} manga={manga} />
        <p
          style={{
            fontSize: '20px',
            fontStyle: 'underline',
            cursor: 'pointer',
            color: 'white'
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          Go to top
        </p>
      </div>
    )
  }
}

export default MainComponent
