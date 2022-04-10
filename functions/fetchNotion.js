const { Client } = require("@notionhq/client")

const {NOTION_KEY, NOTON_DB} = process.env

const notion = new Client({
  auth: NOTION_KEY,
})

exports.handler = async function (event, context) {
    try {
        const response = await notion.databases.query({
            database_id: NOTON_DB,
            filter: {
                property: "Status",
                select: {
                    equals: "Live"
                }
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        }
    } catch(e) {
        console.log(e);
        return {
            statusCode: 500,
            body: e.toString()
        }
    }
    
}