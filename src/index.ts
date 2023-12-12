import { Observables } from "./observable/observable";

declare global {
  interface Window {
    __SharedService__: SharedService;
  }
}

export class SharedService extends Observables {

  constructor(window: Window) {
    super();
    if (window.__SharedService__) Object.assign(this, window.__SharedService__)
    else {
      /**
       * Happens on once first init.
       */
      window.__SharedService__ = this;
    };
  }
}
