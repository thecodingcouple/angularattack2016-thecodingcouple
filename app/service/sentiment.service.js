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
var social_service_1 = require('./social.service');
var http_1 = require('@angular/http');
var SentimentService = (function () {
    function SentimentService(social, http) {
        this.social = social;
        this.http = http;
        this.url = "https://angularattack2016-moody.herokuapp.com/sentiment140/bulkClassifyJson";
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
    }
    SentimentService.prototype.getSentiments = function () {
        var _this = this;
        return this.social.getLatestTweets(0)
            .then(function (tweets) { return _this.http.post(_this.url, JSON.stringify({
            data: tweets.map(function (t) {
                return { text: t.text };
            })
        }), new http_1.RequestOptions({ headers: _this.headers })).toPromise()
            .then(function (response) {
            var sentiments = new Array();
            var data = response.json().data;
            for (var i = 0; i < tweets.length; i++) {
                sentiments.push({
                    username: tweets[i].user,
                    polarity: data[i].polarity,
                    status: tweets[i].text,
                    avatarUrl: tweets[i].profileImageUrl,
                    date: tweets[i].createdAt,
                    profileUrl: tweets[i].url
                });
            }
            return sentiments;
        }); });
    };
    SentimentService.prototype.getSentimentsByUser = function (user) {
        var _this = this;
        return this.social.getUsersTweets(user.id)
            .then(function (tweets) { return _this.http.post(_this.url, JSON.stringify({
            data: tweets.map(function (t) {
                return { text: t.text };
            })
        }), new http_1.RequestOptions({ headers: _this.headers })).toPromise()
            .then(function (response) {
            var sentiments = new Array();
            var data = response.json().data;
            for (var i = 0; i < tweets.length; i++) {
                sentiments.push({
                    username: tweets[i].user,
                    polarity: data[i].polarity,
                    status: tweets[i].text,
                    avatarUrl: tweets[i].profileImageUrl,
                    date: tweets[i].createdAt,
                    profileUrl: tweets[i].url
                });
            }
            return sentiments;
        }); });
    };
    SentimentService.prototype.getUserSentiments = function (user) {
        var _this = this;
        return this.social.getUsersTweets(user.id)
            .then(function (tweets) { return _this.http.post(_this.url, JSON.stringify({
            data: tweets.map(function (t) {
                return { text: t.text };
            })
        }), new http_1.RequestOptions({ headers: _this.headers })).toPromise()
            .then(function (response) {
            var sentiments = new Array();
            var data = response.json().data;
            for (var i = 0; i < tweets.length; i++) {
                sentiments.push({
                    username: tweets[i].user,
                    polarity: data[i].polarity,
                    status: tweets[i].text,
                    avatarUrl: tweets[i].profileImageUrl,
                    date: tweets[i].createdAt,
                    profileUrl: tweets[i].url
                });
            }
            return { user: user, sentimentsByDate: sentiments };
        }); });
    };
    SentimentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [social_service_1.SocialService, http_1.Http])
    ], SentimentService);
    return SentimentService;
}());
exports.SentimentService = SentimentService;
//# sourceMappingURL=sentiment.service.js.map