var App;
(function (App) {
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
    App.autoBind = autoBind;
})(App || (App = {}));
