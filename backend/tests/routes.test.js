import request from 'supertest';
import app from '../index.js';

describe('pruebas a la API de libros', () => {
    it('Get /libros responde con 200', async () => {
        const res = await request(app).get('/libros');
        expect(res.statusCode).toBe(200);
    });
});