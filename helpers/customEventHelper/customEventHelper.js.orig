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
        }
    },

    deleteCustomEvent: (eventName) => {
        delete EventHelper.events[eventName];
    },

    addEventHandler: (elem, eventName, eventCallBack) => {
        if (!EventHelper.events[eventName]) {
            return;
        }

        if (!elem || !eventCallBack) {
            return;
        }

        if (!EventHelper.events[eventName].listeners) {
            EventHelper.events[eventName].listeners = [];
        }

        if (EventHelper.events[eventName].listeners.includes(elem)) {
            return;
        }

        elem.addEventListener(eventName, eventCallBack);

        EventHelper.events[eventName].listeners = [...EventHelper.events[eventName].listeners, elem];
    },

    triggerEvent: (eventName) => {
        if (!EventHelper.events[eventName]) {
            return;
        }

        if (!EventHelper.events[eventName].listeners) {
            return;
        }

        let listenersArray = EventHelper.events[eventName].listeners;

        for (let i = 0; i < listenersArray.length; i++) {
            listenersArray[i].dispatchEvent(EventHelper.events[eventName].event);
        }
    },
}