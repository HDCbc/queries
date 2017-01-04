/**
 * Query Title: HDC-1959 Fentanyl Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description:  This measure shows the percentage of active patients with an active medication for Fentanyl.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Fentanyl medication from dictionary
		 */
			fentanyl : dictionary.meds.fentanyl,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Fentanyl.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.fentanyl,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
