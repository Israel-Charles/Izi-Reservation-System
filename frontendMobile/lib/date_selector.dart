import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class WeekDaysSelector extends StatefulWidget {
  final Function(DateTime) onDateSelected;
  final List<Map<String, dynamic>> reservations;

  const WeekDaysSelector({
    required this.onDateSelected,
    required this.reservations,
    Key? key,
  }) : super(key: key);

  @override
  _WeekDaysSelectorState createState() => _WeekDaysSelectorState();
}

class _WeekDaysSelectorState extends State<WeekDaysSelector> {
  DateTime currentWeekStart =
      DateTime.now().subtract(Duration(days: DateTime.now().weekday - 1));
  DateTime selectedDate = DateTime.now();

  String get formattedWeekRange {
    DateTime endOfWeek = currentWeekStart.add(const Duration(days: 6));
    return '${DateFormat('EEEE, MMMM d').format(currentWeekStart)} - ${DateFormat('EEEE, MMMM d').format(endOfWeek)}';
  }

  String get formattedSelectedDate {
    return DateFormat('EEEE, MMMM d').format(selectedDate);
  }

  List<String> get days {
    return List.generate(7, (index) {
      DateTime day = currentWeekStart.add(Duration(days: index));
      return DateFormat('d').format(day);
    });
  }

  void previousWeek() {
    setState(() {
      currentWeekStart = currentWeekStart.subtract(const Duration(days: 7));
      if (selectedDate.isBefore(currentWeekStart)) {
        selectedDate = currentWeekStart;
      }
    });
  }

  void nextWeek() {
    setState(() {
      currentWeekStart = currentWeekStart.add(const Duration(days: 7));
      if (selectedDate.isAfter(currentWeekStart.add(const Duration(days: 6)))) {
        selectedDate = currentWeekStart.add(const Duration(days: 6));
      }
    });
  }

  void selectDate(int dayOffset) {
    setState(() {
      selectedDate = currentWeekStart.add(Duration(days: dayOffset));
      widget.onDateSelected(selectedDate);
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 15),
          Padding(
            padding: const EdgeInsets.only(left: 16.0),
            child: Text(
              formattedSelectedDate,
              style: const TextStyle(
                fontSize: 25,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(height: 10),
          Container(
            height: 110,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: previousWeek,
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: List.generate(7, (index) {
                    return GestureDetector(
                      onTap: () => selectDate(index),
                      child: Column(
                        children: [
                          Text(
                            DateFormat('E').format(
                                currentWeekStart.add(Duration(days: index))),
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: selectedDate ==
                                      currentWeekStart
                                          .add(Duration(days: index))
                                  ? FontWeight.bold
                                  : FontWeight.normal,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Container(
                            width: 37,
                            height: 40,
                            decoration: BoxDecoration(
                              color: selectedDate ==
                                      currentWeekStart
                                          .add(Duration(days: index))
                                  ? const Color.fromARGB(255, 255, 125, 40)
                                  : const Color.fromARGB(255, 31, 41, 55),
                              shape: BoxShape.circle,
                            ),
                            child: Center(
                              child: Text(
                                days[index],
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: selectedDate ==
                                          currentWeekStart
                                              .add(Duration(days: index))
                                      ? FontWeight.bold
                                      : FontWeight.normal,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }),
                ),
                IconButton(
                  icon: const Icon(Icons.arrow_forward),
                  onPressed: nextWeek,
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 10),
                if (widget.reservations.isNotEmpty)
                  Column(
                    children: widget.reservations.map((reservation) {
                      DateTime start =
                          DateTime.parse(reservation["start"].toString());
                      DateTime end =
                          DateTime.parse(reservation["end"].toString());

                      String startTime = DateFormat('h:mm a').format(start);
                      String endTime = DateFormat('h:mm a').format(end);

                      return Card(
                        margin: const EdgeInsets.symmetric(vertical: 8.0),
                        child: SingleChildScrollView(
                          child: ListTile(
                            title: RichText(
                              text: TextSpan(
                                style: DefaultTextStyle.of(context).style,
                                children: <TextSpan>[
                                  TextSpan(
                                    text:
                                        'Reservation: ${reservation["resourceName"] ?? "N/A"}',
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20.0),
                                  ),
                                ],
                              ),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Text(
                                  '$startTime - $endTime',
                                  style: const TextStyle(
                                      fontWeight: FontWeight.normal,
                                      fontSize: 16.0),
                                ),
                                Text(
                                  'Location: ${reservation["resourceLocation"] ?? "N/A"}',
                                  style: const TextStyle(
                                      fontWeight: FontWeight.normal,
                                      fontSize: 16.0),
                                ),
                                const SizedBox(height: 10),
                                //Text('Size: ${reservation["size"] ?? "N/A"}'),
                                Text(
                                    'Comment: ${reservation["comment"] ?? "None"}'),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                if (widget.reservations.isEmpty) const Card(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
