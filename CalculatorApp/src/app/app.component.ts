import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { stringify } from 'node:querystring';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'CalculatorApp';
  equationoutput: string = '';
  deleteIcon: string = '<-';
  functionArray: Array<string> = ['+', '-', '*', '/'];
  equation: Array<string> = ['', '', ''];
  answer: string = '';

  //TODO: make multiple operators available
  //TODO: make floating values available
  //TODO: make history tab to see earlier calculations

  public addChar(char: string): void {
    this.equationoutput = this.equationoutput.concat(char);
  }

  public clearInput(): void {
    this.equationoutput = '';
  }

  public clearLast(): void {
    this.equationoutput = this.equationoutput.slice(
      0,
      this.equationoutput.length - 1
    );
  }

  public calculateAnswer(): void {
    console.log(this.equationoutput);
    let operator: string = '';
    let opPlace: number = 0;
    for (let i = 0; i < this.equationoutput.length; i++) {
      for (let j = 0; j < this.functionArray.length; j++) {
        if (this.equationoutput[i] === this.functionArray[j]) {
          operator = this.functionArray[j];
          opPlace = i;
        }
      }
    }
    console.log(opPlace);
    this.equation[0] = this.equationoutput.slice(0, opPlace);
    this.equation[1] = this.equationoutput.charAt(opPlace);
    this.equation[2] = this.equationoutput.slice(
      opPlace + 1,
      this.equationoutput.length
    );
    console.log(this.equation);

    this.answer = this.compute(
      parseInt(this.equation[0]),
      this.equation[1],
      parseInt(this.equation[2])
    ).toString();
  }

  public compute(var1: number, operator: string, var2: number): number {
    let answer: number = 0;
    switch (operator) {
      case '+':
        answer = var1 + var2;
        break;
      case '-':
        answer = var1 - var2;
        break;
      case '*':
        answer = var1 * var2;
        break;
      case '/':
        answer = var1 / var2;
        break;
      default:
        answer = 0;
    }
    return answer;
  }
}
