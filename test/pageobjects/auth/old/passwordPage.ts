import { $, browser, expect } from '@wdio/globals'
import Page from '../../basePage';

class PasswordPage extends Page {
    /*
    * Locators for the Login page.
    */
    public page = browser;
    public get imgLogo () { return $("svg") };
    public get txtHeader () { return $("#headingText") };
    public get txtUsedEmail () { return $("//*[@id='yDmH0d']/c-wiz/main/div[1]/div/div[2]/div/div[2]") };
    public get inpPassField () { return $("//*[@id='password']/div[1]/div/div[1]/input") };
    public get bntShowPass () { return $("//*[@id='yDmH0d']/c-wiz/main/div[2]/div/div/div/form/span/section[2]/div/div/div[1]/div[3]/div/div[1]/div/div/div[1]/div/div/div[1]") };
    public get txtShowPass () { return $("//*[@id='selectionc1']") };
    public get btnForgotPass () { return $("//*[@id='forgotPassword']/div/button") };
    public get bntNext () { return $("//*[@id='passwordNext']/div/button") };

    /*
    * Methonds for the Login page.
    */
    /*
    * @param {string} pass - User Password 
    */
    public async enterPassword(pass: string) {
        await this.inpPassField.setValue(pass);
    }
    public async clickShowPassword() {
        await this.bntShowPass.click();
    }
    public async clickForgotPassword() {
        await this.btnForgotPass.click();
    }
    public async clickNext() {
        await this.bntNext.click();
    }
    /*
    * @param {string} pass - User email address 
    */
    public async enterPasswordAndClickNext(pass: string) {
        await this.enterPassword(pass);
        await this.clickNext();
    }

    /*
    * Verified screen elements
    * @param {object} ...args - agruments for the verifyScreen function. Available:
    *  email - logged in user email
    */
    public async verifyScreen({ ...args }) {
        await expect(this.page).toHaveTitle(expect.stringContaining(this.getExpectedPageData.pageTitle));
        await expect(this.imgLogo).toBeDisplayed();
        await expect(this.txtHeader).toHaveText(this.getExpectedPageData.textHeader);
        await expect(this.txtUsedEmail).toHaveText(args.email);
        await expect(this.txtShowPass).toHaveText(this.getExpectedPageData.textShowPass);
        await expect(this.bntShowPass).toBeDisplayed();
        await expect(this.btnForgotPass).toHaveText(this.getExpectedPageData.textForgotPass);
        await expect(this.bntNext).toBeDisplayed();
    }

    /*
    * Expected page data for the Login page.
    */
    public getExpectedPageData = {
        pageTitle: "Вітаємо!",
        textHeader: "Вітаємо!",
        textShowPass: "Показати пароль",
        textForgotPass: "Забули пароль?",
    }
}

export default new PasswordPage();