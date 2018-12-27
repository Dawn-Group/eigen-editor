import React, { Component } from 'react'
import { insertText, insertBlock } from './plugins'


const image = ['https://new-rank-demo.oss-cn-hangzhou.aliyuncs.com/%E5%88%98%E8%AF%97%E8%AF%97/stickers/s1.gif']

function normalizeSelectedIndex(selectedIndex, max) {
  let index = selectedIndex % max;
  if (index < 0) {
    index += max;
  }
  return index;
}

function getSelect(editorState, text, type) {
  if (type == 'text' && text) {
    return insertText(editorState, text)
  }
  if (type == 'image' && text) {
    let param = {
      type: 'image',
      obj: {
        src: text,
        type: 'image'
      }
    }
    return insertBlock(editorState, param)
  }
  return editorState
}


class Mentions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
    this.getData = this.getData.bind(this)
  }

  getData(type, text) {
    if (type == 'image') {

    } else {

    }
  }

  componentDidMount() {
    if (this.props.type == 'image' && this.props.getTheEmoji) {
      this.props.getTheEmoji(this.props.emojikey).then(res => {
        this.setState({
          people: this.props.fomate(res)
        }, () => {
          this.props.getTheRes(this.state.people)
        })
      })
    } else if (this.props.getTheText && this.props.type == 'text') {
      this.props.getTheText(this.props.textFor ? this.props.textFor.substr(this.props.textFor.length - 200) : '').then(res => {
        this.setState({
          people: this.props.fomate(res)
        }, () => {
          this.props.getTheRes(this.state.people)
        })
      })
    } else {
      this.setState({
        people: []
      }, () => {
        this.props.getTheRes(this.state.people)
      })
    }
  }

  render() {
    let { left, top, selectedIndex, text } = this.props
    const typeaheadStyle = Object.assign({}, styles.typeahead, {
      position: 'absolute',
      left,
      top
    })
    const normalizedIndex = normalizeSelectedIndex(selectedIndex, this.state.people.length);
    return <ul style={typeaheadStyle}>
      {this.state.people.map((item, index) => {
        return (
          <li key={index} style={index === normalizedIndex ? styles.selectedPerson : styles.person}>
            {
              this.props.type == 'text' ?
                <span>{item}</span>
                : <Emoji src={item} />
            }
          </li>
        );
      })}
    </ul>
  }
}


const Emoji = ({ src }) => {
  return <img src={src} />
}


const styles = {
  typeahead: {
    margin: 0,
    padding: 0,
    border: '1px solid #ccc',
    background: 'white',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35)',
    borderRadius: 3,
    listStyleType: 'none',
    maxHeight: '400px',
    overflow: 'scroll',
    zIndex: 400
  },
  person: {
    margin: 0,
    padding: '16px 24px',
  },
  selectedPerson: {
    margin: 0,
    padding: '16px 24px',
    background: 'rgb(225, 78, 78)',
    color: 'white',
  },
  mention: {
    background: 'rgb(225, 78, 78)',
    color: 'white',
  },
};

export {
  Mentions,
  getSelect,
  res
}