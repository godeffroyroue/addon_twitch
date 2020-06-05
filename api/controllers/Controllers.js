const axios = require('axios');
var client_db = require('../../database.js');
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
// const { check, validationResult } = require('express-validator');

/**
 * @api {post} /users/register Request Register User
 * @apiName PostRegister
 * @apiGroup Users
 *
 * @apiParam {String} username User username.
 * @apiParam {String} password User password.
 *
 * @apiSuccess (201) {Number} status 201.
 * @apiSuccess (201) {String} message The account has been created.
 */
function register_trello(req) {
    return new Promise((resolve) => {
        try {
            var unique = false;
            bcrypt.hash(req.body.password, 5, function(err, pwd) {
                client_db.query('SELECT id FROM users WHERE username=$1', [req.body.username], function(err, result) {
                    if(result.rows[0])
                        return (resolve({'status': 400, 'message': 'This username [' + req.body.username + '] is already registered'}));
                    else {
                        jsonStr = JSON.stringify({"Board": []});
                        client_db.query('INSERT INTO users (id, username, password, email_confirmed, board) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), req.body.username, pwd, false, jsonStr], function(err, result) {
                            if (err){console.log(err);}
                            else {
                                return (resolve({'status': 201, 'message': 'The account has been created.'}));
                            }
                        });
                    }
                });
            });
        }
        catch(e) {
            return (resolve({'status': 500, 'message': 'Internal server error (' + e + ')'}));
        }
    })
}

exports.testmescouilles = async(req, res) => {
    jsonString = {"lol": "lol"}
    console.log("request test mes couilles");
    res.status(200).json(jsonString);
}

/**
 * @api {post} /users/login Request Login User
 * @apiName PostLogin
 * @apiGroup Users
 *
 * @apiParam {String} username User username.
 * @apiParam {String} password User password.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message Successful authentication.
 */
function login_trello(req) {
    return new Promise((resolve) => {
        try {
            client_db.query('SELECT * FROM users WHERE username=$1', [req.body.username], function(err, result) {
            if (result.rows[0]) {
                bcrypt.compare(req.body.password, result.rows[0].password, function(err, result) {
                    if (result) {
                        return (resolve({'status': 200, 'message': 'Successful authentication'}));
                    }
                    else {
                        return (resolve({'status': 400, 'message': 'This password is not valid for this username: [' + req.body.username + ']'}));
                    }
                });
            }
            else {
                return (resolve({'status': 400, 'message': 'No user has been found with this username [' + req.body.username + ']'}));
            }
            });
        }
        catch(e) {
            return (resolve({'status': 500, 'message': 'Internal server error (' + e + ')'}));
        }
    })
    
}

exports.login = async(req, res) => {
    console.log(req.body);
    response = await login_trello(req);
    if (response) {
        console.log(response);
        res.status(200).json(response);
    }
    else {
        res.send("KO");
    }
}

/**
 * @api {get} /users/ Request Get User
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {String} username User username.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {UUID} id User uuid.
 * @apiSuccess (200) {String} username User username.
 * @apiSuccess (200) {String} password Hashed user password.
 * @apiSuccess (200) {Boolean} email_confirmed (true,false).
 * @apiSuccess (200) {Object} board Json array with all user boards.
 */
exports.get_profile = async(req, res) => {
    if (!req.query.username)
        res.status(400).json({"status": 400, "message": "username key is required"});
    else {
        client_db.query('SELECT * FROM users WHERE username=$1', [req.query.username], function(err, result) {
            if (result.rows[0])
                res.status(200).json(result.rows[0]);
            else {
                res.status(400).json({"status": 400, "message": "No user has been found with this username:" + req.query.username});
            }
        })
    }
}

