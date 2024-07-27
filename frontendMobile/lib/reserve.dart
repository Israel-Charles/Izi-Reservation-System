import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:reserve_smart/dbHelper/mongodb.dart';
import 'package:intl/intl.dart';
import 'date_selector.dart';
import 'package:mongo_dart/mongo_dart.dart' as mongo;

class ReservePage extends StatefulWidget {
  final String user;
  const ReservePage({super.key, required this.user});

  @override
  _ReservePageState createState() => _ReservePageState();
}

class _ReservePageState extends State<ReservePage> {
  DateTime selectedDate = DateTime.now();
  Future<List<Map<String, dynamic>>>? reservationFuture;
  List<Map<String, dynamic>> reservations = [];

  @override
  void initState() {
    super.initState();
    fetchReservationsForSelectedDate();
  }

  void fetchReservationsForSelectedDate() {
    setState(() {
      reservationFuture = fetchReservations(selectedDate);
      reservationFuture!.then((res) {
        setState(() {
          reservations = res;
        });
      }).catchError((error) {
        print('Error fetching reservations: $error');
      });
    });
  }

  Future<List<Map<String, dynamic>>> fetchReservations(DateTime date) async {
    var reserveCollection = MongoDatabase.reserveCollection;
    var userCollection = MongoDatabase.userCollection;
    var resourceCollection = MongoDatabase.resourceCollection;

    bool isEmail = widget.user.contains('@');
    String userId;

    //Use login info to get that users id. (from ObjectId get the UserId string within)
    //If Email was used to sign in
    if (isEmail) {
      var userDoc = await userCollection.findOne({'Email': widget.user});
      if (userDoc != null) {
        userId = userDoc['_id'].toHexString();
      } else {
        return [];
      }
    } else {
      //If Username was used to sign in
      var userDoc = await userCollection.findOne({'userName': widget.user});
      if (userDoc != null) {
        userId = userDoc['_id'].toHexString();
      } else {
        return [];
      }
    }
    print(userId);

    DateTime startOfDay = DateTime(date.year, date.month, date.day, 0, 0, 0);
    DateTime endOfDay = DateTime(date.year, date.month, date.day, 23, 59, 59);

    //User userId to get that users Reservation info
    var reservations = await reserveCollection.find({
      'userId': userId,
      'start': {'\$gte': startOfDay, '\$lt': endOfDay}
    }).toList();

    //Fetch resources and add them to reservations
    for (var reservation in reservations) {
      var resourceId = mongo.ObjectId.parse(reservation['resourceId']);
      var resourceDoc = await resourceCollection.findOne({'_id': resourceId});
      print(resourceDoc);
      if (resourceDoc != null) {
        reservation['resourceName'] = resourceDoc['name'];
        reservation['resourceLocation'] = resourceDoc['location'];
      }
    }
    print('Reservations: $reservations');

    return reservations;
  }

  Future<void> signOut() async {
    try {
      final response = await http.get(
        Uri.parse('https://4331booking.com//api/auth/logout'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        // ignore: use_build_context_synchronously
        Navigator.pushReplacementNamed(context, '/login');
        // ignore: use_build_context_synchronously
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Successfully Logged Out'),
            backgroundColor: Colors.green,
          ),
        );
      } else {
        // ignore: use_build_context_synchronously
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Error logging out')),
        );
      }
    } catch (e) {
      print('Error during sign out: $e');
      // ignore: use_build_context_synchronously
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error logging out')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    List<Map<String, dynamic>> sortedReservations = List.from(reservations);
    sortedReservations.sort((a, b) {
      DateTime startA =
          DateTime.tryParse(a['Start'].toString()) ?? DateTime.now();
      DateTime startB =
          DateTime.tryParse(b['Start'].toString()) ?? DateTime.now();
      return startA.compareTo(startB);
    });

    return Scaffold(
      appBar: PreferredSize(
        preferredSize:
            const Size.fromHeight(130.0), // Specify your desired height here
        child: AppBar(
          backgroundColor: const Color.fromARGB(255, 31, 41, 55),
          flexibleSpace: const Center(
            child: Padding(
              padding: EdgeInsets.only(
                  top:
                      20.0), // Adjust this value as needed for vertical centering
              child: Text(
                'Reservations',
                style: TextStyle(
                  fontSize: 43,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'SpaceMono',
                  color: Colors.white,
                ),
              ),
            ),
          ),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            WeekDaysSelector(
              onDateSelected: (date) {
                setState(() {
                  selectedDate = date;
                  fetchReservationsForSelectedDate();
                });
              },
              reservations: sortedReservations,
            ),
            Expanded(
              child: FutureBuilder<List<Map<String, dynamic>>>(
                future: reservationFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else if (snapshot.hasData) {
                    if (snapshot.data!.isEmpty) {
                      return Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            SizedBox(
                              //padding: const EdgeInsets.only(top: 20.0),
                              height: 190,
                              child: Image.asset(
                                'assets/SleepingBrain.png',
                                height: 275,
                              ),
                            ),
                            const SizedBox(height: 0),
                            const Text(
                              'No reservations found.',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                          ],
                        ),
                      );
                    } else {
                      return const SizedBox.shrink();
                    }
                  } else {
                    return const SizedBox.shrink();
                  }
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        color: Colors.white,
        shape: const CircularNotchedRectangle(),
        notchMargin: 8.0,
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: ElevatedButton(
            onPressed: () {
              signOut();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color.fromARGB(255, 31, 41, 55),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(5.0),
              ),
            ),
            child: const Text(
              'Log Out',
              style: TextStyle(
                fontSize: 20,
                color: Colors.white,
                fontFamily: 'SpaceMono',
              ),
            ),
          ),
        ),
      ),
    );
  }
}
