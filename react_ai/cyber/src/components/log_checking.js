
import React, { useState } from "react";

const Traffic = () => {
  const [userInput, setUserInput] = useState("");

  const sanitizeInput = (input) => {
    const blacklist = [/(\b(SELECT|UNION|DROP|INSERT|<script>)\b)/gi];
    return !blacklist.some((pattern) => pattern.test(input));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sanitizeInput(userInput)) {
      alert("Malicious input detected.");
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput }),
      });

      if (!response.ok) throw new Error("Request failed");
      alert("Submitted successfully");
    } catch (err) {
      alert("Error submitting data");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter input"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Traffic;