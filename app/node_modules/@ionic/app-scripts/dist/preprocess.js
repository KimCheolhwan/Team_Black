"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var logger_1 = require("./logger/logger");
var Constants = require("./util/constants");
var errors_1 = require("./util/errors");
var glob_util_1 = require("./util/glob-util");
var helpers_1 = require("./util/helpers");
var optimization_1 = require("./optimization");
var deep_linking_1 = require("./deep-linking");
var bundle_components_1 = require("./core/bundle-components");
function preprocess(context) {
    var logger = new logger_1.Logger("preprocess");
    return preprocessWorker(context).then(function () {
        logger.finish();
    })
        .catch(function (err) {
        var error = new errors_1.BuildError(err.message);
        error.isFatal = true;
        throw logger.fail(error);
    });
}
exports.preprocess = preprocess;
function preprocessWorker(context) {
    var bundlePromise = bundle_components_1.bundleCoreComponents(context);
    var deepLinksPromise = helpers_1.getBooleanPropertyValue(Constants.ENV_PARSE_DEEPLINKS) ? deep_linking_1.deepLinking(context) : Promise.resolve();
    var componentSassPromise = lookUpDefaultIonicComponentPaths(context);
    return Promise.all([bundlePromise, deepLinksPromise, componentSassPromise])
        .then(function () {
        if (context.optimizeJs) {
            return optimization_1.optimization(context, null);
        }
    }).then(function () {
        if (helpers_1.getBooleanPropertyValue(Constants.ENV_AOT_WRITE_TO_DISK)) {
            writeFilesToDisk(context);
        }
    });
}
function writeFilesToDisk(context) {
    fs_extra_1.emptyDirSync(context.tmpDir);
    var files = context.fileCache.getAll();
    files.forEach(function (file) {
        var dirName = path_1.dirname(file.path);
        var relativePath = path_1.relative(process.cwd(), dirName);
        var tmpPath = path_1.join(context.tmpDir, relativePath);
        var fileName = path_1.basename(file.path);
        var fileToWrite = path_1.join(tmpPath, fileName);
        fs_extra_1.mkdirpSync(tmpPath);
        fs_extra_1.writeFileSync(fileToWrite, file.content);
    });
}
exports.writeFilesToDisk = writeFilesToDisk;
function preprocessUpdate(changedFiles, context) {
    var promises = [];
    if (changedFiles.some(function (cf) { return cf.ext === '.scss'; })) {
        promises.push(bundle_components_1.bundleCoreComponents(context));
    }
    if (helpers_1.getBooleanPropertyValue(Constants.ENV_PARSE_DEEPLINKS)) {
        promises.push(deep_linking_1.deepLinkingUpdate(changedFiles, context));
    }
    return Promise.all(promises);
}
exports.preprocessUpdate = preprocessUpdate;
function lookUpDefaultIonicComponentPaths(context) {
    var componentsDirGlob = path_1.join(helpers_1.getStringPropertyValue(Constants.ENV_VAR_IONIC_ANGULAR_DIR), 'components', '**', '*.scss');
    var srcDirGlob = path_1.join(helpers_1.getStringPropertyValue(Constants.ENV_VAR_SRC_DIR), '**', '*.scss');
    return glob_util_1.globAll([componentsDirGlob, srcDirGlob]).then(function (results) {
        var componentPathSet = new Set();
        results.forEach(function (result) {
            componentPathSet.add(result.absolutePath);
        });
        context.moduleFiles = Array.from(componentPathSet);
    });
}
exports.lookUpDefaultIonicComponentPaths = lookUpDefaultIonicComponentPaths;
