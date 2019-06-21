module.exports = {
  'step one: click turn toggle on/off': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('button[id="button-toggle-on-off"]', 2000)
      .click('button[id="button-toggle-on-off"]')
      .assert.containsText('button[id="button-currentState"]', 'OFF')
  },
  
  'step two: count buttons ': function (browser) {
    browser
      .expect.elements('button').count.to.equal(22)
  },
  
  'step three: button text match ': function(browser){
    browser
      .waitForElementVisible('button[id="button-red"]', 2000)
      .assert.containsText('button[id="button-red"]', 'Turn Red')
      .waitForElementVisible('button[id="button-orange"]', 2000)
      .assert.containsText('button[id="button-orange"]', 'Turn Orange')
      .waitForElementVisible('button[id="button-yellow"]', 2000)
      .assert.containsText('button[id="button-yellow"]', 'Turn Yellow')
      .waitForElementVisible('button[id="button-green"]', 2000)
      .assert.containsText('button[id="button-green"]', 'Turn Green')
  },
  
  'step four: when color button clicked match active display ': function (browser){
    browser
      .waitForElementVisible('button[id="button-red"]', 2000)
      .click('button[id="button-red"]')
      .assert.attributeContains('button[id="button-currentState"]', 'class', 'ui red button')
      .waitForElementVisible('button[id="button-orange"]', 2000)
      .click('button[id="button-orange"]')
      .assert.attributeContains('button[id="button-currentState"]', 'class', 'ui orange button')
      .waitForElementVisible('button[id="button-yellow"]', 2000)
      .click('button[id="button-yellow"]')
      .assert.attributeContains('button[id="button-currentState"]', 'class', 'ui yellow button')
      .waitForElementVisible('button[id="button-green"]', 2000)
      .click('button[id="button-green"]')
      .assert.attributeContains('button[id="button-currentState"]', 'class', 'ui green button')
      .waitForElementVisible('button[id="button-olive"]', 2000)
      .click('button[id="button-olive"]')
      .assert.attributeContains('button[id="button-currentState"]', 'class', 'ui olive button')
      .waitForElementVisible('button[id="button-teal"]', 2000)
      .click('button[id="button-teal"]')
      .assert.attributeContains('button[id="button-currentState"]', 'class', 'ui teal button')
      .end()
  }
};