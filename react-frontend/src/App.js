import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles")
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error(err));
  }, []);

  const originals = articles.filter(a => a.version === "original");
  const updated = articles.filter(a => a.version === "updated");

  return (
    <div className="container">
      <h1>BeyondChats Articles</h1>

      <section>
        <h2>Original Articles</h2>
        <div className="grid">
          {originals.map(article => (
            <div className="card" key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content.slice(0, 200)}...</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Updated Articles (AI Generated)</h2>
        <div className="grid">
          {updated.map(article => (
            <div className="card updated" key={article.id}>
              <h3>{article.title}</h3>
              <p>{article.content.slice(0, 200)}...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
