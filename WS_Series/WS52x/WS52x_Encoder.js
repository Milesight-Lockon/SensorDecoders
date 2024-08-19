/**
 * Payload Encoder
 *
 * Copyright 2024 Milesight IoT
 *
 * @product WS52x
 */
// Chirpstack v4
function encodeDownlink(input) {
    var encoded = milesightDeviceEncode(input.data);
    return { bytes: encoded };
}

// Chirpstack v3
function Encode(fPort, obj) {
    return milesightDeviceEncode(obj);
}

// The Things Network
function Encoder(obj, port) {
    return milesightDeviceEncode(obj);
}

function milesightDeviceEncode(payload) {
    var encoded = [];

    if ("reboot" in payload) {
        encoded = encoded.concat(reboot(payload.reboot));
    }
    if ("report_status" in payload) {
        encoded = encoded.concat(reportStatus(payload.report_status));
    }
    if ("report_attribute" in payload) {
        encoded = encoded.concat(reportAttribute(payload.report_attribute));
    }
    if ("report_interval" in payload) {
        encoded = encoded.concat(setReportInterval(payload.report_interval));
    }
    if ("socket_status" in payload) {
        if ("delay_time" in payload) {
            encoded = encoded.concat(socketStatusWithDelay(payload.socket_status, payload.delay_time));
        } else {
            encoded = encoded.concat(socketStatus(payload.socket_status));
        }
    }
    if ("cancel_delay" in payload) {
        encoded = encoded.concat(cancelDelayTask(payload.cancel_delay));
    }
    if ("over_current_protection" in payload) {
        encoded = encoded.concat(setOverCurrentProtection(payload.over_current_protection.enable, payload.over_current_protection.trip_current));
    }
    if ("current_threshold" in payload) {
        encoded = encoded.concat(setCurrentThreshold(payload.current_threshold.enable, payload.current_threshold.threshold));
    }
    if ("child_lock_config" in payload) {
        encoded = encoded.concat(setChildLock(payload.child_lock_config.enable, payload.child_lock_config.lock_time));
    }
    if ("power_consumption_enable" in payload) {
        encoded = encoded.concat(powerConsumptionEnable(payload.power_consumption_enable));
    }
    if ("reset_power_consumption" in payload) {
        encoded = encoded.concat(resetPowerConsumption(payload.reset_power_consumption));
    }
    if ("led_enable" in payload) {
        encoded = encoded.concat(setLedEnable(payload.led_enable));
    }

    return encoded;
}

/**
 * reboot device
 * @param {number} reboot values: (0: "no", 1: "yes")
 * @example { "reboot": 1 }
 */
function reboot(reboot) {
    var reboot_values = [0, 1];
    if (reboot_values.indexOf(reboot) === -1) {
        throw new Error("reboot must be one of " + reboot_values.join(", "));
    }

    if (reboot === 0) {
        return [];
    }
    return [0xff, 0x10, 0xff];
}

/**
 * report status
 * @param {number} report_status values: (0: no, 1: yes)
 * @example { "report_status": 1 }
 */
function reportStatus(report_status) {
    var report_status_values = [0, 1];
    if (report_status_values.indexOf(report_status) === -1) {
        throw new Error("report_status must be one of " + report_status_values.join(", "));
    }

    if (report_status === 0) {
        return [];
    }
    return [0xff, 0x28, 0xff];
}

/**
 * report attribute
 * @param {number} report_attribute values: (0: no, 1: yes)
 * @example { "report_attribute": 1 }
 */
function reportAttribute(report_attribute) {
    var report_attribute_values = [0, 1];
    if (report_attribute_values.indexOf(report_attribute) === -1) {
        throw new Error("report_attribute must be one of " + report_attribute_values.join(", "));
    }

    if (report_attribute === 0) {
        return [];
    }
    return [0xff, 0x2c, 0xff];
}

/**
 * set socket status
 * @param {string} socket_status values: (0: off, 1: on)
 * @example { "socket_status": 0 }
 */
function socketStatus(socket_status) {
    var status_values = [0, 1];
    if (status_values.indexOf(socket_status) === -1) {
        throw new Error("socket_status must be one of " + status_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x08);
    buffer.writeUInt8(socket_status);
    buffer.writeUInt16LE(0xffff);
    return buffer.toBytes();
}

/**
 * control socket status with delay
 * @param {number} socket_status values: (0: off, 1: on)
 * @param {number} delay_time unit: second, range: [0, 65535]
 * @example { "socket_status": 1, "delay_time": 10 }
 */
function socketStatusWithDelay(socket_status, delay_time) {
    var socket_status_values = [0, 1];
    if (socket_status_values.indexOf(socket_status) === -1) {
        throw new Error("socket_status must be one of " + socket_status_values.join(", "));
    }
    if (typeof delay_time !== "number") {
        throw new Error("delay_time must be a number");
    }
    if (delay_time < 0 || delay_time > 65535) {
        throw new Error("delay_time must be in the range [0, 65535]");
    }

    var data = (0x01 << 4) | socket_status;
    var buffer = new Buffer(6);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x22);
    buffer.writeUInt8(0x00);
    buffer.writeUInt16LE(delay_time);
    buffer.writeUInt8(data);
    return buffer.toBytes();
}

/**
 * cancel delay task
 * @param {number} cancel_delay_task values: (0: no, 1: yes)
 * @example { "cancel_delay_task": 1 }
 */
