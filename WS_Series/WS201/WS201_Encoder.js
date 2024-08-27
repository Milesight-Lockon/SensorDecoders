/**
 * Payload Encoder
 *
 * Copyright 2024 Milesight IoT
 *
 * @product WS201
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
    if ("report_interval" in payload) {
        encoded = encoded.concat(setReportInterval(payload.report_interval));
    }
    if ("collection_interval" in payload) {
        encoded = encoded.concat(setCollectionInterval(payload.collection_interval));
    }
    if ("timezone" in payload) {
        encoded = encoded.concat(setTimeZone(payload.timezone));
    }
    if ("report_status" in payload) {
        encoded = encoded.concat(reportStatus(payload.report_status));
    }
    if ("depth" in payload) {
        encoded = encoded.concat(setDepth(payload.depth));
    }
    if ("remaining_threshold_config" in payload) {
        encoded = encoded.concat(setRemainingThresholdAlarm(payload.remaining_threshold_config.index, payload.remaining_threshold_config.enable, payload.remaining_threshold_config.release_alarm_enable, payload.remaining_threshold_config.value));
    }
    if ("hibernate_config" in payload) {
        encoded = encoded.concat(setHibernate(payload.hibernate_config.enable, payload.hibernate_config.start_time, payload.hibernate_config.end_time, payload.hibernate_config.week_days));
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
 * report interval configuration
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
 * set collection interval
 * @param {number} collection_interval unit: second, range: [10, 60]
 * @example { "collection_interval": 300 }
 */
function setCollectionInterval(collection_interval) {
    if (typeof collection_interval !== "number") {
        throw new Error("collection_interval must be a number");
    }
    if (collection_interval < 10 || collection_interval > 60) {
        throw new Error("collection_interval must be in range [10, 60]");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x02);
    buffer.writeUInt16LE(collection_interval);
    return buffer.toBytes();
}

/**
 * set timezone
 * @param {number} timezone
 * @example { "timezone": -4 }
 * @example { "timezone": 8 }
 */
function setTimeZone(timezone) {
    if (typeof timezone !== "number") {
        throw new Error("timezone must be a number");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x17);
    buffer.writeInt16LE(timezone * 10);
    return buffer.toBytes();
}

/**
 * report device status
 * @param {number} report_status values: (0: "no", 1: "yes")
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

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x28);
    buffer.writeUInt8(0xff);
    return buffer.toBytes();
}

/**
 * set depth
 * @param {number} depth unit: mm
 * @example { "depth": 500 }
 */
function setDepth(depth) {
    if (typeof depth !== "number") {
        throw new Error("depth must be a number");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x76);
    buffer.writeUInt16LE(depth);
    return buffer.toBytes();
}

/**
 * set remaining threshold alarm configuration
 * @param {number} index values: (1: "1", 2: "2")
 * @param {number} enable values: (0: "disable", 1: "enable")
 * @param {number} release_alarm_enable values: (0: "disable", 1: "enable")
 * @param {number} value unit: %
 * @example { "remaining_threshold_config": { "index": 1, "enable": 1, "release_alarm_enable": 1, "value": 20 } }
 */
function setRemainingThresholdAlarm(idx, enable, release_alarm_enable, value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("remaining_threshold_config.enable must be one of " + enable_values.join(", "));
    }
    var release_alarm_enable_values = [0, 1];
    if (release_alarm_enable_values.indexOf(release_alarm_enable) === -1) {
        throw new Error("remaining_threshold_config.release_alarm_enable must be one of " + release_alarm_enable_values.join(", "));
    }
    var index_values = [1, 2];
    if (index_values.indexOf(idx) === -1) {
        throw new Error("remaining_threshold_config.index must be one of " + index_values.join(", "));
    }

    var data = (release_alarm_enable << 7) | (enable << 6) | (idx << 3);
    var buffer = new Buffer(11);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x06);
    buffer.writeUInt8(data);
    buffer.writeUInt16LE(0x00);
    buffer.writeUInt16LE(value);
    buffer.writeUInt16LE(0x00);
    buffer.writeUInt16LE(0x00);
    return buffer.toBytes();
}

/**
 * set hibernate
 * @param {number} enable values: (0: "disable", 1: "enable")
 * @param {string} start_time format: "HH:mm"
 * @param {string} end_time format: "HH:mm"
 * @param {Array} week_days values: (1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday")
 * @example { "hibernate_config": { "enable": 1, "start_time": "08:00", "end_time": "21:00", "week_days": [1, 2, 3, 4, 5, 6, 7] } }
 */
function setHibernate(enable, start_time, end_time, week_days) {
    var hibernate_enable_values = [0, 1];
    if (hibernate_enable_values.indexOf(enable) === -1) {
        throw new Error("hibernate_config.enable must be one of " + hibernate_enable_values.join(", "));
    }

    if (typeof start_time !== "string" || typeof end_time !== "string") {
        throw new Error("hibernate_config.start_time and hibernate_config.end_time must be a 'HH:mm' string");
    }

    var week_days_values = [0, 1, 2, 3, 4, 5, 6, 7];
    var start_time_values = start_time.split(":");
    var end_time_values = end_time.split(":");
    var days = 0x00;
    for (var i = 0; i < week_days.length; i++) {
        var day = week_days[i];
        if (week_days_values.indexOf(day) === -1) {
            throw new Error("week_days must be one of " + week_days_values.join(", "));
        }
        offset = week_days_values.indexOf(day);
        days |= 1 << offset;
    }

    var buffer = new Buffer(8);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x75);
    buffer.writeUInt8(enable);
    buffer.writeUInt16LE(parseInt(start_time_values[0]) * 60 + parseInt(start_time_values[1]));
    buffer.writeUInt16LE(parseInt(end_time_values[0]) * 60 + parseInt(end_time_values[1]));
    buffer.writeUInt8(days);
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
    this._write(value, 1, true);
    this.offset += 1;
};

Buffer.prototype.writeInt8 = function (value) {
    this._write(value < 0 ? value + 0x100 : value, 1, true);
    this.offset += 1;
};

Buffer.prototype.writeUInt16LE = function (value) {
    this._write(value, 2, true);
    this.offset += 2;
};

Buffer.prototype.writeInt16LE = function (value) {
    this._write(value < 0 ? value + 0x10000 : value, 2, true);
    this.offset += 2;
};

Buffer.prototype.writeUInt32LE = function (value) {
    this._write(value, 4, true);
    this.offset += 4;
};

Buffer.prototype.writeInt32LE = function (value) {
    this._write(value < 0 ? value + 0x100000000 : value, 4, true);
    this.offset += 4;
};

Buffer.prototype.toBytes = function () {
    return this.buffer;
};
