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
            Airport
        } = await connectToDatabase()
        const airport = await Airport.create(JSON.parse(event.body))
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(airport)
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
            Airport
        } = await connectToDatabase()
        const airport = await Airport.findById(event.pathParameters.id)
        if (!airport) throw new HTTPError(404, `Airport with id: ${event.pathParameters.id} was not found`)
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(airport)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not fetch the Airport.'
        }
    }
}

module.exports.getAll = async () => {
    try {
        const {
            Airport
        } = await connectToDatabase()
        const airport = await Airport.findAll()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(airport)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Could not fetch the all airports'
        }
    }
}

module.exports.update = async (event) => {
    try {
        const input = JSON.parse(event.body)
        const {
            Airport
        } = await connectToDatabase()
        const airport = await Airport.findById(event.pathParameters.id)
        if (!airport) throw new HTTPError(404, `Airport with id: ${event.pathParameters.id} was not found`)
        if (input.name) airport.name = input.name
        if (input.gate) airport.gate = input.gate
        await airport.save()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(airport)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not update the airport.'
        }
    }
}

module.exports.destroy = async (event) => {
    try {
        const {
            Airport
        } = await connectToDatabase()
        const airport = await Airport.findById(event.pathParameters.id)
        if (!airport) throw new HTTPError(404, `Airport with id: ${event.pathParameters.id} was not found`)
        await airport.destroy()
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(airport)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could destroy fetch the airport.'
        }
    }
}
