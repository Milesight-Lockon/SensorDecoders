/**
 * Payload Encoder
 *
 * Copyright 2024 Milesight IoT
 *
 * @product GS601
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

    if ("reporting_interval" in payload) {
        encoded = encoded.concat(setReportingInterval(payload.reporting_interval));
    }
    if ("temperature_unit" in payload) {
        encoded = encoded.concat(setTemperatureUnit(payload.temperature_unit));
    }
    if ("led_status" in payload) {
        encoded = encoded.concat(setLedStatus(payload.led_status));
    }
    if ("buzzer_enable" in payload) {
        encoded = encoded.concat(setBuzzerEnable(payload.buzzer_enable));
    }
    if ("buzzer_sleep" in payload) {
        if ("item_1" in payload.buzzer_sleep) {
            encoded = encoded.concat(setBuzzerSleepSettings(0, payload.buzzer_sleep.item_1.enable, payload.buzzer_sleep.item_1.start_time, payload.buzzer_sleep.item_1.end_time));
        }
        if ("item_2" in payload.buzzer_sleep) {
            encoded = encoded.concat(setBuzzerSleepSettings(1, payload.buzzer_sleep.item_2.enable, payload.buzzer_sleep.item_2.start_time, payload.buzzer_sleep.item_2.end_time));
        }
    }
    if ("buzzer_button_stop_enable" in payload) {
        encoded = encoded.concat(setBuzzerButtonStopEnable(payload.buzzer_button_stop_enable));
    }
    if ("buzzer_silent_time" in payload) {
        encoded = encoded.concat(setBuzzerSilentTime(payload.buzzer_silent_time));
    }
    if ("tamper_alarm_enable" in payload) {
        encoded = encoded.concat(setTamperAlarmEnable(payload.tamper_alarm_enable));
    }
    if ("tvoc_raw_reporting_enable" in payload) {
        encoded = encoded.concat(setTvocRawReportingEnable(payload.tvoc_raw_reporting_enable));
    }
    if ("temperature_alarm_settings" in payload) {
        encoded = encoded.concat(setTemperatureAlarmSettings(payload.temperature_alarm_settings.enable, payload.temperature_alarm_settings.threshold_condition, payload.temperature_alarm_settings.threshold_min, payload.temperature_alarm_settings.threshold_max));
    }
    if ("humidity_alarm_settings" in payload) {
        encoded = encoded.concat(setHumidityAlarmSettings(payload.humidity_alarm_settings.enable, payload.humidity_alarm_settings.threshold_condition, payload.humidity_alarm_settings.threshold_min, payload.humidity_alarm_settings.threshold_max));
    }
    if ("pm1_0_alarm_settings" in payload) {
        encoded = encoded.concat(setPM1AlarmSettings(payload.pm1_0_alarm_settings.enable, payload.pm1_0_alarm_settings.threshold_condition, payload.pm1_0_alarm_settings.threshold_min, payload.pm1_0_alarm_settings.threshold_max));
    }
    if ("pm2_5_alarm_settings" in payload) {
        encoded = encoded.concat(setPM25AlarmSettings(payload.pm2_5_alarm_settings.enable, payload.pm2_5_alarm_settings.threshold_condition, payload.pm2_5_alarm_settings.threshold_min, payload.pm2_5_alarm_settings.threshold_max));
    }
    if ("pm10_alarm_settings" in payload) {
        encoded = encoded.concat(setPM10AlarmSettings(payload.pm10_alarm_settings.enable, payload.pm10_alarm_settings.threshold_condition, payload.pm10_alarm_settings.threshold_min, payload.pm10_alarm_settings.threshold_max));
    }
    if ("tvoc_alarm_settings" in payload) {
        encoded = encoded.concat(setTVOCAlarmSettings(payload.tvoc_alarm_settings.enable, payload.tvoc_alarm_settings.threshold_condition, payload.tvoc_alarm_settings.threshold_min, payload.tvoc_alarm_settings.threshold_max));
    }
    if ("vaping_index_alarm_settings" in payload) {
        encoded = encoded.concat(setVapingIndexAlarmSettings(payload.vaping_index_alarm_settings.enable, payload.vaping_index_alarm_settings.threshold_condition, payload.vaping_index_alarm_settings.threshold_min, payload.vaping_index_alarm_settings.threshold_max));
    }
    if ("alarm_reporting_times" in payload) {
        encoded = encoded.concat(setAlarmReportingTimes(payload.alarm_reporting_times));
    }
    if ("alarm_deactivation_enable" in payload) {
        encoded = encoded.concat(setAlarmDeactivateEnable(payload.alarm_deactivation_enable));
    }
    if ("temperature_calibration_settings" in payload) {
        encoded = encoded.concat(setTemperatureCalibrationSettings(payload.temperature_calibration_settings.enable, payload.temperature_calibration_settings.calibration_value));
    }
    if ("humidity_calibration_settings" in payload) {
        encoded = encoded.concat(setHumidityCalibrationSettings(payload.humidity_calibration_settings.enable, payload.humidity_calibration_settings.calibration_value));
    }
    if ("pm1_0_calibration_settings" in payload) {
        encoded = encoded.concat(setPM1CalibrationSettings(payload.pm1_0_calibration_settings.enable, payload.pm1_0_calibration_settings.calibration_value));
    }
    if ("pm2_5_calibration_settings" in payload) {
        encoded = encoded.concat(setPM25CalibrationSettings(payload.pm2_5_calibration_settings.enable, payload.pm2_5_calibration_settings.calibration_value));
    }
    if ("pm10_calibration_settings" in payload) {
        encoded = encoded.concat(setPM10CalibrationSettings(payload.pm10_calibration_settings.enable, payload.pm10_calibration_settings.calibration_value));
    }
    if ("tvoc_calibration_settings" in payload) {
        encoded = encoded.concat(setTVOCCalibrationSettings(payload.tvoc_calibration_settings.enable, payload.tvoc_calibration_settings.calibration_value));
    }
    if ("vaping_index_calibration_settings" in payload) {
        encoded = encoded.concat(setVapingIndexCalibrationSettings(payload.vaping_index_calibration_settings.enable, payload.vaping_index_calibration_settings.calibration_value));
    }
    if ("time_zone" in payload) {
        encoded = encoded.concat(setTimeZone(payload.time_zone));
    }
    if ("daylight_saving_time" in payload) {
        encoded = encoded.concat(setDaylightSavingTimeSettings(payload.daylight_saving_time.daylight_saving_time_enable, payload.daylight_saving_time.daylight_saving_time_offset, payload.daylight_saving_time.start_month, payload.daylight_saving_time.start_week_num, payload.daylight_saving_time.start_week_day, payload.daylight_saving_time.start_hour_min, payload.daylight_saving_time.end_month, payload.daylight_saving_time.end_week_num, payload.daylight_saving_time.end_week_day, payload.daylight_saving_time.end_hour_min));
    }
    if ("reboot" in payload) {
        encoded = encoded.concat(reboot());
    }
    if ("synchronize_time" in payload) {
        encoded = encoded.concat(synchronizeTime());
    }
    if ("query_device_status" in payload) {
        encoded = encoded.concat(queryDeviceStatus());
    }
    if ("reconnect" in payload) {
        encoded = encoded.concat(reconnect());
    }
    if ("stop_buzzer_alarm" in payload) {
        encoded = encoded.concat(stopBuzzerAlarm());
    }
    if ("execute_tvoc_self_clean" in payload) {
        encoded = encoded.concat(executeTvocSelfClean());
    }

    return encoded;
}

/**
 * Set report interval
 *
 * @param {object} reporting_interval
 * @param {number} reporting_interval.unit values: (0: second, 1: minute)
 * @param {number} reporting_interval.seconds_of_time unit: second
 * @param {number} reporting_interval.minutes_of_time unit: minute
 * @example { "reporting_interval": { "unit": 0, "seconds_of_time": 300 } }
 */
