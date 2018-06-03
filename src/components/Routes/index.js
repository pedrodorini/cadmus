import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router'

import PrivateRoute from '@components/PrivateRoute'

import Login from '@views/Login'
import Home from '@views/Home'
import CreateBook from '@views/CreateBook'
import Books from '@views/Books'
import Book from '@views/Book'
import Chapter from '@views/Chapter'

class Routes extends Component {
  render () {
    const { isAuthed } = this.props
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/login' component={ Login } />
            <PrivateRoute authed={ isAuthed } path='/new-book' component={ CreateBook } />
            <PrivateRoute authed={ isAuthed } path='/books' component={ Books } />
            <PrivateRoute authed={ isAuthed } path='/book/:book' component={ Book } />
            <PrivateRoute authed={ isAuthed } path='/chapter' component={ Chapter } />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthed: auth.authenticated
})

export default connect(mapStateToProps)(Routes)
