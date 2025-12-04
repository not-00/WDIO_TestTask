import { $, browser, expect } from '@wdio/globals'
import Page from '../basePage';

class PasswordPage extends Page {
    /*
    * Locators for the Login page.
    */
    public page = browser;
    public get imgLogo () { return $("//*[@id='gb']/div[2]/div[1]/div[4]/div/a/img") };
    public get bntSend () { return $("/html/body/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div") };
    public get inpReceiver () { return $("input[aria-label='To recipients']") };
    public get inpTheme () { return $("input[aria-label='Subject']") };
    public get inpBody () { return $("div[aria-label='Message Body']") };
    public get bntSendEmail () { return $("div[aria-label='Send ‪(Ctrl-Enter)‬']") };
    public get alertSent () { return $("/html/body/div[6]/div[3]/div/div[1]/div/div[3]/div[4]/div/div/div[2]") };
    public get alertBntClose () { return $("/html/body/div[6]/div[3]/div/div[1]/div/div[3]/div[4]/div/div/div[2]/div") };


    /*
    * Methonds for the Login page.
    */
    public async clickSend() {
        await this.bntSend.click()
    }
    /*
    * @param {string} email - User receiver email 
    */
    public async enterReceiver(email: string) {
        await this.inpReceiver.setValue(email);
    }
    /*
    * @param {string} theme - Text for the Email theme 
    */
    public async enterTheme(theme: string) {
        await this.inpTheme.setValue(theme);
    }
    /*
    * @param {string} body - Text for the Email body 
    */
    public async enterBody(body: string) {
        await this.inpBody.setValue(body);
    }
    public async clickSendEmail() {
        await this.bntSendEmail.click()
    }
    /*
    * Function for sending emails
    * @param {string} email - User receiver email
    * @param {string} theme - Text for the Email theme 
    * @param {string} body - Text for the Email body 
    */
    public async sendEmails(email: string, theme: string, body: string) {
        await this.clickSend();
        await this.enterReceiver(email);
        await this.enterTheme(theme);
        await this.enterBody(body);
        await this.clickSendEmail()
    }
    public async clickAlertClose() {
        await this.alertBntClose.click();
    }

    /*
    * Verified screen elements
    * @param {object} ...args - agruments for the verifyScreen function. Available:
    *  email - logged in user email
    */
    public async verifyScreen({ ...args }) {
        await expect(this.page).toHaveTitle(expect.stringContaining(this.getExpectedPageData.pageTitle(args.email)));
        await expect(this.imgLogo).toBeDisplayed();
        await expect(this.bntSend).toBeDisplayed();
    }

    /*
    * Expected page data for the Login page.
    */
    public getExpectedPageData = {
        pageTitle: (email: string) => { return `Inbox - ${email} - Gmail` },
    }
}

export default new PasswordPage();