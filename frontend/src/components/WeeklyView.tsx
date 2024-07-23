import React, { useEffect, useState } from "react";
import * as apiClient from "../api-client";
import { ReservationType } from "../../../backend/src/types/reservation";
import { convertTimeToMinutes } from "../../../backend/src/middleware/time";

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};

const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return { hours, minutes };
};

const generateTimeSlots = (open, close, interval) => {
    const { hours: startHour, minutes: startMinute } = parseTime(open);
    const { hours: endHour, minutes: endMinute } = parseTime(close);

    const times = [];
    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute < endMinute)
    ) {
        times.push(
            `${String(currentHour).padStart(2, "0")}:${String(
                currentMinute
            ).padStart(2, "0")}`
        );
        currentMinute += interval;
        if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute = 0;
        }
    }

    return times;
};

const getWeekDates = (startDate) => {
    const startDay = new Date(startDate);
    return Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(startDay);
        date.setDate(date.getDate() + index);
        return {
            dayNumber: date.getDate(),
            weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
        };
    });
};

const WeeklyView = ({ open, close, resourceId }) => {
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    const [days, setDays] = useState([]);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        const today = new Date();
        const startOfWeek = addDays(today, -today.getDay());
        const weekDays = Array.from({ length: 7 }, (_, i) =>
            addDays(startOfWeek, i)
        );
        setDays(weekDays.map(formatDate));
        const timeSlots = generateTimeSlots(open, close, 60);
        setTimes(timeSlots);
    }, [open, close]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const fetchedReservations =
                    await apiClient.getResourceReservations(resourceId);
                setReservations(fetchedReservations);
            } catch (error) {
                console.error("Failed to fetch reservations", error);
            }
        };

        fetchReservations();
    }, [resourceId]);

    const isTimeReserved = (dayIndex, time) => {
        const currentTimeSlot = convertTimeToMinutes(time);

        return reservations.some((reservation) => {
            const reservationStartDay = new Date(reservation.start).getDay();
            const reservationStartTime = convertTimeToMinutes(
                reservation.start
            );
            const reservationEndTime = convertTimeToMinutes(reservation.end);

            return (
                dayIndex === reservationStartDay &&
                currentTimeSlot >= reservationStartTime &&
                currentTimeSlot < reservationEndTime
            );
        });
    };

    const weekDates = getWeekDates(new Date());

    return (
        <div>
            <div className="grid grid-cols-8 bg-background rounded-lg">
                <div className="col-span-1 flex justify-center items-center text-med_orange text-2xl font-bold">
                    4331
                </div>
                {weekDates.map(({ dayNumber, weekday }) => (
                    <div
                        key={weekday}
                        className="text-center col-span-1 border-b-2 border-background_alt"
                    >
                        <div className="mt-2">{weekday}</div>
                        <div className="mb-2">{dayNumber}</div>
                    </div>
                ))}
                {times.map((time, timeIndex) => (
                    <>
                        <div
                            key={time}
                            className="text-center py-2 col-span-1 border-r-2 border-background_alt"
                            style={{ gridRowStart: timeIndex + 2 }}
                        >
                            {time}
                        </div>
                        {weekDates.map(({ dayNumber, weekday }, dayIndex) => (
                            <div
                                key={dayNumber + weekday}
                                className="col-span-1 border border-background_alt"
                                style={{
                                    gridRowStart: timeIndex + 2,
                                    gridColumnStart: dayIndex + 2,
                                }}
                            ></div>
                        ))}
                    </>
                ))}
            </div>
        </div>
    );
};

export default WeeklyView;
