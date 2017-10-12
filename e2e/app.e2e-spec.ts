import { TurnPaginaPage } from './app.po';

describe('turn-pagina App', () => {
  let page: TurnPaginaPage;

  beforeEach(() => {
    page = new TurnPaginaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
