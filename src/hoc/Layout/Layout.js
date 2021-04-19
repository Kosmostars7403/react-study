import React from 'react'
import classes from './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from 'react-redux'


class Layout extends React.Component {
  state = {
    menuOpen: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menuOpen}
          onClose={() => this.setState({menuOpen: false})}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menuOpen}
        />


        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }

}
export default connect(mapStateToProps)(Layout)