function setReportingInterval(reporting_interval) {
    var uint_values = [0, 1];
    if (uint_values.indexOf(reporting_interval.unit) === -1) {
        throw new Error("reporting_interval.unit must be one of " + uint_values.join(", "));
    }
    if (reporting_interval.unit === 0 && (reporting_interval.seconds_of_time < 10 || reporting_interval.seconds_of_time > 64800)) {
        throw new Error("reporting_interval.seconds_of_time must be between 10 and 64800 when reporting_interval.unit is 0");
    }
    if (reporting_interval.unit === 1 && (reporting_interval.minutes_of_time < 1 || reporting_interval.minutes_of_time > 1440)) {
        throw new Error("reporting_interval.minutes_of_time must be between 1 and 1440 when reporting_interval.unit is 1");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x60);
    buffer.writeUInt8(reporting_interval.unit);
    buffer.writeUInt16LE(reporting_interval.seconds_of_time || reporting_interval.minutes_of_time);

    return buffer.toBytes();
}

/**
 * Set temperature unit
 *
 * @param {number} temperature_unit values: (0: Celsius, 1: Fahrenheit)
 * @example { "temperature_unit": 0 }
 */
function setTemperatureUnit(temperature_unit) {
    var temperature_unit_values = [0, 1];
    if (temperature_unit_values.indexOf(temperature_unit) === -1) {
        throw new Error("temperature_unit must be one of " + temperature_unit_values.join(", "));
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x61);
    buffer.writeUInt8(temperature_unit);

    return buffer.toBytes();
}

