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
      manga: 'One-Punch-Man',
      chapterNumber: chapter
    }
    this.mangas = mangas
  }

  renderImage = (chapter, manga) => {
    const res = []
    let page = 1
    while (page < 31) {
      let isError = false
      let str = '' + page
      let pad = '00'
      let ext = 'jpg'
      let ans = pad.substring(0, pad.length - str.length) + str
      try {
        res.push(
          <div className="page">
            <img
              onError={i => {
                if (!isError) {
                  pad = pad + '0'
                  ans = pad.substring(0, pad.length - str.length) + str
                  i.target.src = `https://c.japscan.co/lel/${manga}/${chapter}/${ans}.${ext}`
                  if (pad.length > 3) {
                    i.target.style.display = 'none'
                    if (pad.length > 3 && ext === 'png') {
                      isError = true
                    }
                    ext = 'png'
                    pad = '0'
                  }
                }
              }}
              onLoad={i => {
                i.target.style.display = 'flex'
              }}
              src={`https://c.japscan.co/lel/${manga}/${chapter}/${ans}.jpg`}
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
    return (
      <div className="buttons">
        <select
          value={manga}
          onChange={e => this.setState({ manga: e.target.value })}
        >
          {this.mangas.map(manga => (
            <option key={manga} value={manga}>
              {manga}
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
        <this.Selector chapterNumber={parseInt(chapterNumber)} manga={manga} />
        <div className="content">{tableImage}</div>
        <this.Selector chapterNumber={parseInt(chapterNumber)} manga={manga} />
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
