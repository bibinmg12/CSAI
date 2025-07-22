import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const InsertBreach = () => {
  const [emails, setEmails] = useState("");
  const [cards, setCards] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        emails: emails.split(",").map((e) => e.trim()),
        cards: cards.split(",").map((c) => c.trim()),
      };

      await axios.post("http://localhost:8000/dark_web/", payload);

      alert("✅ Breach data inserted successfully.");
      setEmails("");
      setCards("");
    } catch (error) {
      alert("❌ Failed to insert data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <>
        <Layout>
    <div>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f9fafc;
        }

        .fullpage-container {
          padding: 50px 10vw;
        }

        h2 {
          font-size: 32px;
          color: #222;
          margin-bottom: 40px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 16px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-bottom: 30px;
          background: white;
        }

        button {
          padding: 16px 24px;
          background-color: #007bff;
          color: white;
          font-size: 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background-color: #0056b3;
        }

        button:disabled {
          background-color: #a0a0a0;
          cursor: not-allowed;
        }
      `}</style>

      <div className="fullpage-container">
        <h2>Insert Breach Record</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Emails (comma-separated)</label>
            <input
              type="text"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              placeholder="e.g. alice@mail.com, bob@mail.com"
              required
            />
          </div>

          <div>
            <label>Credit Card Numbers (comma-separated)</label>
            <input
              type="text"
              value={cards}
              onChange={(e) => setCards(e.target.value)}
              placeholder="e.g. 1234567812345678, 8765432187654321"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Insert Breach"}
          </button>
        </form>
      </div>
    </div>
    </Layout>
        </>
  );
};

export default InsertBreach;
