// Simple test script to POST a sample teacher to the backend
// Usage: node test_post_teacher.js

const url = 'http://localhost:5000/api/teachers';

const sample = {
  name: 'Test Teacher',
  dateOfBirth: '1990-01-01',
  phone: '081234567890',
  email: 'test.teacher@example.com',
  address: 'Test Address',
  subject: 'English',
  notes: 'Created by test script'
};

(async () => {
  try {
    if (typeof fetch !== 'function') {
      // node <18 fallback
      const nodeFetch = await import('node-fetch');
      global.fetch = nodeFetch.default;
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sample)
    });
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log('BODY', text);
  } catch (err) {
    console.error('Request failed:', err);
  }
})();
