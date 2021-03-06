(function() {
    angular
        .module("TwitterWallApp")
        .factory("tweetTextManipulationService", tweetTextManipulationService);

    function tweetTextManipulationService() {
        return {
            getDisplayText: getDisplayText,
            getUntruncatedText: getUntruncatedText,
            addHashtag: addHashtag,
            addMention: addMention,
            addDisplayUrls: addDisplayUrls,
            deleteMediaLink: deleteMediaLink,
        };

        function getDisplayText(tweet) {
            var displayText = getUntruncatedText(tweet);
            var displayEntities = getEntities(tweet);

            displayText = addHashtag(displayText, displayEntities.hashtags);
            displayText = addMention(displayText, displayEntities.user_mentions);

            displayText = addDisplayUrls(displayText, displayEntities.urls);

            if (displayEntities.media) {
                displayText = deleteMediaLink(displayText, displayEntities.media);
            }

            displayText = displayText.replace(/https?\:\/\/(www.)?/i, "");

            return displayText;
        }

        function getUntruncatedText(tweet) {
            if (tweet.retweeted_status) {
                return "RT @" + tweet.retweeted_status.user.screen_name + ": " + tweet.retweeted_status.full_text;
            } else {
                return tweet.full_text;
            }
        }

        function getEntities(tweet) {
            if (tweet.retweeted_status) {
                return tweet.retweeted_status.entities;
            } else {
                return tweet.entities;
            }
        }

        function addHashtag(str, hashtags) {
            hashtags.forEach(function(hashtag) {
                var substr = hashtag.text;
                str = str.split("#" + substr).join("<b>#" + substr + "</b>");
            });
            return str;
        }

        function addMention(str, mentions) {
            mentions.forEach(function(mention) {
                var substr = mention.screen_name;
                var match = new RegExp("@" + substr, "i");
                str = str.split(match).join("<b>@" + substr + "</b>");
            });
            return str;
        }

        function addDisplayUrls(str, urls) {
            urls.forEach(function(uri) {
                var substr = uri.url;
                if (uri.expanded_url.length > 50) {
                    //if the link in the tweet is very long then use the included shortened version
                    str = str.split(substr).join("<b>" + uri.url + "</b>");
                } else {
                    str = str.split(substr).join("<b>" + uri.expanded_url + "</b>");
                }

            });
            return str;
        }

        function deleteMediaLink(str, media) {
            media.forEach(function(m) {
                str = str.split(m.url).join("");
            });
            return str;
        }
    }

})();
