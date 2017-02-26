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
var core_1 = require('@angular/core');
var web_api_observable_service_1 = require('./web-api-observable.service');
var toaster_service_1 = require('./toaster.service');
var TweetService = (function () {
    function TweetService(toasterService, webApiObservableService) {
        this.toasterService = toasterService;
        this.webApiObservableService = webApiObservableService;
    }
    TweetService.prototype.postNewsTweet = function (title, url) {
        var _this = this;
        var content = title.substring(0, 100) + ' ' + url;
        this.webApiObservableService
            .getServiceWithFixedQueryString('api/Tweet/PostTweet', content)
            .subscribe(function (result) {
            _this.toasterService.showToaster("Post with title: " + title + " is tweeted");
        }, function (error) {
            _this.toasterService.showToaster(error);
        });
    };
    TweetService.prototype.postAllNewsTweet = function (sortBy) {
        var _this = this;
        var url = sortBy == 'latest' ? 'TweetAllLatestNews' : 'TweetAllTopNews';
        console.log(url);
        this.webApiObservableService
            .getService('api/Tweet/' + url)
            .subscribe(function (result) {
            _this.toasterService.showToaster("All latest news posts are tweeted");
        }, function (error) {
            _this.toasterService.showToaster(error);
        });
    };
    TweetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [toaster_service_1.ToasterService, web_api_observable_service_1.WebApiObservableService])
    ], TweetService);
    return TweetService;
}());
exports.TweetService = TweetService;
//# sourceMappingURL=tweet.service.js.map