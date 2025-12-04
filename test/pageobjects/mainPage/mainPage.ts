import { $, browser, expect } from '@wdio/globals'
import Page from '../basePage';

class MainPage extends Page {
    /*
    * Locators for the Main page.
    */
    public page = browser;
    public get imgLogo () { return $("img[alt='новини']") };

    /*
    * Verified screen elements
    */
    public async verifyScreen() {
        await expect(this.page).toHaveTitle(expect.stringContaining(this.getExpectedPageData.pageTitle));
        await expect(this.imgLogo).toBeDisplayed();
    }

    /*
    * Expected page data for the main Gmail page.
    */
    public getExpectedPageData = {
        pageTitle: "UKR.NET: Всі новини України, останні новини дня в Україні та Світі",
    }
}

export default new MainPage();