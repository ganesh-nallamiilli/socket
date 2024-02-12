const fs = require('fs');
const xml2js = require('xml2js');

// Parse XML and convert to JSON
function xml_to_json(xmlData){
    console.log(xmlData)
        xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          return;
        }
      
        const isomsg = result.log.send.isomsg;
        const fields = {};
      
        // Convert XML to JSON
        isomsg.field.forEach(field => {
          fields[field.$.id] = field.$.value;
        });
      
        const jsonResult = JSON.stringify(fields, null, 2);
        return jsonResult;
      });
}
module.exports = xml_to_json;
