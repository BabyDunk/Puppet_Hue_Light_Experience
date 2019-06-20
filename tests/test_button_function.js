module.exports = {
      'step three: click turn toggle on/off' : function (browser) {
        browser
        .waitForElementVisible('button[id="button-toggle-on-off"]', 2000)
        .click('button[id="button-toggle-on-off"]')
        .assert.containsText('button[id="button-currentState"]', 'OFF')
        .end();
      }
    };