import { AppPage } from './app.po';
import { expect, should } from 'chai';

describe('learning-angular App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).to.equal('Welcome to app!');
  });
});
