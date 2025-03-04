const Mainloop = imports.mainloop;


var Timer = class Timer {
    constructor(interval, name, callback) {
        Timer.remove(name);

        Timer.timeouts[name] = Mainloop.timeout_add_seconds(interval, () => {
            delete Timer.timeouts[name];
            callback();
        });
    }

    static remove(name) {
        if (Timer.timeouts[name] !== undefined) {
            Mainloop.source_remove(Timer.timeouts[name]);
            Timer.timeouts[name] = undefined;
        }
    }

    static remove_all() {
        for (const timer in Timer.timeouts) {
            Mainloop.source_remove(Timer.timeouts[timer]);
            delete Timer.timeouts[timer];
        }
    }
}
Timer.timeouts = {};
