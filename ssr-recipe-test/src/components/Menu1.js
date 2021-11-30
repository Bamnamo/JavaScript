import React from "react";
import {Link} from "react-router-dom";

const Menu1 = () => {
  return (
      <ul>
        <li>
          <Link to="/red">Red</Link>
        </li>
        <li>
          <Link to="/blue">blue</Link>
        </li>
      </ul>
  )
}
export default  Menu1;