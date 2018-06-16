import React, { Component } from 'react'
import { Container, Header, InnerContainer, TextArea, ButtonContainer } from './styles'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'

import { connect } from 'react-redux'
import { Creators } from '@redux/actions'

import Sidebar from '@views/Sidebar'

class Chapter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: '',
      text: '',
      errorIndex: false,
      errorText: false
    }
  }

  componentWillMount () {
    const { params: { chapterId } } = this.props.match
    this.props.attemptGetChapter(chapterId)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      ...state,
      index: nextProps.chapter.index,
      text: nextProps.chapter.text
    }))
  }

  capitalizeFirstLetter = (value) => 
    value.charAt(0).toUpperCase() + value.slice(1)

  handleInputChange = ({ target: { value, name } }) => {
    const error = `error${this.capitalizeFirstLetter(name)}`
    this.setState(state => ({...state, [name]: value, [error]: false }))
  }

  handleSubmit = () => {
    const { book } = this.props
    const { index, text } = this.state
    const { bookId } = this.props.match.params
    let valid = true

    if (index.length < 1) {
      valid = false
      this.setState(state => ({...state, errorIndex: true }))
    }

    if (text.length < 50) {
      valid = false
      this.setState(state => ({...state, errorText: true }))
    }

    if (valid) {
      const newChapter = {
        bookId,
        text: text,
        index: parseInt(index)
      }
      this.props.attemptAddChapter(newChapter, this.props.history)
    }

  }

  render () {
    const { index, text, errorText, errorIndex } = this.state
    return (
      <div>
        <Sidebar/>
        <Container>
          <Header>Escrevendo capítulo...</Header>
          <InnerContainer>
          <Grid container spacing={ 24 }> 
              <Grid item xs={ 12 }>
                <TextField
                  type='number'
                  name='index'
                  value={ index }
                  label='Numero do capítulo'
                  fullWidth 
                  onChange={ this.handleInputChange }
                  error={ errorIndex }
                  helperText={ errorIndex ? 'Obrigatório!' : '' }
                />
              </Grid>
            </Grid>
            <Grid container spacing={ 24 }>
              <Grid item xs={ 12 }>
                <TextArea
                  error={ errorText }
                  name='text'
                  value={ text }
                  rows='20'
                  placeholder='Escreva aqui sua história...'
                  onChange={ this.handleInputChange }  
                >
                </TextArea>
              </Grid>
            </Grid>
            <ButtonContainer>
              <Button type='submit' className='btn-custom' variant='flat' onClick={ this.handleSubmit }>Salvar</Button>
              <Button className='btn-custom' variant='flat'>Cancelar</Button>
          </ButtonContainer>
          </InnerContainer>
        </Container>
      </div>
    )
  }
}
const mapSateToProps = ({ user, book }) => ({
  user: user,
  chapter: book.chapter
})
const mapDispatchToProps = dispatch => ({
  attemptGetChapter: (chapterId) => dispatch(Creators.getChapterRequest(chapterId))
})
export default connect(mapSateToProps, mapDispatchToProps)(Chapter)