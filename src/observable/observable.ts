import { BehaviorSubject } from 'rxjs';

export class Observables extends Map<string, any> {
  constructor() {
    super();
  }

  public generateObservable(id: string, value: any) : BehaviorSubject<any> {
    const observable = new BehaviorSubject(value);
    this.set(id, observable);
    return observable;
  }

  public destroyObservable(id: string) : void {
    this.delete(id);
  }
}

