/**
 * Payload Encoder
 *
 * Copyright 2024 Milesight IoT
 *
 * @product TS201
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
    if ("sync_time" in payload) {
        encoded = encoded.concat(syncTime(payload.sync_time));
    }
    if ("report_interval" in payload) {
        encoded = encoded.concat(setReportInterval(payload.report_interval));
    }
    if ("collection_interval" in payload) {
        encoded = encoded.concat(setCollectionInterval(payload.collection_interval));
    }
    if ("report_status" in payload) {
        encoded = encoded.concat(reportStatus(payload.report_status));
    }
    if ("history_enable" in payload) {
        encoded = encoded.concat(setHistoryEnable(payload.history_enable));
    }
    if ("fetch_history" in payload) {
        encoded = encoded.concat(fetchHistory(payload.fetch_history.start_time, payload.fetch_history.end_time));
    }
    if ("clear_history" in payload) {
        encoded = encoded.concat(clearHistory(payload.clear_history));
    }
    if ("retransmit_config" in payload) {
        encoded = encoded.concat(setRetransmitConfig(payload.retransmit_config.enable, payload.retransmit_config.interval));
    }
    if ("resend_interval" in payload) {
        encoded = encoded.concat(setResendInterval(payload.resend_interval));
    }
    if ("alarm_count" in payload) {
        encoded = encoded.concat(setAlarmCount(payload.alarm_count));
    }
    if ("threshold_alarm_enable" in payload) {
        encoded = encoded.concat(setThresholdAlarmEnable(payload.threshold_alarm_enable));
    }
    if ("temperature_calibrate" in payload) {
        encoded = encoded.concat(calibrateTemperature(payload.temperature_calibrate.enable, payload.temperature_calibrate.temperature));
    }
    if ("humidity_calibrate" in payload) {
        encoded = encoded.concat(calibrateHumidity(payload.humidity_calibrate.enable, payload.humidity_calibrate.humidity));
    }
    if ("stop_transmit" in payload) {
        encoded = encoded.concat(stopTransmit(payload.stop_transmit));
    }
    if ("fetch_sensor_id" in payload) {
        encoded = encoded.concat(fetchSensorID(payload.fetch_sensor_id));
    }
    if ("ack_retry_times" in payload) {
        encoded = encoded.concat(setAckRetryTimes(payload.ack_retry_times));
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
    buffer.writeUInt8(report_status);
    return buffer.toBytes();
}

/**
 * report interval configuration
 * @param {number} report_interval unit: minute, range: [1, 1440]
 * @example { "report_interval": 20 }
 */
function setReportInterval(report_interval) {
    if (typeof report_interval !== "number") {
        throw new Error("report_interval must be a number");
    }
    if (report_interval < 1 || report_interval > 1440) {
        throw new Error("report_interval must be in range [1, 1440]");
    }

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x8e);
    buffer.writeUInt8(0x00);
    buffer.writeUInt16LE(report_interval);
    return buffer.toBytes();
}

/**
 * collection interval
 * @param {number} collection_interval unit: second
 * @example { "collection_interval": 300 }
 */
function setCollectionInterval(collection_interval) {
    if (typeof collection_interval !== "number") {
        throw new Error("collection_interval must be a number");
    }
    if (collection_interval <= 0) {
        throw new Error("collection_interval must be greater than 0");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x02);
    buffer.writeUInt16LE(collection_interval);
    return buffer.toBytes();
}

/**
 * sync time
 * @param {number} sync_time values：(0: "no", 1: "yes")
 * @example { "sync_time": 1 }
 */
function syncTime(sync_time) {
    var sync_time_values = [0, 1];
    if (sync_time_values.indexOf(sync_time) === -1) {
        throw new Error("sync_time must be one of " + sync_time_values.join(", "));
    }

    if (sync_time === 0) {
        return [];
    }
    return [0xff, 0x4a, 0xff];
}

/**
 * calibrate temperature
 * @param {number} enable values: (0: "disable", 1: "enable")
 * @param {number} temperature temperature calibration value
 * @example { "temperature_calibrate": { "enable": 1, "temperature": 1 }
 */
function calibrateTemperature(enable, temperature) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("enable must be one of " + enable_values.join(", "));
    }

    var data = 0 | (enable << 7);

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xea);
    buffer.writeUInt8(data);
    buffer.writeUInt16LE(temperature * 10);
    return buffer.toBytes();
}

/**
 *
 * @param {number} enable values: (0: "disable", 1: "enable")
 * @param {number} humidity
 * @example { "humidity_calibrate": { "enable": 1, "humidity": 1 }
 */
function calibrateHumidity(enable, humidity) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("enable must be one of " + enable_values.join(", "));
    }

    var data = 1 | (enable << 7);

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xea);
    buffer.writeUInt8(data);
    buffer.writeUInt16LE(humidity * 2);
    return buffer.toBytes();
}

/**
 * set alarm count
 * @param {number} alarm_count range: [1, 1000]
 * @example { "alarm_count": 10 }
 */
function setAlarmCount(alarm_count) {
    if (typeof alarm_count !== "number") {
        throw new Error("alarm_count must be a number");
    }
    if (alarm_count < 1 || alarm_count > 1000) {
        throw new Error("alarm_count must be in range [1, 1000]");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xf2);
    buffer.writeUInt16LE(alarm_count);
    return buffer.toBytes();
}

/**
 * threshold alarm enable
 * @param {number} threshold_alarm_enable values: (0: "disable", 1: "enable")
 * @example { "threshold_alarm_enable": 1 }
 */
