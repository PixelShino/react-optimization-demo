//Example 1

// import React, { useState, memo } from 'react';

// function App() {
//   const [count, setCount] = useState(0);

//   // The function is recreated on every render
//   const handleClick = (post) => {
//     console.log(`You clicked on ${post.title}`);
//   };

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={() => setCount(count + 1)}>Increase Count</button>
//       <PostList handleClick={handleClick} />
//     </div>
//   );
// }

// const PostList = memo(function PostList({ handleClick }) {
//   const posts = Array.from({ length: 5000 }, (_, i) => ({
//     title: `Post ${i}`,
//     body: `This is post number ${i}`,
//   }));

//   console.log('PostList rerendered');

//   return (
//     <ul>
//       {posts.map((post, i) => (
//         <li key={i}>
//           {post.title} - {post.body}
//           <button onClick={() => handleClick(post)}>Click</button>
//         </li>
//       ))}
//     </ul>
//   );
// });

// export default App;

//Example 2

import React, { useState, useCallback, memo } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // Memoizing the handleClick function using useCallback
  const handleClick = useCallback((post) => {
    console.log(`You clicked on ${post.title}`);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <PostList handleClick={handleClick} />
    </div>
  );
}

const PostList = memo(function PostList({ handleClick }) {
  const posts = Array.from({ length: 5000 }, (_, i) => ({
    title: `Post ${i}`,
    body: `This is post number ${i}`,
  }));

  console.log('PostList rerendered');

  return (
    <ul>
      {posts.map((post, i) => (
        <li key={i}>
          {post.title} - {post.body}
          <button onClick={() => handleClick(post)}>Click</button>
        </li>
      ))}
    </ul>
  );
});

export default App;