/**
 * Set led indicator
 *
 * @param {number} led_status values: (0: disable, 1: enable)
 * @example { "led_status": 1 }
 */
function setLedStatus(led_status) {
    var led_status_values = [0, 1];
    if (led_status_values.indexOf(led_status) === -1) {
        throw new Error("led_status must be one of " + led_status_values.join(", "));
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x62);
    buffer.writeUInt8(led_status);

    return buffer.toBytes();
}

/**
 * Set buzzer enable
 *
 * @param {number} buzzer_enable values: (0: disable, 1: enable)
 * @example { "buzzer_enable": 1 }
 */
function setBuzzerEnable(buzzer_enable) {
    var buzzer_enable_values = [0, 1];
    if (buzzer_enable_values.indexOf(buzzer_enable) === -1) {
        throw new Error("buzzer_enable must be one of " + buzzer_enable_values.join(", "));
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x63);
    buffer.writeUInt8(buzzer_enable);

    return buffer.toBytes();
}

/**
 * Set buzzer sleep settings
 *
 * @param {number} index
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} start_time unit: minute
 * @param {number} end_time unit: minute
 * @example { "buzzer_sleep": { "item_1": { "enable": 1, "start_time": 0, "end_time": 1440 }, "item_2": { "enable": 1, "start_time": 0, "end_time": 1440 }} }
 */
function setBuzzerSleepSettings(index, enable, start_time, end_time) {
    var index_values = [0, 1];
    if (index_values.indexOf(index) === -1) {
        throw new Error("buzzer_sleep.item_1 or buzzer_sleep.item_2");
    }
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("buzzer_sleep.item_" + index + ".enable must be one of " + enable_values.join(", "));
    }
    if (start_time < 0 || start_time > 1440) {
        throw new Error("buzzer_sleep.item_" + index + ".start_time must be between 0 and 1440");
    }
    if (end_time < 0 || end_time > 1440) {
        throw new Error("buzzer_sleep.item_" + index + ".end_time must be between 0 and 1440");
    }

    var buffer = new Buffer(6);
    buffer.writeUInt8(0x64);
    buffer.writeUInt8(index);
    buffer.writeUInt8(enable);
    buffer.writeUInt16LE(start_time);
    buffer.writeUInt16LE(end_time);

    return buffer.toBytes();
}

