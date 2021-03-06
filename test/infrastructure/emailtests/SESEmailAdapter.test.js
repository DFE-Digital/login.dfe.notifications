jest.mock('./../../../src/infrastructure/config');
jest.mock('./../../../src/infrastructure/email/utils');
jest.mock('aws-sdk');

describe('When sending an email using SES', () => {
  const sender = 'noreply@secure.access';
  const recipient = 'user.one@unit.tests';
  const template = 'some-email';
  const data = {
    item1: 'something'
  };
  const subject = 'some email to user';

  let awsSESSendEmail;
  let emailUtilsRenderEmailContent;

  let adapter;

  beforeEach(() => {
    const config = require('./../../../src/infrastructure/config');
    config.mockReturnValue({
      email: {
        params: {
          accessKey: 'accessKey',
          accessSecret: 'accessKey',
          region: 'region',
          sender,
        }
      }
    });

    awsSESSendEmail = jest.fn().mockImplementation((data, done) => {
      done();
    });
    const aws = require('aws-sdk');
    aws.SES.mockImplementation(() => {
      return {
        sendEmail: awsSESSendEmail
      }
    });

    emailUtilsRenderEmailContent = jest.fn().mockReturnValue([
      { type: 'html', content: 'some html' },
      { type: 'text', content: 'some plain text' },
    ]);
    const emailUtils = require('./../../../src/infrastructure/email/utils');
    emailUtils.renderEmailContent = emailUtilsRenderEmailContent;

    const SESEmailAdapter = require('./../../../src/infrastructure/email/SESEmailAdapter');
    adapter = new SESEmailAdapter();
  });

  it('then it should render the content using the template', async () => {
    await adapter.send(recipient, template, data, subject);

    expect(emailUtilsRenderEmailContent.mock.calls.length).toBe(1);
    expect(emailUtilsRenderEmailContent.mock.calls[0][0]).toBe(template);
    expect(emailUtilsRenderEmailContent.mock.calls[0][1]).toBe(data);
  });

  it('then it should send an email from the configured sender', async () => {
    await adapter.send(recipient, template, data, subject);

    expect(awsSESSendEmail.mock.calls[0][0].Source).toBe(sender);
  });

  it('then it should send an email to the recipient', async () => {
    await adapter.send(recipient, template, data, subject);

    expect(awsSESSendEmail.mock.calls.length).toBe(1);
    expect(awsSESSendEmail.mock.calls[0][0].Destination.ToAddresses.length).toBe(1);
    expect(awsSESSendEmail.mock.calls[0][0].Destination.ToAddresses[0]).toBe(recipient);
  });

  it('then it should send an email with the subject', async () => {
    await adapter.send(recipient, template, data, subject);

    expect(awsSESSendEmail.mock.calls.length).toBe(1);
    expect(awsSESSendEmail.mock.calls[0][0].Message.Subject.Data).toBe(subject);
  });

  it('then it should send an email with html content', async () => {
    await adapter.send(recipient, template, data, subject);

    expect(awsSESSendEmail.mock.calls.length).toBe(1);
    expect(awsSESSendEmail.mock.calls[0][0].Message.Body.Html.Data).toBe('some html');
  });

  it('then it should send an email with plain text content', async () => {
    await adapter.send(recipient, template, data, subject);

    expect(awsSESSendEmail.mock.calls.length).toBe(1);
    expect(awsSESSendEmail.mock.calls[0][0].Message.Body.Text.Data).toBe('some plain text');
  });

  it('then it should send an email with plain text content', async () => {
    await adapter.send(recipient, template, data, subject);

    expect(awsSESSendEmail.mock.calls.length).toBe(1);
    expect(awsSESSendEmail.mock.calls[0][0].Message.Body.Text.Data).toBe('some plain text');
  });

  it('then it should throw an error if sending fails', async () => {
    awsSESSendEmail.mockImplementation((data, done) => {
      done('test error');
    });

    try {
      await adapter.send(recipient, template, data, subject);
      throw 'no error thrown';
    } catch (e) {
      expect(e).toBe('test error');
    }
  });
});