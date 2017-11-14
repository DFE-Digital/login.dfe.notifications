const utils = require('./../utils');
utils.mockConfig();

jest.mock('./../../src/infrastructure/config');
jest.mock('./../../src/infrastructure/email');

describe('when handling an invitation (v1)', () => {

  const expectedInvitationId = '1234EDC456';
  let send;
  let processor;
  const job = {
    email: 'user.one@unit.test',
    firstName: 'User',
    lastName: 'One',
    invitationId: expectedInvitationId
  };

  beforeEach(() => {
    const config = require('./../../src/infrastructure/config');
    config.mockReturnValue({
      hostingEnvironment: {
        migrationUrl: 'https://migration.test/login/',
      },
    });

    send = jest.fn();
    const email = require('./../../src/infrastructure/email');
    email.mockImplementation(() => {
      return {
        send: send
      }
    });


    processor = require('./../../src/app/invitation/invitationV1');
  });

  test('then it should send email once', async () => {
    await processor(job);

    expect(send.mock.calls.length).toBe(1);
  });

  test('then the email recipient should be the job email', async () => {
    await processor(job);

    expect(send.mock.calls[0][0]).toBe(job.email);
  });

  test('then the email template should be invitation', async () => {
    await processor(job);

    expect(send.mock.calls[0][1]).toBe('invitation');
  });

  test('then the email data should include the firstName', async () => {
    await processor(job);

    expect(send.mock.calls[0][2].firstName).toBe(job.firstName);
  });

  test('then the email data should include the lastName', async () => {
    await processor(job);

    expect(send.mock.calls[0][2].lastName).toBe(job.lastName);
  });
  test('then the email data should include the return url', async () => {
    await processor(job);

    expect(send.mock.calls[0][2].returnUrl).toBe(`https://migration.test/login/${expectedInvitationId}`);
  });

  test('then it should bubble error if thrown by email', async() => {
    send = jest.fn(() => Promise.reject('Unit test error'));
    const email = require('./../../src/infrastructure/email');
    email.send = send;

    expect.assertions(1);
    await expect(processor(job)).rejects.toMatch('Unit test error');
  });

});