/**
 * Set buzzer button stop enable
 *
 * @param {number} buzzer_button_stop_enable values: (0: disable, 1: enable)
 * @example { "buzzer_button_stop_enable": 1 }
 */
function setBuzzerButtonStopEnable(buzzer_button_stop_enable) {
    var buzzer_button_stop_enable_values = [0, 1];
    if (buzzer_button_stop_enable_values.indexOf(buzzer_button_stop_enable) === -1) {
        throw new Error("buzzer_button_stop_enable must be one of " + buzzer_button_stop_enable_values.join(", "));
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x65);
    buffer.writeUInt8(buzzer_button_stop_enable);

    return buffer.toBytes();
}

/**
 * Set buzzer silent time
 *
 * @param {number} buzzer_silent_time unit: minute, range: 1-1440
 * @example { "buzzer_silent_time": 10 }
 */
function setBuzzerSilentTime(buzzer_silent_time) {
    if (buzzer_silent_time < 1 || buzzer_silent_time > 1440) {
        throw new Error("buzzer_silent_time must be between 1 and 1440");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x66);
    buffer.writeUInt16LE(buzzer_silent_time);

    return buffer.toBytes();
}

/**
 * Set tamper alarm enable
 *
 * @param {number} tamper_alarm_enable values: (0: disable, 1: enable)
 * @example { "tamper_alarm_enable": 1 }
 */
function setTamperAlarmEnable(tamper_alarm_enable) {
    var tamper_alarm_enable_values = [0, 1];
    if (tamper_alarm_enable_values.indexOf(tamper_alarm_enable) === -1) {
        throw new Error("tamper_alarm_enable must be one of " + tamper_alarm_enable_values.join(", "));
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x67);
    buffer.writeUInt8(tamper_alarm_enable);

    return buffer.toBytes();
}

/**
 * Set tvoc raw data report
 *
 * @param {number} tvoc_raw_reporting_enable values: (0: disable, 1: enable)
 * @example { "tvoc_raw_reporting_enable": 1 }
 */
function setTvocRawReportingEnable(tvoc_raw_reporting_enable) {
    var tvoc_raw_reporting_enable_values = [0, 1];
    if (tvoc_raw_reporting_enable_values.indexOf(tvoc_raw_reporting_enable) === -1) {
        throw new Error("tvoc_raw_reporting_enable must be one of " + tvoc_raw_reporting_enable_values.join(", "));
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x68);
    buffer.writeUInt8(tvoc_raw_reporting_enable);

    return buffer.toBytes();
}

/**
 * Set temperature threshold config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} condition values: (1: less than, 2: greater than, 3: between, 4: outside)
 * @param {number} min_value unit: Celsius
 * @param {number} max_value unit: Celsius
 * @example { "temperature_threshold_config": { "enable": 1, "condition": 2, "min_value": 30, "max_value": 40 } }
 */
function setTemperatureThresholdConfig(enable, condition, min_value, max_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("temperature_threshold_config.enable must be one of " + enable_values.join(", "));
    }
    var condition_values = [1, 2, 3, 4];
    if (condition_values.indexOf(condition) === -1) {
        throw new Error("temperature_threshold_config.condition must be one of " + condition_values.join(", "));
    }

    var buffer = new Buffer(6);
    buffer.writeUInt8(0x69);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(condition);
    buffer.writeInt16LE(min_value * 10);
    buffer.writeInt16LE(max_value * 10);

    return buffer.toBytes();
}

/**
 * Set pm1.0 alarm settings
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} condition values: (1: less than, 2: greater than, 3: between, 4: outside)
 * @param {number} min_value unit: mg/m3
 * @param {number} max_value unit: mg/m3
 * @example { "pm1_0_alarm_settings": { "enable": 1, "condition": 2, "min_value": 30, "max_value": 40 } }
 */
