import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';
import javascript_time_ago from 'javascript-time-ago'
import _get from 'lodash/get';

import { ITweet, ITweetEntitiesMedia } from './../../reducers';
import { TweetProvider } from './../../providers';

javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
const time_ago = new javascript_time_ago('en');
/**
 * Generated class for the TweetComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tweet',
  templateUrl: 'tweet.html',
})
export class TweetComponent {
  media: ITweetEntitiesMedia;
  timeAgo: string;
  text: string;

  @Input() data: ITweet;
  @Input() retweetedStatus: boolean = false;

  constructor(
    public appCtrl: App,
    public tweetProvider: TweetProvider,
  ) { }

  ngOnInit() {
    this.media = _get(this.data, 'entities.media[0]');
    this.timeAgo = time_ago.format(new Date(this.data.created_at));
  }

  goToProfile(handle) {
    this.appCtrl.getRootNav().push('ProfilePage', { handle });
  };

  retweet() {
    return this.tweetProvider.retweet$(!this.data.retweeted, this.data.id_str).subscribe()
  }

  favorite() {
    return this.tweetProvider.favorite$(!this.data.favorited, this.data.id_str).subscribe()
  }
}
