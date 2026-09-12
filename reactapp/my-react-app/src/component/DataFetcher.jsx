import React, { useState, useEffect } from "react";

function DataFetcher() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);
  }, []);
  if (!user) return <p className="text-sm text-zinc-500">กำลังโหลด...</p>;
  return (
    <div>
      <p className="text-sm font-medium">{user.name}</p>
      <p className="text-sm text-zinc-600">{user.email}</p>
    </div>
  );
}

export default DataFetcher;
