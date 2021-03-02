import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { remote } from 'electron'
import path from 'path'
import { Button, RadioGroup, RenderIf, Application } from 'react-rainbow-components';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Greetings from './components/Greetings'
import { getAsset } from './PathUtil'
import { KasirView } from './containers/kasir/KasirView'
import { SimpleVerticalNavigation } from './containers/navigation/MainNav'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

render(
  <Application>
    <Router>
      <Switch>
        <Route path="/" component={SimpleVerticalNavigation} />
      </Switch>
    </Router>
  </Application>
  , mainElement)
