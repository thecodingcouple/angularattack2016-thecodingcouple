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
var sentiment_detail_component_1 = require('./sentiment-detail.component');
var sentiment_filter_component_1 = require('./sentiment-filter.component');
var sentiment_count_summary_component_1 = require('./sentiment-count-summary.component');
var sentiment_chart_component_1 = require('./sentiment-chart.component');
var sentiment_service_1 = require('../service/sentiment.service');
var SentimentsComponent = (function () {
    function SentimentsComponent(sentimentService) {
        this.sentimentService = sentimentService;
        this.selectedUsers = new Array();
    }
    SentimentsComponent.prototype.routerOnActivate = function () {
        var _this = this;
        return this.sentimentService.getSentiments()
            .then(function (sentiments) { return _this.sentiments = sentiments; });
    };
    SentimentsComponent.prototype.usersChanged = function (users) {
        var _this = this;
        this.selectedUsers = users;
        this.sentiments = new Array();
        for (var _i = 0, _a = this.selectedUsers; _i < _a.length; _i++) {
            var user = _a[_i];
            this.sentimentService.getSentimentsByUser(user)
                .then(function (sentiments) { return _this.sentiments = _this.sentiments.concat(sentiments); }).then(function (merged) { return merged.sort(function (a, b) {
                if (a.date.getTime() < b.date.getTime()) {
                    return 1;
                }
                if (a.date.getTime() > b.date.getTime()) {
                    return -1;
                }
                return 0;
            }); });
        }
    };
    SentimentsComponent = __decorate([
        core_1.Component({
            selector: 'sentiments',
            template: "\n        <div class=\"container\">\n            <h1>Sentiments</h1>\n            <section class=\"col-md-3 panel panel-default\">            \n                <sentiment-filter class=\"panel-body\" (usersChanged)=\"usersChanged($event)\"></sentiment-filter>\n            </section>            \n            <span class=\"fa fa-spinner fa-pulse fa-3x fa-fw\" *ngIf=\"!sentiments\"></span>\n            <section class=\"col-md-9 panel panel-default\" *ngIf=\"sentiments\">\n                <section class=\"col-md-6 panel-body\">\n                    <h4>Percentage of Sentiments</h4>\n                    <sentiment-chart [sentiments]=\"sentiments\"></sentiment-chart>\n                </section>\n                <section class=\"col-md-6 panel-body\">\n                    <h4>Number of Sentiments <span class=\"badge\">{{sentiments.length}}</span></h4>\n                    <sentiment-count-summary [sentiments]=\"sentiments\"></sentiment-count-summary>\n                </section>\n                <section class=\"col-md-12 panel-body\">\n                    <h4>Statuses</h4>\n                    <sentiment-detail *ngFor=\"let sentiment of sentiments\" [sentiment]=\"sentiment\"></sentiment-detail>\n                </section>\n            </section>\n        </div>\n    ",
            directives: [
                sentiment_detail_component_1.SentimentDetailComponent,
                sentiment_filter_component_1.SentimentFilterComponent,
                sentiment_count_summary_component_1.SentimentCountSummaryComponent,
                sentiment_chart_component_1.SentimentChartComponent
            ]
        }), 
        __metadata('design:paramtypes', [sentiment_service_1.SentimentService])
    ], SentimentsComponent);
    return SentimentsComponent;
}());
exports.SentimentsComponent = SentimentsComponent;
//# sourceMappingURL=sentiments.component.js.map