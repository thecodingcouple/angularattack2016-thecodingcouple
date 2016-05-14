import { Injectable } from '@angular/core';
import { Tweet } from '../model/tweet';

declare var OAuth:any;

@Injectable()
export class SocialService {
    twitter: any;
       
    constructor() {
        OAuth.initialize("6mt4xJ4txgqrt7TGRFnqJLirGYQ");
    }
        
    loginTwitter()  {
        return new Promise((resolve, reject) => 
            OAuth.popup("twitter")
                .done(result => {
                    this.twitter = result;
                    resolve();
                })
                .fail(err => {
                    reject(err);
                }));
    }
    
    getLatestTweets(cursor) : Promise<Tweet[]> {
       let url = '/1.1/statuses/home_timeline.json';
       url += "?count=200";
       if (cursor) {
           url += '&max_id=' + cursor;
       }
       
       return new Promise((resolve, reject) => 
        this.twitter.get(url)
                    .done(response => {
                        let timeline:Tweet[] = new Array();
                        response.forEach(entry => {
                            timeline.push({user: entry.user.name, profileImageUrl: entry.user.profile_image_url, text: entry.text, createdAt: new Date(entry.created_at) }) 
                        });
                        resolve(timeline);
                    })
                    .fail(error => {
                        reject(error);
                    }));
    }   
}