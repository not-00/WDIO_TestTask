import { expect } from "@wdio/globals";
import gmailMainPage from "../pageobjects/gmailMainPage/gmailMainPage";
import loginPage from "../pageobjects/gmailLoginPage/loginPage";
import passwordPage from "../pageobjects/gmailLoginPage/passwordPage";
import gmailPage from "../pageobjects/gmailPage/gmailPage";

const userOneEmail = "vadymtest4@gmail.com"
// const userTwoEmail = "vadymtest55@gmail.com"
const userOnePassword = "TestPass1!"
// const userTwoPassword = "TestPass1!"    
const receiverEmail = "kuzmych34@gmail.com"

// const emailText = {
//         to: receiverEmail,
//         theme: Math.random().toString(36).slice(2, 12),
//         body: Math.random().toString(36).slice(2, 12)
// }
    
let collectedEmails = {}
let emailsAmount = 10
let theme, body, countLetters, countNumbers, joinedString;

describe("Send emails via Gmail.", () => {
    it("Gmail main page displayed correctly.", async () => {
        //Opens main gmail page
        await gmailMainPage.open();

        //Gmail main screen elements verification function
        await gmailMainPage.verifyScreen();
    })

    it("Naviagtes to the Login page, and logins to the gmail user", async () => {
        //Navigates to the Login page
        await gmailMainPage.clickSignIn();

        //Login screen elements verification function
        await loginPage.verifyScreen();

        //Enters user email and continues
        await loginPage.enterEmailAndClickNext(userOneEmail);

        //Password screen emelents verification function
        await passwordPage.verifyScreen({email: userOneEmail});

        //Enters user password and continues
        await passwordPage.enterPasswordAndClickNext(userOnePassword);

        //Inbox screen elements verification function
        await gmailPage.verifyScreen({email: userOneEmail});
    })

    it("Sends emails to the user", async () => {
        //Sends specific amount of emails
        for(let i = 0; i < emailsAmount; i++) {
            //Function for emails sending
            // await gmailPage.sendEmails(emailText.to, emailText.theme, emailText.body);

            //Sends emails and saves email data to the object {theme}: {body}
            await gmailPage.clickSend();
            await gmailPage.enterReceiver(receiverEmail);
            await gmailPage.enterTheme(Math.random().toString(36).slice(2, 12));
            theme = await gmailPage.inpTheme.getValue();
            await gmailPage.enterBody(Math.random().toString(36).slice(2, 12));
            body = await gmailPage.inpBody.getValue();
            collectedEmails[theme] = body;
            await gmailPage.clickSendEmail();
            
            //Sent alert displaying verirication
            await expect(gmailPage.alertSent).toBeDisplayed();
        }
    })

    it("Checks amount of total sent emails and send summary report", async () => {
        //Verifies that the amount of sent emais is the same as expected
        expect(emailsAmount).toBe(Object.keys(collectedEmails).length);

        //Summarize and send summary report emails
        for(const key in collectedEmails) {
            //Joins key and value string
            joinedString = key + collectedEmails[key]

            //Filters all letters and counts it
            countLetters = joinedString.replace(/[^a-zA-Z]/g, '').length

            //Filters all numbers and counts it
            countNumbers = joinedString.replace(/[^0-9]/g, '').length

            //Sends summary emails
            await gmailPage.clickSend();
            await gmailPage.enterReceiver(receiverEmail);
            await gmailPage.enterTheme(`Received mail on theme ${key} with message: ${collectedEmails[key]}. It contains ${countLetters} letters and ${countNumbers} numbers`);
            await gmailPage.clickSendEmail();

            //Sent alert displaying verirication
            await expect(gmailPage.alertSent).toBeDisplayed();
        }
    })
})