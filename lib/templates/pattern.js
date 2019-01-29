/**
 * init <%= title %>
 * @alias <%= camelcase %>
 * @namespace AP
 * @return {Object} public methods
 */

const <%= camelcase %> = (context) => {
    // private functions

    // public functions
    const mod = {
        init: function () {
            context.classList.add('AP_st-init');
            console.log('init <%= camelcase %>')
        }
    }
    return mod;
}
export default <%= camelcase %>;
