const utils = require('./../utils');
utils.mockConfig();

jest.mock('kue');

describe('when running monitor', () => {

  let createQueue;
  let queue;
  let queueProcess;
  let processor;
  let monitor;

  beforeEach(() => {
    queueProcess = jest.fn();

    queue = {
      process: queueProcess
    };

    createQueue = jest.fn();
    createQueue.mockReturnValue(queue);

    const kue = require('kue');
    kue.createQueue = createQueue;

    processor = jest.fn();
    processor.mockReturnValue(Promise.resolve(null));
    const processorMapping = [
      {
        type: 'test',
        processor: processor
      }
    ];
    const Monitor = require('./../../src/app/monitor');
    monitor = new Monitor(processorMapping);
  });

  test('then it should process queue for each processor type', () => {
    monitor.start();

    expect(queueProcess.mock.calls.length).toBe(1);
    expect(queueProcess.mock.calls[0][0]).toBe('test');
  });

  test('then it should execute processor with job data when job received', () => {
    const job = {
      data: {
        email:'user.one@unit.tests'
      }
    };
    const done = jest.fn();

    monitor.start();
    queueProcess.mock.calls[0][1](job, done);

    expect(processor.mock.calls.length).toBe(1);
    expect(processor.mock.calls[0][0]).toBe(job.data);
  });

  test('then it should execute done callback with no error if processor success', testDone => {
    const job = {
      data: {
        email:'user.one@unit.tests'
      }
    };
    const done = (err) => {
      expect(err).toBeUndefined();
      testDone();
    };

    monitor.start();
    queueProcess.mock.calls[0][1](job, done);
  });

  test('then it should execute done callback with no error if processor success', testDone => {
    processor.mockReturnValue(Promise.reject(new Error('Unit test error')));
    const job = {
      data: {
        email:'user.one@unit.tests'
      }
    };
    const done = (err) => {
      expect(err).not.toBeNull();
      expect(err.message).toBe('Unit test error');
      testDone();
    };

    monitor.start();
    queueProcess.mock.calls[0][1](job, done);
  });

});