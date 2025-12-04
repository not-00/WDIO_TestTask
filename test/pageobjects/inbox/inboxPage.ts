import { $, browser, expect } from '@wdio/globals'
import Page from '../basePage';

class InboxPage extends Page {
    /*
    * Locators for the Login page.
    */
    public page = browser;
    public get userProfile () { return $("header").$$("div")[0] };
    public get bntSend () { return $("//*[@id='app-root']/div/div[4]/div[1]/div[1]/button")};
    // public get bntSend () { return $("#app-root").$("div").$$("div")[3].$$("div")[0].$$("div")[0].$("button")};
    public get inpReceiver () { return $("main").$$("input")[0] };
    public get inpTheme () { return $("main").$$("input")[1] };
    public get iframeLocator () { return $("/html/body/div[1]/div/div[4]/main/div/div[4]/div[2]/div/div[1]/div[1]/div[2]/iframe") };
    public get inpBody () { return $("body") };
    public get bntSendEmail () { return $("main").$$("button")[0] };
    public get bntSendOneMore () { return $("main").$$("button")[0] };
    public get bntLookInbox () { return $("main").$$("button")[1] };
    public get bntDeleteInbox () { return $("//*[@id='app-root']/div/div[4]/main/div/div[1]/div[2]/div/div/button[2]") };

    public get inboxMeilsAmount () { return $("//*[@id='app-root']/div/div[4]/div[1]/div[2]/nav/div[1]/a/span[2]") };
    // public get inboxMeilsAmount () { return $("#app-root").$("div").$$("div")[3].$$("div")[0].$$("div")[1].$$("nav")[0].$$("div")[0].$("a").$$("span")[1] };

    public get txtInboxTheme () { return $("//*[@id='app-root']/div/div[4]/main/div/div[2]/div[2]/div[1]/a[1]/p/span[1]") }
    public get bntSendWithoutBody () { return $("//*[@id='popup-root']/div/div[3]/div[2]/button[1]") }

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
        await this.iframeLocator.waitForExist();
        await browser.switchFrame(await this.iframeLocator);
        await this.inpBody.setValue(body);
        await browser.switchFrame(null);
    }

    public async clickSendEmail() {
        await this.bntSendEmail.click()
    }
    public async clickSendMore() {
        await this.bntSendOneMore.click()
    }
    public async clickViewInbox() {
        await this.bntLookInbox.click()
    }
    public async clickSendWithoutBody() {
        await this.bntSendWithoutBody.click()
    }
    public async clickInboxDelete() {
        await this.bntDeleteInbox.click()
    }

    
    /*
    * Functions that parses emails theme and body texts in the inbox
    * @param {number} - index - element index in the inbox
    */
    public async parseEmailsTheme(index: number) {
        let theme = $(`//*[@id='app-root']/div/div[4]/main/div/div[2]/div[2]/div[${index}]/a[1]/p/span[1]`)
        return theme.getText();
    }
    public async parseEmailsBody(index: number) {
        let body = $(`//*[@id='app-root']/div/div[4]/main/div/div[2]/div[2]/div[${index}]/a[1]/p/span[2]`)
        return body.getText();
    }

    /*
    * Function that selects emails to delete in the inbox
    * @param {number} - index - element index in the inbox
    */
    public async deleteSelectedEmails(index: number) {
        let deleteCheckbox = $(`//*[@id='app-root']/div/div[4]/main/div/div[2]/div[2]/div[${index}]/label/input`);
        await deleteCheckbox.click();
    }

    /*
    * Function for sending emails
    * @param {boolean} oneOrTow - Send one email - false | Send more then one - true
    * @param {string} email - User receiver email
    * @param {string} theme - Text for the Email theme 
    * @param {string} body - Text for the Email body 
    */
    public async sendEmails(oneOrTow: boolean = false, email: string, theme: string, body: string) {
        do {
            await this.clickSend();
        } while (oneOrTow = false)
        await this.enterReceiver(email);
        await this.enterTheme(theme);
        await this.enterBody(body);
        await this.clickSendEmail()
        if (oneOrTow = false) {
            await this.clickViewInbox()
        } else {
            await this.clickSendMore()
            await browser.pause(10000);
        }
    }

    /*
    * Function that counts emails in the inbox
    */
    public async countEmails() {
       return this.inboxMeilsAmount.getText();
    }

    /*
    * Verified screen elements
    * @param {object} ...args - agruments for the verifyScreen function. Available:
    *  email - logged in user email
    */
    public async verifyScreen({ ...args }) {
        await expect(this.page).toHaveTitle(expect.stringContaining(this.getExpectedPageData.pageTitle(args.email)));
        await expect(this.userProfile).toBeDisplayed();
        await expect(this.bntSend).toBeDisplayed();
    }

    /*
    * Expected page data for the Login page.
    */
    public getExpectedPageData = {
        pageTitle: (email: string) => { return `Вхідні • ${email}` },
    }
}

export default new InboxPage();