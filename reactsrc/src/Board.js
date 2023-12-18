import {Header} from "./App.js";
import "./Board.css";
import PostTXT from "./PostTxt.js";
import tile from "./tile.png";

import {useRef,createContext,useContext,useState, useEffect, createRef} from 'react';
import React from 'react';

//import { StringToJSX } from "./StringJSX.js";

//const timestamp = useRef(null);//__sveltets_2_nonNullable);

const context = createContext();

function Embedable(props) {
    let [embed, setEmbed] = useState(false);

    let code = props.href.split("/").at(-1).replace("watch?v=", "");

    return (<>
        <a href={props.href}>{props.href.replace("https://","").replace("www.","")}</a> [<button onClick={() => setEmbed(!embed)}>Embed</button>]
        {embed ? 
            <iframe style={{display: "block", marginTop: "10px"}} width="560" height="315" src={"https://www.youtube.com/embed/"+code} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        : null}
    </>);
}

//https://github.com/qntm/base2048

function Reply(props) {
    /*let embed = props.children.includes("<Embedable>");
    let finalobj;
    if(embed && props.timestamp == 0) {
        finalobj = props.children;
        let positions = [];
        let i = 0;
        function FUCK(lastPosition) {
            if(lastPosition == 0) {
                i = lastPosition;
            }
            let v = finalobj.indexOf("<Embedable>", lastPosition+1);
            if(v!=-1) {
                positions[i] = v;
                FUCK(v);
            }
        }
        FUCK(0);
        //console.log(positions);
        for(let i = 0; i < positions.length; i++) {
            FUCK(0);
            let url = finalobj.substring(positions[i]+"<Embedable>".length).split("</Embedable>")[0];
            console.log(url);
            finalobj = finalobj.replace("<Embedable>"+url+"</Embedable>", `<Embedable href={${url}} />`);
            console.log(finalobj);
        }
        //console.log(finalobj);
    }*/

    // const regex = props.children.match(/<Embedable href="[\s\S]+?"\\>/g);///<Embedable href="[\s\S]+?"\\>/g.exec(props.children);//regexr.com/7ijq0
    // //let jsx = props.children;
    // let shit = [];
    // //console.log(regex, props.children);
    // // if(!regex || regex.length != 2) {
    // //     return (<p>NIGGER</p>);
    // // }
    // if(regex) {
    //     //regex returning 2 for no reason? string has only 1
    //     //alright alright my retarded solution might just have to be getting rid of duplicates (no real regex change because f allthat)
    //     //console.log(regex, regex.length);
    //     for(let i = 0; i < regex.length; i++) {
    //         let s;// = jsx.split(regex[i]);
    //         if(i == 0) {
    //             s = props.children.split(regex[i]);
    //             shit.push(s[0]);
    //             shit.push(s[1]); //this doesn't seem right
    //             //jsx = s.join("");
    //         }else {
    //             s = shit[i].split(regex[i]);
    //             shit[i] = s[0];
    //             shit[i+1] = s[1];
    //         }
    //         console.log(s, shit);//, jsx);
    //     }
    //     //console.log(jsx, shit);
    //     //this wouldn't be a problem in HTML slots fuck this shit DAWG how should i go about doing this CORRECTLY in react :(
    // }
    
    return (<>
        <Message style={{backgroundColor: "rgb(255 178 127)", boxShadow: "#FF9046 2px 2px 6px 0px", display: "inline-block", padding: "10px", marginBottom: "10px"}} reply=">>" {...props}>
            {/*<span style={{marginLeft: "20px", marginTop: "20px", display: "block"}}>*/}
                {/*<StringToJSX domString={props.children}/>*/}
                {/*embed ? finalobj : props.children*/}
                {/*!regex ? props.children : <>
                    {shit.map(function(str, i) {
                        //console.log(str, i, "leit it go let it ru ru ur go");
                        if(i == 0) {
                            return str;
                        }else if(regex[i-1]){
                            //console.log(regex[i-1]);
                            return <><Embedable href={regex[i-1].replace("<Embedable href=\"","").replace("\"\\>", "")}/>{str}</>
                        }else {
                            //return str;
                        }
                    })}
                </>*/}
                {props.children}
            {/*</span>*/}
        </Message>
        <br/>
    </>);
}

