("use strict");
const config = require("../config")[env];
const sql = require("mssql");

/**
 * Submit the payload to the Dynamics WFM table.
 *
 * @param {*} payload - The payload containing the data to be inserted into the Dynamics WFM table.
 * @return {*} - Returns the response from the database query.
 */
const submitDynWFM = async (payload) => {
    try {
        let pool = await sql.connect(config.mssql);
        // Construct the SQL query
        let dbQuery = `INSERT INTO ${config.mssql.database}.dbo.${config.mssql.dynamicsTable} 
        ([Indicator ID], [Type], Status, [Customer Type], [Schedule Date], [Schedule Time From], [Schedule Time To], Link, [Entity Name], [Enity Key], [Customer Name], Email, [HOA Flag], [Monthly Bill Cycle], [Order ID], [Sold by ID], Create_Dtm, Owner)
        VALUES(ISNULL((SELECT MAX(CAST([Indicator ID] AS INT)) FROM ${config.mssql.database}.dbo.${config.mssql.dynamicsTable}), 0) + 1, '${payload?.caseType}', '${payload?.caseStatus}', '${payload?.customerType}', '${payload?.scheduleDate}', '${payload?.scheduleTimeFrom}',  '${payload?.scheduleTimeTo}', '${payload?.linkToDynamics}',  '${payload?.enityName}',  '${payload?.entityId}',  '${payload?.customerName}',  '${payload?.customerEmail}', '${payload?.hoaFlag}','${payload?.monthlyBillCycle}', '${payload?.orderId}', '${payload?.soldById}', '${(new Date()).toLocaleDateString()}', '${payload?.owner}')`;

        console.log("submitFalloutWFM query:", dbQuery);
        // Execute the database query
        let res = await pool.request().query(dbQuery);
        sql.close();
        console.log("submitFalloutWFM query response:", res);
    } catch (ex) {
        sql.close();
        console.error("some error occured while inserting into dynamics Table: " + ex);
    }
};

module.exports = {
    submitDynWFM
}