function setThresholdAlarmEnable(threshold_alarm_enable) {
    var threshold_alarm_enable_values = [0, 1];
    if (threshold_alarm_enable_values.indexOf(threshold_alarm_enable) === -1) {
        throw new Error("threshold_alarm_enable must be one of " + threshold_alarm_enable_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0xf5);
    buffer.writeUInt8(threshold_alarm_enable);
    return buffer.toBytes();
}

/**
 * history function configuration
 * @param {number} history_enable
 * @example { "history_enable": 1 }
 */
function setHistoryEnable(history_enable) {
    var history_enable_values = [0, 1];
    if (history_enable_values.indexOf(history_enable) === -1) {
        throw new Error("history_enable must be one of " + history_enable_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xff);
    buffer.writeUInt8(0x68);
    buffer.writeUInt8(history_enable);
    return buffer.toBytes();
}

/**
 * fetch history
 * @param {number} start_time
 * @param {number} end_time
 * @example { "fetch_history": { "start_time": 1609459200, "end_time": 1609545600 } }
 */
function fetchHistory(start_time, end_time) {
    if (typeof start_time !== "number") {
        throw new Error("start_time must be a number");
    }
    if (end_time && typeof end_time !== "number") {
        throw new Error("end_time must be a number");
    }
    if (end_time && start_time > end_time) {
        throw new Error("start_time must be less than end_time");
    }

    var buffer;
    if (end_time === 0) {
        buffer = new Buffer(6);
        buffer.writeUInt8(0xfd);
        buffer.writeUInt8(0x6b);
        buffer.writeUInt32LE(start_time);
    } else {
        buffer = new Buffer(10);
        buffer.writeUInt8(0xfd);
        buffer.writeUInt8(0x6c);
        buffer.writeUInt32LE(start_time);
        buffer.writeUInt32LE(end_time);
    }

    return buffer.toBytes();
}

/**
 * clear history
 * @param {number} clear_history
 * @example { "clear_history": 1 }
 */
function clearHistory(clear_history) {
    var clear_history_values = [0, 1];
    if (clear_history_values.indexOf(clear_history) === -1) {
        throw new Error("clear_history must be one of " + clear_history_values.join(", "));
    }

    if (clear_history === false) {
        return [];
    }
    return [0xff, 0x27, 0x01];
}

/**
 * set retransmit config
 * @param {number} enable values: (0: "disable", 1: "enable")
 * @param {number} interval range: [30, 1200], unit: seconds
 * @example { "retransmit_config": { "enable": 1, "interval": 60 } }
 */
function setRetransmitConfig(enable, interval) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("retransmit_config.enable must be one of " + enable_values.join(", "));
    }
    if (typeof interval !== "number") {
        throw new Error("retransmit_config.interval must be a number");
    }
    if (interval < 30 || interval > 1200) {
        throw new Error("retransmit_config.interval must be in range [30, 1200]");
    }

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x0d);
    buffer.writeUInt8(enable);
    buffer.writeUInt16LE(interval);
    return buffer.toBytes();
}

/**
 * data resend interval
 * @param {number} resend_interval unit: second, range: [30, 1200]
 * @example { "resend_interval": 60 }
 */
function setResendInterval(resend_interval) {
    if (typeof resend_interval !== "number") {
        throw new Error("resend_interval must be a number");
    }
    if (resend_interval < 30 || resend_interval > 1200) {
        throw new Error("resend_interval must be in range [30, 1200]");
    }

    var buffer = new Buffer(4);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x0e);
    buffer.writeUInt16LE(resend_interval);
    return buffer.toBytes();
}

/**
 * history stop transmit
 * @param {number} stop_transmit
 * @example { "stop_transmit": 1 }
 */
function stopTransmit(stop_transmit) {
    var stop_transmit_values = [0, 1];
    if (stop_transmit_values.indexOf(stop_transmit) === -1) {
        throw new Error("stop_transmit must be one of " + stop_transmit_values.join(", "));
    }

    if (stop_transmit === 0) {
        return [];
    }
    return [0xff, 0x6d, 0xff];
}

/**
 * fetch sensor id
 * @param {number} fetch_sensor_id values: (0: "all", 1: "sensor_1")
 * @example { "fetch_sensor_id": 0 }
 */
function fetchSensorID(fetch_sensor_id) {
    var fetch_sensor_id_values = [0, 1];
    if (fetch_sensor_id_values.indexOf(fetch_sensor_id) === -1) {
        throw new Error("fetch_sensor_id must be one of " + fetch_sensor_id_values.join(", "));
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x31);
    buffer.writeUInt8(fetch_sensor_id);
    return buffer.toBytes();
}

/**
 * LoRa confirm ack retry times
 * @param {number} ack_retry_times range: [0, 10]
 * @example { "ack_retry_times": 3 }
 */
function setAckRetryTimes(ack_retry_times) {
    if (typeof ack_retry_times !== "number") {
        throw new Error("ack_retry_times must be a number");
    }
    if (ack_retry_times < 0 || ack_retry_times > 10) {
        throw new Error("ack_retry_times must be in range [0, 10]");
    }

    var buffer = new Buffer(5);
    buffer.writeUInt8(0xf9);
    buffer.writeUInt8(0x32);
    buffer.writeUInt8(0x00);
    buffer.writeUInt8(0x00);
    buffer.writeUInt8(ack_retry_times);
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

Buffer.prototype.writeD2DCommand = function (value, defaultValue) {
    if (typeof value !== "string") {
        value = defaultValue;
    }
    if (value.length !== 4) {
        throw new Error("d2d_cmd length must be 4");
    }
    this.buffer[this.offset] = parseInt(value.substr(2, 2), 16);
    this.buffer[this.offset + 1] = parseInt(value.substr(0, 2), 16);
    this.offset += 2;
};

Buffer.prototype.toBytes = function () {
    return this.buffer;
};
