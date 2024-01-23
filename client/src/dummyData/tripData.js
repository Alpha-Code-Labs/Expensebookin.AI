export const dummyTripData = {
    tenantId: 'sampleTenantId',
    tenantName: 'Sample Tenant',
    companyName: 'Sample Company',
    userId: {
      empId: 'sampleEmpId',
      name: 'Sample User',
    },
    tripNumber:"TRIP000000232",
    tripId: 'sampleTripId',
    tripPurpose: 'Business Trip for investor onboarding ksjflksjdklj',
    tripStatus: 'intransit',
    tripStartDate: '24-Dec-2023',
    tripCompletionDate: '30-Dec-2023',
    isSentToExpense: false,
    notificationSentToDashboardFlag: false,
    travelRequestData: {
      tenantId: 'sampleTenantId',
      tenantName: 'Sample Tenant',
      companyName: 'Sample Company',
      travelRequestId: "tr-xyz343iecs",
      travelRequestNumber: 'TR12345',
      tripPurpose: 'Business Trip',
      travelRequestStatus: 'draft',
      travelRequestState: 'section 0',
      createdBy: {
        empId: 'sampleEmpId',
        name: 'Sample User',
      },
      createdFor: {
        empId: 'sampleEmpId',
        name: 'Another Sample User',
      },
      teamMembers: [],
      travelAllocationHeaders: [],
      itinerary: {
        formState: [
          {
            formId: 'sampleFormId',
            transfers: {
              needsDeparturePickup: true,
              needsDepartureDrop: true,
              needsReturnPickup: true,
              needsReturnDrop: true,
            },
            needsHotel: true,
            needsCab: true,
            needsVisa: false,
            cancellationDate: '2023-01-05',
            cancellationReason: 'Change of plans',
            formStatus: 'approved',
          },
        ],
        flights: [
          {
            itineraryId: "flight-xyz343iecs",
            formId: 'sampleFormId',
            from: 'City A',
            to: 'City B',
            date: '27-Dec-2023',
            time: '10:00 AM',
            travelClass: 'Business',
            isReturnTravel: 'no',
            violations: {
              class: 'No Violations',
              amount: '0',
            },
            bkd_from: 'City A',
            bkd_to: 'City B',
            status: 'booked',
            bookingDetails: {
              docURL: 'http://sample-doc-url.com',
              docType: 'PDF',
              billDetails: {},
            },
          },
        ],
        buses: [
          {
            itineraryId: 'busItineraryId1',
            formId: 'sampleFormId',
            from: 'City C',
            to: 'City D',
            date: '27-Dec-2023',
            time: '12:00 PM',
            travelClass: 'Economy',
            isReturnTravel: 'no',
            violations: {
              class: 'No Violations',
              amount: '0',
            },
            bkd_from: 'City C',
            bkd_to: 'City D',
            status: 'booked',
            bookingDetails: {
              docURL: 'http://sample-doc-url.com/bus-ticket',
              docType: 'PDF',
              billDetails: {},
            },
          },
        ],
        trains: [
          {
            itineraryId: 'trainItineraryId1',
            formId: 'sampleFormId',
            from: 'City E',
            to: 'City F',
            date: '28-Jan-2023',
            time: '08:00 AM',
            travelClass: 'First Class',
            isReturnTravel: 'no',
            violations: {
              class: 'No Violations',
              amount: '0',
            },
            bkd_from: 'City E',
            bkd_to: 'City F',
            status: 'booked',
            bookingDetails: {
              docURL: 'http://sample-doc-url.com/train-ticket',
              docType: 'PDF',
              billDetails: {},
            },
          },
        ],
        hotels: [
          {
            itineraryId: 'hotelItineraryId1',
            formId: 'sampleFormId',
            location: 'Hotel X',
            locationPreference: 'City G',
            class: 'Luxury',
            checkIn: '05-Nov-2023',
            checkOut: '08-Aug-2023',
            violations: {
              class: 'No Violations',
              amount: '0',
            },
            bkd_location: 'Hotel X',
            bkd_class: 'Luxury',
            bkd_checkIn: '05-Nov-2023',
            bkd_checkOut: '10-Nov-2023',
            status: 'booked',
            bookingDetails: {
              docURL: 'http://sample-doc-url.com/hotel-booking',
              docType: 'PDF',
              billDetails: {},
            },
          },
        ],
        cabs: [
          {
            itineraryId: 'cabItineraryId1',
            formId: 'sampleFormId',
            date: '10-Nov-2023',
            class: 'Sedan',
            preferredTime: '10:00 AM',
            pickupAddress: 'Office Address',
            dropAddress: 'Hotel X',
            isReturnTravel: 'no',
            violations: {
              class: 'No Violations',
              amount: '0',
            },
            bkd_date: '10-Nov-2023',
            bkd_class: 'Sedan',
            bkd_preferredTime: '10:00 AM',
            bkd_pickupAddress: 'Office Address',
            bkd_dropAddress: 'Hotel X',
            bkd_isReturnTravel: 'no',
            status: 'booked',
            bookingDetails: {
              docURL: 'http://sample-doc-url.com/cab-booking',
              docType: 'PDF',
              billDetails: {},
            },
            type: 'regular',
          },
        ],
        // Add dummy data for other travel modes (buses, trains, hotels, cabs) similarly
      },
      tripType: { oneWayTrip: true, roundTrip: false, multiCityTrip: false },
      travelDocuments: ['Passport', 'Insurance'],
      bookings: [
        {
          itineraryReference: {},
          docURL: 'http://sample-doc-url.com',
          details: {},
          status: {},
        },
      ],
      approvers: [
        {
          empId: 'approverEmpId',
          name: 'Approver 1',
          status: 'pending approval',
        },
      ],
      assignedTo: { empId: 'assigneeEmpId', name: 'Assignee' },
      bookedBy: { empId: 'bookedByEmpId', name: 'Booker' },
      recoveredBy: { empId: 'recoveredByEmpId', name: 'Recoverer' },
      preferences: ['Window Seat', 'Non-Smoking Room'],
      travelViolations: {},
      travelRequestDate: '23-Dec-2023',
      travelBookingDate: '23-Dec-2023',
      travelCompletionDate: '23-Dec-2023',
      cancellationDate: '23-Dec-2023',
      travelRequestRejectionReason: '',
      isCancelled: false,
      cancellationReason: '',
      isCashAdvanceTaken: true,
      sentToTrip: true,
    },
    cashAdvancesData: [
      {
        tenantId: 'sampleTenantId',
        travelRequestId: 'tr-xyz343iecs',
        travelRequestNumber: 'TR12345',
        cashAdvanceId: 'sampleCashAdvanceId',
        cashAdvanceNumber: 'CA67890',
        createdBy: {
          empId: 'sampleEmpId',
          name: 'Sample User',
        },
        cashAdvanceStatus: 'draft',
        cashAdvanceState: 'section 0',
        amountDetails: [
          {
            amount: 1000,
            currency: {},
            mode: 'Bank Transfer',
          },
        ],
        approvers: [
          {
            empId: 'approverEmpId',
            name: 'Approver 1',
            status: 'pending approval',
          },
        ],
        assignedTo: { empId: 'assigneeEmpId', name: 'Assignee' },
        paidBy: { empId: 'paidByEmpId', name: 'Payer' },
        recoveredBy: { empId: 'recoveredByEmpId', name: 'Recoverer' },
        cashAdvanceRequestDate: '2023-01-01',
        cashAdvanceApprovalDate: '2023-01-02',
        cashAdvanceSettlementDate: '2023-01-10',
        cashAdvanceViolations: '',
        cashAdvanceRejectionReason: '',
      },
    ],
  };
  

  