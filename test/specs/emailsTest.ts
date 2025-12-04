import { expect, browser } from "@wdio/globals";
// import mainPage from "../pageobjects/mainPage/mainPage";
import authPage from "../pageobjects/auth/authPage";
import inboxPage from "../pageobjects/inbox/inboxPage";
const process = require("process");

let userEmail = process.env.email;
let userPassword = process.env.pass;
let collectedEmails = {}
let emailsAmount =  process.env.emailAmount;
let themeText, bodyText, countLetters, countNumbers, joinedString, actualEmails;

// const emailText = {
//         to: userEmail,
//         theme: Math.random().toString(36).slice(2, 12),
//         body: Math.random().toString(36).slice(2, 12)
// }

describe("Send emails via Ukr.net.", () => {
    it("Ukr.net page displayed correctly and navigates to the Login page.", async () => {
        /*
        REMOVED FOR STABLE RUN
        //Opens main gmail page
        await mainPage.openMain();

        //Gmail main screen elements verification function
        await mainPage.verifyScreen();
        */

        //Navigete to the login page
        await authPage.openLogin();
    })

    it("Logins to the correct user", async () => {
        //Login screen elements verification function
        await authPage.verifyScreen();

        //Login with valid credentials
        await authPage.loginToAccount(userEmail, userPassword);

        //Inbox screen elements verification function
        await inboxPage.verifyScreen({email: userEmail});
    })

    it("Sends emails to the user", async () => {
        //Sends specific amount of emails
        for(let i = 0; i < Number(emailsAmount); i++) {
            //Function for emails sending
            await inboxPage.sendEmails(true, userEmail, Math.random().toString(36).slice(2, 12), Math.random().toString(36).slice(2, 12));

            // //Sends emails and saves email data to the object {theme}: {body}
            // await inboxPage.clickSend();
            // await inboxPage.enterReceiver(userEmail);
            // await inboxPage.enterTheme(Math.random().toString(36).slice(2, 12));
            // theme = await inboxPage.inpTheme.getValue();
            // await inboxPage.enterBody(Math.random().toString(36).slice(2, 12));
            // body = await inboxPage.inpBody.getValue();
            // collectedEmails[theme] = body;
            // await inboxPage.clickSendEmail();
            
            //Sent alert displaying verirication
            // await expect(inboxPage.alertSent).toBeDisplayed();
        }
    })

    it("Checks amount of total sent emails and send summary report", async () => {
        //Naviagte to the inbox
        inboxPage.openInbox();

        //Verifies that the amount of sent emais is the same as expected
        actualEmails = await inboxPage.countEmails();
        await expect(Number(actualEmails)).toBe(Number(emailsAmount));

        //Creates object from theme and body of emails
        for (let i = 0; i < Number(emailsAmount); i++) {
            themeText = await inboxPage.parseEmailsTheme(i + 1);
            bodyText = await inboxPage.parseEmailsBody(i + 1);
            collectedEmails[themeText] = bodyText;
        }

        //Summarize and send summary report emails
        for(const key in collectedEmails) {
            //Joins key and value string
            joinedString = key + collectedEmails[key]

            //Filters all letters and counts it
            countLetters = joinedString.replace(/[^a-zA-Z]/g, '').length

            //Filters all numbers and counts it
            countNumbers = joinedString.replace(/[^0-9]/g, '').length

            //Sends summary emails
            await inboxPage.clickSend();
            await inboxPage.enterReceiver(userEmail);
            await inboxPage.enterTheme(`Received mail on theme ${key} with message: ${collectedEmails[key]}. It contains ${countLetters} letters and ${countNumbers} numbers`);
            await inboxPage.clickSendEmail();
            await browser.pause(10000);
            await inboxPage.clickSendWithoutBody();
            await inboxPage.clickSendMore();
        }
        //Naviagte to the inbox
        await inboxPage.openInbox();
        await browser.pause(5000);

        //Verifies that the amount of sent emais after received email section
        actualEmails = await inboxPage.countEmails();
        await expect(Number(actualEmails)).toBe(Number(emailsAmount) + Object.keys(collectedEmails).length);
    })

    it("Deletes all sent emails expect the last one", async () => {
        //Selects emails in the inbox that will be deleted and delets them
        actualEmails = await inboxPage.countEmails();
        for(let i = Number(actualEmails); i > 1; i--) {
            await inboxPage.deleteSelectedEmails(i);
        }
        await inboxPage.clickInboxDelete();
        await browser.pause(5000);
        
        //Verified that the only one email left
        actualEmails = await inboxPage.countEmails();
        await expect(Number(actualEmails)).toBe(1);
    })
})