import { Observables } from "./observable/observable";
import { Workers } from "./worker/worker";

declare global {
  interface Window {
    __SharedService__: SharedService;
  }
}

export class SharedService {

  // Is set on first instance in a window
  classes?: {
    Observables: Observables,
    Workers: Workers
  }

  constructor(window: Window) {
    if (window.__SharedService__) Object.assign(this, window.__SharedService__)
    else {
      /**
       * Happens on once first init.
       */
      window.__SharedService__ = this;
      window.__SharedService__.classes = {
        Observables: new Observables(),
        Workers: new Workers(),
      }
    };
  }
}
