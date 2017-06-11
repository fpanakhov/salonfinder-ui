import { SalonfinderUiPage } from './app.po';

describe('salonfinder-ui App', () => {
  let page: SalonfinderUiPage;

  beforeEach(() => {
    page = new SalonfinderUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
