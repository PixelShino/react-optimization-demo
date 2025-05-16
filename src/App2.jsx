import { memo, useMemo, useState } from 'react';
import './styles.css';

function createRandomPost() {
  return {
    title: `Random Title ${Math.floor(Math.random() * 10000)}`,
    body: `This is a randomly generated post content with ID: ${Math.floor(Math.random() * 10000)}`,
  };
}

function App({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <header className="header">
        <h1>React Optimization Demo</h1>
      </header>
      
      <main className="main-content">
        <section className="counter-section">
          <h2>Simple Counter Example</h2>
          <p className="count-display">Count: {count}</p>
          <button className="btn primary-btn" onClick={() => setCount(count + 1)}>
            Increase Count
          </button>
          
          <div className="explanation-box">
            <h3>How This Works:</h3>
            <p>
              This demo shows React optimization using <code>memo</code> and <code>useMemo</code>.
              The Archive component contains 30,000 posts but only re-renders when necessary.
            </p>
            <ul className="optimization-list">
              <li>
                <strong>useMemo</strong>: Prevents recreation of the archiveOptions object on every render
              </li>
              <li>
                <strong>memo</strong>: Archive component only re-renders when its props change
              </li>
              <li>
                <strong>useState with function</strong>: Posts array is created only once during initialization
              </li>
            </ul>
          </div>
        </section>
        
        {children}
      </main>
      
      <footer className="footer">
        <div className="footer-links">
          <a>
            <p className='text-center text-gray-400'>&copy; Dmitrii Goldobin</p>
          </a>
          <a
            href='https://github.com/PixelShino'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='text-center text-gray-400'>
              <i className='fab fa-github'></i> GitHub
            </p>
          </a>
          <a
            href='https://t.me/PixelShino'
            target='_blank'
            rel='noopener noreferrer'
          >
            <p className='text-center text-gray-400'>
              <i className='fab fa-telegram'></i> Telegram
            </p>
          </a>
        </div>
      </footer>
    </div>
  );
}

const Archive = memo(function Archive({ archiveOptions }) {
  // Generating 30,000 posts - but only once thanks to useState initialization function
  const [posts] = useState(() =>
    Array.from({ length: 30000 }, () => createRandomPost()),
  );
  const [showArchive, setShowArchive] = useState(archiveOptions.show);

  console.log('Archive component rendered!');

  return (
    <aside className="archive-section">
      <h2>Archive Component {archiveOptions.title}</h2>
      <div className="archive-controls">
        <button className="btn secondary-btn" onClick={() => setShowArchive((s) => !s)}>
          {showArchive ? 'Hide archive posts' : 'Show archive posts'}
        </button>
        <p className="archive-info">This component contains 30,000 posts but only re-renders when necessary</p>
      </div>
      
      {showArchive && (
        <ul className="posts-list">
          {posts.slice(0, 10).map((post, i) => (
            <li key={`post-${i}`} className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </li>
          ))}
          <li className="post-item load-more">
            <p>... and {posts.length - 10} more posts</p>
          </li>
        </ul>
      )}
    </aside>
  );
});

function RootApp() {
  const [showArchive, setShowArchive] = useState(false);

  // Using useMemo to prevent unnecessary recreation of this object
  const archiveOptions = useMemo(
    () => ({
      show: showArchive,
      title: 'Optimization Demo',
    }),
    [showArchive],
  );

  return (
    <App>
      <Archive archiveOptions={archiveOptions} />
    </App>
  );
}

export default RootApp;