import * as React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import { getUserNameById, makeReservation, getResourceReservations } from "../api-client";
import { useQuery } from "react-query";
import { AppContext } from "../contexts/AppContext";
import './scheduler.css'; // Custom CSS for the scheduler

// Registering Syncfusion license key
import { registerLicense } from '@syncfusion/ej2-base';

const licenseKey = import.meta.env.VITE_SYNCFUSION_LICENSE_KEY as string;

if (licenseKey) {
  registerLicense(licenseKey);
} else {
  console.error('Syncfusion license key not found');
}

// Renaming some of the default text in the scheduler
L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Cancel',
      'deleteButton': 'Delete',
      'newEvent': 'Add Reservation',
      'addTitle': 'Purpose/Comment',
    },
  }
});

const mapDayToNumber = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6
};

const getWorkingDays = (openDays) => {
  return openDays.map(day => mapDayToNumber[day]);
};

// Function to convert a time string in HH:MM format to minutes
const timeStringToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

// Function to convert a Date object to minutes
const getEventTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 60 + minutes;
};

// Function to convert total minutes to a time string in HH:MM AM/PM format
const minutesToTimeString = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${adjustedHours}:${formattedMinutes} ${period}`;
};

// Function to fetch reservations and adding their firstname and lastname
const fetchReservationsWithNames = async (reservations) => {
  return await Promise.all(
    reservations.map(async (reservation) => {
      try {
        const userName = await getUserNameById(reservation.userId.toString());
        return {
          ...reservation,
          firstName: userName.firstName,
          lastName: userName.lastName,
          IsReadonly: true,
          comment: `${userName.firstName} ${userName.lastName} -\n${reservation.comment}`,
          IsClosed: false,
          size: `Group Size: ${reservation.size}`
        };
      } catch (error) {
        console.error(`Error fetching user name for userId ${reservation.userId}:`, error);
        return {
          ...reservation,
          comment: `Error fetching name: ${error.message} ${reservation.comment}`
        };
      }
    })
  );
};

// Time scale settings for the scheduler
const timeScale = {
  enable: true,
  interval: 60,
  slotCount: 4
};

// Component to display the reservation calendar view for a resource
const ReserveCalendarView = React.memo(({ openTime, closeTime, maxResSize, resourceId, openDays, maxDuration }) => {
  const scheduleObj = useRef<ScheduleComponent>(null);
  const [reservationsWithNames, setReservationsWithNames] = useState([]);

  // Get the index of the open days
  const openDaysIndex = getWorkingDays(openDays);
  const openHours = { start: openTime, end: closeTime, highlight: true };

  const { showToast } = useContext(AppContext);

  // Query to fetch reservations for the resource
  const { data: reservations, isLoading, refetch } = useQuery(
    ["getResourceReservations", resourceId],
    () => getResourceReservations(resourceId),
    { enabled: !!resourceId }
  );

  // Update the reservations with the user's first and last name
  useEffect(() => {
    if (reservations) {
      fetchReservationsWithNames(reservations).then(setReservationsWithNames);
    }
  }, [reservations]);

  // Refetch reservations when the resourceId changes
  useEffect(() => {
    const fetchAndSetReservations = async () => {
      setReservationsWithNames([]);
      await refetch();
    };

    const timeoutId = setTimeout(fetchAndSetReservations, 300);

    return () => clearTimeout(timeoutId);
  }, [resourceId, refetch]);

  // Function to check if a new reservation overlaps with an existing reservation
  const checkForOverlap = (newEvent, existingReservations) => {
    const newStart = new Date(newEvent.start);
    const newEnd = new Date(newEvent.end);

    return existingReservations.some(reservation => {
      const existingStart = new Date(reservation.start);
      const existingEnd = new Date(reservation.end);

      return (newStart < existingEnd && newEnd > existingStart);
    });
  };

  const data: Record<string, string>[] = extend([], reservationsWithNames, null, true) as Record<string, string>[];

  // Fields data for the scheduler
  const fieldsData = {
    id: "_id",
    subject: { name: "comment", title: 'Purpose/Comment', validation: { required: true } },
    startTime: { name: "start", title: 'Start Time' },
    endTime: { name: "end", title: 'End Time' },
    description: { name: "size", title: 'Group Size', default: 1, validation: { required: true, digits: true, min: 1, max: maxResSize } },
    firstName: { name: "firstName", title: 'First Name' },
    lastName: { name: "lastName", title: 'Last Name' },
  }

  // Event settings for the scheduler
  const eventSettings = {
    dataSource: data,
    fields: fieldsData,
    enableTooltip: true,
  };

  // State to manage the current view
  const [currentView, setCurrentView] = useState("Day");

  useEffect(() => {
      // Media query to check screen size
      const mediaQuery = window.matchMedia("(min-width: 768px)");

      // Function to update view based on screen size
      const updateView = (e) => {
          if (e.matches) {
              setCurrentView("Week");
          } else {
              setCurrentView("Day");
          }
      };

      // Initial check
      updateView(mediaQuery);

      // Add event listener
      mediaQuery.addEventListener('change', updateView);

      // Cleanup listener on component unmount
      return () => {
          mediaQuery.removeEventListener('change', updateView);
      };
  }, []);

  // Function to validate the new reservations
  const onActionBegin = async (args) => {
    if (args.requestType == 'eventCreate') {
      const newEvent = args.data[0];
      if (checkForOverlap(newEvent, reservationsWithNames)) {
        showToast({ message: "Reservation time overlaps with an existing reservation. Please choose a different time.", type: "ERROR" });
        args.cancel = true;
      }
      if (newEvent.size > maxResSize) {
        showToast({ message: `Group size cannot exceed ${maxResSize}. Please enter a valid group size.`, type: "ERROR" });
        args.cancel = true;
      }
      if (newEvent.start < new Date()) {
        showToast({ message: "Reservation start time cannot be in the past. Please choose a future time.", type: "ERROR" });
        args.cancel = true;
      }
      if (getEventTime(newEvent.start) < timeStringToMinutes(openTime) || getEventTime(newEvent.end) > timeStringToMinutes(closeTime)) {
        showToast({ message: `Reservation time must be between ${minutesToTimeString(timeStringToMinutes(openTime))} and ${minutesToTimeString(timeStringToMinutes(closeTime))}.`, type: "ERROR" });
        args.cancel = true;
      }
      if (!newEvent.comment) {
        showToast({ message: "Please enter a purpose/comment for the reservation.", type: "ERROR" });
        args.cancel = true;
      }
      if (!newEvent.size) {
        showToast({ message: "Please enter a group size for the reservation.", type: "ERROR" });
        args.cancel = true;
      }
      if (!openDaysIndex.includes(newEvent.start.getDay())) {
        showToast({ message: "Reservations are not allowed on this day.", type: "ERROR" });
        args.cancel = true;
      }
      if (newEvent.end - newEvent.start > maxDuration * 60000) {
        showToast({ message: `Reservation duration cannot exceed ${maxDuration} minutes.`, type: "ERROR" });
        args.cancel = true;
      }
    }
  }

  // Function to create a new reservation
  const onActionComplete = async (args) => {
    if (args.requestType === 'eventCreated') {
      const newEvent = args.data[0];
      const formData = {
        comment: newEvent.comment,
        start: newEvent.start,
        end: newEvent.end,
        size: newEvent.size,
      };
      try {
        await makeReservation(formData, resourceId);
        await refetch();
        showToast({ message: "Reservation created successfully", type: "SUCCESS" });
      } catch (error) {
        console.error('Error creating reservation:', error);
        showToast({ message: "Error creating reservation", type: "ERROR" });
      }
    }
  };

  // Function to modify the popup fields
  const onPopupOpen = (args) => {
    if (args.type === 'Editor') {
      // Hide the "Location" field
      const locationElement = args.element.querySelector('.e-location-container');
      if (locationElement) {
        locationElement.style.display = 'none';
      }

      // Hide the "Repeat" field
      const repeatElement = args.element.querySelector('.e-recurrenceeditor');
      if (repeatElement) {
        repeatElement.style.display = 'none';
      }
      const repeatElement2 = args.element.querySelector('.e-schedule-dialog.e-device .e-repeat-container');
      if (repeatElement2) {
        repeatElement2.style.display = 'none';
      }

      // Modify the title input field to a textarea and set its width to 100%
      const subjectContainer = args.element.querySelector('.e-subject-container');
      const subjectElement = args.element.querySelector('.e-subject-container input.e-subject');
      if (subjectElement) {
        const textArea = document.createElement('textarea');
        textArea.className = subjectElement.className;
        textArea.name = subjectElement.name;
        textArea.value = subjectElement.value;
        textArea.style.width = '100%';
        subjectContainer.style.width = '100%';
        subjectContainer.style.padding = '0';
        subjectElement.parentNode.replaceChild(textArea, subjectElement);
      }

      // Modify the description input field to a number input
      const descriptionContainer = args.element.querySelector('.e-description-container');
      const descriptionElement = args.element.querySelector('.e-description-container textarea.e-description');
      if (descriptionElement) {
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.className = descriptionElement.className;
        numberInput.style.height = '30px';
        numberInput.name = descriptionElement.name;
        numberInput.value = descriptionElement.value;
        numberInput.min = "1";
        numberInput.max = maxResSize.toString();
        descriptionContainer.style.width = '25%';
        descriptionElement.parentNode.replaceChild(numberInput, descriptionElement);
      }
    }
    else if (args.type === 'QuickInfo') {
      // Add Group Size field to the quick info popup
      const quickInfoContent = args.element.querySelector('.e-schedule-form');
      if (quickInfoContent) {
        const groupSizeContainer = document.createElement('div');

        const groupSizeLabel = document.createElement('label');
        groupSizeLabel.className = 'e-subject';
        groupSizeLabel.textContent = 'Group Size:';
        groupSizeLabel.style.marginRight = '10px';
        groupSizeLabel.style.marginTop = '20px';

        groupSizeContainer.className = 'e-input-group e-control-wrapper';

        const groupSizeInput = document.createElement('input');
        groupSizeInput.type = 'number';
        groupSizeInput.className = 'e-subject e-field e-input';
        groupSizeInput.style.marginTop = '20px';
        groupSizeInput.name = 'size';
        groupSizeInput.min = '1';
        groupSizeContainer.step = '1';
        groupSizeInput.max = maxResSize.toString();
        groupSizeInput.value = '1';
        groupSizeInput.style.width = '100px';

        quickInfoContent.appendChild(groupSizeLabel);
        quickInfoContent.appendChild(groupSizeInput);
        quickInfoContent.appendChild(groupSizeContainer);
      }

      // Hide the "Edit" button
      const editButton = args.element.querySelector('.e-event-edit');
      if (editButton) {
        editButton.style.display = 'none';
      }

      // Hide the "Delete" button
      const deleteButton = args.element.querySelector('.e-event-delete');
      if (deleteButton) {
        deleteButton.style.display = 'none';
      }
    }
  };

  if (isLoading) {
    showToast({ message: "Loading Reservations...", type: "INFO" });
  }

  return (
    <div>
      <div className="text-primary p-2 italic font-semibold">To create a reservation, double click/tap on a timeslot, fill out the form, adjust your reservation time accordingly, then click/tap on the save button</div>
      <ScheduleComponent
        width='100%'
        height='650px'
        selectedDate={new Date()}
        ref={scheduleObj}
        eventSettings={eventSettings}
        currentView={currentView}
        actionBegin={onActionBegin}
        actionComplete={onActionComplete}
        popupOpen={onPopupOpen} // Attach the popupOpen event
        workDays={openDaysIndex}
        showWeekend={true}
        workHours={openHours}
        timeScale={timeScale}
      >
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='Month' />
        </ViewsDirective>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </div>
  );
});

export default ReserveCalendarView;