// Tool to convert string to react.element
// const HtmlToReactParser = require("html-to-react").Parser;
// const htmlToReactParser = new HtmlToReactParser();
import { cloneElement } from 'react';

// import cms from "components/cms/cms";
import index from '../components/_constructor';

export default function returnReactElements(page) {
  let html = [];

  // NEW SYSTEM IN PLACe
  /* Instead of converting to HTML, we just save the element as a set of instructions and pass it back together. While HTML is faster on load time,
  we are running into the issue of components not retaining all of the information on render that makes them dynamic, but by re rendering the compoennt based off of it's
  initial build we are able to cover the scope of what needs to be rendered on fetch */

  for (let i in page) {
    let element = page[i];
    let C = index.COMPONENTS[element.element_name].element;
    C = <C />;
    html.push(cloneElement(C, element.element_props));
  }
  return html;
}
