import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import "./PostTxt.css";

export default forwardRef((props, ref) => {//function PostTXT() {
    const [goTime, setGoTime] = useState(false);

    useImperativeHandle(ref, () => ({
        setGoTime
    }));

    const subject = useRef(null);
    const content = useRef(null);
    const file = useRef(null);

    const [image, setImage] = useState(false);

    const img = useRef(null);

    function submit(event) {
        event.preventDefault();
        //fetch("192.168.0.121:80/b/data/", {method: "POST", body: {file: }});
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/b/data");//"http://192.168.0.121:80/b/data/");
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                console.log(xhr.status);
                if(xhr.status == 200) {
                    document.location.reload();
                    //document.location.href = "/b/";
                }
            }
        }
        
        let fd = new FormData();
        fd.set("subject", subject.current.value);
        let rawr = content.current.value; //im telling you i accidently typed rawr instead of rawc (raw cONTENT)
        rawr = rawr.replace(/si=.{16}&/g, "").replace(/\?si=.{16}/g, ""); //without this line if you copy the link with the share button the ?si=(some random 16[a-zA-Z0-9] code kinda thing) will dangle on the outside of the <Embedable> because im not looking for all that
        rawr = rawr.replace(/https:\/\/youtu.be\/.{11}(?:\?t=(?:\d+)+?)?/g, `<Embedable href="$&"\\>`);
        rawr = rawr.replace(/https:\/\/www.youtube.com\/watch\?v=.{11}/g, `<Embedable href="$&"\\>`); //regexr.com/7ip8o
        fd.set("content", rawr);
        if(goTime != "post") {
            fd.set("reply", goTime);
        }
        
        //https://youtu.be/gocwRvLhDf8 GYATT 73 quintillion is insane

        if(file.current.files[0]) {
            fd.set("file", file.current.files[0]);
            fd.set("dim", `${img.current.naturalWidth}x${img.current.naturalHeight}`);
        }

        xhr.send(fd);
        //https://www.youtube.com/watch?v=HfEvJek-cS4
    }

    function changeimag() {
        if(file.current.files[0]) {
            //let link = URL.createObjectURL(file.current.files[0]);
            setImage(URL.createObjectURL(file.current.files[0]));
        }
    }

    return (<>
            <div style={{/*marginLeft:"auto", marginRight: "auto",*//*margin: "auto", inset: 0,*/bottom:0,right:0, position: "fixed", border: "1px solid #ff9046", backgroundColor: "white", zIndex:1000}}>
            <h1 style={{display: "inline-block"}}>new {goTime != "post" ? "reply to >>"+goTime : "post"}</h1>
            <button style={{float: "right", fontSize: "2em", color: "red"}} onClick={() => {setGoTime(false)}}>X</button>
        <form onSubmit={submit} style={{display: goTime ? "initial" : "none"}}>
            <table>
                <tbody>
                    <tr>
                        <td style={{textDecoration: goTime != "post" ? "line-through" : "none"}}>Subject</td>
                        <td><input ref={subject} style={{width: "100%", boxSizing: "border-box"}} disabled={goTime != "post"}/></td>
                        <td><button>Post</button></td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td><textarea ref={content} style={{width: "400px", height: "200px", boxSizing: "border-box"}}></textarea></td>
                    </tr>
                    <tr>
                        <td>File</td>
                        <td><input ref={file} type="file" style={{width: "100%", boxSizing: "border-box"}} onChange={changeimag} /></td>
                        {image ?
                            <td>
                                <img src={image} ref={img} onLoad={(event) => {URL.revokeObjectURL(event.target.src)}}/>
                            </td>
                         : null}
                    </tr>
                </tbody>
            </table>
        </form>

            </div>
    </>);
});