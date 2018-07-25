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



  // Update the non-editable output field
  updateOutput() {
    let inputJSON

    // Get the JSON input
    try {
      inputJSON = JSON.parse(this.inputText)
    } catch(e) {
      this.outputText = 'Invalid JSON'
      return;
    }

    let keys = Object.keys(inputJSON)
    let outputJSON

    // Add items one by one to form the final JSON output
    for (let i = 0; i < keys.length; i++)
      for (let j = 0; j < inputJSON[keys[i]].length; j++)
        outputJSON = this.addItem(inputJSON[keys[i]][j], outputJSON)

    // Convert the JSON output to string and add indentation to make it more readable
    this.outputText = JSON.stringify(outputJSON, undefined, 2)
  }



  // Add 'item' at the right place in 'json' and return the resulting json
  addItem(item, json) {
    if (json == undefined)
      return [item]

    for (let i = 0; i < json.length; i++) {

      // If the child/parent IDs match we add the child item to its parent
      if (json[i].id == item.parent_id)
        json[i].children.push(item)

      // Depth-first search : if an item has children we go deeper in the hierarchy and try to add the desired item to one of the children
      if (json[i].children.length > 0)
        json[i].children = this.addItem(item, json[i].children)
    }

    return json
  }


}
