import React, { useState } from "react";

function Header() {
  return (
    <header style={{ background: "#007bff", padding: "15px", textAlign: "center", color: "#fff" }}>
      <h1>Library Management</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#f5f5f5", padding: "10px", textAlign: "center" }}>
      <p>© {new Date().getFullYear()} My Library</p>
    </footer>
  );
}

export default function LibraryManagement() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const addBook = () => {
    if (newTitle && newAuthor) {
      setBooks([...books, { title: newTitle, author: newAuthor }]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "20px auto" }}>
      <Header />

      <main style={{ padding: "15px" }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        {/* Add Book */}
        <div style={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Book title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
          <input
            type="text"
            placeholder="Author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            style={{ flex: 1, padding: "8px" }}
          />
          <button onClick={addBook} style={{ padding: "8px 12px" }}>
            Add
          </button>
        </div>

        {/* Book List */}
        {filteredBooks.map((book, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <b>{book.title}</b> — {book.author}
            </span>
            <button onClick={() => removeBook(index)} style={{ padding: "5px 10px" }}>
              Remove
            </button>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}
