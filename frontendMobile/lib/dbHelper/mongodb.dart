import 'dart:developer';

import 'package:reserve_smart/dbHelper/constant.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:reserve_smart/mongo_users.dart';

class MongoDatabase {
  static var db, userCollection, reserveCollection, resourceCollection;
  //Connect to DB and any collections here to be able to use throughout App
  static connect() async {
    db = await Db.create(MONGO_CONN_URL);
    await db.open();
    inspect(db); //for showing DB connection status & info in debug console
    userCollection =
        db.collection(USER_COLLECTION); //Connect to Users Collection
    reserveCollection = db.collection(RESERVE_COLLECTION);
    resourceCollection =
        db.collection(RESOURCE_COLLECTION); //Connect to Reservations Collection
  }

  static Future<String> insert(MongoUsers data) async {
    try {
      var result = await userCollection.insertOne(data.toJson());
      if (result.isSuccess) {
        return "Data Inserted";
      } else {
        return "Insert Failed";
      }
    } catch (e) {
      print(e.toString());
      return e.toString();
    }
  }
}
