
import { EventTypeCenter } from "./EventType";

export class EventSubscription {
    events = null;
    subscription = null;
    constructor(events, subscription) {
        this.events = events;
        this.subscription = subscription;
    }
    unsubscribe() {
        this.events.map((event) => EventTypeCenter.removeEvent(event));
        this.subscription && this.subscription.unsubscribe()
    }
    remove(){
        this.unsubscribe()
    }
}