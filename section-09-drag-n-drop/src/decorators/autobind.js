"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoBind = void 0;
// autoBind Decorator
function autoBind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}
exports.autoBind = autoBind;
