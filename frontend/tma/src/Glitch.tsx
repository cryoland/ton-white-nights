import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Glitch = () => {
    let { id } = useParams();

    useEffect(() => {
        const jquery = document.createElement('script');
        jquery.src = 'https://code.jquery.com/jquery-2.2.4.min.js';
        jquery.integrity = "sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=";
        jquery.crossOrigin = "anonymous";
        document.body.appendChild(jquery);

        const t1 = setTimeout(() => {
            const glitch = document.createElement('script');
            glitch.src = 'mgGlitch.min.js';
            document.body.appendChild(glitch);
        }, 200);

        const t2 = setTimeout(() => {
            const init = document.createElement('script');
            init.src = 'run-glitch.js';
            document.body.appendChild(init);
        }, 400);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        }
    });

    const rawHTML = `
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,900,300' rel='stylesheet' type='text/css'>
    <!-- Demo styles -->
    <style>
        *, *:after, *:before {-moz-box-sizing:border-box; box-sizing:border-box;}
        body, html {position: relative; height: 100%; width: 100%; overflow: hidden;}
        body { background-color: #fff; margin: 0;}
        h1 {position: absolute; top:0; left :0; z-index: 10; width: 100%; text-align: center; font-family: 'Roboto', Arial, Helvetica, sans-serif; margin-top: 30px; font-size: 16px;  color: #f54955; }
        p { position: absolute; bottom:0; left :0; z-index: 10; width: 100%; text-align: center; font-family: 'Roboto', Arial, Helvetica, sans-serif; color: #999999;  margin-bottom: 30px; font-size: 14px;}
        p a {color: #f54955; text-decoration: none; outline: none;}
        
        .container {position: relative; margin: 80px; background-color: #fff; width: calc(100% - 160px); height: calc(100% - 160px); overflow: hidden; }

        /* glitch elem must have absolute position */
        .glitch-img {position: absolute; width : 100%; height : 100%; top: 0 ; left : 0; background-position:center;  -moz-background-size:cover;-o-background-size:cover;-webkit-background-size:cover;background-size:cover;
        } 
        
    </style>
    <div class="container0">
    <div class="glitch-img" style="background: url('${id}.png') no-repeat center center, black;
                                   backgrouod-size: 75vh;"></div>
   </div>
    `;

    return <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>;
}