function add_access_to_board(username, uuid, board_name) {
    return new Promise((resolve) => {
        try {
            client_db.query('SELECT * FROM users WHERE username=$1', [username], function(err, result) {
                if (result.rows[0]) {
                    jsonStr = result.rows[0].board;
                    console.log(jsonStr);
                    console.log(jsonStr.length);
                    for(var i=0; i<jsonStr["Board"].length; i++) {
                        if(jsonStr["Board"][i].uuid === uuid)
                            return resolve("KO");
                    }
                    jsonStr['Board'].push({"name": board_name, "uuid": uuid});
                    jsonStr = JSON.stringify(jsonStr);
                    client_db.query("UPDATE users SET board=$1 WHERE username=$2", [jsonStr, username], function(err, result) {
                        if (result)
                            return resolve("OK");
                        else
                            return resolve("KO");
                    });
                }
                else
                    return resolve("KO");
            });
        }
        catch(e) {
            return (resolve({'status': 500, 'message': 'Internal server error (' + e + ')'}));
        }
    })
}

/**
 * @api {post} /trello/board Request Post Board
 * @apiName PostBoard
 * @apiGroup EpiBoard
 *
 * @apiParam {String} board_name Board name that will be created.
 * @apiParam {String} username User username.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message Board with xxxxx created.
 * @apiSuccess (200) {UUID} uuid New board uuid.
 */
exports.create_board = async(req, res) => {
    if (!req.body.board_name || !req.body.username)
        return res.status(400).json({status: 400, message: "board_name, username are required"});
    else {
        new_uuid = uuidv4();
        jsonStr = JSON.stringify({"name": req.body.board_name, "background": "", "uuid": new_uuid, "List": []});
            client_db.query('INSERT INTO data_board (id, name, data) VALUES ($1, $2, $3)', [new_uuid, req.body.board_name, jsonStr], async function(err, result) {
                if (err)
                    return res.status(500).json(err);
                else {
                    access = await add_access_to_board(req.body.username, new_uuid, req.body.board_name);
                    if (access)
                        return res.status(200).json({status: 200, message: "Board with name:" + req.body.board_name + " created.", "uuid": new_uuid});
                }
            });
    }
}

function remove_list(jsonStr, list_uuid) {
    for (var k = 0; k < jsonStr["List"].length; k++) {
        if (list_uuid == jsonStr["List"][k]["uuid"]) {
            jsonStr["List"].splice(k, 1);
            return (jsonStr);
        }
    }
    return jsonStr;
}

/**
 * @api {delete} /trello/list Request Delete List
 * @apiName DeleteList
 * @apiGroup EpiList
 *
 * @apiParam {UUID} board_uuid Board uuid.
 * @apiParam {UUID} list_uuid List uuid that will be deleted.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message Your list with uuid=xxx has been deleted.
 */
exports.delete_list = async(req, res) => {
    if (!req.body.board_uuid || !req.body.list_uuid)
        return res.status(400).json({"status": 400, "message": "board_uuid, list_name are required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.body.board_uuid], async function(err, result) {
            if (result.rows[0]) {
                jsonStr = result.rows[0].data;
                newJson = await remove_list(jsonStr, req.body.list_uuid);
                if (newJson) {
                    jsonStr = JSON.stringify(newJson);
                    client_db.query("UPDATE data_board SET data=$1 WHERE id=$2", [jsonStr, req.body.board_uuid], function(err, result) {
                        if (result)
                            return res.status(200).json({"status": 200, "message": "You list with uuid=" + req.body.list_uuid + " has been deleted."}).
                        else
                            return res.status(500).json(err);
                    })
                }
            }
            else
                return res.status(500).json(err);
        });
    }
}

function rework_list(jsonStr, list_uuid, list_name) {
    for (var k = 0; k < jsonStr["List"].length; k++) {
        if (list_uuid == jsonStr["List"][k]["uuid"]) {
            jsonStr["List"][k]["name"] = list_name;
            return (jsonStr);
        }
    }
    return jsonStr;
}

