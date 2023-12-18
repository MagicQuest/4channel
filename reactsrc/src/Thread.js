import { useRef } from "react";
import { Header } from "./App";
import Board from "./Board.js";

export default function ThreadPage() {
    const id = document.location.pathname.replace("/b/","");
    //well if i was actually using next js or something like that with an external database and shit (which maybe i should research firebase)
    //i could just do {id} = useParams()
    return (<Board id={id}/>);
}