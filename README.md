# bson-to-mongo-query

This tool converts a BSON (extended json) syntax from MongoDB into JS so you
can use it for `insertOne` or `insertMany` if you wish.

TODOS:
- [x] Output to console 
- [x] Create a custom parser 
- [x] Output to file (very difficult because new ObjectId isn't serialized as we want.)
- [x] Test cases
- [x] $oid parsing
- [x] $numberInt parsing
- [ ] $numberFloat and etc. parsing
- [ ] $date parsing ?
- [ ] $date parsing
- [ ] Receive bulk inputs

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

4. The output in `bson-output.txt` should be:

    ```js
    [{ parentQueryGroupId: ObjectId("628fadb4d370987ac789c0cd") }]
    ```


## How to Convert in Bulk (WIP)
If you want to convert in bulk, you can separate each using the keyword:
```
// BREAK
```

Input:

```txt
[{ parentQueryGroupId: { $oid : "628fadb4d370987ac789c0cd" } }]

// BREAK

[{ parentQueryGroupId: { $oid :
    "628fadb4d370987ac789c0c1" } }]
```

Output:

```js
[{ parentQueryGroupId: ObjectId("628fadb4d370987ac789c0cd") }]

// BREAK

[{ parentQueryGroupId: ObjectId("628fadb4d370987ac789c0cd") }]
```


