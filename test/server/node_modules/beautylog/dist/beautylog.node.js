/// <reference path="./typings/main.d.ts" />
"use strict";
exports.log = require("./beautylog.node.log");
exports.table = require("./beautylog.node.table");
//handle figlet
var figletModule = require("./beautylog.node.figlet");
exports.figlet = figletModule.figlet;
exports.figletSync = figletModule.figletSync;
/**
 * logs an directory to console
 * @param logText
 * @returns {boolean}
 */
exports.dir = function (logText) {
    return exports.log(logText, 'dir');
};
/**
 * logs an error to console
 * @param logText
 * @returns {boolean}
 */
exports.error = function (logText) {
    return exports.log(logText, 'error');
};
/**
 * logs an info to console
 * @param logText
 * @returns {boolean}
 */
exports.info = function (logText) {
    return exports.log(logText, 'info');
};
/**
 * logs an 'OK!' message to console
 * @param logText
 * @returns {boolean}
 */
exports.ok = function (logText) {
    return exports.log(logText, 'ok');
};
/**
 * logs a success to console
 * @param logText string to log as error
 * @returns {boolean}
 */
exports.success = function (logText) {
    return exports.log(logText, 'success');
};
/**
 * logs a 'warn:' message to console
 * @param logText string to log as error
 * @returns {boolean}
 */
exports.warn = function (logText) {
    return exports.log(logText, 'warn');
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlYXV0eWxvZy5ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRDQUE0Qzs7QUFFOUIsV0FBRyxXQUFXLHNCQUFzQixDQUFDLENBQUM7QUFDdEMsYUFBSyxXQUFXLHdCQUF3QixDQUFDLENBQUM7QUFFeEQsZUFBZTtBQUNmLElBQU8sWUFBWSxXQUFXLHlCQUF5QixDQUFDLENBQUM7QUFDOUMsY0FBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7QUFDN0Isa0JBQVUsR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDO0FBQ2hEOzs7O0dBSUc7QUFDUSxXQUFHLEdBQUcsVUFBUyxPQUFPO0lBQzdCLE1BQU0sQ0FBQyxXQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUdGOzs7O0dBSUc7QUFDUSxhQUFLLEdBQUcsVUFBUyxPQUFPO0lBQy9CLE1BQU0sQ0FBQyxXQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxZQUFJLEdBQUcsVUFBUyxPQUFPO0lBQzlCLE1BQU0sQ0FBQyxXQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxVQUFFLEdBQUcsVUFBUyxPQUFPO0lBQzVCLE1BQU0sQ0FBQyxXQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxlQUFPLEdBQUcsVUFBUyxPQUFPO0lBQ2pDLE1BQU0sQ0FBQyxXQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDUSxZQUFJLEdBQUcsVUFBUyxPQUFPO0lBQzlCLE1BQU0sQ0FBQyxXQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLENBQUMsQ0FBQyIsImZpbGUiOiJiZWF1dHlsb2cubm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL3R5cGluZ3MvbWFpbi5kLnRzXCIgLz5cblxuZXhwb3J0IGltcG9ydCBsb2cgPSByZXF1aXJlKFwiLi9iZWF1dHlsb2cubm9kZS5sb2dcIik7XG5leHBvcnQgaW1wb3J0IHRhYmxlID0gcmVxdWlyZShcIi4vYmVhdXR5bG9nLm5vZGUudGFibGVcIik7XG5cbi8vaGFuZGxlIGZpZ2xldFxuaW1wb3J0IGZpZ2xldE1vZHVsZSA9IHJlcXVpcmUoXCIuL2JlYXV0eWxvZy5ub2RlLmZpZ2xldFwiKTtcbmV4cG9ydCBsZXQgZmlnbGV0ID0gZmlnbGV0TW9kdWxlLmZpZ2xldDtcbmV4cG9ydCBsZXQgZmlnbGV0U3luYyA9IGZpZ2xldE1vZHVsZS5maWdsZXRTeW5jO1xuLyoqXG4gKiBsb2dzIGFuIGRpcmVjdG9yeSB0byBjb25zb2xlXG4gKiBAcGFyYW0gbG9nVGV4dFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBsZXQgZGlyID0gZnVuY3Rpb24obG9nVGV4dCkge1xuICAgIHJldHVybiBsb2cobG9nVGV4dCwgJ2RpcicpO1xufTtcblxuXG4vKipcbiAqIGxvZ3MgYW4gZXJyb3IgdG8gY29uc29sZVxuICogQHBhcmFtIGxvZ1RleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgbGV0IGVycm9yID0gZnVuY3Rpb24obG9nVGV4dCkge1xuICAgIHJldHVybiBsb2cobG9nVGV4dCwgJ2Vycm9yJyk7XG59O1xuXG4vKipcbiAqIGxvZ3MgYW4gaW5mbyB0byBjb25zb2xlXG4gKiBAcGFyYW0gbG9nVGV4dFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBsZXQgaW5mbyA9IGZ1bmN0aW9uKGxvZ1RleHQpIHtcbiAgICByZXR1cm4gbG9nKGxvZ1RleHQsICdpbmZvJyk7XG59O1xuXG4vKipcbiAqIGxvZ3MgYW4gJ09LIScgbWVzc2FnZSB0byBjb25zb2xlXG4gKiBAcGFyYW0gbG9nVGV4dFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBsZXQgb2sgPSBmdW5jdGlvbihsb2dUZXh0KSB7XG4gICAgcmV0dXJuIGxvZyhsb2dUZXh0LCAnb2snKTtcbn07XG5cbi8qKlxuICogbG9ncyBhIHN1Y2Nlc3MgdG8gY29uc29sZVxuICogQHBhcmFtIGxvZ1RleHQgc3RyaW5nIHRvIGxvZyBhcyBlcnJvclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBsZXQgc3VjY2VzcyA9IGZ1bmN0aW9uKGxvZ1RleHQpIHtcbiAgICByZXR1cm4gbG9nKGxvZ1RleHQsICdzdWNjZXNzJyk7XG59O1xuXG4vKipcbiAqIGxvZ3MgYSAnd2FybjonIG1lc3NhZ2UgdG8gY29uc29sZVxuICogQHBhcmFtIGxvZ1RleHQgc3RyaW5nIHRvIGxvZyBhcyBlcnJvclxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBsZXQgd2FybiA9IGZ1bmN0aW9uKGxvZ1RleHQpIHtcbiAgICByZXR1cm4gbG9nKGxvZ1RleHQsICd3YXJuJyk7XG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
