import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  inputText: string
  outputText: string

  constructor() {
  }


  updateOutput() {
    let inputJSON

    try {
      inputJSON = JSON.parse(this.inputText)
    } catch(e) {
      this.outputText = 'Invalid JSON'
      return;
    }

    let keys = Object.keys(inputJSON)
    let outputJSON

    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < inputJSON[keys[i]].length; j++) {
        outputJSON = this.addItem(inputJSON[keys[i]][j], outputJSON)
      }
    }

    this.outputText = JSON.stringify(outputJSON, undefined, 2)
  }


  addItem(item, json) {
    if (json == undefined)
      return [item]

    for (let i = 0; i < json.length; i++) {

      if (json[i].id == item.parent_id)
        json[i].children.push(item)

      if (json[i].children.length > 0)
        json[i].children = this.addItem(item, json[i].children)
    }

    return json
  }

}
