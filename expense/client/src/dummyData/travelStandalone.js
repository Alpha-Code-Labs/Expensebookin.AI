// Sample data for a single travel request
const dummyTravelRequestData = {
  tenantId: 'sampleTenantId',
  tenantName: 'Sample Tenant',
  companyName: 'Sample Company',
  travelRequestId: "trID-jhfu767687",
  travelRequestNumber: 'TR123',
  tripPurpose: 'Business Trip',
  travelRequestStatus: 'draft',
  travelRequestState: 'section 0',
  createdBy: { empId: 'EMP001', name: 'John Doe' },
  createdFor: { empId: 'EMP002', name: 'Jane Doe' },
  teamMembers: [],
  travelAllocationHeaders: [],
  itinerary: {
    formState: [
      {
        formId: 'Form001',
        transfers: {
          needsDeparturePickup: true,
          needsDepartureDrop: true,
          needsReturnPickup: false,
          needsReturnDrop: false,
        },
        needsHotel: true,
        needsCab: true,
        needsVisa: false,
        modeOfTransit: 'Air',
        travelClass: 'Business',
      },
    ],
    flights: [
      {
        itineraryId: "itineraryid-sdhdfghg2d",
        formId: 'Form001',
        from: 'CityA',
        to: 'CityB',
        date: '2023-01-01',
        time: '09:00 AM',
        travelClass: 'Business',
        violations: { class: 'ClassA', isReturnTravel: false, amount: '500 USD' },
        bkd_from: 'CityA',
        bkd_to: 'CityB',
        bkd_date: '2023-01-01',
        bkd_time: '09:00 AM',
        bkd_travelClass: 'Business',
        bkd_violations: { class: 'ClassA', amount: '500 USD' },
        modified: false,
        cancellationDate: null,
        cancellationReason: '',
        status: 'approved',
        bookingDetails: { docURL: 'booking-url', docType: 'PDF', billDetails: {} },
      },
    ],
    buses: [
        {
          itineraryId: "itineraryid-sdhdfghg2",
          formId: 'Form001',
          from: 'CityX',
          to: 'CityY',
          date: '2023-02-01',
          time: '10:00 AM',
          travelClass: 'Economy',
          isReturnTravel: false,
          violations: { class: 'ClassB', amount: '300 USD' },
          bkd_from: 'CityX',
          bkd_to: 'CityY',
          bkd_date: '2023-02-01',
          bkd_time: '10:00 AM',
          bkd_travelClass: 'Economy',
          modified: false,
          cancellationDate: null,
          cancellationReason: '',
          status: 'pending approval',
          bookingDetails: { docURL: 'bus-booking-url', docType: 'PDF', billDetails: {} },
        },
      ],
      trains: [
        {
          itineraryId: "itineraryid-sdhdfghg",
          formId: 'Form001',
          from: 'CityP',
          to: 'CityQ',
          date: '2023-03-01',
          time: '08:30 AM',
          travelClass: 'First Class',
          isReturnTravel: false,
          violations: { class: 'ClassC', amount: '700 USD' },
          bkd_from: 'CityP',
          bkd_to: 'CityQ',
          bkd_date: '2023-03-01',
          bkd_time: '08:30 AM',
          bkd_travelClass: 'First Class',
          bkd_violations: { class: 'ClassC', amount: '700 USD' },
          modified: false,
          cancellationDate: null,
          cancellationReason: '',
          status: 'approved',
          bookingDetails: { docURL: 'train-booking-url', docType: 'PDF', billDetails: {} },
        },
      ],
      hotels: [
        {
          itineraryId: "itineraryid-sdhdfghg",
          formId: 'Form001',
          location: 'Hotel Z',
          locationPreference: 'CityZ',
          class: 'Luxury',
          checkIn: '2023-04-01',
          checkOut: '2023-04-05',
          checkInTime: '03:00 PM',
          checkOutTime: '11:00 AM',
          violations: { class: 'ClassD', amount: '200 USD' },
          bkd_location: 'Hotel Z',
          bkd_locationPreference: 'CityZ',
          bkd_class: 'Luxury',
          bkd_checkIn: '2023-04-01',
          bkd_checkOut: '2023-04-05',
          bkd_checkInTime: '03:00 PM',
          bkd_checkOutTime: '11:00 AM',
          bkd_violations: { class: 'ClassD', amount: '200 USD' },
          modified: false,
          cancellationDate: null,
          cancellationReason: '',
          status: 'pending approval',
          bookingDetails: { docURL: 'hotel-booking-url', docType: 'PDF', billDetails: {} },
        },
      ],
      cabs: [
        {
          itineraryId: "itineraryid-sdhdfghg",
          formId: 'Form001',
          date: '2023-05-01',
          class: 'Sedan',
          preferredTime: '02:30 PM',
          pickupAddress: 'AddressA',
          dropAddress: 'AddressB',
          violations: { class: 'ClassE', amount: '100 USD' },
          bkd_date: '2023-05-01',
          bkd_class: 'Sedan',
          bkd_preferredTime: '02:30 PM',
          bkd_pickupAddress: 'AddressA',
          bkd_dropAddress: 'AddressB',
          bkd_violations: { class: 'ClassE', amount: '100 USD' },
          modified: false,
          cancellationDate: null,
          cancellationReason: '',
          status: 'booked',
          bookingDetails: { docURL: 'cab-booking-url', docType: 'PDF', billDetails: {} },
          type: 'regular',
        },
      ],

  },
  tripType: { oneWayTrip: true, roundTrip: false, multiCityTrip: false },
  travelDocuments: ['document1.pdf', 'document2.pdf'],
  bookings: [
    {
      itineraryReference: {},
      docURL: 'booking-url',
      details: {},
      status: {},
    },
  ],
  approvers: [
    {
      empId: 'Approver001',
      name: 'Approver Name',
      status: 'pending approval',
    },
  ],
  assignedTo: { empId: 'Assignee001', name: 'Assigned Person' },
  bookedBy: { empId: 'Booker001', name: 'Booking Person' },
  recoveredBy: { empId: 'Recover001', name: 'Recovery Person' },
  preferences: ['Preference1', 'Preference2'],
  travelViolations: {},
  travelRequestDate: '2023-01-01',
  travelBookingDate: new Date(),
  travelCompletionDate: new Date(),
  cancellationDate: null,
  travelRequestRejectionReason: '',
  isCancelled: false,
  cancellationReason: '',
  isCashAdvanceTaken: false,
  isAddALeg: false,
  sentToTrip: false,
};

export default dummyTravelRequestData;