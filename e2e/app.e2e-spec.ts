import { SFITemplatePage } from './app.po';

describe('SFI App', function() {
  let page: SFITemplatePage;

  beforeEach(() => {
    page = new SFITemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
