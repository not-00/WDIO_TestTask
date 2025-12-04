import { $, browser, expect } from '@wdio/globals'
import Page from '../../basePage';

class LoginPage extends Page {
    /*
    * Locators for the Login page.
    */
    public page = browser;
    public get txtHeader () { return $("#headingText") };
    public get txtSubText () { return $("#headingSubtext") };
    public get inpEmailField () { return $("#identifierId") };
    public get bntForgotEmail () { return $("//*[@id='yDmH0d']/c-wiz/main/div[2]/div/div/div[1]/form/span/section/div/div/div[3]/button") };
    public get txtNotYourPc () { return $("//*[@id='yDmH0d']/c-wiz/main/div[2]/div/div/div[2]/div/div") };
    public get bntCreateAcout () { return $("//*[@id='yDmH0d']/c-wiz/main/div[3]/div/div[2]/div/div/div[1]/div/button") };
    public get bntNext () { return $("//*[@id='identifierNext']/div/button") };

    /*
    * Methonds for the Login page.
    */
    /*
    * @param {string} email - User email address 
    */
    public async enterEmail(email: string) {
        await this.inpEmailField.setValue(email);
    }
    public async clickForgotEmail() {
        await this.bntForgotEmail.click();
    }
    public async clickCreareAccount() {
        await this.bntCreateAcout.click();
    }
    public async clickNext() {
        await this.bntNext.click();
    }
    /*
    * @param {string} email - User email address 
    */
    public async enterEmailAndClickNext(email: string) {
        await this.enterEmail(email);
        await this.clickNext();
    }

    /*
    * Verified screen elements
    */
    public async verifyScreen() {
        await expect(this.page).toHaveTitle(expect.stringContaining(this.getExpectedPageData.pageTitle));
        await expect(this.imgLogo).toBeDisplayed();
        await expect(this.txtHeader).toHaveText(this.getExpectedPageData.textHeader);
        await expect(this.txtSubText).toHaveText(this.getExpectedPageData.textSubText);
        await expect(this.inpEmailField).toBeDisplayed();
        await expect(this.bntForgotEmail).toHaveText(this.getExpectedPageData.textForgotEmail);
        await expect(this.txtNotYourPc).toHaveText(this.getExpectedPageData.textNotYourPc);
        await expect(this.bntCreateAcout).toBeDisplayed();
        await expect(this.bntNext).toBeDisplayed();
    }

    /*
    * Expected page data for the Login page.
    */
    public getExpectedPageData = {
        pageTitle: "Gmail",
        textHeader: "Увійдіть",
        textSubText: "в обліковий запис Google, щоб перейти в Gmail. Він буде доступний для інших додатків Google у вебпереглядачі.",
        textForgotEmail: "Забули електронну адресу?",
        textNotYourPc: "Інший комп’ютер? Щоб увійти в обліковий запис, використовуйте режим гостя. Докладніше про режим гостя"
    }
}

export default new LoginPage();