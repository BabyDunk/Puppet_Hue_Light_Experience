module.exports = {
  '@disabled': false,
  props: {
    colorList: Object.keys({
      "red": 65495,
      "orange": 3439,
      "yellow": 18700,
      "olive": 23222,
      "green": 25653,
      "teal": 37389,
      "blue": 44896,
      "violet": 46879,
      "purple": 46879,
      "pink": 57965,
      "white": 34160
    })
  },


  'step one: click turn toggle on/off': function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('button[id="button-toggle-on-off"]', 2000)
      .click('button[id="button-toggle-on-off"]')
      .assert.containsText('button[id="button-currentState"]', 'OFF')
  },

  'step two: count buttons ': function (browser) {
    browser
      .expect.elements('button').count.to.equal(23)
  },

  'step three: button text match ': function (browser) {
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

  'step four: when color button clicked match active display ': function (browser) {

    browser
      .waitForElementVisible('button[id="button-toggle-on-off"]', 2000)
      .click('button[id="button-toggle-on-off"]')
    .this.props.colorList.map((colorName) => {
      waitForElementVisible(`button[id="button-${colorName}"]`, 2000)
      .click(`button[id="button-${colorName}"]`)
      .verify.attributeContains('button[id="button-currentState"]', 'class', `ui ${colorName} button`)
  })


},

  'step five: check brightness strength notifier' : function(browser) {
    browser
      .waitForElementVisible('input[id="slider-brightness"]')
      .setValue('input[id="slider-brightness"]', new Array(180).fill(browser.Keys.LEFT_ARROW))
      .verify.containsText('button[id="button-currentState"]', 'Dim')
      .waitForElementVisible('input[id="slider-brightness"]')
      .setValue('input[id="slider-brightness"]', new Array(66).fill(browser.Keys.RIGHT_ARROW))
      .verify.containsText('button[id="button-currentState"]', 'Mid')
      .waitForElementVisible('input[id="slider-brightness"]')
      .setValue('input[id="slider-brightness"]', new Array(80).fill(browser.Keys.RIGHT_ARROW))
      .verify.containsText('button[id="button-currentState"]', 'Bright')
  }
};