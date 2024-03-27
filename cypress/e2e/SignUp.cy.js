const signUpSelectors = require("../fixtures/pageSignUp/signUpSelectors.json");
const invalidUsernameData = require("../fixtures/pageSignUp/invalidUsernameData.json");
const validTestData = require("../fixtures/pageSignUp/validTestData.json");
const invalidEmailData = require("../fixtures/pageSignUp/invalidEmailData.json");
const invalidPasswordData = require("../fixtures/pageSignUp/invalidPasswordData.json");
const invalidPasswordConfirmationData = require("../fixtures/pageSignUp/invalidPasswordConfirmationData.json");
const signInSelectors = require("../fixtures/pageSignIn/signInSelectors.json");

describe("SignUp", () => {
  before(() => {
    cy.visit("/ru/auth/registration");
  });

  it("checking input field for valid values", () => {
    validTestData.forEach((data) => {
      cy.checkValidValues(
        data.userName,
        data.email,
        data.password,
        data.passwordConfirmation
      );
      cy.get(signUpSelectors.checkBox).check({ force: true });
      cy.signUpAndVerifyEmailSent();
    });
  });

  it("input field clean after click on button OK", () => {
    cy.checkValidValues(
      validTestData[0].userName,
      validTestData[0].email,
      validTestData[0].password,
      validTestData[0].passwordConfirmation
    );
    cy.get(signUpSelectors.checkBox).check({ force: true });
    cy.signUpAndVerifyEmailSent();
    cy.get(signUpSelectors.userNameField).should("have.value", "");
    cy.get(signUpSelectors.emailField).should("have.value", "");
    cy.get(signUpSelectors.passwordField).should("have.value", "");
    cy.get(signUpSelectors.passwordConfirmationField).should("have.value", "");
  });

  it("checking the username input field for invalid values", () => {
    invalidUsernameData.forEach((data) => {
      cy.checkInvalidValuesUsername(data.userName, data.errorMessage);
    });
  });

  it("checking the email input field for invalid values", () => {
    invalidEmailData.forEach((data) => {
      cy.checkInvalidValuesEmail(data.email, data.errorMessage);
    });
  });

  it("checking the password input field for invalid values", () => {
    invalidPasswordData.forEach((data) => {
      cy.checkInvalidValuesPassword(data.password, data.errorMessage);
    });
  });
  it("checking the passwordConfirmation input field for invalid values", () => {
    invalidPasswordConfirmationData.forEach((data) => {
      cy.checkInvalidValuesPasswordConfirmation(
        data.password,
        data.passwordConfirmation,
        data.errorMessage
      );
    });
  });

  it("checking error message when input fields is not filled in", () => {
    cy.get(signUpSelectors.userNameField).click();
    cy.get(signUpSelectors.emailField).click();
    cy.get(signUpSelectors.passwordField).click();
    cy.get(signUpSelectors.passwordConfirmationField).click();
    cy.get(signUpSelectors.userNameField).click();
    cy.get(signUpSelectors.errorUsernameMessage).should(
      "have.text",
      "Имя пользователя обязательно"
    );
    cy.get(signUpSelectors.errorEmailMessage).should(
      "have.text",
      "Email обязателен"
    );
    cy.get(signUpSelectors.errorPasswordMessage).should(
      "have.text",
      "Пароль обязателен"
    );
    cy.get(signUpSelectors.errorPasswordConfirmationMessage).should(
      "have.text",
      "Подтверждение пароля обязательно"
    );
  });
  it("switching languages", () => {
    cy.get(signUpSelectors.buttonSwitchingLanguages).click();
    cy.contains("English").click();
    cy.wait(5000);
    cy.get(signUpSelectors.titleSignUp).invoke('text').should("eql","Sign Up");
  });
  it("button SignUp is not click", () => {
    cy.checkValidValues(
      validTestData[0].userName,
      validTestData[0].email,
      validTestData[0].password,
      validTestData[0].passwordConfirmation
    );
    cy.get(signUpSelectors.checkBox).uncheck({ force: true });
    cy.get(signUpSelectors.buttonSignUp).should("be.disabled");
});
it("input values are saved after returning from the page Privacy Policy", () => {
    cy.checkValidValues(
    validTestData[0].userName,
    validTestData[0].email,
    validTestData[0].password,
    validTestData[0].passwordConfirmation
  );
  let userName = validTestData[0].userName
  cy.get(signUpSelectors.privacyPolicy).click();
  cy.get(signUpSelectors.titlePrivacyPolicy).invoke("text").should("eql", "Политика конфиденциальности");
  cy.get(signUpSelectors.buttonBackToSignUp).click();
  cy.wait(5000);
  cy.get(signUpSelectors.userNameField).should("have.value", userName);
});
it("switching on page sign in", () => {
 cy.get(signUpSelectors.clickStringSignIn).click();
cy.get(signInSelectors.titleSignIn).invoke("text").should("eql", "Войти");
});


})
