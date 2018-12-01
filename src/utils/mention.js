import React, { Component } from 'react'
import { insertText } from './plugins'


function normalizeSelectedIndex(selectedIndex, max) {
  let index = selectedIndex % max;
  if (index < 0) {
    index += max;
  }
  return index;
}

function getSelect(editorState, text) {
  if (text) {
    return insertText(editorState, text)
  } else {
    return editorState
  }
}


class Mentions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      people: []
    }
    this.filterPeople = this.filterPeople.bind(this)
  }



  componentDidMount() {
    this.props.getTheText(this.props.textFor ? this.props.textFor.substr(this.props.textFor.length - 200) : '').then(res => {
      if (this.props.fomate) {
        res = this.props.fomate(res)
      }
      this.setState({
        people: res
      }, () => {
        this.props.getTheRes(this.state.people)
      })
    })
  }

  filterPeople(query) {
    return this.state.people.filter(person => {
      if (query) {
        return person
      }
    });
  }

  render() {
    let { left, top, selectedIndex, text } = this.props
    const typeaheadStyle = Object.assign({}, styles.typeahead, {
      position: 'absolute',
      left,
      top
    })
    const filteredPeople = this.filterPeople(text);
    const normalizedIndex = normalizeSelectedIndex(selectedIndex, filteredPeople.length);
    return <ul style={typeaheadStyle}>
      {filteredPeople.map((item, index) => {
        return (
          <li key={index} style={index === normalizedIndex ? styles.selectedPerson : styles.person}>
            {item}
          </li>
        );
      })}
    </ul>
  }
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