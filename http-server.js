const http = require("http");
const { join } = require("path");
const url = require('url')
const PORT = 8500

// const serverHandler = (request, response) => {
//     // if (req.url == "/cities") {
//     //     const data = ["raipur", "durg"]
//     //     res.end(JSON.stringify(data))
//     // }
//     const { url: request_url, method } = request
//     // console.log(url, "URL");
//     // console.log(method, "METHOD");
//     // response.end();

//     const { pathname, query } = url.parse(request_url, true)
//     console.log(request_url, pathname, query);

var database = [
    {
        id: 1,
        name: "Bhilai",
        places: 0
    },
    {
        id: 2,
        name: " Raipur",
        places: 2
    },
    {
        "id": 3,
        "name": "Durg",
        "places": 10
    }
];



//     // if (pathname == "/cities" && method == "GET") {
//     if (pathname == "/cities" && method == "GET") {
//         response.writeHead(200, { "Content-Type": "application/json" });
//         const result = {
//             success: true,
//             data: DATBASE,
//             message: "API found",
//         };
//         res.end(JSON.stringify(result));

//     } else if (pathname == "/cities/add" && method == "POST") {

//     } else if (pathname == "/cities/update" && method == "PUT") {

//     } else if (pathname == "/cities/delete" && method == "DELETE") {

//     } else {
//         response.writeHead(404, { 'Content-Type': 'application/json' })

//         const result = {
//             success: flase,

//             message: "API NOT FOUND "
//         }
//         response.end(JSON.stringify(result))
//     }

//     response.end();
// };

// const server = http.createServer(serverHandler);

// server.listen(PORT, () => {
//     console.log("server is running atport :", PORT)
// })

const serverHandler = (req, res) => {
    const { url: reqUrl, method } = req;
    const { pathname, query } = url.parse(reqUrl, true); //for accepting the query we do true
    //this id thing is called query, the way this url is written it is query
    console.log(reqUrl, pathname, query); //{{localhostbaseurl}}cities/delete?id=10 query seperate before and after the ?

    if (pathname == "/cities" && method == "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const result = {
            success: true,
            data: database,
            message: "API found",
        };
        res.end(JSON.stringify(result));


    } else if (pathname == "/cities/add" && method == "POST") {

        let body = ""
        req.on("data" , (chunk) =>{
            body+= chunk.toString()
        })  

        req.on("end", () =>{
            const REQUES_PAYLOAD = JSON.parse(body)
            console.log(REQUES_PAYLOAD);
            const {name,adventure} = REQUES_PAYLOAD;
            database.push({
                id:database.length+1,
                name,
                adventure
            })
            res.writeHead(201, { "Content-Type": "application/json" });
            const result = {
                success: true,
                data: database,
                message: "ADDED",
            };

            res.end();
        })

    } else if (pathname == "/cities/update" && method == "PUT") {

        const{id} = query;
        
        const index = database.findIndex((item) => item.id = id);
        if (!id) {
            res.writeHead(400, { "content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: false,
                    message: "Id not found",
                })
            );
        }

        let body= ""
        req.on("data",(chunk)=>{
            body+=chunk.toString()
        })

        req.on("end",()=>{
            const REQUES_PAYLOAD = JSON.parse(body)
            const {name,adventure} = REQUES_PAYLOAD;

            const cityIndex= database.findIndex((element)=>{
                return element.id=id
            })

            const citydata  = JSON.parse(JSON.stringify(database[cityIndex]))

            if(name){
                citydata.name= name
            }

            if(adventure){
                citydata.adventure= adventure
            }

            database.splice(cityIndex,1,citydata)

            res.writeHead(200,{ "content-Type": "application/json" })

            res.end(JSON.stringify({
                success: true,
                data: citydata // Corrected to return the updated city data
            }));
        })
        




    } else if (pathname == "/cities/delete" && method == "DELETE") {

        const { id } = query;
        if (!id) {
            res.writeHead(400, { "content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    success: false,
                    message: "Id not found",
                })
            );
        }
        const index = database.findIndex((city) => {
            return city.id === id;
        });
        database.splice(index, 1);
        res.writeHead(200, { "Content-Type": "application/json" });
        const result = {
            success: true,
            message: "City deleted successfully",
        };
        res.end(JSON.stringify(result));
    } else {
   
        res.writeHead(404, { "Content-Type": "application/json" });
        const result = {
            success: false,
            message: "API not found",
        };
        res.end(JSON.stringify(result));
    }
    // console.log(url, method);
    // if (req.url == "/cities") {
    //     const data = ["raipur", "durg"];
    //     res.end(JSON.stringify(data));
    // }
    // console.log(req.url);
};

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
    console.log("server is running atport :", PORT)
})