const Redis = require('ioredis');

const redis = new Redis();

// redis.set("key", "value");

// redis.get("key", (err, result) => {
//     if(err) {
//         console.log("Err---------------->", err);
//     } else if(result){
//         console.log("result----------------->", result);
//     } else {
//         console.log("result------------------>", result)
//     }
// })

// redis.sadd('set', 1, 3, 5, 7);
// redis.sadd('set', [1, 3, 5, 7]);

// redis.pipeline().set('foo', 'bar').get('foo', function (err, result) {
//     // result === 'bar'
//     console.log("result----------->", result)
//   }).exec(function (err, result) {
//     // result[1][1] === 'bar'
//     console.log("result[1][1]---------------------->", result[1][1])
//   });

// redis.multi().set('first', "1").get('first').exec((err, result)=> {
//     console.log("multi_result--------------------->", result[1][1])
// } )

const ioRedisBasics = async () => {
    const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto' ]
    const PLANETS_LIST_KEY = 'planets';

    // lpush command adds new values to the head of the list
    const listLength = await redis.lpush(PLANETS_LIST_KEY, planets);
    console.log(`LPUSH, planets list length is ${listLength}.`);

    //lrange function is used to retrive some planets
    const somePlanets = await redis.lrange(PLANETS_LIST_KEY, 0,4);
    console.log("LRANGE, retrived:");
    console.log(somePlanets);
}

try {
    ioRedisBasics();
} catch (error) {
    console.log(error)
}

const pipelineRedisBasics = async() => {
    //pipeline with chained comments
    await redis.pipeline()
        .hset('planet:mercury', 'name', 'Mercury', 'diameter', 4879, 'diameterUnit', 'km')
        .hset('planet:venus', 'name', 'Venus', 'diameter', 4879, 'diameterUnit', 'km')
        .hset('planet:earth', 'name', 'Earth', 'diameter', 4879, 'diameterUnit', 'km')
        .hset('planet:pluto', 'name', 'Pluto', 'diameter', 4879, 'diameterUnit', 'km')
        .exec();
    
    //Get results from pipeline.
    const pipeResults  = await redis.pipeline()
        .hgetall('planet:venus')
        .hgetall('planet:earth')
        .exec();
    console.log('Pipeline results:');
    console.log(pipeResults);
}

try {
    pipelineRedisBasics();
} catch (error) {
    console.log(error)
}


