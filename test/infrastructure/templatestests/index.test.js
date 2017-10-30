jest.mock('path');

describe('when getting template formats', () => {
  let getTemplateFormats;

  beforeEach(() => {
    const path = require('path');
    path.resolve = jest.fn().mockReturnValue('/Users/simon/dev/DfE/login.dfe.notifications/test/infrastructure/templatestests/fixtures');
    path.join = jest.fn().mockImplementation((a, b, c, d, e, f) => {
      let path = a;
      if (b) {
        path += `/${b}`;
      }
      if (c) {
        path += `/${c}`;
      }
      if (d) {
        path += `/${d}`;
      }
      if (e) {
        path += `/${e}`;
      }
      if (f) {
        path += `/${f}`;
      }
      return path;
    });

    getTemplateFormats = require('./../../../src/infrastructure/templates').getTemplateFormats;
  });

  it('then it should return email format', async () => {
    const actual = await getTemplateFormats('some-template');

    expect(actual.length).toBe(1);
    expect(actual[0].type).toBe('email');
  });

  it('then it should return 2 content types', async () => {
    const actual = await getTemplateFormats('some-template');

    expect(actual[0].contentTypes.length).toBe(2);
  });

  it('then it should return html content type', async () => {
    const actual = await getTemplateFormats('some-template');

    expect(actual[0].contentTypes[0].name).toBe('html');
    expect(actual[0].contentTypes[0].contents).toBe('This is a <b>HTML</b> email for <%=token%>');
  });

  it('then it should return text content type', async () => {
    const actual = await getTemplateFormats('some-template');

    expect(actual[0].contentTypes[1].name).toBe('text');
    expect(actual[0].contentTypes[1].contents).toBe('This is a text email for <%=token%>');
  });
});