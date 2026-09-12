import React, { useState } from "react";

function FormExample() {
  const [text, setText] = useState("");
  function handleChange(e) { setText(e.target.value); }
  function handleSubmit(e) {
    e.preventDefault();
    alert(`You submitted: ${text}`);
    setText("");
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter text"
        className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
      />
      <button type="submit" className="text-sm bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-black">
        Submit
      </button>
    </form>
  );
}

export default FormExample;
