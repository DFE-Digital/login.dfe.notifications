const utils = require('./../utils');
utils.mockConfig();

jest.mock('./../../src/infrastructure/email');

describe('when handling a password reset (v1)', () => {

  let send;
  let processor;
  const job = {
    email: 'user.one@unit.test',
    code: '123ABC',
    clientId: 'foo1'
  };

  beforeEach(() => {
    send = jest.fn();

    const email = require('../../src/infrastructure/email');
    email.mockImplementation(() => {
      return {
        send: send
      }
    })

    processor = require('../../src/app/passwordReset/passwordResetV1');
  });

  test('then it should send email once', async () => {
    await processor(job);

    expect(send.mock.calls.length).toBe(1);
  });

  test('then the email recipient should be the job email', async () => {
    await processor(job);

    expect(send.mock.calls[0][0]).toBe(job.email);
  });

  test('then the email template should be password-reset', async () => {
    await processor(job);

    expect(send.mock.calls[0][1]).toBe('password-reset');
  });

  test('then the email data should include the job code', async () => {
    await processor(job);

    expect(send.mock.calls[0][2].code).toBe(job.code);
  });

  test('then the email data should include the job clientId', async () => {
    await processor(job);

    expect(send.mock.calls[0][2].clientId).toBe(job.clientId);
  });

  test('then it should bubble error if thrown by email', async() => {
    send = jest.fn(() => Promise.reject('Unit test error'));
    const email = require('../../src/infrastructure/email');
    email.send = send;

    expect.assertions(1);
    await expect(processor(job)).rejects.toMatch('Unit test error');
  })

});