function Message(props) {
    const timestamp = useContext(context).value;
    const pTXT = useContext(context).value1;

    let date = new Date(props.timestamp);

    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return /*'approximately ' + */Math.floor(elapsed/msPerDay) + ' days ago*';   
        }
    
        else if (elapsed < msPerYear) {
            return /*'approximately ' + */Math.floor(elapsed/msPerMonth) + ' months ago*';   
        }
    
        else {
            return /*'approximately ' + */Math.floor(elapsed/msPerYear ) + ' years ago*';   
        }
    }

    function mover(event) {
        let thus = event.target.getBoundingClientRect();
        console.log(thus);
        timestamp.current.style.display = "block";
        timestamp.current.style.top = `${thus.y+document.documentElement.scrollTop-40}px`;
        timestamp.current.style.left = `${thus.x+(thus.width/3)}px`;
        timestamp.current.children[0].children[0].innerHTML = timeDifference(Date.now(), date.getTime());
    }

    function imgclick(event) {
        event.preventDefault();
        if(event.target.style.width == "initial") {
            event.target.style.width = "250px"; //predicted size
            event.target.style.height = "250px";
        }else {
            event.target.style.width = "initial";
            event.target.style.height = "initial";    
        }
    }

    let dmy = date.toLocaleString("en-us", {dateStyle: "short"});
    let time = date.toLocaleString("en-us", {timeStyle: "medium"});
    let day = date.toLocaleString("en-us", {weekday: "short"});

            //wow this is great i gotta keep thinking about ternary alternatives
    const IMAGEOBJ = props.file && <a href={`/${props.timestamp}.${props.file.link}`} onClick={imgclick}><img src={`/${props.timestamp}.${props.file.link}`} width="250" height="250"/></a>;

    let chirrin = props.children.toString();
    if(chirrin == []+{}) {
        chirrin = props.children[0].props.children.toString();
    }
    //console.log(chirrin);
    //console.log(chirrin != []+{}? undefined : props.children);
    const regex = chirrin.match(/<Embedable href="[\s\S]+?"\\>/g);///<Embedable href="[\s\S]+?"\\>/g.exec(props.children);//regexr.com/7ijq0
    let shit = [];
    //let jsx = props.children;
    console.log(chirrin, regex);

    if(regex) {
        for(let i = 0; i < regex.length; i++) {
            let s;// = jsx.split(regex[i]);
            if(i == 0) {
                s = chirrin.split(regex[i]);
                shit.push(s[0]);
                shit.push(s[1]);
            }else {
                s = shit[i].split(regex[i]);
                shit[i] = s[0];
                shit[i+1] = s[1];
            }
            //console.log(s, shit);
        }
    }

    function processchirrin() {
        if(regex) {
            return shit.map(function(str, i) {
                //console.log(str, i, "leit it go let it ru ru ur go");
                if(i == 0) {
                    return str;
                }else if(regex[i-1]){
                    //console.log(regex[i-1]);
                    return <><Embedable href={regex[i-1].replace("<Embedable href=\"","").replace("\"\\>", "")}/>{str}</>
                }else {
                    //return str;
                }
            });
        }else {
            return props.children;
        }
    }

    return (<>
        {props.file && !props.reply ? IMAGEOBJ : null}
        <div style={{marginLeft: "20px", ...props.style}}>
            {props.reply}
            <input type="checkbox"/>
            {props.subject ? <span style={{color: "#cc1105", fontWeight: "bold"}}>    {props.subject}    </span> : null}
            <span style={{fontWeight: "bold", color: "darkgreen"}}>    Anonymous    </span>
            <span onMouseOver={mover} onMouseOut={() => timestamp.current.style.display = "none"}> {/*08/12/23 (Sat)01:05:32*/}{`${dmy} (${day})${time}`} </span>
            {/*<a href={"/b/"+props.timestamp} title="Link to this post">No.</a><a title="Reply to this post" href="javascript:void(0);" onClick={() => {pTXT.current.setGoTime(props.timestamp)}}>{props.timestamp} </a>*/}
            <a href={"/b/"+props.timestamp} title="Link/Reply to this post">No.{props.timestamp} </a>
            {/*<span> [<button onClick={() => {pTXT.current.setGoTime(props.timestamp)}}>Reply</button>]</span>*/}
            [<a href={"/b/"+props.timestamp} onClick={(event) => {event.preventDefault(); pTXT.current.setGoTime(props.timestamp)}}>Reply</a>]
            <br/>
            {props.reply ? <>
                {props.file ? 
                <div style={{display: "flex"}}>
                    {IMAGEOBJ}
                    {/*<Embedable href="https://www.youtube.com/watch?v=8rr83zwzlOA"/>*/}
                    {processchirrin()}
                </div> : <span style={{marginLeft: "20px", marginTop: "20px", display: "block", whiteSpace: "pre-line"}}>{processchirrin()}</span>}
                </>
            
            : <div style={{marginTop: "10px", whiteSpace: "pre-line"}}>{processchirrin()}</div>}
            {/*<div style={{marginTop: "10px"}}>
                {props.children}
            </div>*/}
            
            {/*props.children*/}
        </div>
    </>)
}

