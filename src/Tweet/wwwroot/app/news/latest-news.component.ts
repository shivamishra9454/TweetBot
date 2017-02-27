﻿import { Component, OnInit } from '@angular/core';

import { Article } from '../shared/model/article';
import { TweetService } from '../shared/service/tweet.service';
import { LoaderService } from '../shared/service/loader.service';
import { WebApiObservableService } from '../shared/service/web-api-observable.service';
import { WebApiPromiseService } from '../shared/service/web-api-promise.service';
import { ToasterService } from '../shared/service/toaster.service';
//import * as _ from "lodash";

@Component({
    selector: 'latest-news',
    templateUrl: './app/news/latest-news.component.html'
})

export class LatestNewsComponent implements OnInit {
    articleList: Article[];
    sourceList: string[];
    sourceName: string;
    selectAllFlag: boolean;
    selectCounter: number;

    constructor(
        private loaderService: LoaderService,
        private toasterService: ToasterService,
        private webApiObservableService: WebApiObservableService,
        private tweetService: TweetService) {
        this.articleList = [];
        this.sourceList = [];
        this.sourceName = 'All';
        this.selectAllFlag = false;
        this.selectCounter = 0;
    }

    ngOnInit() {
        this.getAllTestNews();
    }

    getAllTestNews() {
        this.articleList = [];
        this.sourceList = [];
        this.webApiObservableService
            .getService('api/Tweet/AllLatestNews')
            .subscribe(
            (result: Article[]) => {
                if (result) {
                    this.sourceList = result.map(item => item.source).filter((value, index, self) => self.indexOf(value) === index);
                    this.sourceList.push('All');
                    this.sourceList.sort();

                    result.forEach((v, i) => {
                        v.selected = false;
                    });

                    this.articleList = result;
                    this.loaderService.display(false);
                    this.toasterService.showToaster('Latest News have been loaded');
                }
            },
            error => {
                this.loaderService.display(false);
                this.toasterService.showToaster(<any>error);
            }
            );
    }

    selectAll() {
        this.selectCounter = 0;
        this.selectAllFlag = !this.selectAllFlag;
        
        this.articleList.forEach((v, i) => {
            this.selectCounter = this.selectAllFlag == true ? this.selectCounter + 1 : 0;
            v.selected = this.selectAllFlag;
        });
    }

    selectOneItem(item: Article) {
        console.log(item.selected);
        item.selected = !item.selected;
        if (item.selected == true) {
            this.selectCounter = this.selectCounter + 1
        } else {
            this.selectCounter = this.selectCounter - 1;
            this.selectAllFlag = false;
        };
    }

    sendTweet(item: Article) {
        this.tweetService.postNewsTweet(item.title, item.url);
    }

    sendAllTweet() {
        this.tweetService.postAllNewsTweet('latest');
    }

    get diagnostic(): string {
        return JSON.stringify("testing");
    }
}