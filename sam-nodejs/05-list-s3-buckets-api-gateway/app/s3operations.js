// Create new AWS SDK object(s)
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

class s3ops {

    constructor() {

    }

    getBuckets() {
        let p = new Promise((resolve, reject) => {
            let bucketNames = [];
            s3.listBuckets((err, data) => {
                if (err) return reject(err);
                for (let bucket of data.Buckets) {
                    bucketNames.push(bucket.Name);
                    //console.log("s3://" + bucket.Name); //could be too much, but nothing wrong
                }
                resolve(bucketNames);
            });
        });
        return p;
    }
};

module.exports = s3ops;