function Post(props) {
    /*return (
        <p>message</p>
    );*/

    //https://boards.4chan.org/r9k/thread/74365659#p74365659 (lol)

    /*const content = React.Children.toArray(props.children).filter((child, i) => {
        return child.type == "div";
    });*/
    const content = [];
    const replies = [];

    React.Children.toArray(props.children).forEach((child) => {
        if(child.type == "div") {
            //console.log(child, child.children, child.props.children);
            content.push(child);
        }else {
            replies.push(child);
        }
    });

    return (<>
        <div>
            {props.file ? <p style={{margin: 0}}>File: <a href={`/${props.timestamp}.${props.file.link}`}>{props.file.name}</a> ({props.file.size} KB, {props.file.dim})</p> : null}
            <div style={{display: "flex", flexDirection: "row", marginLeft: "20px"}}>
                <Message {...props}>
                    {content}
                </Message>
            </div>
        </div>
        {replies}
        <hr/>
    </>);
}

function Board() {
    const timestamp = useRef(null);
    const pTXT = useRef(null);//useRef(null);

    let [loading, setLoading] = useState(true);

    const id = document.location.pathname.replace("/b/","");

    console.log(id);

    let action = id ? "reply" : "post";
    const throbber = Math.round(Math.random()) ? "/loading1.gif" : "/throbber_04_06.gif";

    useEffect(() => {
        //https://www.youtube.com/watch?v=KPUPVXKRvfE
        fetch(/*`http://192.168.0.121:80*/`/b/data/${id || ""}`).then(res => res.json().then(j => {
            json.current = j;
            console.log(json.current.posts);
            setLoading(false);
            console.warn("unfortunately and accidently redrawing page (and updating header twice) because im using state");
            //setLoading(false);
            /*for(let i = 0; i < json.posts.length; i++) {
                const post = json.posts[i];

            }*/
        }));
    }, [])

    let json = useRef(undefined);// = await (await fetch("localhost:80/board.json")).json();
    //let content;

    

    return (<>
        <Header fsize="75px"/>

        <div ref={timestamp} style={{position: "absolute", top: 0, left: 0, backgroundColor: "black", color: "white", padding: 5, userSelect: "none"}}>
            <div style={{position: "relative"}}>
                <span style={{display: "block"}}>12 minutes ago</span>
                <span style={{position: "absolute", top: "20px", left: "50%", color: "black", transform: "translateX(-50%)"}}>▼</span>
            </div>
        </div>

        <PostTXT ref={pTXT}/>

        <main id="main">
            <hr/>
            <h1 style={{textAlign: "center"}}>
                /b/ - Random
                {/*first time ever using javascript:void();*/}
                <br/>
                [<button style={{fontSize: ".75em"}} onClick={() => pTXT.current.setGoTime(id || "post")}><a href="javascript:void(0);">{action[0].toUpperCase()+action.substring(1)}</a></button>]
            </h1>
            <hr/>
            <context.Provider value={{value: timestamp, value1: pTXT}}>
                {/* post json: {file:{name:"niggerpanther.png", link:"329542525.png", size: 200, dim: "500x500"}, timestamp:329542525000, content: "GRAPE LIST", replies: [{timestamp: 1690000000000, content: "THIS TIME MAYBE I'LL BE HERE fuck this SPONGEBOB and i get bleach on my PATRICK"}]} (COULD USE naturalheight but idk) */}
                
                {/**/}

                {loading ? <img src={throbber} width="200" style={{margin: "auto", display: "block"}}/> : <>
                    {json.current.posts.map((post, i) => 
                        <Post file={post.file} timestamp={post.timestamp} key={i} subject={post.subject}>
                            {/*<div style={{marginTop: "10px", whiteSpace: "pre-line"}}>
                                {post.content}
                    </div>*/}
                            <div>
                                {post.content}
                            </div>
                            {post.replies.map((reply, j) => 
                                <Reply key={j} file={reply.file/* || null *//*lol and to think i was about to use a ternary statement (HAH)*/} timestamp={reply.timestamp}>
                                    {/*reply.content.includes("<Embedable>") ? reply.content.split("<Embedable>")[0]+(<Embedable href={reply.content.split("<Embedable>")[1].split("</Embedable>")[0]}/>)+reply.content.split("</Embedable>")[1] : reply.content*/}
                                    {reply.content}
                                </Reply>
                            )}
                        </Post>
                    )}
                </>}
                
                {/*
                <Message>

                </Message>*/
                }
            </context.Provider>
        </main>
    </>);
}

