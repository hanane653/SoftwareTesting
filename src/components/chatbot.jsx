{/*
import React, { useState } from 'react';
import axios from 'axios';

const ChatbotRag = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;

    setLoading(true);
    setAnswer('');

    try {
      const response = await axios.post('https://fictional-broccoli-g944v47xg6929x5x-5000.app.github.dev/ask', { question },{ headers : {'X-Github-Token':'ghu_U2Q2Ps9TF5EGh1IVtEA7TFy4pew35s3BgQTZ'}},{'Content-type':'application/json'});
      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Chatbot RAG</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Posez votre question..."
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Poser la question'}
        </button>
      </form>

      {answer && (
        <div>
          <h3>Réponse :</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ChatbotRag;
*/}