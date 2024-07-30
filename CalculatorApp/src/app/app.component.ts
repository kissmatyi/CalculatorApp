import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
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
  history: { equation: string; answer: string }[] = [
    { equation: '', answer: '' },
  ];

  //TODO: make multiple operators available

  public addChar(char: string): void {
    if (this.equationoutput.length == 11) {
      alert('Maximum computing reached');
    } else {
      this.equationoutput = this.equationoutput.concat(char);
    }
  }

  public clearInput(): void {
    this.equationoutput = '';
  }

  public addToEq(item: string): void {
    this.clearInput();
    this.equationoutput = this.equationoutput.concat(item);
  }

  public clearLast(): void {
    this.equationoutput = this.equationoutput.slice(
      0,
      this.equationoutput.length - 1
    );
  }

  public calculateAnswer(): void {
    let operator: string = '';
    let opPlace: number = 0;
    let isFloating: boolean = false;
    for (let i = 0; i < this.equationoutput.length; i++) {
      for (let j = 0; j < this.functionArray.length; j++) {
        if (this.equationoutput[i] === this.functionArray[j]) {
          operator = this.functionArray[j];
          opPlace = i;
        }
      }
      if (this.equationoutput[i] === '.') {
        isFloating = true;
      }
    }

    this.equation[0] = this.equationoutput.slice(0, opPlace);
    this.equation[1] = this.equationoutput.charAt(opPlace);
    this.equation[2] = this.equationoutput.slice(
      opPlace + 1,
      this.equationoutput.length
    );
    console.log(this.equation);

    if (isFloating) {
      this.answer = this.compute(
        parseFloat(this.equation[0]),
        this.equation[1],
        parseFloat(this.equation[2])
      )
        .toFixed(2)
        .toString();
    } else {
      this.answer = this.compute(
        parseInt(this.equation[0]),
        this.equation[1],
        parseInt(this.equation[2])
      ).toString();
    }

    this.history.push({ equation: this.equationoutput, answer: this.answer });

    if (opPlace === 0 || opPlace === this.equationoutput.length - 1) {
      this.answer = 'Syntax error';
      this.history.pop();
    }
  }

  public compute(var1: number, operator: string, var2: number): number {
    console.log(var1, var2);
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
