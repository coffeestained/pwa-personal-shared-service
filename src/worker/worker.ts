export class Workers extends Map<string, any> {
  constructor() {
    super();
  }

  public async generateServiceWorker(id: string, fileName: any) : Promise<boolean> {
    try {
      const serviceWorker = await navigator.serviceWorker.register(fileName);
      this.set(id, serviceWorker);
      return true;
    } catch (_) { return false }
  }

  public async terminateServiceWorker(id: string) : Promise<boolean> {
    try {
      const serviceWorker = this.get(id);
      if (serviceWorker) serviceWorker.unregister();
      this.delete(id);
      return true;
    } catch (_) { return false }
  }

  public generateWebWorker(id: string, fileName: any) : boolean {
    try {
      const webWorker = new Worker(fileName);
      this.set(id, webWorker);
      return true;
    } catch (_) { return false }

  }

  public terminateWebWorker(id: string) : boolean {
    try {
      const webWorker = this.get(id);
      if (webWorker) webWorker.terminate();
      this.delete(id);
      return true;
    } catch (_) { return false }
  }
}

