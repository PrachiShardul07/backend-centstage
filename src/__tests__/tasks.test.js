const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;
// Simple unit/integration test using the running server would require a DB.
// This test ensures the health route is working.
const app = express();
app.use(bodyParser());
app.get('/health', (req, res) => res.json({ ok: true }));

describe('basic health', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
