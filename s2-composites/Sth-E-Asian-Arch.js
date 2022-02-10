// Gulf of Carpentaria (North West of the Western Cape York Marine Park)
utils.s2_composite_display_and_export(
  [
		"COPERNICUS/S2/20181005T005701_20181005T005704_T54LVP",
		"COPERNICUS/S2/20160925T005702_20160925T054935_T54LVP",
		"COPERNICUS/S2/20190910T005711_20190910T005706_T54LVP",
		"COPERNICUS/S2/20200701T005709_20200701T005710_T54LVP",
		"COPERNICUS/S2/20200731T005709_20200731T005710_T54LVP",
		"COPERNICUS/S2/20180428T005711_20180428T005710_T54LVP",
		"COPERNICUS/S2/20180607T005711_20180607T005708_T54LVP",
		"COPERNICUS/S2/20180712T005709_20180712T005934_T54LVP"
	], 
  false, false, REF1_OPTIONS);
  
// PNG above western TS
utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20181005T005701_20181005T005704_T54LWR",	//No cloud
    "COPERNICUS/S2/20190831T005711_20190831T005709_T54LWR",	//Low cloud
    "COPERNICUS/S2/20190910T005711_20190910T005706_T54LWR",	
    "COPERNICUS/S2/20191129T005711_20191129T005707_T54LWR",
    "COPERNICUS/S2/20200820T005709_20200820T005711_T54LWR",	//Low cloud but dark
    "COPERNICUS/S2/20201113T005711_20201113T005712_T54LWR"
  ], 
  false, false, REF1_OPTIONS);