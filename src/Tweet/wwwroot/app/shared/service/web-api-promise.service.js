"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var toaster_service_1 = require("./toaster.service");
var loader_service_1 = require("./loader.service");
var WebApiPromiseService = (function () {
    function WebApiPromiseService(http, loaderService, toasterService) {
        this.http = http;
        this.loaderService = loaderService;
        this.toasterService = toasterService;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
    }
    WebApiPromiseService.prototype.getService = function (url) {
        this.loaderService.display(true);
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.getServiceWithDynamicQueryTerm = function (url, key, val) {
        this.loaderService.display(true);
        return this.http
            .get(url + "/?" + key + "=" + val, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.getServiceWithFixedQueryString = function (url, param) {
        this.loaderService.display(true);
        this.options = new http_1.RequestOptions({ headers: this.headers, search: 'query=' + param });
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.getServiceWithComplexObjectAsQueryString = function (url, param) {
        this.loaderService.display(true);
        var params = new http_1.URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                var val = param[key];
                params.set(key, val);
            }
        }
        this.options = new http_1.RequestOptions({ headers: this.headers, search: params });
        return this.http
            .get(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.createService = function (url, param) {
        this.loaderService.display(true);
        var body = JSON.stringify(param);
        return this.http
            .post(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.updateService = function (url, param) {
        var body = JSON.stringify(param);
        return this.http
            .put(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.patchService = function (url, param) {
        this.loaderService.display(true);
        var body = JSON.stringify(param);
        return this.http
            .patch(url, body, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.deleteService = function (url, param) {
        this.loaderService.display(true);
        var params = new http_1.URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                var val = param[key];
                params.set(key, val);
            }
        }
        this.options = new http_1.RequestOptions({ headers: this.headers, search: params });
        return this.http
            .delete(url, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.deleteServiceWithId = function (url, key, val) {
        this.loaderService.display(true);
        return this.http
            .delete(url + "/?" + key + "=" + val, this.options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    WebApiPromiseService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    WebApiPromiseService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    return WebApiPromiseService;
}());
WebApiPromiseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        loader_service_1.LoaderService,
        toaster_service_1.ToasterService])
], WebApiPromiseService);
exports.WebApiPromiseService = WebApiPromiseService;
//# sourceMappingURL=web-api-promise.service.js.map