function setPM1AlarmSettings(enable, condition, min_value, max_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("pm_1_0_alarm_settings.enable must be one of " + enable_values.join(", "));
    }
    var condition_values = [1, 2, 3, 4];
    if (condition_values.indexOf(condition) === -1) {
        throw new Error("pm_1_0_alarm_settings.condition must be one of " + condition_values.join(", "));
    }

    var buffer = new Buffer(6);
    buffer.writeUInt8(0x6a);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(condition);
    buffer.writeInt16LE(min_value * 10);
    buffer.writeInt16LE(max_value * 10);

    return buffer.toBytes();
}

/**
 * Set pm2.5 threshold config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} condition values: (1: less than, 2: greater than, 3: between, 4: outside)
 * @param {number} min_value unit: mg/m3
 * @param {number} max_value unit: mg/m3
 * @example { "pm2_5_alarm_settings": { "enable": 1, "condition": 2, "min_value": 30, "max_value": 40 } }
 */
function setPM25AlarmSettings(enable, condition, min_value, max_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("pm_2_5_alarm_settings.enable must be one of " + enable_values.join(", "));
    }
    var condition_values = [1, 2, 3, 4];
    if (condition_values.indexOf(condition) === -1) {
        throw new Error("pm_2_5_alarm_settings.condition must be one of " + condition_values.join(", "));
    }

    var buffer = new Buffer(6);
    buffer.writeUInt8(0x6b);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(condition);
    buffer.writeInt16LE(min_value * 10);
    buffer.writeInt16LE(max_value * 10);
}

/**
 * Set pm10 threshold config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} condition values: (1: less than, 2: greater than, 3: between, 4: outside)
 * @param {number} min_value unit: mg/m3
 * @param {number} max_value unit: mg/m3
 * @example { "pm10_alarm_settings": { "enable": 1, "condition": 2, "min_value": 30, "max_value": 40 } }
 */
function setPM10AlarmSettings(enable, condition, min_value, max_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("pm_10_alarm_settings.enable must be one of " + enable_values.join(", "));
    }
    var condition_values = [1, 2, 3, 4];
    if (condition_values.indexOf(condition) === -1) {
        throw new Error("pm_10_alarm_settings.condition must be one of " + condition_values.join(", "));
    }

    var buffer = new Buffer(6);
    buffer.writeUInt8(0x6c);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(condition);
    buffer.writeInt16LE(min_value * 10);
    buffer.writeInt16LE(max_value * 10);

    return buffer.toBytes();
}

/**
 * Set tvoc alarm settings
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} condition values: (1: less than, 2: greater than, 3: between, 4: outside)
 * @param {number} min_value unit: ppm
 * @param {number} max_value unit: ppm
 * @example { "tvoc_alarm_settings": { "enable": 1, "condition": 2, "min_value": 30, "max_value": 40 } }
 */
function setTVOCAlarmSettings(enable, condition, min_value, max_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("tvoc_threshold_config.enable must be one of " + enable_values.join(", "));
    }
    var condition_values = [1, 2, 3, 4];
    if (condition_values.indexOf(condition) === -1) {
        throw new Error("tvoc_threshold_config.condition must be one of " + condition_values.join(", "));
    }

    var buffer = new Buffer(6);
    buffer.writeUInt8(0x6d);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(condition);
    buffer.writeInt16LE(min_value);
    buffer.writeInt16LE(max_value);

    return buffer.toBytes();
}

/**
 * Set vaping index alarm settings
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} threshold_condition values: (1: less than, 2: greater than, 3: between, 4: outside)
 * @param {number} threshold_min
 * @param {number} threshold_max
 * @example { "vaping_index_alarm_settings": { "enable": 1, "threshold_condition": 2, "threshold_min": 1, "threshold_max": 4 } }
 */
