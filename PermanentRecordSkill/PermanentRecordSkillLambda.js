/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'This could take a while, allocating more storage space.',
                'What is another item to already huge list.',
                'Rebuilding database to store new mark as it is really, really full.',
                'Previous record for maximum number of marks has now been surpassed!',
                'Added, but I am not sure how many more I can add.',
                'Sigh. Again? Fine. Added.',
            ],
            SKILL_NAME: 'Record Keeper',
            GET_FACT_MESSAGE: "System response: ",
            HELP_MESSAGE: 'You can add an item to the permanent record, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'It has been a honor serving you!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('AddNewMark');
    },
    'AddNewMarkIntent': function () {
        this.emit('AddNewMark');
    },
    'AddNewMark': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

            // Create speech output
            const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
            this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);

    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

