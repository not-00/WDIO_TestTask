import { $, browser, expect } from '@wdio/globals'
import Page from '../basePage';

class GmailMainPage extends Page {
    /*
    * Locators for the Gmail main page.
    */
    public page = browser;
    public get imgLogo () { return $("img[alt='Google Gmail']") };
    public get txtHeader () { return $("a[data-g-action='header logo click']").$(".link__label") };
    public get bntSignIn () { return $("//*[@id='root']/div[1]/header/div/div[5]/a[3]"); };
    public get bntCreateAcc () { return $("//*[@id='root']/div[1]/header/div/div[5]/gws-dropdown-button/div") };
    public get btnForPersonalUse () { return $("//*[@id='root']/div[1]/header/div/div[5]/gws-dropdown-button/a[1]") };
    public get txtPageHeadText () { return $("h1") };

    /*
    * Methonds for the main Gmail page.
    */
    public async clickSignIn() {
        await this.bntSignIn.click();
    }

    public async clickCreateAccount() {
        await this.bntCreateAcc.click();
    }

    public async clickPersonalUse() {
        await this.btnForPersonalUse.click();
    }

    public async openCreateAccoutPage() {
        await this.bntCreateAcc.click();
        await this.btnForPersonalUse.click();
    }
    
    public open() {
        return browser.url("https://workspace.google.com/intl/uk/gmail/");
    }

    /*
    * Verified screen elements
    */
    public async verifyScreen() {
        // await expect(this.page).toHaveTitle(expect.stringContaining(this.getExpectedPageData.pageTitle));
        await expect(this.imgLogo).toBeDisplayed();
        await expect(this.txtHeader).toHaveText(this.getExpectedPageData.textHeader);
        // await expect(this.txtPageHeadText).toHaveText(this.getExpectedPageData.textPageHeadText);
    }

    /*
    * Expected page data for the main Gmail page.
    */
    public getExpectedPageData = {
        pageTitle: "Gmail: безкоштовна електронна пошта, що дбає про конфіденційність і безпеку ваших даних | Google Workspace",
        textHeader: "Gmail",
        textPageHeadText: "Захищена й розумна електронна пошта, якою легко користуватися"
    }
}

export default new GmailMainPage();