/*
<Post file={{name: "niggerpanther.png", link:"329542525.png",size: 200, dim: "500x500"}} timestamp={329542525000}>
                    <div style={{marginTop: "10px"}}>
                        GRAPE LIST
                    </div>
                    <Reply timestamp={1690000000000}>
                        THIS TIME MAYBE I'LL BE HERE
                        fuck this SPONGEBOB and i get bleach on my PATRICK
                    </Reply>
                    <Reply timestamp={1691950000000}>
                        OP you need this <Embedable href="https://www.youtube.com/watch?v=vecSVX1QYbQ"/>{/*<a href="https://www.youtube.com/watch?v=vecSVX1QYbQ">youtube.com/watch?v=vecSVX1QYbQ</a> [Embed]*//*}
                        </Reply>
                        <Reply timestamp={1691919000000}>
                            OP you need this <Embedable href="https://youtu.be/qKwjJ1S3Cvs"/>{/*<Embedable href="https://youtu.be/vecSVX1QYbQ"></Embedable>*//*}
                        </Reply>
                        {/* "replies":[{"file":{"name":"IMG_4928.jpg", "link": "1698100000.png", "size": 5400, "dim": "3840x2160"}, "timestamp":1698100000000, "content":""take a look yall: IMG_4928.jpg" &lt; OP"}]*//*}
                        <Reply file={{name: "IMG_4928.jpg", link: "1698100000.png", size: 5400, dim: "3840x2160"}} timestamp={1698100000000}>
                            "take a look yall: IMG_4928.jpg" &lt; OP
                        </Reply>
                    </Post>
*/

export default Board;//{Board, Post, Reply};