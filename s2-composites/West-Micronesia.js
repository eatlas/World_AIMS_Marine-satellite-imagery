 // 53NMJ Palau
// Not enough images
// 

s2Utils.s2_composite_display_and_export(
  [
    //good images
    "COPERNICUS/S2/20211026T013459_20211026T013454_T53NMJ",
    //okay
    "COPERNICUS/S2/20200911T013459_20200911T013455_T53NMJ" // sunglint on the edge
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // maybe images          
    "COPERNICUS/S2/20180420T013451_20180420T013454_T53NMJ",
    "COPERNICUS/S2/20180624T013449_20180624T013451_T53NMJ"
  ],
  false, false, REF2_OPTIONS);