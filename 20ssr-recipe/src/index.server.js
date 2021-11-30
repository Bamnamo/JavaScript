import React from "react";
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(
    <div>Hello Server Side Rending!!</div>
)

console.log(html);