function setVapingIndexAlarmSettings(enable, threshold_condition, threshold_min, threshold_max) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("vaping_index_alarm_settings.enable must be one of " + enable_values.join(", "));
    }
    var threshold_condition_values = [1, 2, 3, 4];
    if (threshold_condition_values.indexOf(threshold_condition) === -1) {
        throw new Error("vaping_index_alarm_settings.threshold_condition must be one of " + threshold_condition_values.join(", "));
    }

    var buffer = new Buffer(5);
    buffer.writeUInt8(0x6e);
    buffer.writeUInt8(enable);
    buffer.writeUInt8(threshold_condition);
    buffer.writeInt16LE(threshold_min);
    buffer.writeInt16LE(threshold_max);

    return buffer.toBytes();
}

/**
 * Set alarm reporting times
 *
 * @param {number} alarm_reporting_times range: [1, 1000]
 * @example { "alarm_reporting_times": 10 }
 */
function setAlarmReportingTimes(alarm_reporting_times) {
    if (alarm_reporting_times < 1 || alarm_reporting_times > 1000) {
        throw new Error("alarm_reporting_times must be between 1 and 1000");
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x6f);
    buffer.writeUInt16LE(alarm_reporting_times);

    return buffer.toBytes();
}

/**
 * Set alarm deactivate enable
 *
 * @param {number} alarm_deactivate_enable values: (0: disable, 1: enable)
 * @example { "alarm_deactivate_enable": 1 }
 */
function setAlarmDeactivateEnable(alarm_deactivate_enable) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(alarm_deactivate_enable) === -1) {
        throw new Error("alarm_deactivate_enable must be one of " + enable_values.join(", "));
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x70);
    buffer.writeUInt8(alarm_deactivate_enable);

    return buffer.toBytes();
}

/**
 * Set temperature calibration config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} calibration_value unit: Celsius, range: [-80, 80]
 * @example { "temperature_calibration_settings": { "enable": 1, "calibration_value": 20 } }
 */
function setTemperatureCalibrationSettings(enable, calibration_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("temperature_calibration_settings.enable must be one of " + enable_values.join(", "));
    }
    if (calibration_value < -80 || calibration_value > 80) {
        throw new Error("temperature_calibration_settings.calibration_value must be between -80 and 80");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x71);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(calibration_value * 10);

    return buffer.toBytes();
}

/**
 * Set humidity calibration config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} calibration_value unit: %, range: [-100, 100]
 * @example { "humidity_calibration_settings": { "enable": 1, "calibration_value": 50 } }
 */
function setHumidityCalibrationSettings(enable, calibration_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("humidity_calibration_settings.enable must be one of " + enable_values.join(", "));
    }
    if (calibration_value < -100 || calibration_value > 100) {
        throw new Error("humidity_calibration_settings.calibration_value must be between -100 and 100");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x72);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(calibration_value * 10);

    return buffer.toBytes();
}

/**
 * Set pm1 calibration config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} calibration_value unit: mg/m3, range: [-1000, 1000]
 * @example { "pm1_0_calibration_settings": { "enable": 1, "calibration_value": 10 } }
 */
function setPM1CalibrationSettings(enable, calibration_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("pm1_calibration_config.enable must be one of " + enable_values.join(", "));
    }
    if (calibration_value < -1000 || calibration_value > 1000) {
        throw new Error("pm1_0_calibration_settings.calibration_value must be between -1000 and 1000");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x73);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(calibration_value);

    return buffer.toBytes();
}

/**
 * Set pm2.5 calibration config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} calibration_value unit: mg/m3, range: [-1000, 1000]
 * @example { "pm2_5_calibration_settings": { "enable": 1, "calibration_value": 10 } }
 */
function setPM25CalibrationSettings(enable, calibration_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("pm2_5_calibration_config.enable must be one of " + enable_values.join(", "));
    }
    if (calibration_value < -1000 || calibration_value > 1000) {
        throw new Error("pm2_5_calibration_settings.calibration_value must be between -1000 and 1000");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x74);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(calibration_value);

    return buffer.toBytes();
}

