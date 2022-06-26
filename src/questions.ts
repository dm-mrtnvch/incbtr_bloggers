// 1. IF WE DON'T VALIDATE bloggerId IN MIDDLEWARE WE ALWAYS GET result.ok: 1
// how to result?
// using result.value | result.lastErrorObject.updatedExisting

// ID EXISTS:

// {
//     lastErrorObject: { n: 1, updatedExisting: true },
//     value: {
//         _id: new ObjectId("62b85e94f0f79b2a87f818e0"),
//             id: 1656250004659,
//             name: 'ne222w n22ame',
//             youtubeUrl: 'https://someurl.com'
//     },
//     ok: 1,
//         '$clusterTime': {
//     clusterTime: new Timestamp({ t: 1656253516, i: 13 }),
//         signature: {
//         hash: new Binary(Buffer.from("1b9264ea26d40013522568db90174513a839537f", "hex"), 0),
//             keyId: new Long("7047989977812041732")
//     }
// },
//     operationTime: new Timestamp({ t: 1656253516, i: 13 })
// }


// ID DOESN'T EXIST:

//{
//   lastErrorObject: { n: 0, updatedExisting: false },
//   value: null,
//   ok: 1,
//   '$clusterTime': {
//     clusterTime: new Timestamp({ t: 1656253523, i: 1 }),
//     signature: {
//       hash: new Binary(Buffer.from("96e82d9a8a14b014b1aa91c85edf8e5c84b0db49", "hex"), 0),
//       keyId: new Long("7047989977812041732")
//     }
//   },
//   operationTime: new Timestamp({ t: 1656253523, i: 1 })
// }