/**
 * @api {put} /trello/list Request Put List
 * @apiName PutList
 * @apiGroup EpiList
 *
 * @apiParam {UUID} board_uuid Board uuid.
 * @apiParam {UUID} list_uuid List uuid that will be updated.
 * @apiParam {String} list_name New list name.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message You list with uuid=xxxx has been updated with updated list_name:xxxx.
 */
exports.update_list = async(req, res) => {
    if (!req.body.board_uuid || !req.body.list_uuid || !req.body.list_name)
        return res.status(400).json({"status": 400, "message": "board_uuid, list_uuid, list_name are required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.body.board_uuid], async function(err, result) {
            if (result.rows[0]) {
                jsonStr = result.rows[0].data;
                newJson = await rework_list(jsonStr, req.body.list_uuid, req.body.list_name);
                if (newJson) {
                    jsonStr = JSON.stringify(newJson);
                    client_db.query("UPDATE data_board SET data=$1 WHERE id=$2", [jsonStr, req.body.board_uuid], function(err, result) {
                        if (result)
                            return res.status(200).json({"status": 200, "message": "You list with uuid=" + req.body.list_uuid + " has been updated with updated list_name:" + req.body.list_name + "."}).
                        else
                            return res.status(500).json(err);
                    })
                }
            }
            else
                return res.status(500).json(err);
        });
    }
}

/**
 * @api {post} /trello/list Request Post List
 * @apiName PostList
 * @apiGroup EpiList
 *
 * @apiParam {UUID} board_uuid Board uuid.
 * @apiParam {String} list_name New list name.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message Your list with uuid=xxx has been created.
 * @apiSuccess (200) {UUID} uuid New list uuid.
 */
exports.create_list = async(req, res) => {
    console.log(req.body);
    if (!req.body.board_uuid || !req.body.list_name)
        return res.status(400).json({"status": 400, "message": "board_uuid, list_name are required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.body.board_uuid], function(err, result) {
            if (result.rows[0]) {
                console.log(result.rows[0].data);
                list_uuid = uuidv4();
                jsonStr = result.rows[0].data;
                jsonStr['List'].push({"name" : req.body.list_name, "uuid": list_uuid, "Card": []});
                jsonStr = JSON.stringify(jsonStr);
                client_db.query("UPDATE data_board SET data=$1 WHERE id=$2", [jsonStr, req.body.board_uuid], function(err, result) {
                    if (result)
                        return res.status(200).json({"status": 200, "message": "You list with uuid=" + list_uuid + " has been created.", "uuid": list_uuid});
                    else
                        return res.status(500).json(err);
                })
            }
            else
                return res.status(500).json(err);
        });
    }
}

function add_card(jsonStr, list_uuid, card_name, card_uuid) {
    for (var k = 0; k < jsonStr["List"].length; k++) {
        if (list_uuid == jsonStr["List"][k]["uuid"]) {
            jsonStr["List"][k]["Card"].push({"name": card_name, "uuid": card_uuid});
            return (jsonStr);
        }
    }
    return jsonStr;
}

/**
 * @api {post} /trello/card Request Post Card
 * @apiName PostCard
 * @apiGroup EpiCard
 *
 * @apiParam {UUID} board_uuid Board uuid.
 * @apiParam {UUID} list_uuid List uuid.
 * @apiParam {String} card_name Card name.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message Your list with uuid=xxx has been updated with new card:xxx.
 * @apiSuccess (200) {UUID} uuid UUID card.
 */