/**
 * Set pm10 calibration config
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} calibration_value unit: mg/m3, range: [-1000, 1000]
 * @example { "pm10_calibration_settings": { "enable": 1, "calibration_value": 10 } }
 */
function setPM10CalibrationSettings(enable, calibration_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("pm10_calibration_config.enable must be one of " + enable_values.join(", "));
    }
    if (calibration_value < -1000 || calibration_value > 1000) {
        throw new Error("pm10_calibration_settings.calibration_value must be between -1000 and 1000");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x75);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(calibration_value);

    return buffer.toBytes();
}

/**
 * Set tvoc calibration settings
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} calibration_value unit: ppm, range: [-2000, 2000]
 * @example { "tvoc_calibration_settings": { "enable": 1, "calibration_value": 10 } }
 */
function setTVOCCalibrationSettings(enable, calibration_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("tvoc_calibration_settings.enable must be one of " + enable_values.join(", "));
    }
    if (calibration_value < -2000 || calibration_value > 2000) {
        throw new Error("tvoc_calibration_settings.calibration_value must be between -2000 and 2000");
    }

    var buffer = new Buffer(3);
    buffer.writeUInt8(0x76);
    buffer.writeUInt8(enable);
    buffer.writeInt16LE(calibration_value);

    return buffer.toBytes();
}

/**
 * Set vaping index calibration settings
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} calibration_value range: [-100, 100]
 * @example { "vaping_index_calibration_settings": { "enable": 1, "calibration_value": 10 } }
 */
function setVapingIndexCalibrationSettings(enable, calibration_value) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("vaping_index_calibration_settings.enable must be one of " + enable_values.join(", "));
    }
    if (calibration_value < -100 || calibration_value > 100) {
        throw new Error("vaping_index_calibration_settings.calibration_value must be between -100 and 100");
    }

    var buffer = new Buffer(2);
    buffer.writeUInt8(0x77);
    buffer.writeUInt8(enable);
    buffer.writeInt8(calibration_value);

    return buffer.toBytes();
}

/**
 * Set Timezone
 *
 * @param {number} time_zone values: (-720: UTC-12, -660: UTC-11, -600: UTC-10, -570: UTC-9:30, -540: UTC-9, -480: UTC-8,
 *                                  -420: UTC-7, -360: UTC-6, -300: UTC-5, -240: UTC-4, -210: UTC-3:30, -180: UTC-3, -120: UTC-2, -60: UTC-1,
 *                                  0: UTC, 60: UTC+1, 120: UTC+2, 180: UTC+3, 210: UTC+3:30, 240: UTC+4, 270: UTC+4:30, 300: UTC+5, 330: UTC+5:30,
 *                                  345: UTC+5:45, 360: UTC+6, 390: UTC+6:30, 420: UTC+7, 480: UTC+8, 540: UTC+9, 570: UTC+9:30, 600: UTC+10, 630: UTC+10:30,
 *                                  660: UTC+11, 720: UTC+12, 765: UTC+12:45, 780: UTC+13, 840: UTC+14)
 * @example { "time_zone": 480 }
 */
function setTimeZone(time_zone) {
    var buffer = new Buffer(2);
    buffer.writeUInt8(0xc7);
    buffer.writeInt16LE(time_zone);

    return buffer.toBytes();
}

