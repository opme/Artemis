

declare var moment: any;

export {
    getPerson,
    getMockPersons,
};

const genderConceptIdToGender = {
  8532: 'Female',
  8507: 'Male',
};

// The way it works is this: The race field contains races and ethnic backgrounds, while for Ethnicity there are only two categories for data on ethnicity: “Hispanic or Latino” (concept_id=38003563) and “Not Hispanic or Latino” (concept_id=38003564). This means, the two categories are orthogonal to each other, and both Latinos and non-Latinos can have any racial or ethnic background.
const ethnicityConceptIdToEthnicity = {
    38003563: 'Hispanic or Latino',
    38003564: 'Not Hispanic or Latino',
}

const raceConceptIdToEthnicity = {
    8515: 'Asian',
    8516: 'Black',
    8522: 'Other/Unknown/Multiracial',
    8527: 'White',
    8552: 'Undetermined',
    8557: 'Pacific Islander',
    8558: 'Hispanic',
    8657: 'American Indian/Alaska Native',
    9178: 'Non-White',
}


function getPerson(rawPerson) {

  return {
    id: rawPerson.person.person_id,
    name: `Anonymous ${rawPerson.person.person_id}`,
    gender: genderConceptIdToGender[rawPerson.person.gender_concept_id] || 'Unknown',
    isDead: !!rawPerson.death,
    dateOfBirth: moment().year(rawPerson.person.year_of_birth)
                        .month(rawPerson.person.month_of_birth)
                        .day(rawPerson.person.day_of_birth),
    race: raceConceptIdToEthnicity[rawPerson.person.race_concept_id] || 'Unknown',
    ethnicity: ethnicityConceptIdToEthnicity[rawPerson.person.ethnicity_concept_id] || 'Unknown',
    location: rawPerson.person.location_id, // TODO:
    observations: rawPerson.observations.map(toObservation).sort((a, b) => a.date.unix() - b.date.unix()),
    observationPeriods: rawPerson.observationPeriods.map(toObservationPeriod).sort((a, b) => a.startDate.unix() - b.startDate.unix()),
  };
}


function toObservation(rawObservation) {
  return {
    id: rawObservation.observation_id,
    date: moment(rawObservation.observation_time),
    valueAsConceptId: rawObservation.value_as_concept_id,
    providerId: rawObservation.provider_id,
    visitOccurrenceId: rawObservation.visit_occurrence_id,
    observationSourceValue: rawObservation.observation_source_value,
    observationSourceConceptId: rawObservation.observation_source_concept_id,
  };
}

function toObservationPeriod(rawObservationPeriod) {
  return {
    id: rawObservationPeriod.observation_period_id,
    startDate: moment(rawObservationPeriod.observation_period_start_time),
    endDate: moment(rawObservationPeriod.observation_period_end_time),
  };
}

function getMockPersons() {
    return [
        getPerson(getRawMockPerson208())
    ];
}