exports.create_card = async(req, res) => {
    if (!req.body.board_uuid || !req.body.list_uuid || !req.body.card_name)
        return res.status(400).json({"status": 400, "message": "board_uuid, list_uuid, card_name are required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.body.board_uuid], async function(err, result) {
            if (result.rows[0]) {
                card_uuid = uuidv4();
                jsonStr = result.rows[0].data;
                console.log(jsonStr);
                console.log(jsonStr["List"]);
                console.log(jsonStr["List"].length);
                console.log(jsonStr["List"][0]["uuid"]);
                newJson = await add_card(jsonStr, req.body.list_uuid, req.body.card_name, card_uuid);
                if (newJson) {
                    jsonStr = JSON.stringify(newJson);
                    client_db.query("UPDATE data_board SET data=$1 WHERE id=$2", [jsonStr, req.body.board_uuid], function(err, result) {
                        if (result)
                            return res.status(200).json({"status": 200, "message": "You list with uuid=" + req.body.list_uuid + " has been updated with new card:" + req.body.card_name + ".", "uuid": card_uuid}).
                        else
                            return res.status(500).json(err);
                    })
                }
            }
            else
                return res.status(500).json(err);
        });
    }
}

/**
 * @api {delete} /trello/card Request Delete Card
 * @apiName DeleteCard
 * @apiGroup EpiCard
 *
 * @apiParam {UUID} board_uuid Board uuid.
 * @apiParam {UUID} list_uuid List uuid.
 * @apiParam {UUID} list_uuid Card uuid that will be deleted.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message Your list with uuid=xxx has been deleted.
 */
function remove_card(jsonStr, list_uuid, card_uuid) {
    for (var k = 0; k < jsonStr["List"].length; k++) {
        if (list_uuid == jsonStr["List"][k]["uuid"]) {
            for (var i = 0; i < jsonStr["List"][k]["Card"].length; i++) {
                if (jsonStr["List"][k]["Card"][i]["uuid"] == card_uuid) {
                    jsonStr["List"][k]["Card"].splice(i, 1);
                    return (jsonStr);
                }
            }
            return (jsonStr);
        }
    }
    return jsonStr;
}

exports.delete_card = async(req, res) => {
    if (!req.body.board_uuid || !req.body.list_uuid || !req.body.card_uuid)
        return res.status(400).json({"status": 400, "message": "board_uuid, list_uuid, card_uuid are required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.body.board_uuid], async function(err, result) {
            if (result.rows[0]) {
                jsonStr = result.rows[0].data;
                newJson = await remove_card(jsonStr, req.body.list_uuid, req.body.card_uuid);
                if (newJson) {
                    jsonStr = JSON.stringify(newJson);
                    client_db.query("UPDATE data_board SET data=$1 WHERE id=$2", [jsonStr, req.body.board_uuid], function(err, result) {
                        if (result)
                            return res.status(200).json({"status": 200, "message": "You list with uuid=" + req.body.list_uuid + " has been updated with deleted card:" + req.body.card_uuid + "."}).
                        else
                            return res.status(500).json(err);
                    })
                }
            }
            else
                return res.status(500).json(err);
        });
    }
}

function rework_card(jsonStr, list_uuid, card_uuid, card_name) {
    for (var k = 0; k < jsonStr["List"].length; k++) {
        if (list_uuid == jsonStr["List"][k]["uuid"]) {
            for (var i = 0; i < jsonStr["List"][k]["Card"].length; i++) {
                if (jsonStr["List"][k]["Card"][i]["uuid"] == card_uuid) {
                    jsonStr["List"][k]["Card"][i]["name"] = card_name;
                    return (jsonStr);
                }
            }
            return (jsonStr);
        }
    }
    return jsonStr;
}

/**
 * @api {put} /trello/card Request Put Card
 * @apiName PutCard
 * @apiGroup EpiCard
 *
 * @apiParam {UUID} board_uuid Board uuid.
 * @apiParam {UUID} list_uuid List uuid.
 * @apiParam {String} card_uuid Card uuid.
 * @apiParam {String} card_name New card name.
 *
 * @apiSuccess (200) {Number} status 200.
 * @apiSuccess (200) {String} message Your list with uuid=xxxx has been updated with updated card:xxxx.
 */
