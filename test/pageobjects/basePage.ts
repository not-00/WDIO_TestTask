import { browser } from '@wdio/globals'

export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public openInbox (path: string = "inbox") {
        return browser.url(`https://mail.ukr.net/desktop/u0/msglist/${path}`)
    }

    public openMain() {
        return browser.url("https://www.ukr.net/");
    }
}
