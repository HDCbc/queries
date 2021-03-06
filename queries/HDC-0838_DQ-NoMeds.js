/**
 * Query Title: HDC-0838 DQ No Meds
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	/**
	 * Denominator
	 *
	 * Base criteria: just active patient
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date);

	},

	/**
	 * Numerator
	 *
	 * Additional criteria: no active medication entries on query date
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var noMeds = medications.noMeds(patient, date, date, errorContainer);

	    return (denominator && noMeds);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
