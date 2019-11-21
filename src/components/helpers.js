
// since the Skyscanner api response contains an arrays of data regarding Legs, Segemnts, Carrierrs, etc. this function returns detailes of one element out of the relevant array
const getDetails = (id, detailsOf) => {
  return detailsOf.find(detailedElement => detailedElement.Id === id);
};

// Function to creat a new object of full detailes of a Leg(each trip has 1 or 2 legs - Outbound leg and if it is not a one way, also an Inbound Leg)
const getDetailsOfLeg = (legId, rawData) => {
  const { Legs, Carriers, Places, Segments } = rawData;
  let LegDetails = getDetails(legId, Legs);

  LegDetails.CarriersDetails = LegDetails.Carriers.map(id => {
    return getDetails(id, Carriers);
  });

  LegDetails.DestinationStationDetails = getDetails(
    LegDetails.DestinationStation,
    Places
  );

  LegDetails.OriginStationDetails = getDetails(
    LegDetails.OriginStation,
    Places
  );

  LegDetails.StopsDetails =
    LegDetails.Stops.length === 0
      ? "Direct"
      : LegDetails.Stops.map(stop => getDetails(stop, Places));

  LegDetails.SegmentsDetails = LegDetails.SegmentIds.map(id => {
    return getDetails(id, Segments);
  });
  return LegDetails;
};


 //function to convert time duration of a flight in a total minutes to format of "hh mm"
 const durationConvertToTotaltime = n => {
  let num = n;
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
};

export { getDetails, getDetailsOfLeg, durationConvertToTotaltime };