function cancelDelayTask(cancel_delay_task) {
    var cancel_delay_task_values = [0, 1];
    if (cancel_delay_task_values.indexOf(cancel_delay_task) === -1) {
        throw new Error("cancel_delay_task must be one of " + cancel_delay_task_values.join(", "));
    }

    if (cancel_delay_task === 0) {
        return [];
    }
    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x23);
    buffer.writeUInt8(0x00);
    buffer.writeUInt8(0xff);
    return buffer.toBytes();
}

/**
 * update report interval
 * @param {number} report_interval uint: second
 * @example payload: { "report_interval": 600 }
 */
function setReportInterval(report_interval) {
    if (typeof report_interval !== "number") {
        throw new Error("report_interval must be a number");
    }
    if (report_interval < 1) {
        throw new Error("report_interval must be greater than 1");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x03);
    buffer.writeUInt16LE(report_interval);
    return buffer.toBytes();
}

/**
 * set over_current protection configuration
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} trip_current unit: A
 * @example { "over_current_protection": { "enable": 1, "trip_current": 10 } }
 */
function setOverCurrentProtection(enable, trip_current) {
    var over_current_enable_values = [0, 1];
    if (over_current_enable_values.indexOf(enable) === -1) {
        throw new Error("over_current_protection.enable must be one of " + over_current_enable_values.join(", "));
    }
    if (typeof trip_current !== "number") {
        throw new Error("over_current_protection.trip_current must be a number");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x30);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(trip_current);
    return buffer.toBytes();
}

/**
 * set current threshold configuration
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} threshold unit: A
 * @example { "current_threshold": { "enable": 1, "threshold": 10 } }
 */
function setCurrentThreshold(enable, threshold) {
    var current_threshold_enable_values = [0, 1];
    if (current_threshold_enable_values.indexOf(enable) === -1) {
        throw new Error("current_threshold.enable must be one of " + current_threshold_enable_values.join(", "));
    }
    if (typeof threshold !== "number") {
        throw new Error("current_threshold.threshold must be a number");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x24);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(threshold);
    return buffer.toBytes();
}

/**
 * set child lock configuration
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} lock_time unit: min
 * @example { "child_lock_config": { "enable": 1, "lock_time": 10 } }
 */
function setChildLock(enable, lock_time) {
    var button_lock_enable_values = [0, 1];
    if (button_lock_enable_values.indexOf(enable) === -1) {
        throw new Error("child_lock_config.enable must be one of " + button_lock_enable_values.join(", "));
    }
    if (typeof lock_time !== "number") {
        throw new Error("child_lock_config.lock_time must be a number");
    }

    var data = (enable << 15) + lock_time;
    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x25);
    buffer.writeUInt16LE(data);
    return buffer.toBytes();
}

/**
 * set statistics enable configuration
 * @param {number} power_consumption_enable values: (0: disable, 1: enable)
 * @example { "power_consumption_enable": 1 }
 */
function powerConsumptionEnable(power_consumption_enable) {
    var power_consumption_values = [0, 1];
    if (power_consumption_values.indexOf(power_consumption_enable) === -1) {
        throw new Error("power_consumption_enable must be one of " + power_consumption_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x26);
    buffer.writeUInt8(power_consumption_enable);
    return buffer.toBytes();
}

/**
 * reset power consumption
 * @param {number} reset_power_consumption values: (0: disable, 1: enable)
 * @example { "reset_power_consumption": 1 }
 */
function resetPowerConsumption(reset_power_consumption) {
    var reset_power_consumption_values = [0, 1];
    if (reset_power_consumption_values.indexOf(reset_power_consumption) === -1) {
        throw new Error("reset_power_consumption must be one of " + reset_power_consumption_values.join(", "));
    }

    if (reset_power_consumption === 0) {
        return [];
    }
    return [0xff, 0x27, 0xff];
}

/**
 * set led enable configuration
 * @param {number} led_enable values: (0: disable, 1: enable)
 * @example { "led_enable": 1 }
 */
function setLedEnable(led_enable) {
    var led_enable_values = [0, 1];
    if (led_enable_values.indexOf(led_enable) === -1) {
        throw new Error("led_enable must be one of " + led_enable_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x2f);
    buffer.writeUInt8(led_enable);
    return buffer.toBytes();
}

function Buffer(size) {
    this.buffer = new Array(size);
    this.offset = 0;

    for (var i = 0; i < size; i++) {
        this.buffer[i] = 0;
    }
}

Buffer.prototype._write = function (value, byteLength, isLittleEndian) {
    for (var index = 0; index < byteLength; index++) {
        var shift = isLittleEndian ? index << 3 : (byteLength - 1 - index) << 3;
        this.buffer[this.offset + index] = (value & (0xff << shift)) >> shift;
    }
};

Buffer.prototype.writeUInt8 = function (value) {
    this._write(value, 1, 1);
    this.offset += 1;
};

Buffer.prototype.writeInt8 = function (value) {
    this._write(value < 0 ? value + 0x100 : value, 1, 1);
    this.offset += 1;
};

Buffer.prototype.writeUInt16LE = function (value) {
    this._write(value, 2, 1);
    this.offset += 2;
};

Buffer.prototype.writeInt16LE = function (value) {
    this._write(value < 0 ? value + 0x10000 : value, 2, 1);
    this.offset += 2;
};

Buffer.prototype.writeUInt32LE = function (value) {
    this._write(value, 4, 1);
    this.offset += 4;
};

Buffer.prototype.writeInt32LE = function (value) {
    this._write(value < 0 ? value + 0x100000000 : value, 4, 1);
    this.offset += 4;
};

Buffer.prototype.toBytes = function () {
    return this.buffer;
};