/**
 * Set daylight saving time settings
 *
 * @param {number} enable values: (0: disable, 1: enable)
 * @param {number} offset unit: minutes
 * @param {number} start_month values: (1: January, 2: February, 3: March, 4: April, 5: May, 6: June, 7: July, 8: August, 9: September, 10: October, 11: November, 12: December)
 * @param {number} start_week_num values: (1: First week, 2: Second week, 3: Third week, 4: Fourth week, 5: Last week)
 * @param {number} start_week_day values: (1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday, 7: Sunday)
 * @param {number} start_hour_min unit: minutes
 * @param {number} end_month values: (1: January, 2: February, 3: March, 4: April, 5: May, 6: June, 7: July, 8: August, 9: September, 10: October, 11: November, 12: December)
 * @param {number} end_week_num values: (1: First week, 2: Second week, 3: Third week, 4: Fourth week, 5: Last week)
 * @param {number} end_week_day values: (1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday, 7: Sunday)
 * @param {number} end_hour_min unit: minutes
 * @example { "daylight_saving_time": { "enable": 1, "offset": 60, "start_month": 3, "start_week": 1, "start_day": 1, "start_time": 0, "end_month": 11, "end_week": 4, "end_day": 7, "end_time": 120 } }
 */
function setDaylightSavingTimeSettings(enable, offset, start_month, start_week_num, start_week_day, start_hour_min, end_month, end_week_num, end_week_day, end_hour_min) {
    var enable_values = [0, 1];
    if (enable_values.indexOf(enable) === -1) {
        throw new Error("daylight_saving_time.enable must be one of " + enable_values.join(", "));
    }
    var month_values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if (month_values.indexOf(start_month) === -1 || month_values.indexOf(end_month) === -1) {
        throw new Error("daylight_saving_time.start_month and end_month must be one of " + month_values.join(", "));
    }
    var week_values = [1, 2, 3, 4, 5];
    if (week_values.indexOf(start_week_num) === -1 || week_values.indexOf(end_week_num) === -1) {
        throw new Error("daylight_saving_time.start_week_num and end_week_num must be one of " + week_values.join(", "));
    }
    var day_values = [1, 2, 3, 4, 5, 6, 7];
    if (day_values.indexOf(start_week_day) === -1 || day_values.indexOf(end_week_day) === -1) {
        throw new Error("daylight_saving_time.start_week_day and end_week_day must be one of " + day_values.join(", "));
    }

    var start_day_value = (start_week_num << 4) | start_week_day;
    var end_day_value = (end_week_num << 4) | end_week_day;

    var buffer = new Buffer(11);
    buffer.writeUInt8(0xc6);
    buffer.writeUInt8(enable);
    buffer.writeInt8(offset);
    buffer.writeUInt8(start_month);
    buffer.writeUInt8(start_day_value);
    buffer.writeUInt16LE(start_hour_min);
    buffer.writeUInt8(end_month);
    buffer.writeUInt8(end_day_value);
    buffer.writeUInt16LE(end_hour_min);

    return buffer.toBytes();
}

/**
 * Reboot
 */
function reboot() {
    var buffer = new Buffer(1);
    buffer.writeUInt8(0xbe);
    return buffer.toBytes();
}

/**
 * Synchronize time
 *
 * @example { "synchronize_time": 1 }
 */
function synchronizeTime() {
    var buffer = new Buffer(1);
    buffer.writeUInt8(0xb8);
    return buffer.toBytes();
}

/**
 * Query device status
 *
 * @example { "query_device_status": 1 }
 */
function queryDeviceStatus() {
    var buffer = new Buffer(1);
    buffer.writeUInt8(0xb9);
    return buffer.toBytes();
}

/**
 * Reconnect
 *
 * @example { "reconnect": 1 }
 */
function reconnect() {
    var buffer = new Buffer(1);
    buffer.writeUInt8(0xb6);
    return buffer.toBytes();
}

/**
 * Stop buzzer alarm
 *
 * @example { "stop_buzzer_alarm": 1 }
 */
function stopBuzzerAlarm() {
    var buffer = new Buffer(1);
    buffer.writeUInt8(0x5f);
    return buffer.toBytes();
}

/**
 * Execute TVOC self clean
 *
 * @example { "execute_tvoc_self_clean": 1 }
 */
function executeTvocSelfClean() {
    var buffer = new Buffer(1);
    buffer.writeUInt8(0x5e);
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