function getRawMockPerson208() {
  return {
    person: {"person_id":208,"gender_concept_id":8532,"year_of_birth":1940,"month_of_birth":4,"day_of_birth":1,"race_concept_id":8527,"ethnicity_concept_id":38003564,"location_id":163,"person_source_value":"00680BFF8DD56CB6","gender_source_value":"2","race_source_value":"1","ethnicity_source_value":"1"},
    observations: [{"observation_id":3677,"person_id":208,"observation_concept_id":440927,"observation_date":"2010-11-25T08:00:00.000Z","observation_time":1290672000000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8625,"visit_occurrence_id":10563,"observation_source_value":"V5861","observation_source_concept_id":44831974},{"observation_id":3678,"person_id":208,"observation_concept_id":2720870,"observation_date":"2008-07-01T07:00:00.000Z","observation_time":1214895600000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8624,"visit_occurrence_id":10567,"observation_source_value":"Q9967","observation_source_concept_id":2720870},{"observation_id":3679,"person_id":208,"observation_concept_id":4289178,"observation_date":"2010-01-29T08:00:00.000Z","observation_time":1264752000000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8620,"visit_occurrence_id":10573,"observation_source_value":"V5722","observation_source_concept_id":44828565},{"observation_id":3680,"person_id":208,"observation_concept_id":440927,"observation_date":"2008-05-28T07:00:00.000Z","observation_time":1211958000000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8631,"visit_occurrence_id":10576,"observation_source_value":"V5861","observation_source_concept_id":44831974},{"observation_id":3681,"person_id":208,"observation_concept_id":2213597,"observation_date":"2009-12-05T08:00:00.000Z","observation_time":1260000000000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8636,"visit_occurrence_id":10582,"observation_source_value":"90970","observation_source_concept_id":2213597},{"observation_id":3682,"person_id":208,"observation_concept_id":4015724,"observation_date":"2009-01-11T08:00:00.000Z","observation_time":1231660800000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8644,"visit_occurrence_id":10590,"observation_source_value":"V0481","observation_source_concept_id":44837741},{"observation_id":3683,"person_id":208,"observation_concept_id":4015724,"observation_date":"2009-05-06T07:00:00.000Z","observation_time":1241593200000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8646,"visit_occurrence_id":10593,"observation_source_value":"V0481","observation_source_concept_id":44837741},{"observation_id":3684,"person_id":208,"observation_concept_id":4015724,"observation_date":"2009-05-06T07:00:00.000Z","observation_time":1241593200000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8646,"visit_occurrence_id":10593,"observation_source_value":"V0382","observation_source_concept_id":44824937},{"observation_id":3685,"person_id":208,"observation_concept_id":440927,"observation_date":"2010-01-30T08:00:00.000Z","observation_time":1264838400000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8652,"visit_occurrence_id":10599,"observation_source_value":"V5861","observation_source_concept_id":44831974},{"observation_id":3686,"person_id":208,"observation_concept_id":2614669,"observation_date":"2010-01-30T08:00:00.000Z","observation_time":1264838400000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8652,"visit_occurrence_id":10599,"observation_source_value":"A0428","observation_source_concept_id":2614669},{"observation_id":3687,"person_id":208,"observation_concept_id":4090651,"observation_date":"2008-01-25T08:00:00.000Z","observation_time":1201248000000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8654,"visit_occurrence_id":10601,"observation_source_value":"V4511","observation_source_concept_id":44831947},{"observation_id":3688,"person_id":208,"observation_concept_id":0,"observation_date":"2008-01-25T08:00:00.000Z","observation_time":1201248000000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8654,"visit_occurrence_id":10601,"observation_source_value":"G0317","observation_source_concept_id":2617395},{"observation_id":3689,"person_id":208,"observation_concept_id":2514492,"observation_date":"2009-08-05T07:00:00.000Z","observation_time":1249455600000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8660,"visit_occurrence_id":10608,"observation_source_value":"99350","observation_source_concept_id":2514492},{"observation_id":3690,"person_id":208,"observation_concept_id":2108776,"observation_date":"2008-10-16T07:00:00.000Z","observation_time":1224140400000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8671,"visit_occurrence_id":10619,"observation_source_value":"4248F","observation_source_concept_id":2108776},{"observation_id":3691,"person_id":208,"observation_concept_id":2106254,"observation_date":"2009-05-02T07:00:00.000Z","observation_time":1241247600000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8674,"visit_occurrence_id":10622,"observation_source_value":"3048F","observation_source_concept_id":2106254},{"observation_id":3692,"person_id":208,"observation_concept_id":4015724,"observation_date":"2009-02-03T08:00:00.000Z","observation_time":1233648000000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8680,"visit_occurrence_id":10629,"observation_source_value":"V0481","observation_source_concept_id":44837741},{"observation_id":3693,"person_id":208,"observation_concept_id":4214956,"observation_date":"2009-09-11T07:00:00.000Z","observation_time":1252652400000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8681,"visit_occurrence_id":10630,"observation_source_value":"V152","observation_source_concept_id":44830756},{"observation_id":3694,"person_id":208,"observation_concept_id":2614669,"observation_date":"2009-09-11T07:00:00.000Z","observation_time":1252652400000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8681,"visit_occurrence_id":10630,"observation_source_value":"A0428","observation_source_concept_id":2614669},{"observation_id":3695,"person_id":208,"observation_concept_id":4059356,"observation_date":"2010-04-16T07:00:00.000Z","observation_time":1271401200000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8686,"visit_occurrence_id":10635,"observation_source_value":"V420","observation_source_concept_id":44821546},{"observation_id":3696,"person_id":208,"observation_concept_id":2614669,"observation_date":"2008-02-02T08:00:00.000Z","observation_time":1201939200000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8688,"visit_occurrence_id":10637,"observation_source_value":"A0428","observation_source_concept_id":2614669},{"observation_id":3697,"person_id":208,"observation_concept_id":4186037,"observation_date":"2009-02-19T08:00:00.000Z","observation_time":1235030400000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8692,"visit_occurrence_id":10641,"observation_source_value":"V548","observation_source_concept_id":44831967},{"observation_id":3698,"person_id":208,"observation_concept_id":2617819,"observation_date":"2010-03-27T07:00:00.000Z","observation_time":1269673200000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8697,"visit_occurrence_id":10647,"observation_source_value":"G8419","observation_source_concept_id":2617819},{"observation_id":3699,"person_id":208,"observation_concept_id":2101868,"observation_date":"2010-03-27T07:00:00.000Z","observation_time":1269673200000,"observation_type_concept_id":38000282,"value_as_concept_id":0,"provider_id":8697,"visit_occurrence_id":10647,"observation_source_value":"1000F","observation_source_concept_id":2101868}],
    observationPeriods: [{"observation_period_id":192,"person_id":208,"observation_period_start_date":"2008-01-25T08:00:00.000Z","observation_period_start_time":1201248000000,"observation_period_end_date":"2010-01-24T08:00:00.000Z","observation_period_end_time":1264320000000,"period_type_concept_id":44814722}],
    death: null,
  }
}