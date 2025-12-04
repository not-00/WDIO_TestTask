import { $, browser, expect } from '@wdio/globals'
import Page from '../basePage';

class AuthPage extends Page {
    /*
    * Locators for the Login page.
    */
    public page = browser
    public get inpEmailField () { return $("input[name='login']") };
    public get inpPassField () { return $("input[name='password']") };
    public get bntCreateAcout () { return $("form").$$("a")[1] };
    public get bntForgotCreds () { return $("form").$$("a")[0] };
    public get bntCheckboxYouPc () { return $("form").$$("div")[3].$("input") };
    public get txtCheckboxYouPc () { return $("form").$$("div")[5] };
    public get bntLogin () { return $("button[type='submit']") };

    /*
    * Methonds for the Login page.
    */
    /*
    * @param {string} email - User email address 
    */
    public async enterEmail(email: string) {
        await this.inpEmailField.setValue(email);
    }
    public async enterPassword(pass: string) {
        await this.inpPassField.setValue(pass);
    }
    public async clickCreareAccount() {
        await this.bntCreateAcout.click();
    }
    public async clickLogin() {
        await this.bntLogin.click();
    }
    public async clickCheckboxNotYourPc() {
        await this.bntCheckboxYouPc.click();
    }

    /*
    * @param {string} email - User email address 
    */
    public async loginToAccount(email: string, pass: string) {
        await this.enterEmail(email);
        await this.enterPassword(pass);
        await this.clickLogin();
    }

    public openLogin() {
        return browser.url("https://accounts.ukr.net/login");
    }

    /*
    * Verified screen elements
    */
    public async verifyScreen() {
        await expect(this.page).toHaveTitle(expect.stringContaining(this.getExpectedPageData.pageTitle));
        await expect(this.inpEmailField).toBeEnabled();
        await expect(this.inpPassField).toBeEnabled();
        await expect(this.bntCreateAcout).toBeEnabled();
        await expect(this.bntCreateAcout).toHaveText(this.getExpectedPageData.textCreateAcout);
        await expect(this.bntForgotCreds).toHaveText(this.getExpectedPageData.textForgotCreds);
        await expect(this.bntCheckboxYouPc).toBeDisplayed();
        await expect(this.txtCheckboxYouPc).toHaveText(this.getExpectedPageData.textCheckboxYouPc);
        await expect(this.bntLogin).toBeDisplayed();
    }

    /*
    * Expected page data for the Login page.
    */
    public getExpectedPageData = {
        pageTitle: "Пошта @ ukr.net - українська електронна пошта • Створи емейл",
        textCreateAcout: "Створити скриньку",
        textForgotCreds: "Не вдається увійти?",
        textCheckboxYouPc: "Чужий комп'ютер"
    }
}

export default new AuthPage();