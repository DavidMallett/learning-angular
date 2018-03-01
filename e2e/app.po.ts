import { browser, by, element } from 'protractor';
import { expect, should } from 'chai';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
