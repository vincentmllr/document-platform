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
            <p>{console.log(this.props.chosenThesis)}</p>
            <p>{this.props.chosenThesis.title}</p>
            <p>{this.props.chosenThesis.author.name}</p>
            <p>{this.props.chosenThesis.university}</p>
            <p>{this.props.chosenThesis.examiner.name}</p>
            <p>{this.props.chosenThesis.abstract}</p>
            <p>{this.props.chosenThesis.author.studyInterests}</p>
            <p>{this.props.chosenThesis.author.mail}</p>
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