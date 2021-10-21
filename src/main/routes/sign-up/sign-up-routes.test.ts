import request from 'supertest';

import { app } from '../../config/app';

describe('SignUp Routes', () => {
  it('should return an account on success', async () => {
    await request(app)
      .post('/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200);
  });
});
