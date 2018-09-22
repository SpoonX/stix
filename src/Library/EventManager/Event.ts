export class Event<T> {
  constructor(private event: string, private target: any, private payload: any) { }

  getEvent(): string {
    return this.event;
  }

  getTarget(): T {
    return this.target;
  }

  getPayload(): any {
    return this.payload;
  }
}