exports.update_card = async(req, res) => {
    if (!req.body.board_uuid || !req.body.list_uuid || !req.body.card_uuid || !req.body.card_name)
        return res.status(400).json({"status": 400, "message": "board_uuid, list_uuid, card_uuid, card_name are required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.body.board_uuid], async function(err, result) {
            if (result.rows[0]) {
                jsonStr = result.rows[0].data;
                newJson = await rework_card(jsonStr, req.body.list_uuid, req.body.card_uuid, req.body.card_name);
                if (newJson) {
                    jsonStr = JSON.stringify(newJson);
                    client_db.query("UPDATE data_board SET data=$1 WHERE id=$2", [jsonStr, req.body.board_uuid], function(err, result) {
                        if (result)
                            return res.status(200).json({"status": 200, "message": "You list with uuid=" + req.body.list_uuid + " has been updated with updated card:" + req.body.card_uuid + "."}).
                        else
                            return res.status(500).json(err);
                    })
                }
            }
            else
                return res.status(500).json(err);
        });
    }
}

/**
 * @api {get} /users/board Request Get Board User
 * @apiName GetBoardUsers
 * @apiGroup Users
 *
 * @apiParam {String} username User username.
 *
 * @apiSuccess (200) {Object[]} Board All user boards.
 * @apiSuccess (200) {String} name Board name.
 * @apiSuccess (200) {UUID} uuid Board uuid.
 */
exports.get_board_from_user = async(req, res) => {
    console.log(req.query);
    if (!req.query.username)
        res.status(400).json({status: 400, message: "username are required"});
    else {
        client_db.query('SELECT * from users WHERE username=$1', [req.query.username], function(err, result) {
            if (result.rows[0])
                res.status(200).json(result.rows[0].board);
            else
                res.status(500).json(err);
        });
    }
}

/**
 * @api {get} /trello/board Request Get Board
 * @apiName GetBoard
 * @apiGroup EpiBoard
 *
 * @apiParam {String} board_uuid Board uuid.
 *
 * @apiSuccess (200) {String} name Board name.
 * @apiSuccess (200) {Object[]} data Json board data.
 * @apiSuccess (200) {String} data.name Board name.
 * @apiSuccess (200) {String} data.background Board background url.
 * @apiSuccess (200) {UUID} data.uuid Board uuid.
 * @apiSuccess (200) {Object[]} data.list Board lists.
 * @apiSuccess (200) {Object[]} data.list.card Board Cards.
 */
exports.get_board_by_uuid = async(req, res) => {
    if (!req.query.board_uuid)
        res.status(400).json({"status": 400, "message": "board_uuid key is required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.query.board_uuid], function(err, result) {
            if (result)
                res.status(200).json(result.rows);
            else
                res.status(500).json(err);
        });
    }
}

exports.add_permission = async(req, res) => {
    if (!req.body.board_uuid, !req.body.username, !req.body.board_name)
        res.status(400).json({"status": 400, "message": "board_uuid and username keys are required"});
    else {
        client_db.query('SELECT * FROM users WHERE username=$1', [req.body.username], function(err, result) {
            if (result.rows[0]) {
                jsonStr = result.rows[0].board;
                console.log(jsonStr);
                console.log(jsonStr.length);
                for(var i=0; i<jsonStr["Board"].length; i++) {
                    if(jsonStr["Board"][i].uuid === req.body.board_uuid)
                    return res.status(400).json({"status": 400, "message": "This username got already the permission to access to this board"});
                }
                jsonStr['Board'].push({"name": req.body.board_name, "uuid": req.body.board_uuid});
                jsonStr = JSON.stringify(jsonStr);
                client_db.query("UPDATE users SET board=$1 WHERE username=$2", [jsonStr, req.body.username], function(err, result) {
                    if (result)
                        return res.status(200).json({"status": 200, "message": "This user with username=" + req.body.username + " has been added to this board=" + req.body.board_name});
                    else
                        return res.status(200).json({"status": 200, "message": "This user with username=" + req.body.username + " has been added to this board=" + req.body.board_name});
                });
            }
            else
                return res.status(400).json({"status": 400, "message": "No user has been found with this username=" + req.body.username});
        });
    }
}

