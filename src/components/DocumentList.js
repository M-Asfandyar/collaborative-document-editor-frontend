import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map(doc => (
          <li key={doc._id}>
            <Link to={`/documents/${doc._id}`}>{doc.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
