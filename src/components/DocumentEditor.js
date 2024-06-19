import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { io } from 'socket.io-client';
import MyWorker from '../workers/myWorker.js'; // Import the Web Worker

const socket = io('http://localhost:4000');

const DocumentEditor = () => {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  let worker;

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/api/documents/${id}`);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();

    socket.emit('join', id);

    socket.on('documentUpdate', (newContent) => {
      setContent(newContent);
    });

    socket.on('activeUsers', (users) => {
      // Handle active users
    });

    window.addEventListener('offline', () => setIsOffline(true));
    window.addEventListener('online', () => setIsOffline(false));

    return () => {
      socket.emit('leave', id);
      socket.off('documentUpdate');
      window.removeEventListener('offline', () => setIsOffline(true));
      window.removeEventListener('online', () => setIsOffline(false));
    };
  }, [id]);

  useEffect(() => {
    if (!isOffline) {
      const fetchDocument = async () => {
        try {
          const response = await axios.get(`/api/documents/${id}`);
          setContent(response.data.content);
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };

      fetchDocument();
    }
  }, [isOffline, id]);

  const handleChange = (e) => {
    setContent(e.target.value);
    if (!isOffline) {
      socket.emit('documentChange', { id, content: e.target.value });
    } else {
      localStorage.setItem(`document-${id}`, e.target.value);
    }
  };

  const handleHeavyComputation = (data) => {
    worker = new MyWorker();
    worker.postMessage(data);

    worker.onmessage = function (e) {
      const result = e.data;
      // Handle result
      console.log('Heavy computation result:', result);
    };

    worker.onerror = function (e) {
      console.error('Worker error:', e);
    };
  };

  useEffect(() => {
    if (isOffline) {
      const offlineContent = localStorage.getItem(`document-${id}`);
      if (offlineContent) {
        setContent(offlineContent);
      }
    }
  }, [isOffline, id]);

  return (
    <div>
      <textarea value={content} onChange={handleChange}></textarea>
      {isOffline && <p>You are currently offline. Changes will be saved locally.</p>}
      <button onClick={() => handleHeavyComputation(content)}>Perform Heavy Computation</button>
    </div>
  );
};

export default DocumentEditor;
