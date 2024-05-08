# bson-to-mongo-query

This tool converts a BSON (extended json) syntax from MongoDB into JS so you
can use it for `insertOne` or `insertMany` if you wish.

## Getting Started

1. Clone this repo and cd
2. Create `bson-input.txt` and paste your content there like:

    ```txt
    [{ parentQueryGroupId: { $oid :
    "628fadb4d370987ac789c0cd" } }]
    ```

3. Two ways to run this:
   - Without Installing Bun `./bson-to-js`
   - If bun is installed: `bun start`
4. The output should be:

    ```js
    [{ parentQueryGroupId: ObjectId("628fadb4d370987ac789c0cd") }]
    ```
