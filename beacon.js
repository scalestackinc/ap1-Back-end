"use strict";

const connectToDatabase = require('./db');

function HTTPError(statusCode, message) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

module.exports.create = async (event) => {
    try {
        const {
            Beacon
        } = await connectToDatabase()
        const beacon = await Beacon.create(JSON.parse(event.body))
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(beacon)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Data cannot be created'
        }
    }
}

module.exports.getOne = async (event) => {
    try {
        const {
            Beacon
        } = await connectToDatabase()
        const beacon = await Beacon.findById(event.pathParameters.id)
        if (!beacon) throw new HTTPError(404, `Beacon with id: ${event.pathParameters.id} was not found`)
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(beacon)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not fetch the beacon.'
        }
    }
}

module.exports.getAll = async () => {
    try {
        const {
            Beacon
        } = await connectToDatabase()
        const beacon = await Beacon.findAll()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(beacon)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Could not fetch the all beacons'
        }
    }
}

module.exports.update = async (event) => {
    try {
        const input = JSON.parse(event.body)
        const {
            Beacon
        } = await connectToDatabase()
        const beacon = await Beacon.findById(event.pathParameters.id)
        if (!beacon) throw new HTTPError(404, `Beacon with id: ${event.pathParameters.id} was not found`)
        if (input.major) beacon.major = input.major
        if (input.minor) beacon.minor = input.minor
        await beacon.save()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(beacon)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not update the beacon.'
        }
    }
}

module.exports.destroy = async (event) => {
    try {
        const {
            Beacon
        } = await connectToDatabase()
        const beacon = await Beacon.findById(event.pathParameters.id)
        if (!beacon) throw new HTTPError(404, `Beacon with id: ${event.pathParameters.id} was not found`)
        await beacon.destroy()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(beacon)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could destroy fetch the beacon.'
        }
    }
}
