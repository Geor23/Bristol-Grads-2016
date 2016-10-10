describe("columnAssignmentService", function() {

    var columnAssignmentService;

    beforeEach(function() {
        angular.module("ngMaterial", []);
        angular.module("angularMoment", []);
        angular.module("ngSanitize", []);
        module("TwitterWallApp");
    });

    beforeEach(inject(function(_columnAssignmentService_) {
        columnAssignmentService = _columnAssignmentService_;
    }));

    var testColumnDataList;
    var testTweets;
    var testAssignedColumns;
    var testSortedColumns;
    var testBackfilledColumns;

    beforeEach(function() {
        testColumnDataList = [
            new columnAssignmentService.ColumnData(2, function(tweet) {
                return tweet.pinned === true;
            }, function(tweetA, tweetB) {
                return tweetB.pinTime - tweetA.pinTime;
            }),
            new columnAssignmentService.ColumnData(3, function(tweet) {
                return tweet.wallPriority === true;
            }, function(tweetA, tweetB) {
                return tweetB.time - tweetA.time;
            }),
            new columnAssignmentService.ColumnData(3, function(tweet) {
                return true;
            }, function(tweetA, tweetB) {
                return tweetB.time - tweetA.time;
            }),
        ];

        testTweets = [{
            pinned: true,
            time: new Date(5),
            pinTime: new Date(37)
        }, {
            wallPriority: true,
            time: new Date(10)
        }, {
            pinned: false,
            time: new Date(12)
        }, {
            time: new Date(16)
        }, {
            pinned: true,
            time: new Date(20),
            pinTime: new Date(29)
        }, {
            wallPriority: true,
            time: new Date(25)
        }, {
            pinned: false,
            time: new Date(31),
            pinTime: new Date(44)
        }, {
            time: new Date(52)
        }];
        testAssignedColumns = [
            [testTweets[0], testTweets[4]],
            [testTweets[1], testTweets[5]],
            [testTweets[2], testTweets[3], testTweets[6], testTweets[7]],
        ];
        testSortedColumns = [
            [testTweets[0], testTweets[4]],
            [testTweets[5], testTweets[1]],
            [testTweets[7], testTweets[6], testTweets[3], testTweets[2]],
        ];
        testBackfilledColumns = [
            [testTweets[0], testTweets[4]],
            [testTweets[5], testTweets[1]],
            [testTweets[7], testTweets[6], testTweets[3], testTweets[2]],
        ];
    });

    describe("assignColumns", function() {
        it("returns an array of columns, each containing tweets selected by the corresponding selector and no " +
            "selector of higher priority",
            function() {
                var columnList = columnAssignmentService.assignColumns(testTweets, testColumnDataList);
                expect(columnList).toEqual(testAssignedColumns);
            });
    });

    describe("sortColumns", function() {
        it("returns an array of columns, sorted according to the corresponding ordering function", function() {
            var columnList = columnAssignmentService.sortColumns(testAssignedColumns, testColumnDataList);
            expect(columnList).toEqual(testSortedColumns);
        });
    });

    describe("backfillColumns", function() {
        xit("returns an array of columns backfilled according to the backfill algorithm", function() {});
    });

});