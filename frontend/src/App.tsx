import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import './App.css';
import Game from "./components/Game/Game"
import NameInput from "./components/NameInput/NameInput"
import NavigationScreen from "./components/NavigationScreen/NavigationScreen"
import OponentWaiting from "./components/OponentWaiting/OponentWaiting"
import { connect } from "./api/index"

class App extends React.Component<Readonly<any>, Readonly<any>> {

  constructor(props: any) {
    super(props)

    this.state = {
      connectionDialogOpen: false,
      Status: "login",
    }

    this.handleConnectionReset = this.handleConnectionReset.bind(this)
  }

  componentDidMount() {
    this.connectToNetwork()
  }

  handleConnectionReset() {
    this.connectToNetwork()
    this.setState({
      connectionDialogOpen: false,
      Status: "login"
    })
  }

  connectToNetwork() {
    connect((msg: any) => {
      let state = JSON.parse(msg.data)
      this.setState(state)
    },
    () => {
      this.setState({connectionDialogOpen: true})
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.Status === "login" &&
          <NameInput />
        }

        {this.state.Status === "navigation" &&
          <NavigationScreen players={this.state.Players} />
        }

        {this.state.Status === "waiting" &&
          <OponentWaiting/>
        }

        {this.state.Status === "game" &&
          <Game player={this.state.Color} nextMove={this.state.NextMove} pieces={this.state.Pieces} messages={this.state.Messages} />
        }
        <Dialog open={this.state.connectionDialogOpen} onClose={this.handleConnectionReset}>
            <DialogTitle id="alert-dialog-title">{"Connection error"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Unable to connect to the backend server. Connection will be restarted.
              </DialogContentText>
              <DialogActions>
                <Button onClick={this.handleConnectionReset}>Restart connection</Button>
              </DialogActions>              
            </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default App;
