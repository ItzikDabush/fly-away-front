const getDetails = (id, detailsOf) => {
  return detailsOf.find(detailedElement => detailedElement.Id === id);
};

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

export { getDetails, getDetailsOfLeg };
