import { Component, HostBinding } from '@angular/core';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'decay';

  sample: number = 100;
  half_life: number = 70;
  decay: number = 100;
  result: string = (this.sample*Math.exp(-Math.LN2*this.decay/this.half_life)).toFixed(2)+" g";

  is_valid: boolean = true;

  atom_width: string = this.calculate();

  min_steps: number = -2000;
  max_steps: number = 1000;

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  counter(i: number) {
    return new Array(i);
  }

  calculate() {
    return (this.sample*Math.exp(-Math.LN2*this.decay/this.half_life)).toFixed(2);
  }

  checkValidity() {
    if ((this.sample >= 0 && this.sample <= 100) && (this.half_life >= 50 && this.half_life <= 100) && (this.decay >= 0 && this.decay <= 1000)) {
      return true;
    }
    return false;
  }

  invalidResult () {
    this.result = "";
    if (this.sample < 0 || this.sample > 100) {
      return "Please Enter a valid Sample Amount (0 - 100 grams)!\n";
    } else if (this.half_life < 50 || this.half_life > 100) {
      return "Please Enter a valid Half-Life (50 - 100 years)!\n";
    } else {
      return "Please Enter a valid Decay Time (0 - 1000 years)!\n";
    }
    return this.result;
  }

  changeSample(event: any) {
      this.result = this.calculate()+" g";
      this.is_valid = this.checkValidity();
      this.atom_width = this.calculate();
    if (!this.is_valid) {
      this.atom_width = "0";
      this.result = this.invalidResult();
    }
    
  }

  changeHalfLife(event: any) {
    this.result = this.calculate()+" g";
    this.is_valid = this.checkValidity();
    this.atom_width = this.calculate();
    if (!this.is_valid) {
      this.atom_width = "0";
      this.result = this.invalidResult();
    }
  }

  changeDecay(event: any) {
    this.result = this.calculate()+" g";
    this.is_valid = this.checkValidity();
    this.atom_width = this.calculate();
    if (this.decay <= 10) {
      this.min_steps = 0;
      this.max_steps = 30;
    } else if (this.decay > 10 && this.decay < 100) {
      this.min_steps = -75;
      this.max_steps = 175;
    } else if (this.decay >= 100 && this.decay < 1000) {
      this.min_steps = -2000;
      this.max_steps = 1000;
    }
    if (!this.is_valid) {
      this.atom_width = "0";
      // this.num_atoms = 0;
      this.result = this.invalidResult();
    }
  }

  changeYears(event: any) {
    this.decay = event.value;
    this.result = this.calculate()+" g";
    this.is_valid = this.checkValidity();
    this.atom_width = this.calculate();
    if (this.decay <= 10) {
      this.min_steps = 0;
      this.max_steps = 30;
    } else if (this.decay > 10 && this.decay < 100) {
      this.min_steps = -75;
      this.max_steps = 175;
    } else if (this.decay >= 100 && this.decay < 1000) {
      this.min_steps = -2000;
      this.max_steps = 1000;
    }
    if (!this.is_valid) {
      this.atom_width = "0";
      this.result = this.invalidResult();
      }
  }
  
}
