module.exports = {
    'step one: click toggle button' : function (browser) {
        browser
          .url('http://localhost:3000')
          .waitForElementVisible('button[class="ui button button"]', 2000)
          .click('button[class="ui button button"]')
          .assert.containsText('button[class="ui button button"]', 'Toggle On/Off')
      },
    
    'step two: click turn blue button' : function (browser) {
        browser
        .waitForElementVisible('button[class="ui blue button"]', 2000)
        .click('button[class="ui blue button"]')
        .assert.containsText('button[class="ui blue button"]', 'Turn Blue')
        .end();
      }
    };