exports.remove_permission = async(req, res) => {
    if (!req.body.board_uuid, !req.body.username, !req.body.board_name)
        res.status(400).json({"status": 400, "message": "board_uuid and username keys are required"});
    else {
        client_db.query('SELECT * FROM users WHERE username=$1', [req.body.username], function(err, result) {
            if (result.rows[0]) {
                jsonStr = result.rows[0].board;
                console.log(jsonStr);
                console.log(jsonStr.length);
                for(var i=0; i<jsonStr["Board"].length; i++) {
                    if (jsonStr["Board"][i].uuid === req.body.board_uuid)
                        jsonStr["Board"].splice(i, 1);
                }
                jsonStr = JSON.stringify(jsonStr);
                client_db.query("UPDATE users SET board=$1 WHERE username=$2", [jsonStr, req.body.username], function(err, result) {
                    if (result)
                        return res.status(200).json({"status": 200, "message": "This user with username=" + req.body.username + " has been removed to this board=" + req.body.board_name});
                    else
                        return res.status(200).json({"status": 200, "message": "This user with username=" + req.body.username + " has been removed to this board=" + req.body.board_name});
                });
            }
            else
                return res.status(400).json({"status": 400, "message": "No user has been found with this username=" + req.body.username});
        });
    }
}

function drag_to_another_list(jsonStr, list_uuid, new_list_uuid, card_uuid) {
    for (var k = 0; k < jsonStr["List"].length; k++) {
        if (list_uuid == jsonStr["List"][k]["uuid"]) {
            for (var i = 0; i < jsonStr["List"][k]["Card"].length; i++) {
                if (jsonStr["List"][k]["Card"][i]["uuid"] == card_uuid) {
                    var old_card_name = jsonStr["List"][k]["Card"][i]["name"];
                    var old_card_uuid = jsonStr["List"][k]["Card"][i]["uuid"];
                    jsonStr["List"][k]["Card"].splice(i, 1);
                    for (var k = 0; k < jsonStr["List"].length; k++) {
                        if (new_list_uuid == jsonStr["List"][k]["uuid"]) {
                            jsonStr["List"][k]["Card"].push({"name": old_card_name, "uuid": old_card_uuid});
                            return (jsonStr);
                        }
                    }
                }
            }
        }
    }
    return jsonStr;
}

exports.drag_and_drop = async(req, res) => {
    if (!req.body.board_uuid || !req.body.card_uuid || !req.body.list_uuid || !req.body.new_list_uuid)
        return res.status(400).json({"status": 400, "message": "board_uuid, list_uuid, card_uuid, new_list_uuid are required"});
    else {
        client_db.query('SELECT * from data_board WHERE id=$1', [req.body.board_uuid], async function(err, result) {
            if (result.rows[0]) {
                jsonStr = result.rows[0].data;
                newJson = await drag_to_another_list(jsonStr, req.body.list_uuid, req.body.new_list_uuid, card_uuid);
                if (newJson) {
                    jsonStr = JSON.stringify(newJson);
                    client_db.query("UPDATE data_board SET data=$1 WHERE id=$2", [jsonStr, req.body.board_uuid], function(err, result) {
                        if (result)
                            return res.status(200).json({"status": 200, "message": "You list with uuid=" + req.body.new_list_uuid + " has been updated with new card:" + req.body.card_uuid, "uuid": req.body.new_list_uuid}).
                        else
                            return res.status(500).json(err);
                    })
                }
            }
            else
                return res.status(500).json(err);
        });
    }
}

exports.home = function(req, res) {
    res.json("Welcome into the Wekin Roazhon API")
};