import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p className="text-sm font-medium">Counter: {count}</p>
      <button
        className="mt-2 text-sm border border-zinc-200 bg-white px-3 py-1.5 rounded-md hover:bg-zinc-50"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}

export default Counter;
