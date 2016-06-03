/**
 * Query Title: HDC-0056
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: Of active patients, 65+, on a statin,
 *              how many have not had a cardiac event?
 */
function map( pt ){

  // Query logic
  var query = {

    // Med codes and age restraints
    minAge     : 65,
    medication : dictionary.meds.statin,
    condition  : dictionary.conditions.cardiacEvent,

    // Active pt? Age?
    denominator: function( pt, date, err ){
      return profile.active( pt, date ) &&
        profile.ages.isMin( pt, date, this.minAge ) &&
        medications.hasActiveMed( pt, date, this.medication, err );
      },
    // Active statin?
    numerator: function( pt, date, denominator, err ) {
      return denominator &&
        !conditions.hasActiveCondition( pt, date, this.condition, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
