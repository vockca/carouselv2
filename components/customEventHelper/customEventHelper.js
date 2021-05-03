const EventHelper = {
    events: {},
}

export const MyCustomEvent = {
    createCustomEvent: (eventName, bubbles = true, cancelable = true, composed = true) => {
        let event = new CustomEvent(eventName, {bubbles: bubbles, cancelable: cancelable, composed: composed});
        if (!EventHelper.events[eventName]) {
            EventHelper.events[eventName] = {};
        }

        if (!EventHelper.events[eventName].event) {
            EventHelper.events[eventName].event = event;
        } else {
            //console.error("Event is already defined");
        }
    },

    deleteCustomEvent: (eventName) => {
        delete EventHelper.events[eventName];
    },

    addEventHandler: (elem, eventName, eventCallBack) => {

        if (!EventHelper.events[eventName]) {
            //console.error("There is no such event");
            return;
        }
        if (!elem || !eventCallBack) {
            //console.error("Element or callback you are adding event listener is invalid");
            return;
        }
        if (!EventHelper.events[eventName].listeners) {
            EventHelper.events[eventName].listeners = [];
        }
        if (EventHelper.events[eventName].listeners.includes(elem)) {
            // console.error("You are trying to handle already handled elem");
            return;
        }
        elem.addEventListener(eventName, eventCallBack);
        EventHelper.events[eventName].listeners = [...EventHelper.events[eventName].listeners, elem];
    },

    //Removing to be added

    triggerEvent: (eventName) => {
        if (!EventHelper.events[eventName]) {
            //console.error("There is no such event");
            return;
        }
        if (!EventHelper.events[eventName].listeners) {
            //console.error("There is no listeners");
            return;
        }
        let listenersArray = EventHelper.events[eventName].listeners;
        for (let i = 0; i < listenersArray.length; i++) {
            listenersArray[i].dispatchEvent(EventHelper.events[eventName].event);
        }
    },
}