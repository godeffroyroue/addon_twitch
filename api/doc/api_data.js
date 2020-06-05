define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "/home/godeffroy/COVID/YEP_project2_2019/server/api/doc/main.js",
    "groupTitle": "/home/godeffroy/COVID/YEP_project2_2019/server/api/doc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/trello/board",
    "title": "Request Get Board",
    "name": "GetBoard",
    "group": "EpiBoard",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "board_uuid",
            "description": "<p>Board uuid.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Board name.</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Json board data.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "data.name",
            "description": "<p>Board name.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "data.background",
            "description": "<p>Board background url.</p>"
          },
          {
            "group": "200",
            "type": "UUID",
            "optional": false,
            "field": "data.uuid",
            "description": "<p>Board uuid.</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list",
            "description": "<p>Board lists.</p>"
          },
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "data.list.card",
            "description": "<p>Board Cards.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiBoard"
  },
  {
    "type": "post",
    "url": "/trello/board",
    "title": "Request Post Board",
    "name": "PostBoard",
    "group": "EpiBoard",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "board_name",
            "description": "<p>Board name that will be created.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Board with xxxxx created.</p>"
          },
          {
            "group": "200",
            "type": "UUID",
            "optional": false,
            "field": "uuid",
            "description": "<p>New board uuid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiBoard"
  },
  {
    "type": "delete",
    "url": "/trello/card",
    "title": "Request Delete Card",
    "name": "DeleteCard",
    "group": "EpiCard",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "board_uuid",
            "description": "<p>Board uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "list_uuid",
            "description": "<p>List uuid.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Your list with uuid=xxx has been deleted.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiCard"
  },
  {
    "type": "post",
    "url": "/trello/card",
    "title": "Request Post Card",
    "name": "PostCard",
    "group": "EpiCard",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "board_uuid",
            "description": "<p>Board uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "list_uuid",
            "description": "<p>List uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "card_name",
            "description": "<p>Card name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Your list with uuid=xxx has been updated with new card:xxx.</p>"
          },
          {
            "group": "200",
            "type": "UUID",
            "optional": false,
            "field": "uuid",
            "description": "<p>UUID card.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiCard"
  },
  {
    "type": "put",
    "url": "/trello/card",
    "title": "Request Put Card",
    "name": "PutCard",
    "group": "EpiCard",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "board_uuid",
            "description": "<p>Board uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "list_uuid",
            "description": "<p>List uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "card_uuid",
            "description": "<p>Card uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "card_name",
            "description": "<p>New card name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Your list with uuid=xxxx has been updated with updated card:xxxx.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiCard"
  },
  {
    "type": "delete",
    "url": "/trello/list",
    "title": "Request Delete List",
    "name": "DeleteList",
    "group": "EpiList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "board_uuid",
            "description": "<p>Board uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "list_uuid",
            "description": "<p>List uuid that will be deleted.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Your list with uuid=xxx has been deleted.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiList"
  },
  {
    "type": "post",
    "url": "/trello/list",
    "title": "Request Post List",
    "name": "PostList",
    "group": "EpiList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "board_uuid",
            "description": "<p>Board uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "list_name",
            "description": "<p>New list name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Your list with uuid=xxx has been created.</p>"
          },
          {
            "group": "200",
            "type": "UUID",
            "optional": false,
            "field": "uuid",
            "description": "<p>New list uuid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiList"
  },
  {
    "type": "put",
    "url": "/trello/list",
    "title": "Request Put List",
    "name": "PutList",
    "group": "EpiList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "board_uuid",
            "description": "<p>Board uuid.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "list_uuid",
            "description": "<p>List uuid that will be updated.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "list_name",
            "description": "<p>New list name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>You list with uuid=xxxx has been updated with updated list_name:xxxx.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "EpiList"
  },
  {
    "type": "get",
    "url": "/users/board",
    "title": "Request Get Board User",
    "name": "GetBoardUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object[]",
            "optional": false,
            "field": "Board",
            "description": "<p>All user boards.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Board name.</p>"
          },
          {
            "group": "200",
            "type": "UUID",
            "optional": false,
            "field": "uuid",
            "description": "<p>Board uuid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Request Get User",
    "name": "GetUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>User uuid.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username.</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Hashed user password.</p>"
          },
          {
            "group": "200",
            "type": "Boolean",
            "optional": false,
            "field": "email_confirmed",
            "description": "<p>(true,false).</p>"
          },
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "board",
            "description": "<p>Json array with all user boards.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Request Login User",
    "name": "PostLogin",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"200\"> <li></li> </ol>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Successful authentication.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/register",
    "title": "Request Register User",
    "name": "PostRegister",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<ol start=\"201\"> <li></li> </ol>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The account has been created.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/Controllers.js",
    "groupTitle": "Users"
  }
] });
