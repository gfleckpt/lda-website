
import * as React from "react";
const Dot = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#600"
      d="M12 6A6 6 0 1 1 0 6a6 6 0 0 1 12 0M1.857 6a4.143 4.143 0 1 0 8.286 0 4.143 4.143 0 0 0-8.286 0"
    />
  </svg>
);
export default Dot;