//import logo from './logo.svg';
import tile from './tile.png';
import './App.css';
//import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Home from "./Home.js";
import Board from "./Board.js";
//import PostTXT from './PostTxt';
//import ThreadPage from './Thread';

function Header(props) {
  let wods = 0;
  const family = ["forte","vtc","troika"][Math.floor(Math.random()*3)]; //haha this isCRAZY
  if(Math.random() > .25) {
    wods = Math.floor(Math.random()*360);
  }
  
  console.log(props);

  /*let styleinadvance = {
    //backgroundColor: "#cccc",
    filter: `hue-rotate(${wods}deg)`,
  };*/ //bruh inline styles at Home.js fucked my shit up and i had NO idea :sob:
  const splash = ["just on time", "what planet are you guys from", "give me some junkies to eat!", "i've got this intrinsic... native faith", "bonkumiru", "bruh", "10101 in binary!", "NEW!!!", "v2"];
  const motd = splash[Math.floor(Math.random()*splash.length)];//"(maybe change font)"; //once in nextjs fix this shitdawg LO!

  return (
    <div className="header" style={{filter: `hue-rotate(${wods}deg)`, fontFamily: family}}>
        <img src={tile}/>
        <h1 id="ptitle" style={{"--fsize": props.fsize} }>67.61.21.90</h1>
        <h2 style={{fontSize: "25px", zIndex: 10, position: "relative", "color": "#F1BB96", "textShadow": "#632500 2px 2px"}}>{motd}</h2>
    </div>
  )
}

function App() {
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
  return (<>
  <Board/>
  {/*<BrowserRouter>
    <Routes path="/">
      <Route index element={<Home/>}/>
      <Route path="/b/">
        <Route index element={<Board/>}/>
        <Route path=":id" element={<ThreadPage/>}/>
      </Route>
      <Route path="post/" element={<PostTXT/>}/>
    </Routes>
  </BrowserRouter>*/}
  </>)
}

export {App, Header};