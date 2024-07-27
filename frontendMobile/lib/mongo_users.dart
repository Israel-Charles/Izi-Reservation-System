// To parse this JSON data, do
//
//     final mongoUsers = mongoUsersFromJson(jsonString);

import 'dart:convert';
import 'package:mongo_dart/mongo_dart.dart';

MongoUsers mongoUsersFromJson(String str) =>
    MongoUsers.fromJson(json.decode(str));

String mongoUsersToJson(MongoUsers data) => json.encode(data.toJson());

class MongoUsers {
  ObjectId? id;
  String firstName;
  String lastName;
  String userName;
  String password;
  String email;
  String phone;
  bool isAdmin;
  bool emailVerified;
  bool darkMode;
  bool publicInfo;
  String verificationToken;
  //V v;

  MongoUsers({
    this.id,
    required this.firstName,
    required this.lastName,
    required this.userName,
    required this.password,
    required this.email,
    required this.phone,
    required this.isAdmin,
    required this.emailVerified,
    required this.darkMode,
    required this.publicInfo,
    required this.verificationToken,
    //required this.v,
  });

  factory MongoUsers.fromJson(Map<String, dynamic> json) => MongoUsers(
        id: json["_id"],
        firstName: json["FirstName"],
        lastName: json["LastName"],
        userName: json["UserName"],
        password: json["Password"],
        email: json["Email"],
        phone: json["Phone"],
        isAdmin: json["IsAdmin"],
        emailVerified: json["EmailVerified"],
        darkMode: json["DarkMode"],
        publicInfo: json["PublicInfo"],
        verificationToken: json["VerificationToken"],
        //v: V.fromJson(json["__v"]),
      );

  Map<String, dynamic> toJson() => {
        if (id != null) "_id": id!.toJson(),
        "FirstName": firstName,
        "LastName": lastName,
        "UserName": userName,
        "Password": password,
        "Email": email,
        "Phone": phone,
        "IsAdmin": isAdmin,
        "EmailVerified": emailVerified,
        "DarkMode": darkMode,
        "PublicInfo": publicInfo,
        "VerificationToken": verificationToken,
        //"__v": v.toJson(),
      };
}

class Id {
  String oid;

  Id({
    required this.oid,
  });

  factory Id.fromJson(Map<String, dynamic> json) => Id(
        oid: json["\u0024oid"],
      );

  Map<String, dynamic> toJson() => {
        "\u0024oid": oid,
      };
}

class V {
  String numberInt;

  V({
    required this.numberInt,
  });

  factory V.fromJson(Map<String, dynamic> json) => V(
        numberInt: json["\u0024numberInt"],
      );

  Map<String, dynamic> toJson() => {
        "\u0024numberInt": numberInt,
      };
}
