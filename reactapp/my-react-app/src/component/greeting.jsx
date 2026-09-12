import React from "react";

function Greeting(props) {
  return (
    <div>
      <h3 className="text-sm font-semibold">Hello, {props.name}!</h3>
      <p className="text-sm text-zinc-600 mt-1">คุณมี {props.messages} ข้อความ</p>
    </div>
  );
}

export default Greeting;
