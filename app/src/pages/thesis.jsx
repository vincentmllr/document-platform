import { Component } from "react";
import { Header, Navigation, HeroHeader, Footer, CardDeck } from "../components";
import FileSaver from 'file-saver';



class ThesisPage extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <div className="App">
        <header>
          <Navigation />
        </header>
        <body>
          <div>
            <input type="button" className="btn btn-danger" value="Download" onClick={
                ()=> {
                  console.log("Download Button pressed!")
                  FileSaver.saveAs(process.env.PUBLIC_URL + "/data/testpdf.pdf", "Downloaded Thesis from Peer.pdf");
                }
              }/>
          </div>
        </body>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
};

export default ThesisPage;