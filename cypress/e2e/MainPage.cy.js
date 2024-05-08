const mainPageSelectors = require("../fixtures/mainPage/mainPageSelectors.json");
const sideBarSelectors = require("../fixtures/sideBarSelectors.json");
const creatingPostsSelectors = require("../fixtures/creatingPostsSelectors.json");
const logOutSelectors = require("../fixtures/logOutSelectors.json");
import { faker } from "@faker-js/faker";
   

describe("mainPage", () => {
  const Email = Cypress.config("email");
  const Password = Cypress.config("password");
  const randomText = faker.lorem.text().substring(0, 500);
  const textToType = randomText;
  before(() => {
    cy.visit("/ru");
    // cy.logout();

  });

  it("Should load the website successfully", () => {
    cy.url().should("eq", "https://inctagram-neon.vercel.app/ru");
  });

  it("user viewing text", () => {
    cy.get(".TotalUserCounter_title__PK21w").should(
      "have.text",
      "Зарегистрированные пользователи:"
    );
  });
  it("user viewing 4 last post on main page", () => {
    cy.get(mainPageSelectors.headerButtonSignIn).click();
    cy.signIn(Email, Password);
    cy.wait(5000);
    cy.get(sideBarSelectors.create).click();
    cy.wait(5000);
    cy.get(creatingPostsSelectors.buttonSelectFromDevice).as('selectButton').click();
    cy.wait(5000);
          
    cy.fixture('images/image_one.jpg').then(fileContent => {
      cy.get('input[type="file"]').then(element => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpg');
        const testFile = new File([blob], 'image_one.jpg', { type: 'image/jpg' });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          element[0].files = dataTransfer.files;
          cy.wrap(element).trigger('change', { force: true });
      });
  });
  cy.wait(5000);
  cy.get(creatingPostsSelectors.nextOnPage).click();
  cy.wait(2000);
  cy.get(creatingPostsSelectors.nextOnPage).click();
  cy.wait(2000);
  cy.get(creatingPostsSelectors.publicationDescription).type(randomText);
    // cy.get(creatingPostsSelectors.publicationDescription).type('the post is displayed on the main page');
  cy.wait(2000);
  cy.get(creatingPostsSelectors.nextOnPage).click();
  cy.wait(5000);
  cy.logout();
  cy.get(mainPageSelectors.descriptionPost).should('contain', textToType);
  // cy.get(mainPageSelectors.descriptionPost).should(
  //   "have.text",
  //   "the post is displayed on the main page"
  // ); 
});
// it("checking the switch to the page signUp", () => {
//        cy.get(mainPageSelectors.headerButtonSignUp).click();
//     cy.url().should('eq', 'https://inctagram-neon.vercel.app/en/auth/registration');
//   });
});





//   it("checking the switch to the page signIn", () => {
//     cy.visit("/en");
//     cy.wait(10000);
//     cy.get(mainPageSelectors.headerButtonSignIn).click();

// });
// it("checking the switch to the page signUp", () => {
//     cy.visit("/en");
//       cy.get(mainPageSelectors.headerButtonSignUp).click();
//   cy.url().should('eq', 'https://inctagram-neon.vercel.app/en/auth/registration');
// });
